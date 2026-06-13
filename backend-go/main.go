package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"
	"strings"

	pb "ace-agent/backend-go/proto"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/option"
	"github.com/google/uuid"
	"github.com/gorilla/websocket"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/credentials"
)

// Global clients
var tutorClient pb.TutorServiceClient
var bqClient *bigquery.Client
var bqTable *bigquery.Table

// Telemetry Data Schema
type QuizAttemptTelemetry struct {
	AttemptID       string    `bigquery:"attempt_id"`
	WeekNumber      int       `bigquery:"week_number"`
	TotalQuestions  int       `bigquery:"total_questions"`
	CorrectAnswers  int       `bigquery:"correct_answers"`
	ScorePercentage float64   `bigquery:"score_percentage"`
	Timestamp       time.Time `bigquery:"timestamp"`
}

// Implement bigquery.ValueSaver interface
func (q *QuizAttemptTelemetry) Save() (map[string]bigquery.Value, string, error) {
	return map[string]bigquery.Value{
		"attempt_id":       q.AttemptID,
		"week_number":      q.WeekNumber,
		"total_questions":  q.TotalQuestions,
		"correct_answers":  q.CorrectAnswers,
		"score_percentage": q.ScorePercentage,
		"timestamp":        q.Timestamp,
	}, q.AttemptID, nil // Using AttemptID as the deduplication insertID
}

// Background BigQuery initialization
func initBigQuery() {
	ctx := context.Background()
	var opts []option.ClientOption

	// Try to find key.json in current directory or parent directory for local run credentials
	if _, err := os.Stat("key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("key.json"))
		log.Println("[BigQuery] Found key.json in current directory")
	} else if _, err := os.Stat("../key.json"); err == nil {
		opts = append(opts, option.WithCredentialsFile("../key.json"))
		log.Println("[BigQuery] Found key.json in parent directory")
	}

	// Always use ace-agent-demo as the project ID
	projectID := "ace-agent-demo"
	client, err := bigquery.NewClient(ctx, projectID, opts...)
	if err != nil {
		log.Printf("[BigQuery] Failed to create client: %v", err)
		return
	}
	bqClient = client
	log.Printf("[BigQuery] Client initialized successfully for project: %s", projectID)

	// Dataset and table reference
	dataset := bqClient.Dataset("ace_analytics")
	bqTable = dataset.Table("quiz_attempts")

	// Ensure dataset exists, create if not
	if err := dataset.Create(ctx, &bigquery.DatasetMetadata{Location: "US"}); err != nil {
		if !hasAlreadyExistsError(err) {
			log.Printf("[BigQuery] Failed to create dataset: %v", err)
			return
		}
		log.Println("[BigQuery] Dataset ace_analytics already exists")
	} else {
		log.Println("[BigQuery] Dataset ace_analytics created successfully")
	}

	// Define table schema
	schema := bigquery.Schema{
		{Name: "attempt_id", Type: bigquery.StringFieldType, Required: true},
		{Name: "week_number", Type: bigquery.IntegerFieldType, Required: true},
		{Name: "total_questions", Type: bigquery.IntegerFieldType, Required: true},
		{Name: "correct_answers", Type: bigquery.IntegerFieldType, Required: true},
		{Name: "score_percentage", Type: bigquery.FloatFieldType, Required: true},
		{Name: "timestamp", Type: bigquery.TimestampFieldType, Required: true},
	}

	// Ensure table exists, create if not
	if err := bqTable.Create(ctx, &bigquery.TableMetadata{
		Schema: schema,
	}); err != nil {
		if !hasAlreadyExistsError(err) {
			log.Printf("[BigQuery] Failed to create table: %v", err)
			return
		}
		log.Println("[BigQuery] Table quiz_attempts already exists")
	} else {
		log.Println("[BigQuery] Table quiz_attempts created successfully")
	}
}

func hasAlreadyExistsError(err error) bool {
	return strings.Contains(strings.ToLower(err.Error()), "alreadyexists") ||
		strings.Contains(strings.ToLower(err.Error()), "duplicate") ||
		strings.Contains(strings.ToLower(err.Error()), "409")
}

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

