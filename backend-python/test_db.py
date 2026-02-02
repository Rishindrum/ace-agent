from neo4j import GraphDatabase
import sys

# REPLACE THESE WITH YOUR EXACT CREDENTIALS
URI = "neo4j+s://961ec8b5.databases.neo4j.io"
USER = "neo4j"
PASSWORD = "_PH52Nlyr7AfWYQVsY-DLe3zfmuqT1FSecSzVC8uuHI"

print(f"Testing connection to: {URI}")

try:
    # 1. Initialize Driver
    driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))
    
    # 2. Verify Connectivity (The handshake)
    driver.verify_connectivity()
    print("✅ Connection Successful! The database is reachable.")
    
    # 3. close
    driver.close()

except Exception as e:
    print("\n❌ CONNECTION FAILED")
    print(f"Error: {e}")
    print("\nTroubleshooting:")
    print("1. Did you use 'neo4j+s://'?")
    print("2. Is the database 'Paused' in the Neo4j Console?")
    print("3. Are you on a VPN/Firewall blocking port 7687?")