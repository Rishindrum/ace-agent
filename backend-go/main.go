package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	pb "ace-agent/backend-go/proto"

	"github.com/gorilla/websocket"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// Global gRPC client
var tutorClient pb.TutorServiceClient

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	// Allow Angular (localhost:4200) to talk to us
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 1. Parse File
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		http.Error(w, "File too big", http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Invalid file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// 2. Read Bytes
	fileBytes := make([]byte, header.Size)
	_, err = file.Read(fileBytes)
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusInternalServerError)
		return
	}

	// 3. Call Python
	req := &pb.SyllabusRequest{
		FileName: header.Filename,
		FileData: fileBytes,
	}

	resp, err := tutorClient.ProcessSyllabus(context.Background(), req)

	// --- FIX START: HANDLE PYTHON ERRORS ---
	if err != nil {
		log.Printf("[Error] Python Brain failed: %v", err)
		http.Error(w, "AI Brain Error: "+err.Error(), http.StatusInternalServerError)
		return // <--- STOP HERE so we don't crash
	}

	if resp == nil {
		log.Printf("[Error] Received nil response from Python")
		http.Error(w, "AI returned no data", http.StatusInternalServerError)
		return
	}
	// --- FIX END ---

	// 4. Send JSON back to Angular
	w.Header().Set("Content-Type", "application/json")

	var graphData []interface{}
	if resp.GraphJson != "" {
		// Safe to unmarshal now because we checked resp != nil
		json.Unmarshal([]byte(resp.GraphJson), &graphData)
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": resp.Message,
		"nodes":   resp.NodesCreated,
		"graph":   graphData,
		"status":  "success",
	})
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Upgrade HTTP to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("[Error] WebSocket Upgrade Failed: %v", err)
		return
	}
	defer conn.Close()

	log.Println("[Go] Client connected to Chat")

	for {
		// 2. Read Message from Angular
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Printf("[Go] Client disconnected: %v", err)
			break
		}

		log.Printf("[Go] Received: %s", msg)

		// 3. Call Python Brain (gRPC)
		// Create a context with a timeout so it doesn't hang forever
		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)

		grpcReq := &pb.ChatRequest{Message: string(msg)}
		resp, err := tutorClient.Chat(ctx, grpcReq)
		cancel() // Clean up context

		var reply string
		if err != nil {
			log.Printf("[Error] gRPC to Brain failed: %v", err)
			reply = "I'm having trouble reaching my brain right now."
		} else {
			reply = resp.Response
		}

		// 4. Write Response back to Angular
		if err := conn.WriteMessage(websocket.TextMessage, []byte(reply)); err != nil {
			log.Printf("[Error] Write to Client failed: %v", err)
			break
		}
	}
}

func main() {
	tutorAddr := os.Getenv("TUTOR_SERVICE_ADDR")
	if tutorAddr == "" {
		tutorAddr = "localhost:50051"
	}

	log.Printf("[Go] Connecting to Brain at: %s", tutorAddr)

	// --- THE FIX IS HERE ---
	// FORCE INSECURE. Do not use "Smart Switches". Do not use TLS.
	var opts []grpc.DialOption
	opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))

	conn, err := grpc.Dial(tutorAddr, opts...)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	tutorClient = pb.NewTutorServiceClient(conn)

	// Start Server
	mux := http.NewServeMux()
	mux.HandleFunc("/upload", uploadHandler)
	mux.HandleFunc("/ws", wsHandler)

	fmt.Println("[Go] Gateway running on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
