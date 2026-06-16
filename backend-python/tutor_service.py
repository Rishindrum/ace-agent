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

import urllib.request

def get_project_id():
    proj = os.getenv("GCP_PROJECT_ID") or os.getenv("GOOGLE_CLOUD_PROJECT")
    if proj:
        return proj
    try:
        req = urllib.request.Request(
            "http://metadata.google.internal/computeMetadata/v1/project/project-id",
            headers={"Metadata-Flavor": "Google"}
        )
        with urllib.request.urlopen(req, timeout=2) as response:
            return response.read().decode('utf-8').strip()
    except Exception:
        return None

# Initialize Gemini
NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD") # Must be provided by Docker
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") # Must be provided by Docker

project_id = get_project_id()
if os.getenv("GCS_BUCKET_NAME"):
    GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
elif project_id:
    GCS_BUCKET_NAME = f"ace-agent-brain-bucket-{project_id}"
else:
    GCS_BUCKET_NAME = "ace-agent-brain-bucket"

client = genai.Client(api_key=GEMINI_API_KEY)


class PersistentVectorStore:
    def __init__(self):
        try:
            self.storage_client = storage.Client()
            
            # Try to get or create the bucket
            try:
                bucket = self.storage_client.get_bucket(GCS_BUCKET_NAME)
            except Exception:
                print(f"[VectorStore] Bucket {GCS_BUCKET_NAME} not found, trying to create...")
                proj = get_project_id() or self.storage_client.project
                bucket = self.storage_client.create_bucket(GCS_BUCKET_NAME, project=proj, location="us-central1")
                print(f"[VectorStore] Created bucket {GCS_BUCKET_NAME}")
                
            self.bucket = bucket
            print(f"[VectorStore] Connected to GCS Bucket: {GCS_BUCKET_NAME}")
        except Exception as e:
            print(f"[VectorStore] WARNING: GCS connection failed. Running in local-only mode. Error: {e}")
            self.bucket = None

    def _get_filename(self, user_id: str, class_id: str) -> str:
        u = user_id if user_id else "default_user"
        c = class_id if class_id else "default_class"
        return f"{u}_{c}_vectors.pkl"

    def _load_state(self, user_id: str, class_id: str):
        filename = self._get_filename(user_id, class_id)
        documents = []
        vectors = None

        # Try to download from Cloud first
        if self.bucket:
            try:
                blob = self.bucket.blob(f"indices/{filename}")
                if blob.exists():
                    print(f"[VectorStore] Found brain in Cloud for {user_id}/{class_id}! Downloading...")
                    blob.download_to_filename(filename)
            except Exception as e:
                print(f"[VectorStore] GCS Download failed for {filename}: {e}")

        # Try to load from local disk
        if os.path.exists(filename):
            try:
                with open(filename, 'rb') as f:
                    data = pickle.load(f)
                    documents = data.get('docs', [])
                    vectors = data.get('vecs', None)
                print(f"[VectorStore] Loaded {len(documents)} chunks from disk for {user_id}/{class_id}.")
            except Exception as e:
                print(f"[VectorStore] Could not load memory from {filename}: {e}")
        
        return documents, vectors

    def _save_state(self, user_id: str, class_id: str, documents, vectors):
        filename = self._get_filename(user_id, class_id)
        # 1. Save to local disk
        try:
            with open(filename, 'wb') as f:
                pickle.dump({'docs': documents, 'vecs': vectors}, f)
        except Exception as e:
            print(f"[VectorStore] Disk Save Failed for {filename}: {e}")

        # 2. Upload to GCS
        if self.bucket:
            try:
                blob = self.bucket.blob(f"indices/{filename}")
                blob.upload_from_filename(filename)
                print(f"[VectorStore] SUCCESSFULLY UPLOADED brain to GCS: indices/{filename}")
            except Exception as e:
                print(f"[VectorStore] GCS Upload Failed for {filename}: {e}")

    def add_documents(self, user_id: str, class_id: str, chunks):
        print(f"[VectorStore] Embedding {len(chunks)} chunks for {user_id}/{class_id}...")
        try:
            # Create Embeddings (with gemini)
            result = client.models.embed_content(
                model="gemini-embedding-001",
                contents=chunks,
                config={'output_dimensionality': 768}
            )
            vectors = np.array([e.values for e in result.embeddings])
            
            # SAVE to disk and cloud
            self._save_state(user_id, class_id, chunks, vectors)
        except Exception as e:
            print(f"[VectorStore] Embedding Error: {e}")

    def append_documents(self, user_id: str, class_id: str, chunks):
        if not chunks:
            return
        print(f"[VectorStore] Appending {len(chunks)} chunks to vector store for {user_id}/{class_id}...")
        try:
            documents, vectors = self._load_state(user_id, class_id)
            
            # Create Embeddings for new chunks (with gemini)
            result = client.models.embed_content(
                model="gemini-embedding-001",
                contents=chunks,
                config={'output_dimensionality': 768}
            )
            new_vectors = np.array([e.values for e in result.embeddings])
            
            # Append documents
            documents.extend(chunks)
            
            # Concatenate vectors
            if vectors is None:
                vectors = new_vectors
            else:
                vectors = np.vstack([vectors, new_vectors])
            
            # SAVE to disk and cloud
            self._save_state(user_id, class_id, documents, vectors)
            print(f"[VectorStore] Successfully appended and saved. Total documents: {len(documents)}")
        except Exception as e:
            print(f"[VectorStore] Append Embedding Error: {e}")

    def search(self, user_id: str, class_id: str, query, top_k=3):
        documents, vectors = self._load_state(user_id, class_id)
        if vectors is None or len(documents) == 0:
            print(f"[VectorStore] Memory is empty for {user_id}/{class_id}! Did you upload a PDF?")
            return []

        # Embed query
        q_result = client.models.embed_content(
            model="gemini-embedding-001",
            contents=query,
            config={'output_dimensionality': 768}
        )
        query_vector = np.array([q_result.embeddings[0].values])

        # Calculate Similarity
        similarities = cosine_similarity(query_vector, vectors)[0]
        
        # Get top results
        top_indices = similarities.argsort()[-top_k:][::-1]
        results = [documents[idx] for idx in top_indices]
        return results

    def delete_state(self, user_id: str, class_id: str):
        filename = self._get_filename(user_id, class_id)
        # Delete from GCS
        if self.bucket:
            try:
                blob = self.bucket.blob(f"indices/{filename}")
                if blob.exists():
                    blob.delete()
                    print(f"[VectorStore] Deleted Brain in Cloud: indices/{filename}")
            except Exception as e:
                print(f"[VectorStore] GCS Delete failed for {filename}: {e}")
        # Delete from disk
        if os.path.exists(filename):
            try:
                os.remove(filename)
                print(f"[VectorStore] Deleted local file: {filename}")
            except Exception as e:
                print(f"[VectorStore] Local Delete failed for {filename}: {e}")

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

