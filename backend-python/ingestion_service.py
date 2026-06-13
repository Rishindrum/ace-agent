import os
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

def ingest_material(content: str, topic_name: str, week_number: str) -> bool:
    """
    Ingests text content for a specific topic and week:
    1. Chunks the text content.
    2. Computes and appends the vector embeddings to the NumPy vector store.
    3. Finds the existing Topic node for the week in Neo4j.
    4. Creates a new Material node and links it using a SOURCE_MATERIAL_FOR edge.
    
    Args:
        content: The raw text content to ingest.
        topic_name: Name of the syllabus Topic (e.g., "Linear Algebra").
        week_number: The week number (e.g., "1" or "Week 1").
        
    Returns:
        bool: True if ingestion was successful, False otherwise.
    """
    print(f"[IngestionService] Starting ingestion for topic '{topic_name}' under Week '{week_number}'...")
    
    # 1. Normalize week identifier (e.g., "1" -> "Week 1")
    week_str = str(week_number).strip()
    if not week_str.lower().startswith("week"):
        week_name = f"Week {week_str}"
    else:
        week_name = week_str

    # 2. Chunk text content (~1000 characters per chunk)
    chunks = [content[i:i+1000] for i in range(0, len(content), 1000)]
    if not chunks:
        print("[IngestionService] Error: Provided content is empty.")
        return False

    # 3. Add chunks to our custom NumPy Vector Store configuration
    try:
        vector_store.append_documents(chunks)
    except Exception as e:
        print(f"[IngestionService] Embedding/Vector Store update failed: {e}")
        return False

    # 4. Connect and query Neo4j database to link the material
    driver = None
    try:
        driver = get_driver()
        material_name = f"Material_{topic_name.replace(' ', '_')}_{week_name.replace(' ', '_')}"
        
        # Cypher: Locate the scheduled topic and merge the material node & relationship
        query = """
        MATCH (w:Week {name: $week_name})-[:SCHEDULED_FOR]->(t:Topic {name: $topic_name})
        MERGE (m:Material {name: $material_name})
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
                topic_name=topic_name,
                material_name=material_name,
                content=content,
                chunks=chunks
            )
            record = result.single()
            if not record:
                print(f"[IngestionService] Warning: Could not find matching Topic '{topic_name}' scheduled for '{week_name}'. Ensure topic exists in Neo4j.")
                return False
                
            print(f"[IngestionService] Success! Created Material node '{record['material']}' and linked to Topic '{record['topic']}'.")
            return True
            
    except Exception as e:
        print(f"[IngestionService] Neo4j graph update failed: {e}")
        return False
    finally:
        if driver:
            driver.close()
