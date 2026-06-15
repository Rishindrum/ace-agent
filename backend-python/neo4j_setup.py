import os
import sys
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

NEO4J_URI = os.getenv("NEO4J_URI", "neo4j+s://961ec8b5.databases.neo4j.io")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

def get_driver():
    """Returns an initialized Neo4j driver instance using env credentials."""
    if not NEO4J_PASSWORD:
        raise ValueError("NEO4J_PASSWORD environment variable is not set. Ensure it is defined in your environment or .env file.")
    return GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def create_constraints():
    """
    Creates uniqueness constraints on composite properties for Week, Topic, and Material node labels.
    Uses 'IF NOT EXISTS' to ensure idempotency.
    """
    print("[Neo4j Setup] Creating Uniqueness Constraints...")
    driver = get_driver()
    
    # First drop old global constraints if they exist
    drop_queries = [
        "DROP CONSTRAINT week_name_unique IF EXISTS",
        "DROP CONSTRAINT topic_name_unique IF EXISTS",
        "DROP CONSTRAINT material_name_unique IF EXISTS"
    ]
    
    constraints = [
        "CREATE CONSTRAINT week_identity_unique IF NOT EXISTS FOR (w:Week) REQUIRE (w.user_id, w.class_id, w.number) IS UNIQUE",
        "CREATE CONSTRAINT topic_identity_unique IF NOT EXISTS FOR (t:Topic) REQUIRE (t.user_id, t.class_id, t.name) IS UNIQUE",
        "CREATE CONSTRAINT material_identity_unique IF NOT EXISTS FOR (m:Material) REQUIRE (m.user_id, m.class_id, m.name) IS UNIQUE"
    ]
    
    with driver.session() as session:
        for query in drop_queries:
            try:
                session.run(query)
            except Exception as e:
                print(f"Failed to drop constraint: {e}")
        for query in constraints:
            try:
                print(f"Executing: {query}")
                session.run(query)
            except Exception as e:
                print(f"Failed to create constraint: {e}")
                
    driver.close()
    print("[Neo4j Setup] Uniqueness constraints created successfully.")

def seed_test_data():
    """
    Seeds a chronological educational schema:
    - 'Week 1' is linked to 'Linear Algebra' Topic via a SCHEDULED_FOR edge.
    - 'Linear Algebra' Topic is linked to 'Calculus' Topic via a REQUIRES edge.
    - 'Matrix_Slides.pdf' Material is linked to 'Linear Algebra' Topic via a SOURCE_MATERIAL_FOR edge.
    """
    print("[Neo4j Setup] Seeding hierarchical test data...")
    driver = get_driver()
    
    queries = [
        # 1. Create nodes using MERGE for idempotency
        "MERGE (w:Week {name: 'Week 1', number: 1})",
        "MERGE (t1:Topic {name: 'Linear Algebra'})",
        "MERGE (t2:Topic {name: 'Calculus'})",
        "MERGE (m:Material {name: 'Matrix_Slides.pdf'})",
        
        # 2. Connect 'Week 1' -[:SCHEDULED_FOR]-> 'Linear Algebra'
        """
        MATCH (w:Week {name: 'Week 1'}), (t:Topic {name: 'Linear Algebra'})
        MERGE (w)-[:SCHEDULED_FOR]->(t)
        """,
        
        # 3. Connect 'Linear Algebra' -[:REQUIRES]-> 'Calculus'
        """
        MATCH (t1:Topic {name: 'Linear Algebra'}), (t2:Topic {name: 'Calculus'})
        MERGE (t1)-[:REQUIRES]->(t2)
        """,
        
        # 4. Connect 'Matrix_Slides.pdf' -[:SOURCE_MATERIAL_FOR]-> 'Linear Algebra'
        """
        MATCH (m:Material {name: 'Matrix_Slides.pdf'}), (t:Topic {name: 'Linear Algebra'})
        MERGE (m)-[:SOURCE_MATERIAL_FOR]->(t)
        """
    ]
    
    with driver.session() as session:
        for query in queries:
            try:
                session.run(query)
            except Exception as e:
                print(f"Error executing Cypher query: {e}")
                
    driver.close()
    print("[Neo4j Setup] Hierarchical test data seeded successfully.")

if __name__ == "__main__":
    print("Neo4j Schema Setup and Seeding Script starting...")
    try:
        create_constraints()
        seed_test_data()
        print("[Neo4j Setup] Setup complete!")
    except Exception as e:
        print(f"[Neo4j Setup] Setup failed: {e}", file=sys.stderr)