class ConceptModel(BaseModel):
    name: str = Field(description="Concept or Topic Name")
    prerequisites: List[str] = Field(description="Names of other topics that are prerequisites to this one")

class WeekModel(BaseModel):
    number: int = Field(description="Week number (e.g. 1, 2, 3...)")
    topics: List[str] = Field(description="List of topic/concept names scheduled/covered in this week")
    exams: List[str] = Field(description="List of exam or test names scheduled in this week, or empty list if none")

class SyllabusResponseModel(BaseModel):
    concepts: List[ConceptModel] = Field(description="The graph of concepts and their prerequisites")
    weeks: List[WeekModel] = Field(description="The weekly schedule of the course")
    recommended_study_days: List[int] = Field(description="Recommended study days of the week as integers (0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday). E.g. [1, 3, 5] for Mon/Wed/Fri.")
    recommended_daily_pace_minutes: int = Field(description="Recommended daily study pace in minutes (e.g. 30, 45, 60).")


class TutorService(ace_pb2_grpc.TutorServiceServicer):
    def __init__(self):
        print("[Python] Connecting to Graph Database...")
        try:
            self.driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
            self.driver.verify_connectivity()
        except Exception as e:
            print(f"[Python] WARNING: Neo4j Connection FAILED. Setting driver to None. Error: {e}")
            self.driver = None

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
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        class_name = request.class_name if request.class_name else "Default Class"
        print(f"[Python] Processing syllabus for class {class_name} ({class_id}): {request.file_name}")
        
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
        vector_store.add_documents(user_id, class_id, chunks)

        # 3. EXTRACT GRAPH & WEEKLY SCHEDULE (If Neo4j is alive)
        concepts = []
        weeks = []
        rec_days = [1, 3, 5]
        rec_pace = 45
        if self.driver:
            print("[Python] Extracting graph and schedule with Gemini...")
            prompt = f"""
            Analyze the following syllabus text. Extract:
            1. The knowledge graph of concepts/topics covered in the course, along with any prerequisite relationships between them.
            2. The weekly schedule (calendar timeline), mapping week numbers to topics covered in that week, and noting any exams/tests scheduled for that week.
            
            Syllabus Text:
            {full_text[:50000]}
            """
            try:
                response = self._generate_with_retry(
                    model_name='gemini-2.5-flash-lite',
                    contents=prompt,
                    config={
                        'response_mime_type': 'application/json',
                        'response_schema': SyllabusResponseModel
                    }
                )
                data = json.loads(response.text)
                concepts = data.get("concepts", [])
                weeks = data.get("weeks", [])
                rec_days = data.get("recommended_study_days", [1, 3, 5])
                rec_pace = data.get("recommended_daily_pace_minutes", 45)
                print(f"[Python] Extracted {len(concepts)} concepts, {len(weeks)} weeks, recommended study days {rec_days}, pace {rec_pace}.")
                
                # Write to Neo4j
                with self.driver.session() as session:
                    session.execute_write(self._create_dynamic_nodes, user_id, class_id, class_name, concepts, weeks)
                    
                    # Store syllabus file as a viewable material node linked to Week 1
                    session.run("""
                        MERGE (u:User {id: $user_id})
                        MERGE (c:Class {id: $class_id})
                        ON CREATE SET c.name = $class_name
                        MERGE (u)-[:ENROLLED_IN]->(c)
                        
                        MERGE (w:Week {number: 1, class_id: $class_id, user_id: $user_id})
                        MERGE (c)-[:HAS_SYLLABUS]->(w)
                        
                        MERGE (t:Topic {name: "Syllabus Overview", class_id: $class_id, user_id: $user_id})
                        MERGE (w)-[:SCHEDULED_FOR]->(t)
                        
                        MERGE (m:Material {name: $material_id, class_id: $class_id, user_id: $user_id})
                        ON CREATE SET m.filename = $filename,
                                      m.content = $content,
                                      m.created_at = timestamp()
                        ON MATCH SET m.content = $content
                        
                        MERGE (m)-[:SOURCE_MATERIAL_FOR]->(t)
                    """, 
                    user_id=user_id,
                    class_id=class_id,
                    class_name=class_name,
                    material_id=f"syllabus_{class_id}",
                    filename=request.file_name,
                    content=full_text)
            except Exception as e:
                print(f"[Python] Graph/Schedule Logic Error: {e}")
        else:
            print("[Python] Skipping Graph/Schedule Extraction (DB Down)")

        return ace_pb2.SyllabusResponse(
            success=True,
            message=f"Processed {request.file_name}",
            nodes_created=len(concepts),
            graph_json=json.dumps(concepts),
            recommended_study_days=rec_days,
            recommended_daily_pace_minutes=rec_pace
        )


    def _query_graph_context(self, user_id, class_id, user_text):
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
            MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:COVERS]->(n:Topic {user_id: $user_id, class_id: $class_id})
            WHERE toLower($text) CONTAINS toLower(n.name)
            
            // Get things pointing TO this node (Prerequisites)
            OPTIONAL MATCH (p:Topic {user_id: $user_id, class_id: $class_id})-[:PREREQUISITE_TO]->(n)
            
            // Get things this node points TO (Future topics)
            OPTIONAL MATCH (n)-[:PREREQUISITE_TO]->(f:Topic {user_id: $user_id, class_id: $class_id})
            
            RETURN n.name as topic, 
                   collect(DISTINCT p.name) as prereqs, 
                   collect(DISTINCT f.name) as future
            LIMIT 3
            """
            result = session.run(query, user_id=user_id, class_id=class_id, text=user_text)
            
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
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] Chat Question for {user_id}/{class_id}: {request.message}")
        
        # SOURCE 1: Vector Search (The "Index")
        # Finds paragraphs from the PDF text
        relevant_chunks = vector_store.search(user_id, class_id, request.message)
        vector_text = "\n\n".join(relevant_chunks)
        if not vector_text:
            vector_text = "No direct text matches found."

        # SOURCE 2: Graph Search (The "Table of Contents")
        # Finds relationships from Neo4j
        graph_text = self._query_graph_context(user_id, class_id, request.message)
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] SubmitQuizResult for user {request.user_id} on topic {request.topic_name} with score {request.score} in class {class_id}")
        success = analytical_memory.write_quiz_score(
            user_id=request.user_id,
            class_id=class_id,
            topic_name=request.topic_name,
            score=request.score
        )
        if success:
            return ace_pb2.QuizResultResponse(success=True, message="Quiz result successfully stored in BigQuery.")
        else:
            return ace_pb2.QuizResultResponse(success=False, message="Failed to store quiz result in BigQuery.")

    def GetQuizScores(self, request, context):
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GetQuizScores requested for user {request.user_id} and class {class_id}")
        records = analytical_memory.read_quiz_scores(user_id=request.user_id, class_id=class_id)
        
        scores_pb = []
        for r in records:
            scores_pb.append(ace_pb2.QuizScoreRecord(
                user_id=r["user_id"],
                class_id=r.get("class_id", class_id),
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GenerateAdaptiveQuiz for user {request.user_id} and class {class_id}")
        
        # 1. Fetch topics covered by this syllabus from Neo4j
        topics = []
        if self.driver:
            try:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:COVERS]->(t:Topic {user_id: $user_id, class_id: $class_id})
                    RETURN t.name as topic
                    """
                    result = session.run(query, user_id=request.user_id, class_id=class_id)
                    topics = [record["topic"] for record in result]
            except Exception as e:
                print(f"[Python] Error fetching topics from Neo4j: {e}")

        # 2. Fetch user's performance history from BigQuery
        performance_history = []
        try:
            performance_history = analytical_memory.read_quiz_scores(request.user_id, class_id)
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
        class_id = request.class_id if request.class_id else "default_class"
        class_name = request.class_name if request.class_name else "Default Class"
        print(f"[Python] IngestMaterial for topic '{request.topic_name}' under week '{request.week_number}' for user '{request.user_id}' and class '{class_id}'...")
        try:
            import zipfile
            import xml.etree.ElementTree as ET
            
            content = request.raw_text
            if request.file_data and request.file_name:
                filename = request.file_name.lower()
                if filename.endswith(".pdf"):
                    try:
                        reader = PdfReader(io.BytesIO(request.file_data))
                        pdf_text = ""
                        for page in reader.pages:
                            pdf_text += page.extract_text() + "\n"
                        content = pdf_text
                        print(f"[Python] Extracted {len(content)} characters from PDF: {request.file_name}")
                    except Exception as pdf_err:
                        print(f"[Python] Failed to extract text from PDF: {pdf_err}")
                elif filename.endswith(".pptx") or filename.endswith(".ppt"):
                    try:
                        print(f"[Python] Extracting text from presentation {request.file_name} using Gemini...")
                        mime_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation" if filename.endswith(".pptx") else "application/vnd.ms-powerpoint"
                        
                        prompt = "You are a document transcription assistant. Extract all readable text, slide titles, bullet points, and content from the provided presentation slides. Output only the extracted educational text content, organized slide-by-slide. Do not include introductory notes, meta commentary, or explanations."
                        
                        from google.genai import types as genai_types
                        response = client.models.generate_content(
                            model='gemini-2.5-flash',
                            contents=[
                                genai_types.Part.from_bytes(
                                    data=request.file_data,
                                    mime_type=mime_type,
                                ),
                                prompt
                            ]
                        )
                        content = response.text
                        print(f"[Python] Successfully extracted {len(content)} characters from {request.file_name} using Gemini.")
                    except Exception as gemini_err:
                        print(f"[Python] Gemini presentation extraction failed: {gemini_err}. Trying local zip/XML parser if PPTX...")
                        if filename.endswith(".pptx"):
                            try:
                                text_runs = []
                                with zipfile.ZipFile(io.BytesIO(request.file_data)) as z:
                                    slide_files = sorted([f for f in z.namelist() if f.startswith("ppt/slides/slide") and f.endswith(".xml")])
                                    for slide_file in slide_files:
                                        slide_xml = z.read(slide_file)
                                        root = ET.fromstring(slide_xml)
                                        namespaces = {
                                            'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                                            'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'
                                        }
                                        for t in root.findall('.//a:t', namespaces):
                                            if t.text:
                                                text_runs.append(t.text)
                                content = "\n".join(text_runs)
                                print(f"[Python] Extracted {len(content)} characters from PPTX locally.")
                            except Exception as pptx_err:
                                print(f"[Python] Failed local PPTX extraction: {pptx_err}")
                else:
                    try:
                        content = request.file_data.decode("utf-8")
                    except Exception:
                        try:
                            content = request.file_data.decode("latin-1")
                        except Exception:
                            pass

            if request.file_data and request.file_name and (not content or not content.strip()):
                return ace_pb2.IngestResponse(
                    success=False, 
                    message=f"Failed to extract text from {request.file_name}. If you are uploading a .ppt file, please convert it to .pptx or PDF format first, as old .ppt binary files are not supported."
                )

            import ingestion_service
            success = ingestion_service.ingest_material(
                content=content,
                topic_name=request.topic_name,
                week_number=str(request.week_number),
                user_id=request.user_id,
                class_id=class_id,
                class_name=class_name,
                filename=request.file_name if request.file_name else ""
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GenerateQuiz for week '{request.week_number}', question count '{request.question_count}' for user '{request.user_id}', class '{class_id}', weak topics {weak_topics_list}...")
        try:
            current_topics = []
            prev_weak_topics = []
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
                            MATCH (w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                            RETURN t.name AS topic_name, w.number AS week_number, m.chunks AS chunks
                            """
                            result = session.run(query, user_id=request.user_id, class_id=class_id)
                        else:
                            query = """
                            MATCH (w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                            WHERE t.name IN $weak_topics
                            RETURN t.name AS topic_name, w.number AS week_number, m.chunks AS chunks
                            """
                            result = session.run(query, user_id=request.user_id, class_id=class_id, weak_topics=weak_topics_list)
                    else:
                        query = """
                        MATCH (w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                        WHERE (w.number = $week_number) OR (t.name IN $weak_topics)
                        RETURN t.name AS topic_name, w.number AS week_number, m.chunks AS chunks
                        """
                        result = session.run(query, week_number=request.week_number, user_id=request.user_id, class_id=class_id, weak_topics=weak_topics_list)
                    
                    for record in result:
                        tname = record.get("topic_name")
                        wnum = record.get("week_number")
                        if tname:
                            if tname not in topic_names:
                                topic_names.append(tname)
                            if wnum == request.week_number:
                                if tname not in current_topics:
                                    current_topics.append(tname)
                            else:
                                if tname not in prev_weak_topics:
                                    prev_weak_topics.append(tname)
                        rec_chunks = record.get("chunks")
                        if rec_chunks:
                            if isinstance(rec_chunks, list):
                                chunks.extend(rec_chunks)
                            else:
                                chunks.append(str(rec_chunks))
            
            topics_str = ", ".join(topic_names) if topic_names else "Unknown"
            context_chunks = "\n\n".join(chunks) if chunks else "No direct course text chunks."
            print(f"[Python] GenerateQuiz: Retrieved topics '{topics_str}' with {len(chunks)} chunks.")
            
            if len(chunks) == 0:
                print(f"[Python] GenerateQuiz: No materials found. Aborting Gemini API call.")
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details("NO_MATERIALS_FOUND")
                return ace_pb2.QuizResponse()
            
            # --- PERSISTENCE: READ STEP ---
            saved_content = None
            if not request.regenerate and request.week_number != -1 and self.driver:
                with self.driver.session() as session:
                    read_query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})-[:HAS_CONTENT]->(g:GeneratedContent {type: 'quiz', user_id: $user_id, class_id: $class_id})
                    WHERE w.number = $week_number
                    RETURN g.questions_json AS questions_json
                    LIMIT 1
                    """
                    read_res = session.run(read_query, user_id=request.user_id, class_id=class_id, week_number=request.week_number)
                    record = read_res.single()
                    if record:
                        saved_content = {
                            "questions_json": record.get("questions_json")
                        }

            if saved_content:
                print(f"[Python] Returning saved quiz content for week {request.week_number}...")
                try:
                    questions_list = json.loads(saved_content["questions_json"])
                except Exception:
                    questions_list = []
                grpc_questions = []
                for q in questions_list:
                    grpc_questions.append(
                        ace_pb2.Question(
                            id=q.get("id", ""),
                            question_text=q.get("question_text", ""),
                            options=list(q.get("options", [])),
                            correct_option_index=q.get("correct_option_index", 0)
                        )
                    )
                return ace_pb2.QuizResponse(questions=grpc_questions)
            
            attempts = 0
            max_retries = 3
            correction_instruction = ""

            while attempts < max_retries:
                attempts += 1
                print(f"[Python] GenerateQuiz attempt {attempts}...")

                # Construct prompt for LLM with split focus
                if request.week_number != -1:
                    focus_instruction = f"""
                    The quiz must test a mixture of:
                    1. Current Week {request.week_number} topics (more focus on these): {', '.join(current_topics) if current_topics else 'None'}
                    2. Previous weak/struggling topics (lower focus): {', '.join(prev_weak_topics) if prev_weak_topics else 'None'}
                    
                    CRITICAL: Place more focus on the current week's topics. Approximately 70% of the quiz questions should cover current week's topics, and 30% should cover previous weak topics.
                    """
                else:
                    focus_instruction = f"The quiz should test the following topics: {topics_str}."

                prompt = f"""
                You are a helpful teaching assistant.
                Generate a quiz containing exactly {request.question_count} multiple choice questions.
                
                {focus_instruction}
                
                Here are the source material text chunks to base the questions on:
                {context_chunks}
                
                Generate a set of {request.question_count} questions. For each question, make sure:
                1. It has exactly 4 options.
                2. The options are clear and plausible.
                3. The correct_option_index is a 0-based index pointing to the correct answer in the options list.
                4. The id is a unique identifier string (e.g. "q1", "q2", etc.).
                """
                
                # --- REGENERATION STEP: APPEND PROMPT ---
                if request.regeneration_prompt:
                    prompt += f"\n\nUSER REGENERATION INSTRUCTION: Please adapt the generation according to this instruction: '{request.regeneration_prompt}'."
                
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

                # Step 3: If Judge passed, save to DB and return
                if judge_result.get("passed"):
                    # --- PERSISTENCE: WRITE STEP ---
                    if self.driver and topic_names and request.week_number != -1:
                        primary_topic = topic_names[0]
                        with self.driver.session() as session:
                            write_query = """
                            MATCH (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                            MERGE (t)-[:HAS_CONTENT]->(g:GeneratedContent {type: 'quiz', user_id: $user_id, class_id: $class_id})
                            SET g.questions_json = $questions_json,
                                g.updated_at = timestamp()
                            """
                            questions_list = []
                            for q in grpc_questions:
                                questions_list.append({
                                    "id": q.id,
                                    "question_text": q.question_text,
                                    "options": list(q.options),
                                    "correct_option_index": q.correct_option_index
                                })
                            session.run(
                                write_query,
                                topic_name=primary_topic,
                                user_id=request.user_id,
                                class_id=class_id,
                                questions_json=json.dumps(questions_list)
                            )
                            print(f"[Python] Saved quiz content in Neo4j attached to topic '{primary_topic}'")
                    
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GenerateCramSession for user '{request.user_id}' under class '{class_id}' from Week {request.start_week} to {request.end_week}, weak topics {weak_topics_list}...")
        try:
            topic_names = []
            chunks = []
            
            # Neo4j Range Query with isolation
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                    WHERE w.number >= $start_week AND w.number <= $end_week
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, start_week=request.start_week, end_week=request.end_week, user_id=request.user_id, class_id=class_id)
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GenerateLesson for week '{request.week_number}' for user '{request.user_id}', class '{class_id}'...")
        try:
            topic_names = []
            chunks = []
            
            # Neo4j query with isolation
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                    WHERE w.number = $week_number
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, week_number=request.week_number, user_id=request.user_id, class_id=class_id)
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
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GenerateLessonAndExercises for week '{request.week_number}' for user '{request.user_id}', class '{class_id}'...")
        try:
            topic_names = []
            chunks = []
            
            # 1. Query Neo4j for target week's chunks
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})<-[:SOURCE_MATERIAL_FOR]-(m:Material {user_id: $user_id, class_id: $class_id})
                    WHERE w.number = $week_number
                    RETURN t.name AS topic_name, m.chunks AS chunks
                    """
                    result = session.run(query, week_number=request.week_number, user_id=request.user_id, class_id=class_id)
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
                bq_scores = analytical_memory.read_quiz_scores(request.user_id, class_id)
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
            
            if len(chunks) == 0:
                print(f"[Python] GenerateLessonAndExercises: No materials found. Aborting Gemini API call.")
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details("NO_MATERIALS_FOUND")
                return ace_pb2.LessonResponse(insufficient_materials=True)
                
            is_insufficient, _, _ = self._check_sufficiency(request.user_id, class_id, request.week_number)
            
            # --- PERSISTENCE: READ STEP ---
            saved_content = None
            if not request.regenerate and self.driver:
                with self.driver.session() as session:
                    read_query = """
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})-[:HAS_SYLLABUS]->(w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})-[:HAS_CONTENT]->(g:GeneratedContent {type: 'lesson', user_id: $user_id, class_id: $class_id})
                    WHERE w.number = $week_number
                    RETURN g.lesson_markdown AS lesson_markdown, g.exercises_json AS exercises_json
                    LIMIT 1
                    """
                    read_res = session.run(read_query, user_id=request.user_id, class_id=class_id, week_number=request.week_number)
                    record = read_res.single()
                    if record:
                        saved_content = {
                            "lesson_markdown": record.get("lesson_markdown"),
                            "exercises_json": record.get("exercises_json")
                        }

            if saved_content:
                print(f"[Python] Returning saved lesson content for week {request.week_number}...")
                try:
                    exercises_list = json.loads(saved_content["exercises_json"])
                except Exception:
                    exercises_list = []
                grpc_exercises = []
                for e in exercises_list:
                    grpc_exercises.append(
                        ace_pb2.Question(
                            id=e.get("id", ""),
                            question_text=e.get("question_text", ""),
                            options=list(e.get("options", [])),
                            correct_option_index=e.get("correct_option_index", 0)
                        )
                    )
                return ace_pb2.LessonResponse(
                    lesson_markdown=saved_content["lesson_markdown"],
                    exercises=grpc_exercises,
                    insufficient_materials=is_insufficient
                )
            
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
                
                # --- REGENERATION STEP: APPEND PROMPT ---
                if request.regeneration_prompt:
                    prompt += f"\n\nUSER REGENERATION INSTRUCTION: Please adapt the generation according to this instruction: '{request.regeneration_prompt}'."
                
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
                    
                    # --- PERSISTENCE: WRITE STEP ---
                    if self.driver and topic_names:
                        primary_topic = topic_names[0]
                        with self.driver.session() as session:
                            write_query = """
                            MATCH (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                            MERGE (t)-[:HAS_CONTENT]->(g:GeneratedContent {type: 'lesson', user_id: $user_id, class_id: $class_id})
                            SET g.lesson_markdown = $lesson_markdown,
                                g.exercises_json = $exercises_json,
                                g.updated_at = timestamp()
                            """
                            exercises_list = []
                            for e in lesson_data.exercises:
                                exercises_list.append({
                                    "id": e.id,
                                    "question_text": e.question_text,
                                    "options": list(e.options),
                                    "correct_option_index": e.correct_option_index
                                })
                            session.run(
                                write_query,
                                topic_name=primary_topic,
                                user_id=request.user_id,
                                class_id=class_id,
                                lesson_markdown=lesson_data.lesson_markdown,
                                exercises_json=json.dumps(exercises_list)
                            )
                            print(f"[Python] Saved lesson content in Neo4j attached to topic '{primary_topic}'")
                    
                    return ace_pb2.LessonResponse(
                        lesson_markdown=lesson_data.lesson_markdown,
                        exercises=grpc_exercises,
                        insufficient_materials=is_insufficient
                    )
                
                reasoning = judge_result.get("reasoning", "hallucinations or outside info included")
                correction_instruction = f"Previous attempt failed because: {reasoning}. Fix this. Make sure everything is accurate and derived correctly."
                
            print(f"[Python] GenerateLessonAndExercises failed all {max_retries} attempts. Returning error.")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to generate factually accurate lesson and exercises after 3 attempts.")
            return ace_pb2.LessonResponse(insufficient_materials=is_insufficient)

            
        except Exception as e:
            print(f"[Python] GenerateLessonAndExercises Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to generate lesson: {str(e)}")
            insuf = is_insufficient if 'is_insufficient' in locals() else True
            return ace_pb2.LessonResponse(insufficient_materials=insuf)
    
    
    
    @staticmethod
    def _create_dynamic_nodes(tx, user_id, class_id, class_name, concepts, weeks=None):
        tx.run("""
            MERGE (u:User {id: $user_id})
            MERGE (c:Class {id: $class_id})
            ON CREATE SET c.name = $class_name
            MERGE (u)-[:ENROLLED_IN]->(c)
        """, user_id=user_id, class_id=class_id, class_name=class_name)
        
        for concept in concepts:
            # concept could be a dict or ConceptModel object (Gemini SDK returns parsed Pydantic objects or dicts depending on genai config)
            if hasattr(concept, 'name'):
                name = concept.name
                prereqs = concept.prerequisites or []
            else:
                name = concept.get('name')
                prereqs = concept.get('prerequisites', [])
                
            tx.run("""
                MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})
                MERGE (t:Topic {name: $name, user_id: $user_id, class_id: $class_id})
                MERGE (c)-[:COVERS]->(t)
            """, user_id=user_id, class_id=class_id, name=name)
            for p_name in prereqs:
                tx.run("""
                    MATCH (u:User {id: $user_id})-[:ENROLLED_IN]->(c:Class {id: $class_id})
                    MERGE (t:Topic {name: $name, user_id: $user_id, class_id: $class_id})
                    MERGE (p:Topic {name: $p_name, user_id: $user_id, class_id: $class_id})
                    MERGE (c)-[:COVERS]->(p)
                    MERGE (p)-[:PREREQUISITE_TO]->(t)
                """, user_id=user_id, class_id=class_id, name=name, p_name=p_name)
        
        if weeks:
            for w in weeks:
                if hasattr(w, 'number'):
                    w_num = w.number
                    w_topics = w.topics or []
                    w_exams = w.exams or []
                else:
                    w_num = w.get('number')
                    w_topics = w.get('topics', [])
                    w_exams = w.get('exams', [])
                
                # 1. MERGE Week node
                tx.run("""
                    MERGE (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})
                    ON CREATE SET w.exams = $w_exams
                    ON MATCH SET w.exams = $w_exams
                """, user_id=user_id, class_id=class_id, w_num=w_num, w_exams=w_exams)
                
                # 2. Link Class -> Week
                tx.run("""
                    MATCH (c:Class {id: $class_id})
                    MATCH (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})
                    MERGE (c)-[:HAS_SYLLABUS]->(w)
                """, class_id=class_id, user_id=user_id, w_num=w_num)
                
                # 3. Link Week -> Topic
                for topic_name in w_topics:
                    tx.run("""
                        MERGE (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                    """, user_id=user_id, class_id=class_id, topic_name=topic_name)
                    
                    tx.run("""
                        MATCH (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})
                        MATCH (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                        MERGE (w)-[:SCHEDULED_FOR]->(t)
                    """, user_id=user_id, class_id=class_id, w_num=w_num, topic_name=topic_name)


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

    def _check_sufficiency(self, user_id, class_id, week_number):
        insufficient_topics = []
        all_topics = []
        if self.driver:
            with self.driver.session() as session:
                if week_number == 0:
                    query = """
                    MATCH (w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})
                    OPTIONAL MATCH (m:Material {user_id: $user_id, class_id: $class_id})-[:SOURCE_MATERIAL_FOR]->(t)
                    RETURN w.number AS week_num, t.name AS topic_name, collect(m.content) AS contents
                    ORDER BY w.number, t.name
                    """
                    result = session.run(query, user_id=user_id, class_id=class_id)
                    for record in result:
                        wnum = record.get("week_num")
                        tname = record.get("topic_name")
                        if wnum is not None and tname:
                            formatted = f"{wnum}:{tname}"
                            if formatted not in all_topics:
                                all_topics.append(formatted)
                            contents = record.get("contents") or []
                            total_len = sum(len(c) for c in contents if c is not None)
                            if total_len < 1000:
                                insufficient_topics.append(formatted)
                else:
                    query = """
                    MATCH (w:Week {user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})
                    WHERE w.number = $week_number
                    OPTIONAL MATCH (m:Material {user_id: $user_id, class_id: $class_id})-[:SOURCE_MATERIAL_FOR]->(t)
                    RETURN t.name AS topic_name, collect(m.content) AS contents
                    """
                    result = session.run(query, week_number=week_number, user_id=user_id, class_id=class_id)
                    for record in result:
                        tname = record.get("topic_name")
                        if tname:
                            if tname not in all_topics:
                                all_topics.append(tname)
                            contents = record.get("contents") or []
                            total_len = sum(len(c) for c in contents if c is not None)
                            if total_len < 1000:
                                insufficient_topics.append(tname)
        return len(insufficient_topics) > 0, insufficient_topics, all_topics

    def CheckTopicSufficiency(self, request, context):
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] CheckTopicSufficiency for week '{request.week_number}', user '{request.user_id}', class '{class_id}'...")
        try:
            is_insufficient, insufficient_topics, all_topics = self._check_sufficiency(request.user_id, class_id, request.week_number)
            print(f"[Python] CheckTopicSufficiency result: insufficient_materials={is_insufficient}, insufficient_topics={insufficient_topics}, all_topics={all_topics}")
            return ace_pb2.SufficiencyResponse(
                insufficient_materials=is_insufficient,
                insufficient_topics=insufficient_topics,
                all_topics=all_topics
            )
        except Exception as e:
            print(f"[Python] CheckTopicSufficiency Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to check topic sufficiency: {str(e)}")
            return ace_pb2.SufficiencyResponse(insufficient_materials=True, insufficient_topics=[], all_topics=[])

    def _delete_class_nodes(self, tx, user_id, class_id):
        # 1. Delete GeneratedContent nodes
        tx.run("""
            MATCH (g:GeneratedContent)
            WHERE g.user_id = $user_id AND g.class_id = $class_id
            DETACH DELETE g
        """, user_id=user_id, class_id=class_id)
        
        # 2. Delete Material nodes
        tx.run("""
            MATCH (m:Material)
            WHERE m.user_id = $user_id AND m.class_id = $class_id
            DETACH DELETE m
        """, user_id=user_id, class_id=class_id)
        
        # 3. Delete Topic nodes
        tx.run("""
            MATCH (t:Topic)
            WHERE t.user_id = $user_id AND t.class_id = $class_id
            DETACH DELETE t
        """, user_id=user_id, class_id=class_id)

        # 4. Delete Week nodes
        tx.run("""
            MATCH (w:Week)
            WHERE w.user_id = $user_id AND w.class_id = $class_id
            DETACH DELETE w
        """, user_id=user_id, class_id=class_id)

        # 5. Delete ENROLLED_IN relationship
        tx.run("""
            MATCH (u:User {id: $user_id})-[r:ENROLLED_IN]->(c:Class {id: $class_id})
            DELETE r
        """, user_id=user_id, class_id=class_id)

        # 6. Delete Class node itself if no other ENROLLED_IN exists
        tx.run("""
            MATCH (c:Class {id: $class_id})
            WHERE NOT (c)<-[:ENROLLED_IN]-()
            DETACH DELETE c
        """, class_id=class_id)

    def DeleteClass(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] DeleteClass for user {user_id} and class {class_id}")
        try:
            # Delete Neo4j nodes
            if self.driver:
                with self.driver.session() as session:
                    session.execute_write(self._delete_class_nodes, user_id, class_id)
            
            # Delete Vector Store
            vector_store.delete_state(user_id, class_id)
            
            return ace_pb2.DeleteClassResponse(success=True, message=f"Class {class_id} deleted successfully.")
        except Exception as e:
            print(f"[Python] DeleteClass Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to delete class: {str(e)}")
            return ace_pb2.DeleteClassResponse(success=False, message=str(e))

    def ResetWeekProgress(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        week_number = request.week_number
        print(f"[Python] ResetWeekProgress for user {user_id}, class {class_id}, week {week_number}")
        try:
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (w:Week {number: $week_number, user_id: $user_id, class_id: $class_id})-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})-[:HAS_CONTENT]->(g:GeneratedContent {user_id: $user_id, class_id: $class_id})
                    DETACH DELETE g
                    """
                    session.run(query, user_id=user_id, class_id=class_id, week_number=week_number)
            return ace_pb2.ResetWeekProgressResponse(success=True, message=f"Week {week_number} progress reset in Neo4j successfully.")
        except Exception as e:
            print(f"[Python] ResetWeekProgress Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to reset week progress: {str(e)}")
            return ace_pb2.ResetWeekProgressResponse(success=False, message=str(e))

    def _get_syllabus_nodes(self, tx, user_id, class_id):
        query = """
        MATCH (w:Week {user_id: $user_id, class_id: $class_id})
        OPTIONAL MATCH (w)-[:SCHEDULED_FOR]->(t:Topic {user_id: $user_id, class_id: $class_id})
        RETURN w.number AS week_num, collect(t.name) AS topics
        ORDER BY w.number
        """
        result = tx.run(query, user_id=user_id, class_id=class_id)
        return [(record.get("week_num"), record.get("topics") or []) for record in result]

    def _get_class_graph(self, tx, user_id, class_id):
        query = """
        MATCH (c:Class {id: $class_id})-[:COVERS]->(t:Topic {user_id: $user_id, class_id: $class_id})
        OPTIONAL MATCH (p:Topic {user_id: $user_id, class_id: $class_id})-[:PREREQUISITE_TO]->(t)
        RETURN t.name AS name, collect(p.name) AS prerequisites
        """
        result = tx.run(query, user_id=user_id, class_id=class_id)
        concepts = []
        for record in result:
            name = record.get("name")
            prereqs = record.get("prerequisites") or []
            prereqs = [p for p in prereqs if p]
            concepts.append({
                "name": name,
                "prerequisites": prereqs
            })
        return concepts

    def GetSyllabus(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GetSyllabus for user {user_id} and class {class_id}")
        try:
            weeks_pb = []
            graph_json = ""
            if self.driver:
                with self.driver.session() as session:
                    records = session.execute_read(self._get_syllabus_nodes, user_id, class_id)
                    for week_num, topics in records:
                        weeks_pb.append(ace_pb2.WeekTopics(
                            week_number=int(week_num),
                            topics=topics
                        ))
                    concepts = session.execute_read(self._get_class_graph, user_id, class_id)
                    graph_json = json.dumps(concepts)
            return ace_pb2.GetSyllabusResponse(
                weeks=weeks_pb, 
                success=True, 
                message="Syllabus retrieved successfully.",
                graph_json=graph_json
            )
        except Exception as e:
            print(f"[Python] GetSyllabus Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to get syllabus: {str(e)}")
            return ace_pb2.GetSyllabusResponse(success=False, message=str(e))

    def _edit_syllabus_nodes(self, tx, user_id, class_id, weeks):
        for w in weeks:
            w_num = w.week_number
            w_topics = w.topics
            
            # 1. Ensure Week node exists and link to Class
            tx.run("""
                MERGE (c:Class {id: $class_id})
                MERGE (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})
                MERGE (c)-[:HAS_SYLLABUS]->(w)
            """, class_id=class_id, user_id=user_id, w_num=w_num)
            
            # 2. Delete all existing SCHEDULED_FOR relationships for this week
            tx.run("""
                MATCH (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})-[r:SCHEDULED_FOR]->(t:Topic)
                DELETE r
            """, user_id=user_id, class_id=class_id, w_num=w_num)
            
            # 3. Create or Merge new Topics and link to Week & Class
            for topic_name in w_topics:
                tx.run("""
                    MERGE (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                """, user_id=user_id, class_id=class_id, topic_name=topic_name)
                
                tx.run("""
                    MATCH (c:Class {id: $class_id})
                    MATCH (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                    MERGE (c)-[:COVERS]->(t)
                """, class_id=class_id, user_id=user_id, topic_name=topic_name)
                
                tx.run("""
                    MATCH (w:Week {number: $w_num, user_id: $user_id, class_id: $class_id})
                    MATCH (t:Topic {name: $topic_name, user_id: $user_id, class_id: $class_id})
                    MERGE (w)-[:SCHEDULED_FOR]->(t)
                """, user_id=user_id, class_id=class_id, w_num=w_num, topic_name=topic_name)
        
        # 4. Clean up orphaned topics for this user and class
        tx.run("""
            MATCH (t:Topic {user_id: $user_id, class_id: $class_id})
            WHERE NOT (t)<-[:SCHEDULED_FOR]-()
            DETACH DELETE t
        """, user_id=user_id, class_id=class_id)

    def EditSyllabus(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] EditSyllabus for user {user_id} and class {class_id}")
        try:
            if self.driver:
                with self.driver.session() as session:
                    session.execute_write(self._edit_syllabus_nodes, user_id, class_id, request.weeks)
            return ace_pb2.EditSyllabusResponse(success=True, message="Syllabus updated successfully.")
        except Exception as e:
            print(f"[Python] EditSyllabus Exception: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(f"Failed to edit syllabus: {str(e)}")
            return ace_pb2.EditSyllabusResponse(success=False, message=str(e))

    def GetMaterials(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        print(f"[Python] GetMaterials for user {user_id} and class {class_id}")
        try:
            materials_list = []
            if self.driver:
                with self.driver.session() as session:
                    query = """
                    MATCH (m:Material {class_id: $class_id, user_id: $user_id})-[:SOURCE_MATERIAL_FOR]->(t:Topic)
                    OPTIONAL MATCH (w:Week {class_id: $class_id, user_id: $user_id})-[:SCHEDULED_FOR]->(t)
                    RETURN m.name AS material_id, 
                           m.filename AS filename, 
                           t.name AS topic_name, 
                           w.number AS week_number, 
                           m.content AS content, 
                           m.created_at AS created_at
                    ORDER BY m.created_at DESC
                    """
                    result = session.run(query, user_id=user_id, class_id=class_id)
                    for record in result:
                        created_val = record["created_at"]
                        created_str = ""
                        if created_val:
                            import datetime
                            try:
                                created_str = datetime.datetime.fromtimestamp(created_val / 1000.0, datetime.timezone.utc).isoformat()
                            except Exception:
                                created_str = str(created_val)
                        
                        materials_list.append(ace_pb2.MaterialInfo(
                            material_id=record["material_id"] or "",
                            filename=record["filename"] or record["material_id"] or "",
                            topic_name=record["topic_name"] or "",
                            week_number=int(record["week_number"]) if record["week_number"] is not None else 0,
                            content=record["content"] or "",
                            created_at=created_str
                        ))
            return ace_pb2.GetMaterialsResponse(materials=materials_list, success=True, message="Materials retrieved successfully.")
        except Exception as e:
            print(f"[Python] GetMaterials Exception: {e}")
            return ace_pb2.GetMaterialsResponse(success=False, message=str(e))

    def DeleteMaterial(self, request, context):
        user_id = request.user_id if request.user_id else "default_user"
        class_id = request.class_id if request.class_id else "default_class"
        material_id = request.material_id
        print(f"[Python] DeleteMaterial for user {user_id}, class {class_id}, material {material_id}")
        try:
            if not self.driver:
                return ace_pb2.DeleteMaterialResponse(success=False, message="Database driver not initialized")
            
            with self.driver.session() as session:
                # 1. Delete the Material node from Neo4j (and any of its relationships)
                delete_query = """
                MATCH (m:Material {name: $material_id, class_id: $class_id, user_id: $user_id})
                DETACH DELETE m
                """
                session.run(delete_query, material_id=material_id, class_id=class_id, user_id=user_id)
                
                # 2. Query remaining Materials to reconstruct the vector store
                remaining_query = """
                MATCH (m:Material {class_id: $class_id, user_id: $user_id})
                RETURN m.content AS content
                """
                result = session.run(remaining_query, class_id=class_id, user_id=user_id)
                all_chunks = []
                for record in result:
                    content = record["content"]
                    if content:
                        chunks = [content[i:i+1000] for i in range(0, len(content), 1000)]
                        all_chunks.extend(chunks)
                
                # 3. Overwrite the vector store.
                if not all_chunks:
                    print(f"[Python] No materials left for {user_id}/{class_id}. Deleting vector store index.")
                    vector_store.delete_state(user_id, class_id)
                else:
                    print(f"[Python] Rebuilding vector store for {user_id}/{class_id} with {len(all_chunks)} chunks.")
                    vector_store.add_documents(user_id, class_id, all_chunks)
                    
            return ace_pb2.DeleteMaterialResponse(success=True, message="Material deleted and vector store synchronized successfully.")
        except Exception as e:
            print(f"[Python] DeleteMaterial Exception: {e}")
            return ace_pb2.DeleteMaterialResponse(success=False, message=str(e))

    def ParseDocument(self, request, context):
        print(f"[Python] ParseDocument for file '{request.file_name}'...")
        try:
            filename = request.file_name.lower()
            parsed_text = ""
            if filename.endswith(".pdf"):
                try:
                    import io
                    reader = PdfReader(io.BytesIO(request.file_data))
                    pdf_text = ""
                    for page in reader.pages:
                        pdf_text += page.extract_text() + "\n"
                    parsed_text = pdf_text
                    print(f"[Python] ParseDocument: Extracted {len(parsed_text)} chars from PDF.")
                except Exception as pdf_err:
                    print(f"[Python] ParseDocument PDF extraction failed: {pdf_err}")
                    return ace_pb2.ParseDocumentResponse(success=False, message=f"Failed to parse PDF: {str(pdf_err)}")
            elif filename.endswith(".pptx") or filename.endswith(".ppt"):
                try:
                    import io
                    mime_type = "application/vnd.openxmlformats-officedocument.presentationml.presentation" if filename.endswith(".pptx") else "application/vnd.ms-powerpoint"
                    prompt = "You are a document transcription assistant. Extract all readable text, slide titles, bullet points, and content from the provided presentation slides. Output only the extracted educational text content, organized slide-by-slide. Do not include introductory notes, meta commentary, or explanations."
                    from google.genai import types as genai_types
                    response = client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=[
                            genai_types.Part.from_bytes(
                                data=request.file_data,
                                mime_type=mime_type,
                            ),
                            prompt
                        ]
                    )
                    parsed_text = response.text
                    print(f"[Python] ParseDocument: Extracted {len(parsed_text)} chars from PPT using Gemini.")
                except Exception as ppt_err:
                    print(f"[Python] ParseDocument PPT extraction failed: {ppt_err}")
                    if filename.endswith(".pptx"):
                        try:
                            import zipfile
                            import xml.etree.ElementTree as ET
                            text_runs = []
                            with zipfile.ZipFile(io.BytesIO(request.file_data)) as z:
                                slide_files = sorted([f for f in z.namelist() if f.startswith("ppt/slides/slide") and f.endswith(".xml")])
                                for slide_file in slide_files:
                                    slide_xml = z.read(slide_file)
                                    root = ET.fromstring(slide_xml)
                                    namespaces = {
                                        'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                                        'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'
                                    }
                                    for t in root.findall('.//a:t', namespaces):
                                        if t.text:
                                            text_runs.append(t.text)
                            parsed_text = "\n".join(text_runs)
                            print(f"[Python] ParseDocument: Extracted {len(parsed_text)} chars from PPTX locally.")
                        except Exception as local_err:
                            return ace_pb2.ParseDocumentResponse(success=False, message=f"Failed to parse PPTX: {str(ppt_err)} (Local fallback also failed: {str(local_err)})")
                    else:
                        return ace_pb2.ParseDocumentResponse(success=False, message=f"Failed to parse PPT: {str(ppt_err)}")
            else:
                try:
                    parsed_text = request.file_data.decode("utf-8")
                except Exception:
                    try:
                        parsed_text = request.file_data.decode("latin-1")
                    except Exception:
                        return ace_pb2.ParseDocumentResponse(success=False, message="Could not decode text file.")
            
            return ace_pb2.ParseDocumentResponse(parsed_text=parsed_text, success=True, message="Document parsed successfully.")
        except Exception as e:
            print(f"[Python] ParseDocument exception: {e}")
            return ace_pb2.ParseDocumentResponse(success=False, message=str(e))

def serve():
    # 1. Get the port from the environment (Google sets this)
    # Default to 50051 only if we are running locally
    port = os.environ.get('PORT', '50051')
    
    options = [
        ('grpc.max_receive_message_length', 100 * 1024 * 1024),
        ('grpc.max_send_message_length', 100 * 1024 * 1024)
    ]
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10), options=options)
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