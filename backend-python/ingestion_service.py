import os
import time
from neo4j import GraphDatabase

# Load environment variables from .env if present in the parent directory
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")
if os.path.exists(env_path):
    with open(env_path, "r") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, val = line.split("=", 1)
                os.environ[key.strip()] = val.strip()

from tutor_service import vector_store

NEO4J_URI = os.getenv("NEO4J_URI", "neo4j+s://961ec8b5.databases.neo4j.io")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

def get_driver():
    """Returns an initialized Neo4j driver using env credentials."""
    if not NEO4J_PASSWORD:
        raise ValueError("NEO4J_PASSWORD environment variable is not set. Ensure it is defined in your environment or .env file.")
    return GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def resolve_topic(raw_text: str, topic_name: str) -> str:
    """
    Uses the Gemini API to analyze raw text and the user-provided topic name
    and resolve it to a standardized, concise topic string.
    """
    print(f"[IngestionService] Resolving topic '{topic_name}' using Gemini LLM...")
    prompt = f"""
    Analyze the provided raw text content and the suggested topic name.
    Suggest a standardized, concise, and clean topic name (typically 2-4 words, capitalized) 
    that represents the core subject of the text.
    
    Suggested Topic Name: {topic_name}
    Raw Text Content: {raw_text[:2000]}
    
    Respond with ONLY the standardized topic name string (e.g. 'Linear Algebra', 'Calculus'). 
    Do not include any conversational filler, quotes, formatting, or explanations.
    """
    try:
        from tutor_service import client
        response = client.models.generate_content(
            model='gemini-2.5-flash-lite',
            contents=prompt
        )
        resolved = response.text.strip().replace('"', '').replace("'", "")
        if resolved:
            print(f"[IngestionService] LLM resolved topic: '{topic_name}' -> '{resolved}'")
            return resolved
    except Exception as e:
        print(f"[IngestionService] LLM topic resolution failed: {e}. Falling back to default.")
    
    return topic_name.strip()

def ingest_material(content: str, topic_name: str, week_number: int) -> bool:
    """
    Ingests text content for a specific topic and week:
    1. Resolves the topic name to a standardized string using Gemini.
    2. Chunks the text content.
    3. Computes and appends the vector embeddings to the NumPy vector store.
    4. Merges the Week and Topic nodes in Neo4j, ensuring they are connected.
    5. Creates a new Material node and links it using a SOURCE_MATERIAL_FOR edge.
    
    Args:
        content: The raw text content to ingest.
        topic_name: Name of the syllabus Topic (e.g., "Linear Algebra").
        week_number: The week number (e.g., 1).
        
    Returns:
        bool: True if ingestion was successful, False otherwise.
    """
    print(f"[IngestionService] Starting ingestion for topic '{topic_name}' under Week '{week_number}'...")
    
    # 1. LLM Resolution step to get a standardized topic string
    resolved_topic = resolve_topic(content, topic_name)
    
    # 2. Normalize week identifier (e.g., 1 -> "Week 1")
    week_num = int(week_number)
    week_name = f"Week {week_num}"

    # 3. Chunk text content (~1000 characters per chunk)
    chunks = [content[i:i+1000] for i in range(0, len(content), 1000)]
    if not chunks:
        print("[IngestionService] Error: Provided content is empty.")
        return False

    # 4. Add chunks to our custom NumPy Vector Store configuration
    try:
        vector_store.append_documents(chunks)
    except Exception as e:
        print(f"[IngestionService] Embedding/Vector Store update failed: {e}")
        return False

    # 5. Connect and query Neo4j database to link the material
    driver = None
    try:
        driver = get_driver()
        material_name = f"Material_{resolved_topic.replace(' ', '_')}_{week_name.replace(' ', '_')}_{int(time.time())}"
        
        # Cypher: MERGE Week and Topic nodes, connect them, then CREATE Material node
        query = """
        MERGE (w:Week {number: $week_number})
        ON CREATE SET w.name = $week_name
        
        MERGE (t:Topic {name: $topic_name})
        MERGE (w)-[:SCHEDULED_FOR]->(t)
        
        CREATE (m:Material {name: $material_name})
        SET m.content = $content,
            m.chunks = $chunks,
            m.created_at = timestamp()
            
        MERGE (m)-[:SOURCE_MATERIAL_FOR]->(t)
        RETURN t.name as topic, m.name as material
        """
        
        with driver.session() as session:
            result = session.run(
                query,
                week_name=week_name,
                week_number=week_num,
                topic_name=resolved_topic,
                material_name=material_name,
                content=content,
                chunks=chunks
            )
            record = result.single()
            if not record:
                print("[IngestionService] Error: Neo4j Cypher execution failed to return record.")
                return False
                
            print(f"[IngestionService] Success! Created Material node '{record['material']}' and linked to Topic '{record['topic']}'.")
            return True
            
    except Exception as e:
        print(f"[IngestionService] Neo4j graph update failed: {e}")
        return False
    finally:
        if driver:
            driver.close()