func submitQuizResultHandler(w http.ResponseWriter, r *http.Request) {
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

	var req struct {
		UserID    string `json:"user_id"`
		TopicName string `json:"topic_name"`
		Score     int32  `json:"score"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	grpcReq := &pb.QuizResultRequest{
		UserId:    req.UserID,
		TopicName: req.TopicName,
		Score:     req.Score,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	resp, err := tutorClient.SubmitQuizResult(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] SubmitQuizResult gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func getQuizScoresHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}

	grpcReq := &pb.GetQuizScoresRequest{
		UserId: userID,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	resp, err := tutorClient.GetQuizScores(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GetQuizScores gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

func generateAdaptiveQuizHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := r.URL.Query().Get("user_id")
	syllabusName := r.URL.Query().Get("syllabus_name")
	if userID == "" || syllabusName == "" {
		http.Error(w, "Missing user_id or syllabus_name parameter", http.StatusBadRequest)
		return
	}

	grpcReq := &pb.AdaptiveQuizRequest{
		UserId:       userID,
		SyllabusName: syllabusName,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	resp, err := tutorClient.GenerateAdaptiveQuiz(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GenerateAdaptiveQuiz gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(resp.QuizJson))
}

func ingestMaterialHandler(w http.ResponseWriter, r *http.Request) {
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

	var req struct {
		WeekNumber int32  `json:"week_number"`
		TopicName  string `json:"topic_name"`
		RawText    string `json:"raw_text"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	grpcReq := &pb.IngestRequest{
		WeekNumber: req.WeekNumber,
		TopicName:  req.TopicName,
		RawText:    req.RawText,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	resp, err := tutorClient.IngestMaterial(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] IngestMaterial gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

type QuestionJSON struct {
	ID                 string   `json:"id"`
	QuestionText       string   `json:"questionText"`
	Options            []string `json:"options"`
	CorrectOptionIndex int32    `json:"correctOptionIndex"`
}

func generateQuizHandler(w http.ResponseWriter, r *http.Request) {
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

	var req struct {
		WeekNumber    int32 `json:"week_number"`
		QuestionCount int32 `json:"question_count"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	grpcReq := &pb.QuizRequest{
		WeekNumber:    req.WeekNumber,
		QuestionCount: req.QuestionCount,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	resp, err := tutorClient.GenerateQuiz(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GenerateQuiz gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	questions := make([]QuestionJSON, 0, len(resp.Questions))
	for _, q := range resp.Questions {
		questions = append(questions, QuestionJSON{
			ID:                 q.Id,
			QuestionText:       q.QuestionText,
			Options:            q.Options,
			CorrectOptionIndex: q.CorrectOptionIndex,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(questions)
}

func submitQuizTelemetryHandler(w http.ResponseWriter, r *http.Request) {
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

	type QuestionChoice struct {
		ID                 string `json:"id"`
		SelectedOptionIndex int    `json:"selected_option_index"`
		CorrectOptionIndex  int    `json:"correct_option_index"`
	}

	var req struct {
		WeekNumber int              `json:"week_number"`
		Questions  []QuestionChoice `json:"questions"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	totalQuestions := len(req.Questions)
	if totalQuestions == 0 {
		http.Error(w, "No questions provided", http.StatusBadRequest)
		return
	}

	correctAnswers := 0
	for _, q := range req.Questions {
		if q.SelectedOptionIndex == q.CorrectOptionIndex {
			correctAnswers++
		}
	}

	scorePercentage := (float64(correctAnswers) / float64(totalQuestions)) * 100.0
	attemptID := uuid.New().String()

	telemetry := &QuizAttemptTelemetry{
		AttemptID:       attemptID,
		WeekNumber:      req.WeekNumber,
		TotalQuestions:  totalQuestions,
		CorrectAnswers:  correctAnswers,
		ScorePercentage: scorePercentage,
		Timestamp:       time.Now(),
	}

	if bqTable != nil {
		go func(row *QuizAttemptTelemetry) {
			ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
			defer cancel()

			uploader := bqTable.Uploader()
			if err := uploader.Put(ctx, row); err != nil {
				log.Printf("[BigQuery] Failed to stream telemetry row: %v", err)
			} else {
				log.Printf("[BigQuery] Successfully streamed telemetry row for attempt: %s", row.AttemptID)
			}
		}(telemetry)
	} else {
		log.Println("[BigQuery] Table reference is nil. Skipping telemetry insert.")
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"score":           correctAnswers,
		"total_questions": totalQuestions,
		"percentage":      scorePercentage,
		"confirmed":       true,
	})
}

func main() {
	// Start BigQuery initialization in background
	go initBigQuery()

	tutorAddr := os.Getenv("PYTHON_SERVICE_URL")
    if tutorAddr == "" {
        tutorAddr = "localhost:50051"
    }

    // 1. Strip the protocol
    tutorAddr = strings.Replace(tutorAddr, "https://", "", 1)
    tutorAddr = strings.Replace(tutorAddr, "http://", "", 1)

    // 2. Cloud Run gRPC logic
    var opts []grpc.DialOption
    
    if strings.Contains(tutorAddr, "run.app") {
        // IN THE CLOUD: We need to use "NewClient" and the correct transport credentials
        // Cloud Run expects TLS (443) but we must use system certs
        log.Printf("[Go] Using Secure Cloud Credentials for: %s", tutorAddr)
        
        creds := credentials.NewClientTLSFromCert(nil, "")
        opts = append(opts, grpc.WithTransportCredentials(creds))
        
        if !strings.Contains(tutorAddr, ":") {
            tutorAddr = tutorAddr + ":443"
        }
    } else {
        // LOCAL: Use Insecure
        log.Printf("[Go] Using Insecure Credentials for local: %s", tutorAddr)
        opts = append(opts, grpc.WithTransportCredentials(insecure.NewCredentials()))
    }

    conn, err := grpc.NewClient(tutorAddr, opts...) // Use NewClient instead of Dial
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
	tutorClient = pb.NewTutorServiceClient(conn)

	// Start Server
	mux := http.NewServeMux()
	mux.HandleFunc("/upload", uploadHandler)
	mux.HandleFunc("/ws", wsHandler)
	mux.HandleFunc("/quiz/submit", submitQuizResultHandler)
	mux.HandleFunc("/quiz/scores", getQuizScoresHandler)
	mux.HandleFunc("/quiz/adaptive", generateAdaptiveQuizHandler)
	mux.HandleFunc("/api/v1/ingest", ingestMaterialHandler)
	mux.HandleFunc("/api/v1/quiz", generateQuizHandler)
	mux.HandleFunc("/api/v1/quiz/submit", submitQuizTelemetryHandler)

	fmt.Println("[Go] Gateway running on :8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal(err)
	}
}
