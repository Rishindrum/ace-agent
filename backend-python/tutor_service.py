import grpc
from concurrent import futures
import time
print("DEBUG: Python is starting...", file=sys.stderr)
import os
import json
import io
import pickle
import numpy as np # <--- The "Google Math" Library
from sklearn.metrics.pairwise import cosine_similarity # <--- For calculating "closeness"
from google import genai
from neo4j import GraphDatabase
from pypdf import PdfReader

# --- IMPORTS ---
import ace_pb2 as ace_pb2
import ace_pb2_grpc as ace_pb2_grpc

# Initialize Gemini
NEO4J_URI = os.getenv("NEO4J_URI", "neo4j+s://961ec8b5.databases.neo4j.io") # Default if missing
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD") # Must be provided by Docker
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") # Must be provided by Docker
client = genai.Client(api_key=GEMINI_API_KEY)

# --- CUSTOM VECTOR STORE (The Interview Flex) ---
class SimpleVectorStore:
    def __init__(self, storage_file="ace_brain.pkl"):
        self.storage_file = storage_file
        self.documents = []
        self.vectors = None
        self.load() # Try to load existing memory on startup

    def add_documents(self, chunks):
        self.documents = chunks
        print(f"[VectorStore] Embedding {len(chunks)} chunks (this may take a moment)...")
        
        try:
            # Create Embeddings
            result = client.models.embed_content(
                model="text-embedding-004",
                contents=chunks
            )
            self.vectors = np.array([e.values for e in result.embeddings])
            
            # SAVE to disk immediately
            self.save()
            print(f"[VectorStore] Brain saved to {self.storage_file}")
            
        except Exception as e:
            print(f"[VectorStore] Embedding Error: {e}")

    def search(self, query, top_k=3):
        if self.vectors is None or len(self.documents) == 0:
            print("[VectorStore] Memory is empty! Did you upload a PDF?")
            return []

        # Embed query
        q_result = client.models.embed_content(
            model="text-embedding-004",
            contents=query
        )
        query_vector = np.array([q_result.embeddings[0].values])

        # Calculate Similarity
        similarities = cosine_similarity(query_vector, self.vectors)[0]
        
        # Get top results
        top_indices = similarities.argsort()[-top_k:][::-1]
        results = [self.documents[idx] for idx in top_indices]
        return results

    def save(self):
        """Saves the current state to a file"""
        with open(self.storage_file, 'wb') as f:
            pickle.dump({'docs': self.documents, 'vecs': self.vectors}, f)

    def load(self):
        """Loads state from a file if it exists"""
        if os.path.exists(self.storage_file):
            try:
                with open(self.storage_file, 'rb') as f:
                    data = pickle.load(f)
                    self.documents = data['docs']
                    self.vectors = data['vecs']
                print(f"[VectorStore] Loaded {len(self.documents)} chunks from disk.")
            except Exception as e:
                print(f"[VectorStore] Could not load memory: {e}")

# Initialize the store
vector_store = SimpleVectorStore()

