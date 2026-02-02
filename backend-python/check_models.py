from google import genai
import os

# PASTE YOUR KEY HERE DIRECTLY FOR THE TEST
client = genai.Client(api_key="AIzaSyDXLu1bUeeat_TXW_ZMYaiaHG-CWRV8wXM")

print("Checking available models...")
try:
    # List all models available to your API key
    for m in client.models.list():
        if "generateContent" in m.supported_actions:
            print(f"- {m.name}")
            
except Exception as e:
    print(f"Error: {e}")