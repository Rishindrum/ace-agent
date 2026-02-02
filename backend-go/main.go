package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"google.golang.org/grpc/credentials"

	pb "ace-agent/backend-go/proto"

	"github.com/gorilla/websocket"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

// Global gRPC client
var tutorClient pb.TutorServiceClient

// --- NEW FUNCTION: GLOBAL CORS MIDDLEWARE ---
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 1. Allow any origin (Solved your error)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// 2. Allow all common methods
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		// 3. Allow ALL standard headers (This fixes the "0 Unknown Error")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// 4. Handle Preflight OPTIONS request
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	// (You can delete the manual header lines here since the middleware handles it now)

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

	if err != nil {
		log.Printf("[Error] Python Brain failed: %v", err)
		http.Error(w, "AI Brain Error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	if resp == nil {
		log.Printf("[Error] Received nil response from Python")
		http.Error(w, "AI returned no data", http.StatusInternalServerError)
		return
	}

	// 4. Send JSON back to Angular
	w.Header().Set("Content-Type", "application/json")

	var graphData []interface{}
	if resp.GraphJson != "" {
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
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("[Error] WebSocket Upgrade Failed: %v", err)
		return
	}
	defer conn.Close()

	log.Println("[Go] Client connected to Chat")

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Printf("[Go] Client disconnected: %v", err)
			break
		}

		log.Printf("[Go] Received: %s", msg)

		ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)

		grpcReq := &pb.ChatRequest{Message: string(msg)}
		resp, err := tutorClient.Chat(ctx, grpcReq)
		cancel()

		var reply string
		if err != nil {
			log.Printf("[Error] gRPC to Brain failed: %v", err)
			reply = "I'm having trouble reaching my brain right now."
		} else {
			reply = resp.Response
		}

		if err := conn.WriteMessage(websocket.TextMessage, []byte(reply)); err != nil {
			log.Printf("[Error] Write to Client failed: %v", err)
			break
		}
	}
}

func main() {
	// A. Connect to Python gRPC Service
	tutorAddr := os.Getenv("TUTOR_SERVICE_ADDR")
	if tutorAddr == "" {
		tutorAddr = "localhost:50051"
	}

	var opts []grpc.DialOption

	if strings.Contains(tutorAddr, "localhost") {
		log.Println("[Go] Using INSECURE connection (Localhost)")
		opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
	} else {
		log.Println("[Go] Using SECURE connection (Cloud)")
		creds := credentials.NewTLS(&tls.Config{})
		opts = append(opts, grpc.WithTransportCredentials(creds))

		if !strings.Contains(tutorAddr, ":") {
			tutorAddr = tutorAddr + ":443"
		}
	}

	log.Printf("[Go] Connecting to Brain at: %s", tutorAddr)
	conn, err := grpc.Dial(tutorAddr, opts...)
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	tutorClient = pb.NewTutorServiceClient(conn)

	// B. Start HTTP Server for Angular
	mux := http.NewServeMux()
	mux.HandleFunc("/upload", uploadHandler)
	mux.HandleFunc("/ws", wsHandler)

	fmt.Println("[Go] Gateway running on :8080")

	if err := http.ListenAndServe(":8080", enableCORS(mux)); err != nil {
		log.Fatal(err)
	}
}
