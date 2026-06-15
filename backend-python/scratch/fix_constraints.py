import os
import sys
from neo4j import GraphDatabase

# Load environment variables from .env if present in the parent directory
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", ".env")
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
    if not NEO4J_PASSWORD:
        raise ValueError("NEO4J_PASSWORD environment variable is not set.")
    return GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def fix_constraints():
    driver = get_driver()
    with driver.session() as session:
        # Drop old constraints if they exist
        drop_queries = [
            "DROP CONSTRAINT week_name_unique IF EXISTS",
            "DROP CONSTRAINT topic_name_unique IF EXISTS",
            "DROP CONSTRAINT material_name_unique IF EXISTS"
        ]
        for query in drop_queries:
            try:
                print(f"Executing: {query}")
                session.run(query)
            except Exception as e:
                print(f"Failed to drop constraint: {e}")

        # Create new composite constraints if desired, or let it be flexible
        # In newer Neo4j versions, we can require uniqueness on multiple properties
        create_queries = [
            "CREATE CONSTRAINT week_identity_unique IF NOT EXISTS FOR (w:Week) REQUIRE (w.user_id, w.class_id, w.number) IS UNIQUE",
            "CREATE CONSTRAINT topic_identity_unique IF NOT EXISTS FOR (t:Topic) REQUIRE (t.user_id, t.class_id, t.name) IS UNIQUE",
            "CREATE CONSTRAINT material_identity_unique IF NOT EXISTS FOR (m:Material) REQUIRE (m.user_id, m.class_id, m.name) IS UNIQUE"
        ]
        for query in create_queries:
            try:
                print(f"Executing: {query}")
                session.run(query)
            except Exception as e:
                print(f"Failed to create constraint: {e}")

        # Show current constraints
        print("\n--- Current constraints ---")
        try:
            result = session.run("SHOW CONSTRAINTS")
            for record in result:
                print(f"Name: {record.get('name')}, Type: {record.get('type')}, EntityType: {record.get('entityType')}, Labels: {record.get('labelsOrTypes')}, Properties: {record.get('properties')}")
        except Exception as e:
            print(f"Failed to show constraints: {e}")

    driver.close()

if __name__ == "__main__":
    fix_constraints()