class TutorService(ace_pb2_grpc.TutorServiceServicer):
    def __init__(self):
        print("[Python] Connecting to Graph Database...")
        self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

    def ProcessSyllabus(self, request, context):
        print(f"[Python] Processing syllabus: {request.file_name}")
        
        # 1. READ PDF
        try:
            pdf_file = io.BytesIO(request.file_data)
            reader = PdfReader(pdf_file)
            full_text = ""
            for page in reader.pages:
                full_text += page.extract_text() + "\n"
        except Exception as e:
            print(f"[Python] PDF Error: {e}")
            return ace_pb2.SyllabusResponse(success=False, message="Failed to read PDF")

        # 2. CHUNK & EMBED (RAG)
        # Split text into ~1000 char chunks
        chunks = [full_text[i:i+1000] for i in range(0, len(full_text), 1000)]
        
        # Store in our custom "ScaNN-style" store
        vector_store.add_documents(chunks)

        # 3. EXTRACT GRAPH
        print("[Python] Asking Gemini to extract graph...")
        prompt = f"""
        Extract the knowledge graph from this course.
        Return JSON with this EXACT schema:
        {{ "concepts": [ {{ "name": "Concept Name", "prerequisites": ["Prereq 1"] }} ] }}
        Text: {full_text[:5000]}
        """

        concepts = []
        try:
            # --- UPDATE: USE RETRY HELPER ---
            response = self._generate_with_retry(
                model_name='gemini-2.5-flash',
                contents=prompt,
                config={'response_mime_type': 'application/json'}
            )
            # --------------------------------
            
            data = json.loads(response.text)
            concepts = data.get("concepts", [])
        except Exception as e:
            print(f"[Python] AI Graph Error: {e}")

        # 4. STORE IN NEO4J
        if concepts:
            with self.driver.session() as session:
                session.execute_write(self._create_dynamic_nodes, request.file_name, concepts)

        return ace_pb2.SyllabusResponse(
            success=True,
            message=f"Analyzed {request.file_name} & Memorized Content",
            nodes_created=len(concepts),
            graph_json=json.dumps(concepts)
        )

    def _query_graph_context(self, user_text):
        """
        Searches the Knowledge Graph for topics mentioned in the user's text.
        Returns a string describing the relationships.
        """
        graph_context = []
        with self.driver.session() as session:
            # Cypher Query: Find any Topic node whose name is mentioned in the User's text
            # We use (?i) for case-insensitive matching
            query = """
            MATCH (n:Topic)
            WHERE toLower($text) CONTAINS toLower(n.name)
            
            // Get things pointing TO this node (Prerequisites)
            OPTIONAL MATCH (p)-[:PREREQUISITE_TO]->(n)
            
            // Get things this node points TO (Future topics)
            OPTIONAL MATCH (n)-[:PREREQUISITE_TO]->(f)
            
            RETURN n.name as topic, 
                   collect(DISTINCT p.name) as prereqs, 
                   collect(DISTINCT f.name) as future
            LIMIT 3
            """
            result = session.run(query, text=user_text)
            
            for record in result:
                topic = record['topic']
                prereqs = [p for p in record['prereqs'] if p]
                future = [f for f in record['future'] if f]
                
                info = f"Topic '{topic}' found in Knowledge Graph."
                if prereqs:
                    info += f" It requires: {', '.join(prereqs)}."
                if future:
                    info += f" It unlocks: {', '.join(future)}."
                
                graph_context.append(info)
        
        return "\n".join(graph_context)

    # --- UPDATED: Hybrid Chat ---
    def Chat(self, request, context):
        print(f"[Python] Chat Question: {request.message}")
        
        # SOURCE 1: Vector Search (The "Index")
        # Finds paragraphs from the PDF text
        relevant_chunks = vector_store.search(request.message)
        vector_text = "\n\n".join(relevant_chunks)
        if not vector_text:
            vector_text = "No direct text matches found."

        # SOURCE 2: Graph Search (The "Table of Contents")
        # Finds relationships from Neo4j
        graph_text = self._query_graph_context(request.message)
        if not graph_text:
            graph_text = "No relevant topics found in the graph."

        print(f"[Python] Hybrid Context:\n- Graph: {graph_text}\n- Vector: {len(relevant_chunks)} chunks")

        # SYNTHESIS: Feed both to Gemini
        prompt = f"""
        You are 'Ace', an AI Tutor. Answer the user's question using the context below.
        
        --- KNOWLEDGE GRAPH (Structure & Dependencies) ---
        {graph_text}
        
        --- SYLLABUS TEXT (Details & Policies) ---
        {vector_text}
        
        --- USER QUESTION ---
        {request.message}
        
        Instructions:
        1. If the user asks about order, prerequisites, or structure, rely on the Graph.
        2. If the user asks about grading, dates, or definitions, rely on the Syllabus Text.
        3. Combine both sources if needed.
        """
        
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash-lite', 
                contents=prompt
            )
            answer = response.text
        except Exception as e:
            print(f"[Python] Gemini Error: {e}")
            answer = "I'm having trouble connecting to my brain right now."

        return ace_pb2.ChatResponse(response=answer)
    
    @staticmethod
    def _create_dynamic_nodes(tx, filename, concepts):
        tx.run("MERGE (s:Syllabus {name: $filename})", filename=filename)
        for concept in concepts:
            name = concept['name']
            prereqs = concept.get('prerequisites', [])
            tx.run("MERGE (c:Topic {name: $name})", name=name)
            tx.run("""
                MATCH (s:Syllabus {name: $filename}), (c:Topic {name: $name})
                MERGE (s)-[:COVERS]->(c)
            """, filename=filename, name=name)
            for p_name in prereqs:
                tx.run("MERGE (p:Topic {name: $p_name})", p_name=p_name)
                tx.run("""
                    MATCH (c:Topic {name: $c_name}), (p:Topic {name: $p_name})
                    MERGE (p)-[:PREREQUISITE_TO]->(c)
                """, c_name=name, p_name=p_name)

    def _generate_with_retry(self, model_name, contents, retries=3, delay=2, config=None):
        """
        Tries to call Gemini. If 503 Overloaded, waits and tries again.
        """
        for attempt in range(retries):
            try:
                # Call Gemini
                response = client.models.generate_content(
                    model=model_name, 
                    contents=contents,
                    config=config
                )
                return response
            except Exception as e:
                # Check if it is a 503 error (Overloaded)
                error_str = str(e)
                if "503" in error_str or "UNAVAILABLE" in error_str:
                    print(f"[Python] Gemini Overloaded. Retrying in {delay} seconds... (Attempt {attempt+1}/{retries})")
                    time.sleep(delay)
                    delay *= 2 # Exponential Backoff (2s -> 4s -> 8s)
                else:
                    # If it's a different error (like 400 Bad Request), crash immediately
                    raise e
        
        raise Exception("Gemini remains overloaded after max retries.")

def serve():
    # 1. Get the port from the environment (Google sets this)
    # Default to 50051 only if we are running locally
    port = os.environ.get('PORT', '50051')
    
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    ace_pb2_grpc.add_TutorServiceServicer_to_server(TutorService(), server)
    
    # 2. BIND TO 0.0.0.0 (Extremely important for Cloud Run)
    bind_addr = f'0.0.0.0:{port}'
    
    server.add_insecure_port(bind_addr)
    print(f"[Python] Listening on {bind_addr}")
    
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()