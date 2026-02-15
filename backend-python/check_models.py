from google import genai
import os


GEMINI_API_KEY = "AIzaSyB0EFVRE65_OLadbFq6F9LRHGmezKcbAPE"
client = genai.Client(api_key=GEMINI_API_KEY)

print("Checking available models...")
try:
    # List all models available to your API key
    for m in client.models.list():
        if "generateContent" in m.supported_actions:
            print(f"- {m.name}")
            
except Exception as e:
    print(f"Error: {e}")