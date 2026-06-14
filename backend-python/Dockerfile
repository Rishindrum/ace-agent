# Use an official Python runtime
FROM python:3.11-slim

# Install system dependencies (e.g. libgomp1 for scikit-learn wheel support on slim)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the port Python runs on
EXPOSE 50051

# Run the application (Make sure to force unbuffered logs!)
CMD ["python", "-u", "tutor_service.py"]