# --- STAGE 1: THE BUILDER ---
# We start with the official Go image (contains compiler, tools, etc.)
FROM golang:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (for caching)
# This way, if you change code but not dependencies, Docker skips downloading them again.
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the source code
COPY . .

# Build the application
# -o main: Name the output file 'main'
# . : Build everything in the current directory
RUN go build -o main .

# --- STAGE 2: THE RUNNER ---
# We switch to 'Alpine', a super lightweight Linux (only ~5MB)
FROM alpine:latest

WORKDIR /root/

# Copy only the compiled binary from the 'builder' stage
COPY --from=builder /app/main .

# Expose port 8080 (Matches your Go code)
EXPOSE 8080

# Command to run when the container starts
CMD ["./main"]