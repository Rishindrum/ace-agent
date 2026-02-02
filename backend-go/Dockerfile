# Use official Golang image to build the binary
FROM golang:1.25 AS builder
WORKDIR /app

# Copy module files and download deps
COPY go.mod go.sum ./
RUN go mod download

# Copy source code and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o ace-gateway main.go

# --- Final Stage (Small Image) ---
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/ace-gateway .

# Expose the port Go runs on
EXPOSE 8080

# Run the binary
CMD ["./ace-gateway"]