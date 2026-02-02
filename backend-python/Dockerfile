# 1. Use an official lightweight Python runtime
FROM python:3.11-slim

# 2. Set the working directory to /app
WORKDIR /app

# 3. Copy the dependency list FIRST
# (This allows Docker to cache the installed libraries so rebuilds are fast)
COPY requirements.txt .

# 4. Install dependencies
# --no-cache-dir keeps the image smaller
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of your application code
COPY . .

# 6. Open the port for gRPC
EXPOSE 50051

# 7. Run the Python Service
# We use -u (unbuffered) so logs show up in the terminal instantly
CMD ["python", "-u", "tutor_service.py"]