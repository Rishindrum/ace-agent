import grpc
from concurrent import futures
import time
import os
import json
from pydantic import BaseModel, Field
from typing import List
import io
import pickle
import numpy as np # <--- The "Google Math" Library
from sklearn.metrics.pairwise import cosine_similarity # <--- For calculating "closeness"
from google import genai
from neo4j import GraphDatabase
from pypdf import PdfReader
from google.cloud import storage
from grpc_health.v1 import health
from grpc_health.v1 import health_pb2
from grpc_health.v1 import health_pb2_grpc

# --- IMPORTS ---
import ace_pb2 as ace_pb2
import ace_pb2_grpc as ace_pb2_grpc
import analytical_memory

# Load environment variables from .env if present in the parent directory
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

# Initialize Gemini
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD") # Must be provided by Docker
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") # Must be provided by Docker
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "ace-agent-brain-bucket")
client = genai.Client(api_key=GEMINI_API_KEY)


class PersistentVectorStore:
    def __init__(self, storage_file="ace_brain.pkl"):
        self.storage_file = storage_file
        self.documents = []
        self.vectors = None

        try:
            self.storage_client = storage.Client()
            self.bucket = self.storage_client.bucket(GCS_BUCKET_NAME)
            print(f"[VectorStore] Connected to GCS Bucket: {GCS_BUCKET_NAME}")
        except Exception as e:
            print(f"[VectorStore] WARNING: GCS connection failed. Running in local-only mode. Error: {e}")
            self.bucket = None

        self.load() # Try to load existing memory on startup

    def add_documents(self, chunks):
        self.documents = chunks
        print(f"[VectorStore] Embedding {len(chunks)} chunks (this may take a moment)...")
        
        try:
            # Create Embeddings (with gemini)
            result = client.models.embed_content(
                model="gemini-embedding-001",
                contents=chunks,
                config={'output_dimensionality': 768}
            )
            self.vectors = np.array([e.values for e in result.embeddings])
            
            # SAVE to disk and cloud
            self.save()
            
        except Exception as e:
            print(f"[VectorStore] Embedding Error: {e}")

    def append_documents(self, chunks):
        """Appends and embeds new documents to the vector store incrementally."""
        if not chunks:
            return
        print(f"[VectorStore] Appending {len(chunks)} chunks to vector store...")
        try:
            # Create Embeddings for new chunks (with gemini)
            result = client.models.embed_content(
                model="gemini-embedding-001",
                contents=chunks,
                config={'output_dimensionality': 768}
            )
            new_vectors = np.array([e.values for e in result.embeddings])
            
            # Append documents
            self.documents.extend(chunks)
            
            # Concatenate vectors
            if self.vectors is None:
                self.vectors = new_vectors
            else:
                self.vectors = np.vstack([self.vectors, new_vectors])
            
            # SAVE to disk and cloud
            self.save()
            print(f"[VectorStore] Successfully appended and saved. Total documents: {len(self.documents)}")
        except Exception as e:
            print(f"[VectorStore] Append Embedding Error: {e}")


    def search(self, query, top_k=3):
        if self.vectors is None or len(self.documents) == 0:
            print("[VectorStore] Memory is empty! Did you upload a PDF?")
            return []

        # Embed query
        q_result = client.models.embed_content(
            model="gemini-embedding-001",
            contents=query,
            config={'output_dimensionality': 768}
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

        # 2. Upload to GCS
        if self.bucket:
            try:
                blob = self.bucket.blob(f"indices/{self.storage_file}")
                blob.upload_from_filename(self.storage_file)
                print(f"[VectorStore] SUCCESSFULLY UPLOADED brain to GCS: indices/{self.storage_file}")
            except Exception as e:
                print(f"[VectorStore] GCS Upload Failed: {e}")

    def load(self):
        """Loads state from a file if it exists"""
        loaded = False

        # Get from cloud
        if self.bucket:
            try:
                blob = self.bucket.blob(f"indices/{self.storage_file}")
                if blob.exists():
                    print("[VectorStore] Found brain in Cloud! Downloading...")
                    blob.download_to_filename(self.storage_file)
                    loaded = True
            except Exception as e:
                print(f"[VectorStore] GCS Download failed: {e}")

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
vector_store = PersistentVectorStore()

# Pydantic models for structured quiz output definition
class QuestionModel(BaseModel):
    id: str = Field(description="Unique identifier for the question (e.g. q1, q2)")
    question_text: str = Field(description="The multiple choice question text")
    options: List[str] = Field(description="List of exactly 4 multiple choice options")
    correct_option_index: int = Field(description="0-based index of the correct option in options list")

class QuizResponseModel(BaseModel):
    questions: List[QuestionModel] = Field(description="List of questions in the generated quiz")

class CramResponseModel(BaseModel):
    dense_review_markdown: str = Field(description="A highly compressed, structured study guide summarizing all key concepts from the requested weeks. Use Markdown format.")
    rapid_fire_quiz: List[QuestionModel] = Field(description="A list of 10 to 15 high-quality, rapid-fire multiple choice questions covering the requested weeks.")

class ExerciseModel(BaseModel):
    id: str = Field(description="Unique identifier for the exercise (e.g. ex1, ex2)")
    question_text: str = Field(description="The multiple choice question text")
    options: List[str] = Field(description="List of exactly 4 multiple choice options")
    correct_option_index: int = Field(description="0-based index of the correct option in options list")
    explanation: str = Field(description="Explanation of why the correct option is right")

class LessonResponseModel(BaseModel):
    lesson_markdown: str = Field(description="A comprehensive structured educational lesson. Use markdown syntax with clear headings, subheadings, and bullet points.")
    exercises: List[ExerciseModel] = Field(description="List of 3 to 5 practice exercises testing concepts explained in the lesson.")

class LessonAndExercisesResponseModel(BaseModel):
    lesson_markdown: str = Field(description="A comprehensive structured educational lesson. Use markdown syntax with clear headings, subheadings, and bullet points.")
    exercises: List[QuestionModel] = Field(description="A list of exactly 3 high-quality multiple choice practice questions testing concepts explained in the lesson.")

class JudgeResponseModel(BaseModel):
    passed: bool = Field(description="True if the generation passes the criteria, False otherwise")
    reasoning: str = Field(description="Explanation of why it passed or failed")

class TutorService(ace_pb2_grpc.TutorServiceServicer):
    def __init__(self):
        print("[Python] Connecting to Graph Database...")
        try:
            self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
            self.driver.verify_connectivity()
        except Exception as e:
            print(f"[Python] WARNING: Neo4j Connection FAILED.")

    def _evaluate_generation(self, generated_content: str, context_chunks: str, mode: str) -> dict:
        criteria = ""
        if mode == "quiz":
            criteria = "Are the questions and correct answers strictly derived from the provided Neo4j context chunks? Fail if it includes outside information."
        elif mode == "cram":
            criteria = "Are the summary and quiz questions strictly derived from the provided Neo4j context chunks? Fail if it includes outside information not present in the context."
        else:
            criteria = "Is the explanation factually accurate? It may include external facts not found in the Neo4j context, but fail it immediately if any statement is factually incorrect or contradicts the provided context."

        prompt = f"""
        You are an AI Judge quality control agent.
        Evaluate the following generated content based on the provided context chunks and criteria.
        
        --- CRITERIA ---
        {criteria}
        
        --- CONTEXT CHUNKS ---
        {context_chunks}
        
        --- GENERATED CONTENT ---
        {generated_content}
        
        Analyze the generated content step-by-step and decide if it meets the criteria.
        """

        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash-lite',
                contents=prompt,
                config={
                    'response_mime_type': 'application/json',
                    'response_schema': JudgeResponseModel,
                }
            )
            result = response.parsed
            return {"passed": result.passed, "reasoning": result.reasoning}
        except Exception as e:
            print(f"[Judge] Error during evaluation: {e}")
            return {"passed": True, "reasoning": f"Judge error: {e}"}

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

        # 3. EXTRACT GRAPH (Only if Neo4j is alive)
        concepts = []
        if self.driver:
            print("[Python] Extraction Graph with Gemini...")
            prompt = f"""
            Extract the knowledge graph from this course.
            Return JSON with this EXACT schema:
            {{ "concepts": [ {{ "name": "Concept Name", "prerequisites": ["Prereq 1"] }} ] }}
            Text: {full_text[:5000]}
            """
            try:
                response = self._generate_with_retry(
                    model_name='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={'response_mime_type': 'application/json'}
                )
                data = json.loads(response.text)
                concepts = data.get("concepts", [])
                
                # Write to Neo4j
                with self.driver.session() as session:
                    session.execute_write(self._create_dynamic_nodes, request.file_name, concepts)
            except Exception as e:
                print(f"[Python] Graph Logic Error: {e}")
        else:
            print("[Python] Skipping Graph Extraction (DB Down)")

        return ace_pb2.SyllabusResponse(
            success=True,
            message=f"Processed {request.file_name}",
            nodes_created=len(concepts),
            graph_json=json.dumps(concepts)
        )

    def _query_graph_context(self, user_text):
        """
        Searches the Knowledge Graph for topics mentioned in the user's text.
        Returns a string describing the relationships.
        """
        if not self.driver:
            return ""
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

        context_chunks = f"Graph Context:\n{graph_text}\n\nSyllabus Vector Context:\n{vector_text}"

        attempts = 0
        max_retries = 3
        correction_instruction = ""
        answer = "I'm having trouble connecting to my brain right now."

        while attempts < max_retries:
            attempts += 1
            print(f"[Python] Chat attempt {attempts}...")

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

            if correction_instruction:
                prompt += f"\n\nCRITICAL FIX REQUIRED FROM PREVIOUS ATTEMPT:\n{correction_instruction}"

            try:
                response = client.models.generate_content(
                    model='gemini-2.5-flash-lite', 
                    contents=prompt
                )
                answer = response.text
            except Exception as e:
                print(f"[Python] Gemini Error: {e}")
                if attempts >= max_retries:
                    return ace_pb2.ChatResponse(response=answer)
                continue

            # Pass the generated explanation to the Judge
            judge_result = self._evaluate_generation(answer, context_chunks, "lesson")
            print(f"[Python] Chat attempt {attempts} judge result: {judge_result}")

            if judge_result.get("passed"):
                return ace_pb2.ChatResponse(response=answer)

            reasoning = judge_result.get("reasoning", "explanation contradicts context or contains errors")
            correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this."

        print(f"[Python] Chat failed all {max_retries} attempts. Returning error.")
        context.set_code(grpc.StatusCode.INTERNAL)
        context.set_details("Failed to generate factually accurate response after 3 attempts.")
        return ace_pb2.ChatResponse(response="I'm sorry, I was unable to generate a factually accurate response after multiple attempts. Please try rephrasing your question.")

    def SubmitQuizResult(self, request, context):
        print(f"[Python] SubmitQuizResult for user {request.user_id} on topic {request.topic_name} with score {request.score}")
        success = analytical_memory.write_quiz_score(
            user_id=request.user_id,
            topic_name=request.topic_name,
            score=request.score
        )
        if success:
            return ace_pb2.QuizResultResponse(success=True, message="Quiz result successfully stored in BigQuery.")
        else:
            return ace_pb2.QuizResultResponse(success=False, message="Failed to store quiz result in BigQuery.")

    def GetQuizScores(self, request, context):
        print(f"[Python] GetQuizScores requested for user {request.user_id}")
        records = analytical_memory.read_quiz_scores(user_id=request.user_id)
        
        scores_pb = []
        for r in records:
            scores_pb.append(ace_pb2.QuizScoreRecord(
                user_id=r["user_id"],
                topic_name=r["topic_name"],
                score=r["score"],
                timestamp=r["timestamp"]
            ))
            
        return ace_pb2.GetQuizScoresResponse(
            scores=scores_pb,
            success=True,
            message="Retrieved student quiz scores from BigQuery."
        )

    def GenerateAdaptiveQuiz(self, request, context):
        print(f"[Python] GenerateAdaptiveQuiz for user {request.user_id} and syllabus {request.syllabus_name}")
        
        # 1. Fetch topics covered by this syllabus from Neo4j
        topics = []
        if self.driver:
            try:
                with self.driver.session() as session:
                    query = """
                    MATCH (s:Syllabus)-[:COVERS]->(t:Topic)
                    WHERE toLower(s.name) = toLower($syllabus_name)
                    RETURN t.name as topic
                    """
                    result = session.run(query, syllabus_name=request.syllabus_name)
                    topics = [record["topic"] for record in result]
            except Exception as e:
                print(f"[Python] Error fetching topics from Neo4j: {e}")

        # 2. Fetch user's performance history from BigQuery
        performance_history = []
        try:
            performance_history = analytical_memory.read_quiz_scores(request.user_id)
        except Exception as e:
            print(f"[Python] Error fetching performance history: {e}")

        # 3. Format context for Gemini
        topics_str = ", ".join(topics) if topics else "General concepts in the course syllabus"
        
        history_lines = []
        for s in performance_history:
            history_lines.append(f"- {s['topic_name']}: {s['score']}%")
        history_str = "\n".join(history_lines) if history_lines else "No quiz history yet (this is their first quiz)."

        prompt = f"""
        You are 'Ace', an AI Tutor. Generate a personalized adaptive review quiz for the student.
        
        Syllabus topics to cover: {topics_str}
        Student's past performance:
        {history_str}
        
        Instructions:
        1. Design 3 to 5 high-quality multiple choice questions.
        2. Adapt the difficulty: focus more questions on topics where the student has struggled (scored below 70%) or has not taken a quiz on yet.
        3. Keep the questions educational, relevant, and clear.
        4. Return ONLY a JSON object that strictly adheres to this schema:
        {{
          "quiz_title": "Adaptive Review Quiz",
          "questions": [
            {{
              "question_text": "Question description?",
              "options": ["Option 0", "Option 1", "Option 2", "Option 3"],
              "correct_option_index": 0,
              "topic": "Topic Name",
              "explanation": "Explanation for the correct option"
            }}
          ]
        }}
        """

        try:
            # Call Gemini with strict JSON configuration
            response = self._generate_with_retry(
                model_name='gemini-2.5-flash-lite',
                contents=prompt,
                config={'response_mime_type': 'application/json'}
            )
            quiz_json = response.text
        except Exception as e:
            print(f"[Python] Gemini Adaptive Quiz Error: {e}")
            fallback_quiz = {
                "quiz_title": "Review Quiz",
                "questions": [
                  {
                    "question_text": f"Let's review the syllabus: {request.syllabus_name}. Are you ready to begin studying?",
                    "options": ["Yes, let's do it!", "I need to review first."],
                    "correct_option_index": 0,
                    "topic": "Introduction",
                    "explanation": "Starting is the first step to success!"
                  }
                ]
            }
            quiz_json = json.dumps(fallback_quiz)

        return ace_pb2.AdaptiveQuizResponse(quiz_json=quiz_json)

    def IngestMaterial(self, request, context):
        print(f"[Python] IngestMaterial for topic '{request.topic_name}' under week '{request.week_number}' for user '{request.user_id}'...")
        try:
            import ingestion_service
            success = ingestion_service.ingest_material(
                content=request.raw_text,
                topic_name=request.topic_name,
                week_number=str(request.week_number),
                user_id=request.user_id
            )
            if success:
                return ace_pb2.IngestResponse(success=True, message="Material successfully ingested and embedded.")
            else:
                return ace_pb2.IngestResponse(success=False, message="Material ingestion failed. Ensure the Topic exists for the given Week in Neo4j.")
        except Exception as e:
            print(f"[Python] IngestMaterial Exception: {e}")
            return ace_pb2.IngestResponse(success=False, message=f"Internal Server Error: {str(e)}")
            
    def GenerateQuiz(self, request, context):
        weak_topics_list = list(request.weak_topics) if hasattr(request, "weak_topics") else []
        print(f"[Python] GenerateQuiz for week '{request.week_number}', question count '{request.question_count}' for user '{request.user_id}', weak topics {weak_topics_list}...")
        try:
            topic_names = []
            chunks = []
            
            # Graph Traversal: Pull matching failed/weak topics along with the current week's scheduled topics.
            if self.driver:
                with self.driver.session() as session:
                    if request.week_number == -1:
                        # Maintenance Review: strictly weak topics
                        print(f"[Python] Maintenance Review Quiz: pulling strictly weak topics.")
                        if not weak_topics_list:
                            # Fallback: review all course concepts if no weak topics are recorded yet
                            print(f"[Python] No weak topics found. Falling back to all concepts.")
                            query = """
                            MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                            RETURN t.name AS topic_name, m.chunks AS chunks
                            """
                            result = session.run(query, user_id=request.user_id)
                        else:
                            query = """
                            MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                            WHERE t.name IN $weak_topics
                            RETURN t.name AS topic_name, m.chunks AS chunks
                            """
                            result = session.run(query, user_id=request.user_id, weak_topics=weak_topics_list)
                    else:
                        query = """
                        MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                        WHERE (w.number = $week_number) OR (t.name IN $weak_topics)
                        RETURN t.name AS topic_name, m.chunks AS chunks
                        """
                        result = session.run(query, week_number=request.week_number, user_id=request.user_id, weak_topics=weak_topics_list)
                    
                    for record in result:
                        tname = record.get("topic_name")
                        if tname and tname not in topic_names:
                            topic_names.append(tname)
                        rec_chunks = record.get("chunks")
                        if rec_chunks:
                            if isinstance(rec_chunks, list):
                                chunks.extend(rec_chunks)
                            else:
                                chunks.append(str(rec_chunks))
            
            topics_str = ", ".join(topic_names) if topic_names else "Unknown"
            context_chunks = "\n\n".join(chunks) if chunks else "No direct course text chunks."
            print(f"[Python] GenerateQuiz: Retrieved topics '{topics_str}' with {len(chunks)} chunks.")
            
            attempts = 0
            max_retries = 3
            correction_instruction = ""

            while attempts < max_retries:
                attempts += 1
                print(f"[Python] GenerateQuiz attempt {attempts}...")

                # Construct prompt for LLM
                prompt = f"""
                You are a helpful teaching assistant.
                Generate a quiz containing exactly {request.question_count} multiple choice questions for the following week and topics.
                
                Week Number: {request.week_number}
                Topics: {topics_str}
                
                Here are the source material text chunks to base the questions on:
                {context_chunks}
                
                Generate a set of {request.question_count} questions. For each question, make sure:
                1. It has exactly 4 options.
                2. The options are clear and plausible.
                3. The correct_option_index is a 0-based index pointing to the correct answer in the options list.
                4. The id is a unique identifier string (e.g. "q1", "q2", etc.).
                """
                
                if correction_instruction:
                    prompt += f"\n\nCRITICAL FIX REQUIRED FROM PREVIOUS ATTEMPT:\n{correction_instruction}"

                # LLM Generation: Use the google-genai SDK with gemini-2.5-flash-lite
                response = client.models.generate_content(
                    model='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': QuizResponseModel,
                    }
                )
                
                # Parse the returned object
                quiz_data = response.parsed
                
                # Map Pydantic response to compiled gRPC structures
                grpc_questions = []
                if quiz_data and hasattr(quiz_data, 'questions'):
                    for q in quiz_data.questions:
                        grpc_questions.append(
                            ace_pb2.Question(
                                id=q.id,
                                question_text=q.question_text,
                                options=list(q.options),
                                correct_option_index=q.correct_option_index
                            )
                        )

                # Format generated content string for the judge
                generated_content_str = ""
                for q in grpc_questions:
                    generated_content_str += f"Q: {q.question_text}\nOptions: {q.options}\nCorrect: {q.correct_option_index}\n\n"

                # Step 2: Pass generated content to the Judge
                judge_result = self._evaluate_generation(generated_content_str, context_chunks, "quiz")
                print(f"[Python] GenerateQuiz attempt {attempts} judge result: {judge_result}")

                # Step 3: If Judge passed, break loop and return
                if judge_result.get("passed"):
                    return ace_pb2.QuizResponse(questions=grpc_questions)
                
                # Step 4: If passed: false, append reasoning to next prompt
                reasoning = judge_result.get("reasoning", "outside information included")
                correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this."

            print(f"[Python] GenerateQuiz failed all {max_retries} attempts. Returning error.")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to generate quiz adhering to context after 3 attempts. Please try again.")
            return ace_pb2.QuizResponse()
            
        except Exception as e:
            print(f"[Python] GenerateQuiz Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to generate quiz: {str(e)}")
            return ace_pb2.QuizResponse()

    def GenerateCramSession(self, request, context):
        weak_topics_list = list(request.weak_topics) if hasattr(request, "weak_topics") else []
        print(f"[Python] GenerateCramSession for user '{request.user_id}' from Week {request.start_week} to {request.end_week}, weak topics {weak_topics_list}...")
        try:
            topic_names = []
            chunks = []
            
            # Neo4j Range Query with isolation
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                    WHERE w.number >= $start_week AND w.number <= $end_week
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, start_week=request.start_week, end_week=request.end_week, user_id=request.user_id)
                    for record in result:
                        tname = record.get("topic_name")
                        if tname and tname not in topic_names:
                            topic_names.append(tname)
                        rec_chunks = record.get("chunks")
                        if rec_chunks:
                            if isinstance(rec_chunks, list):
                                chunks.extend(rec_chunks)
                            else:
                                chunks.append(str(rec_chunks))
            
            topics_str = ", ".join(topic_names) if topic_names else "Unknown"
            context_chunks = "\n\n".join(chunks) if chunks else "No course materials found for this range of weeks."
            weak_topics_str = ", ".join(weak_topics_list) if weak_topics_list else "None"
            print(f"[Python] GenerateCramSession: Retrieved topics '{topics_str}' with {len(chunks)} chunks.")
            
            attempts = 0
            max_retries = 3
            correction_instruction = ""
            
            while attempts < max_retries:
                attempts += 1
                print(f"[Python] GenerateCramSession attempt {attempts}...")
                
                prompt = f"""
                You are a helpful teaching assistant helping a student cram for their exam.
                Generate an Exam Cram Session packet containing a dense study guide summary and a rapid-fire quiz.
                
                Start Week: {request.start_week}
                End Week: {request.end_week}
                Covered Topics: {topics_str}
                Student's historically weak topics to emphasize: {weak_topics_str}
                
                --- SOURCE MATERIAL TEXT CHUNKS ---
                {context_chunks}
                
                Generate a cram session matching these instructions:
                1. Write a dense_review_markdown text: a highly compressed, structured study guide summarizing key concepts, definitions, and formulas strictly from the source material. Use Markdown headings and bullet points.
                2. Design 10 to 15 high-quality multiple choice questions. Focus more heavily on topics where the student struggled (weak topics). Each question must have exactly 4 options.
                3. Ensure the correct_option_index is a 0-based index pointing to the correct answer.
                4. The id for each question should be a unique identifier string (e.g. "cq1", "cq2", etc.).
                """
                
                if correction_instruction:
                    prompt += f"\n\nCRITICAL FIX REQUIRED FROM PREVIOUS ATTEMPT:\n{correction_instruction}"
                
                response = client.models.generate_content(
                    model='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': CramResponseModel,
                    }
                )
                
                cram_data = response.parsed
                
                # Format generated content string for the judge
                generated_content_str = f"Summary:\n{cram_data.dense_review_markdown}\n\nQuestions:\n"
                for q in cram_data.rapid_fire_quiz:
                    generated_content_str += f"Q: {q.question_text}\nOptions: {q.options}\nCorrect: {q.correct_option_index}\n\n"
                
                # Step 2: Pass generated content to the Judge
                judge_result = self._evaluate_generation(generated_content_str, context_chunks, "cram")
                print(f"[Python] GenerateCramSession attempt {attempts} judge result: {judge_result}")
                
                if judge_result.get("passed"):
                    grpc_questions = []
                    for q in cram_data.rapid_fire_quiz:
                        grpc_questions.append(
                            ace_pb2.Question(
                                id=q.id,
                                question_text=q.question_text,
                                options=list(q.options),
                                correct_option_index=q.correct_option_index
                            )
                        )
                    return ace_pb2.CramResponse(
                        dense_review_markdown=cram_data.dense_review_markdown,
                        rapid_fire_quiz=grpc_questions
                    )
                
                reasoning = judge_result.get("reasoning", "hallucinations or outside info included")
                correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this. Make sure everything is derived strictly from the provided text chunks."
                
            print(f"[Python] GenerateCramSession failed all {max_retries} attempts. Returning error.")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to generate factually accurate cram session after 3 attempts.")
            return ace_pb2.CramResponse()
            
        except Exception as e:
            print(f"[Python] GenerateCramSession Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Internal error during cram session generation: {str(e)}")
            return ace_pb2.CramResponse()

    def GenerateLesson(self, request, context):
        print(f"[Python] GenerateLesson for week '{request.week_number}' for user '{request.user_id}'...")
        try:
            topic_names = []
            chunks = []
            
            # Neo4j query with isolation
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                    WHERE w.number = $week_number
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, week_number=request.week_number, user_id=request.user_id)
                    for record in result:
                        tname = record.get("topic_name")
                        if tname and tname not in topic_names:
                            topic_names.append(tname)
                        rec_chunks = record.get("chunks")
                        if rec_chunks:
                            if isinstance(rec_chunks, list):
                                chunks.extend(rec_chunks)
                            else:
                                chunks.append(str(rec_chunks))
            
            topics_str = ", ".join(topic_names) if topic_names else "Unknown"
            context_chunks = "\n\n".join(chunks) if chunks else "No course materials found for this week."
            print(f"[Python] GenerateLesson: Retrieved topics '{topics_str}' with {len(chunks)} chunks.")
            
            attempts = 0
            max_retries = 3
            correction_instruction = ""
            
            while attempts < max_retries:
                attempts += 1
                print(f"[Python] GenerateLesson attempt {attempts}...")
                
                prompt = f"""
                You are a helpful teaching assistant helping a student learn key concepts.
                Generate a comprehensive structured educational lesson and a set of practice exercises.
                
                Week Number: {request.week_number}
                Covered Topics: {topics_str}
                
                --- SOURCE MATERIAL TEXT CHUNKS ---
                {context_chunks}
                
                Generate a lesson matching these instructions:
                1. Write a lesson_markdown text: a comprehensive structured lesson explaining the topics, formulas, or concepts, using markdown headers, lists, and examples.
                2. Design 3 to 5 practice exercises testing the concepts in the lesson. Each exercise must have exactly 4 options.
                3. Ensure the correct_option_index is a 0-based index pointing to the correct answer.
                4. The id for each exercise should be a unique identifier string (e.g. "ex1", "ex2", etc.).
                5. Include an explanation field explaining the correct answer for each exercise.
                """
                
                if correction_instruction:
                    prompt += f"\n\nCRITICAL FIX REQUIRED FROM PREVIOUS ATTEMPT:\n{correction_instruction}"
                
                response = client.models.generate_content(
                    model='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': LessonResponseModel,
                    }
                )
                
                lesson_data = response.parsed
                
                # Format generated content string for the judge
                generated_content_str = f"Lesson:\n{lesson_data.lesson_markdown}\n\nExercises:\n"
                for e in lesson_data.exercises:
                    generated_content_str += f"Q: {e.question_text}\nOptions: {e.options}\nCorrect: {e.correct_option_index}\n\n"
                
                # Step 2: Pass generated content to the Judge
                judge_result = self._evaluate_generation(generated_content_str, context_chunks, "lesson")
                print(f"[Python] GenerateLesson attempt {attempts} judge result: {judge_result}")
                
                if judge_result.get("passed"):
                    grpc_exercises = []
                    for e in lesson_data.exercises:
                        grpc_exercises.append(
                            ace_pb2.Question(
                                id=e.id,
                                question_text=e.question_text,
                                options=list(e.options),
                                correct_option_index=e.correct_option_index
                            )
                        )
                    return ace_pb2.LessonResponse(
                        lesson_markdown=lesson_data.lesson_markdown,
                        exercises=grpc_exercises
                    )
                
                reasoning = judge_result.get("reasoning", "hallucinations or outside info included")
                correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this. Make sure everything is accurate and derived correctly."
                
            print(f"[Python] GenerateLesson failed all {max_retries} attempts. Returning error.")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to generate factually accurate lesson after 3 attempts.")
            return ace_pb2.LessonResponse()
            
        except Exception as e:
            print(f"[Python] GenerateLesson Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to generate lesson: {str(e)}")
            return ace_pb2.LessonResponse()

    def GenerateLessonAndExercises(self, request, context):
        print(f"[Python] GenerateLessonAndExercises for week '{request.week_number}' for user '{request.user_id}'...")
        try:
            topic_names = []
            chunks = []
            
            # 1. Query Neo4j for target week's chunks
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id})
                    WHERE w.number = $week_number
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, week_number=request.week_number, user_id=request.user_id)
                    for record in result:
                        tname = record.get("topic_name")
                        if tname and tname not in topic_names:
                            topic_names.append(tname)
                        rec_chunks = record.get("chunks")
                        if rec_chunks:
                            if isinstance(rec_chunks, list):
                                chunks.extend(rec_chunks)
                            else:
                                chunks.append(str(rec_chunks))
            
            # 2. Query BigQuery for weak topics
            weak_topics_list = list(request.weak_topics) if hasattr(request, "weak_topics") else []
            try:
                bq_scores = analytical_memory.read_quiz_scores(request.user_id)
                topic_scores = {}
                for s in bq_scores:
                    topic = s["topic_name"]
                    score = s["score"]
                    if topic not in topic_scores:
                        topic_scores[topic] = []
                    topic_scores[topic].append(score)
                for topic, s_list in topic_scores.items():
                    avg_score = sum(s_list) / len(s_list)
                    if avg_score < 70 and topic not in weak_topics_list:
                        weak_topics_list.append(topic)
            except Exception as e:
                print(f"[Python] Error fetching scores from BigQuery: {e}")

            topics_str = ", ".join(topic_names) if topic_names else "Unknown"
            weak_topics_str = ", ".join(weak_topics_list) if weak_topics_list else "None"
            context_chunks = "\n\n".join(chunks) if chunks else "No course materials found for this week."
            print(f"[Python] GenerateLessonAndExercises: Week topics '{topics_str}', weak topics '{weak_topics_str}' with {len(chunks)} chunks.")
            
            attempts = 0
            max_retries = 3
            correction_instruction = ""
            
            while attempts < max_retries:
                attempts += 1
                print(f"[Python] GenerateLessonAndExercises attempt {attempts}...")
                
                prompt = f"""
                You are a helpful teaching assistant helping a student learn key concepts.
                Generate a detailed structured educational lesson and exactly 3 practice questions.
                
                Week Number: {request.week_number}
                Covered Topics: {topics_str}
                Student's Weak Topics to address: {weak_topics_str}
                
                --- SOURCE MATERIAL TEXT CHUNKS ---
                {context_chunks}
                
                Generate a lesson matching these instructions:
                1. Write a lesson_markdown text: a detailed structured lesson explaining the topics, formulas, or concepts, using markdown headers, lists, and examples. Focus heavily on addressing the student's weak topics if they overlap.
                2. Design exactly 3 practice questions testing the concepts in the lesson. Each question must have exactly 4 options.
                3. Ensure the correct_option_index is a 0-based index pointing to the correct answer.
                4. The id for each question should be a unique identifier string (e.g. "ex1", "ex2", "ex3").
                """
                
                if correction_instruction:
                    prompt += f"\n\nCRITICAL FIX REQUIRED FROM PREVIOUS ATTEMPT:\n{correction_instruction}"
                
                response = client.models.generate_content(
                    model='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': LessonAndExercisesResponseModel,
                    }
                )
                
                lesson_data = response.parsed
                
                # Format generated content string for the judge
                generated_content_str = f"Lesson:\n{lesson_data.lesson_markdown}\n\nExercises:\n"
                for e in lesson_data.exercises:
                    generated_content_str += f"Q: {e.question_text}\nOptions: {e.options}\nCorrect: {e.correct_option_index}\n\n"
                
                # Step 2: Pass generated content to the Judge
                judge_result = self._evaluate_generation(generated_content_str, context_chunks, "lesson")
                print(f"[Python] GenerateLessonAndExercises attempt {attempts} judge result: {judge_result}")
                
                if judge_result.get("passed"):
                    grpc_exercises = []
                    for e in lesson_data.exercises:
                        grpc_exercises.append(
                            ace_pb2.Question(
                                id=e.id,
                                question_text=e.question_text,
                                options=list(e.options),
                                correct_option_index=e.correct_option_index
                            )
                        )
                    return ace_pb2.LessonResponse(
                        lesson_markdown=lesson_data.lesson_markdown,
                        exercises=grpc_exercises
                    )
                
                reasoning = judge_result.get("reasoning", "hallucinations or outside info included")
                correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this. Make sure everything is accurate and derived correctly."
                
            print(f"[Python] GenerateLessonAndExercises failed all {max_retries} attempts. Returning error.")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to generate factually accurate lesson and exercises after 3 attempts.")
            return ace_pb2.LessonResponse()
            
        except Exception as e:
            print(f"[Python] GenerateLessonAndExercises Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to generate lesson: {str(e)}")
            return ace_pb2.LessonResponse()
    
    
    
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
    
    # Add Health Checking Servicer (Crucial for Cloud Run gRPC startup probes)
    health_servicer = health.HealthServicer()
    health_pb2_grpc.add_HealthServicer_to_server(health_servicer, server)
    health_servicer.set("", health_pb2.HealthCheckResponse.SERVING)
    health_servicer.set("ace.TutorService", health_pb2.HealthCheckResponse.SERVING)
    
    # 2. BIND TO 0.0.0.0 (Extremely important for Cloud Run)
    bind_addr = f'0.0.0.0:{port}'
    
    server.add_insecure_port(bind_addr)
    print(f"[Python] Listening on {bind_addr}")
    
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()