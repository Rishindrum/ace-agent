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
	calendar "ace-agent/backend-go/calendar"
	auth "ace-agent/backend-go/auth"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/iterator"
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
	UserID          string    `bigquery:"user_id"`
	ClassID         string    `bigquery:"class_id"`
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
		"user_id":          q.UserID,
		"class_id":         q.ClassID,
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
		{Name: "user_id", Type: bigquery.StringFieldType, Required: true},
		{Name: "class_id", Type: bigquery.StringFieldType, Required: true},
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
	userID := r.FormValue("user_id")
	if userID == "" {
		userID = r.URL.Query().Get("user_id")
	}
	if userID == "" {
		userID = auth.GetUserID(r.Context())
	}
	if userID == "" {
		userID = "default_user"
	}

	classID := r.PathValue("class_id")
	if classID == "" {
		classID = r.FormValue("class_id")
	}
	if classID == "" {
		classID = r.URL.Query().Get("class_id")
	}
	if classID == "" {
		classID = "default_class"
	}

	className := r.FormValue("class_name")
	if className == "" {
		className = r.URL.Query().Get("class_name")
	}
	if className == "" {
		className = "Default Class"
	}

	req := &pb.SyllabusRequest{
		FileName:  header.Filename,
		FileData:  fileBytes,
		UserId:    userID,
		ClassId:   classID,
		ClassName: className,
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

		userID := r.URL.Query().Get("user_id")
		if userID == "" {
			userID = "default_user"
		}
		classID := r.URL.Query().Get("class_id")
		if classID == "" {
			classID = "default_class"
		}

		grpcReq := &pb.ChatRequest{
			Message: string(msg),
			UserId:  userID,
			ClassId: classID,
		}
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
		ClassID   string `json:"class_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	classID := req.ClassID
	if classID == "" {
		classID = "default_class"
	}

	grpcReq := &pb.QuizResultRequest{
		UserId:    req.UserID,
		TopicName: req.TopicName,
		Score:     req.Score,
		ClassId:   classID,
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
	classID := r.URL.Query().Get("class_id")
	if userID == "" {
		http.Error(w, "Missing user_id parameter", http.StatusBadRequest)
		return
	}
	if classID == "" {
		classID = "default_class"
	}

	grpcReq := &pb.GetQuizScoresRequest{
		UserId:  userID,
		ClassId: classID,
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
	classID := r.URL.Query().Get("class_id")
	if userID == "" || syllabusName == "" {
		http.Error(w, "Missing user_id or syllabus_name parameter", http.StatusBadRequest)
		return
	}
	if classID == "" {
		classID = "default_class"
	}

	grpcReq := &pb.AdaptiveQuizRequest{
		UserId:       userID,
		SyllabusName: syllabusName,
		ClassId:      classID,
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
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := auth.GetUserID(r.Context())
	classID := r.PathValue("class_id")

	var weekNum int
	var topicName string
	var rawText string
	var className string
	var fileBytes []byte
	var fileName string

	if strings.HasPrefix(r.Header.Get("Content-Type"), "multipart/form-data") {
		err := r.ParseMultipartForm(32 << 20) // 32MB
		if err != nil {
			http.Error(w, "Failed to parse multipart form: "+err.Error(), http.StatusBadRequest)
			return
		}
		
		fmt.Sscanf(r.FormValue("week_number"), "%d", &weekNum)
		topicName = r.FormValue("topic_name")
		rawText = r.FormValue("raw_text")
		className = r.FormValue("class_name")
		
		file, header, err := r.FormFile("file")
		if err == nil {
			defer file.Close()
			fileName = header.Filename
			fileBytes = make([]byte, header.Size)
			_, err = file.Read(fileBytes)
			if err != nil {
				http.Error(w, "Failed to read uploaded file: "+err.Error(), http.StatusInternalServerError)
				return
			}
		}
	} else {
		var req struct {
			WeekNumber int32  `json:"week_number"`
			TopicName  string `json:"topic_name"`
			RawText    string `json:"raw_text"`
			ClassID    string `json:"class_id"`
			ClassName  string `json:"class_name"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}
		weekNum = int(req.WeekNumber)
		topicName = req.TopicName
		rawText = req.RawText
		className = req.ClassName
		if classID == "" {
			classID = req.ClassID
		}
	}

	if classID == "" {
		classID = "default_class"
	}
	if className == "" {
		className = "Default Class"
	}

	grpcReq := &pb.IngestRequest{
		WeekNumber: int32(weekNum),
		TopicName:  topicName,
		RawText:    rawText,
		UserId:     userID,
		ClassId:    classID,
		ClassName:  className,
		FileData:   fileBytes,
		FileName:   fileName,
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
		WeekNumber         int32  `json:"week_number"`
		QuestionCount      int32  `json:"question_count"`
		ClassID            string `json:"class_id"`
		Regenerate         bool   `json:"regenerate"`
		RegenerationPrompt string `json:"regeneration_prompt"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID := auth.GetUserID(r.Context())
	classID := r.PathValue("class_id")
	if classID == "" {
		classID = req.ClassID
	}
	if classID == "" {
		classID = "default_class"
	}

	// Daily Gating: Check if Quiz is unlocked
	sessionState := auth.GlobalDailySessionStore.GetSessionState(userID, classID)
	if !sessionState.QuizUnlocked {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusForbidden)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":  "error",
			"message": "Quiz is locked. Complete the daily lesson and exercises to unlock the quiz.",
		})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// Calculate current syllabus week
	var currentWeek int32 = 1
	var courseStartDate string
	if sched, ok := auth.GlobalScheduleStore.GetSchedule(userID, classID); ok {
		courseStartDate = sched.CourseStartDate
		if courseStartDate == "" {
			courseStartDate = time.Now().Format("2006-01-02")
		}
		currentWeek = int32(auth.CalculateCurrentSyllabusWeek(courseStartDate))
	}

	targetWeek := req.WeekNumber
	if targetWeek == 0 {
		targetWeek = currentWeek
	}

	// If they have already completed the current week, generate 'Maintenance Review' (-1)
	if targetWeek == currentWeek {
		completed, err := hasCompletedWeekQuiz(ctx, userID, classID, int(currentWeek))
		if err == nil && completed {
			targetWeek = -1
			log.Printf("[Study] User %s has already completed current week %d in class %s. Overriding to Maintenance Review.", userID, currentWeek, classID)
		}
	}

	// Extract historically weak topics from BigQuery
	weakTopics, err := getWeakTopicsFromBigQuery(ctx, userID, classID)
	if err != nil {
		log.Printf("[GenerateQuiz] Warning: Failed to fetch weak topics from BigQuery: %v", err)
		weakTopics = []string{}
	}

	grpcReq := &pb.QuizRequest{
		WeekNumber:         targetWeek,
		QuestionCount:      req.QuestionCount,
		UserId:             userID,
		WeakTopics:         weakTopics,
		ClassId:            classID,
		Regenerate:         req.Regenerate,
		RegenerationPrompt: req.RegenerationPrompt,
	}

	resp, err := tutorClient.GenerateQuiz(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GenerateQuiz gRPC failed: %v", err)
		if strings.Contains(err.Error(), "NO_MATERIALS_FOUND") {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"code": "NO_MATERIALS_FOUND"})
			return
		}
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

func getWeakTopicsFromBigQuery(ctx context.Context, userID, classID string) ([]string, error) {
	if bqClient == nil {
		return nil, fmt.Errorf("BigQuery client is nil")
	}
	queryStr := fmt.Sprintf("SELECT DISTINCT week_number FROM `ace-agent-demo.ace_analytics.quiz_attempts` WHERE user_id = '%s' AND class_id = '%s' AND score_percentage < 70", userID, classID)
	q := bqClient.Query(queryStr)
	it, err := q.Read(ctx)
	if err != nil {
		return nil, err
	}
	var weakTopics []string
	for {
		var row struct {
			WeekNumber int64 `bigquery:"week_number"`
		}
		err := it.Next(&row)
		if err == iterator.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		weakTopics = append(weakTopics, fmt.Sprintf("Week %d Topic", row.WeekNumber))
	}
	return weakTopics, nil
}

func hasCompletedQuizToday(ctx context.Context, userID, classID string) (bool, error) {
	if bqClient == nil {
		return false, fmt.Errorf("BigQuery client is nil")
	}
	now := time.Now()
	todayStart := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, now.Location()).Format(time.RFC3339)
	
	queryStr := fmt.Sprintf("SELECT COUNT(*) as count FROM `ace-agent-demo.ace_analytics.quiz_attempts` WHERE user_id = '%s' AND class_id = '%s' AND timestamp >= TIMESTAMP('%s')", userID, classID, todayStart)
	q := bqClient.Query(queryStr)
	it, err := q.Read(ctx)
	if err != nil {
		return false, err
	}
	
	var row struct {
		Count int64 `bigquery:"count"`
	}
	err = it.Next(&row)
	if err != nil {
		return false, err
	}
	return row.Count > 0, nil
}

func hasCompletedWeekQuiz(ctx context.Context, userID, classID string, weekNum int) (bool, error) {
	if bqClient == nil {
		return false, fmt.Errorf("BigQuery client is nil")
	}
	queryStr := fmt.Sprintf("SELECT COUNT(*) as count FROM `ace-agent-demo.ace_analytics.quiz_attempts` WHERE user_id = '%s' AND class_id = '%s' AND week_number = %d", userID, classID, weekNum)
	q := bqClient.Query(queryStr)
	it, err := q.Read(ctx)
	if err != nil {
		return false, err
	}
	var row struct {
		Count int64 `bigquery:"count"`
	}
	err = it.Next(&row)
	if err != nil {
		return false, err
	}
	return row.Count > 0, nil
}

func userScheduleSettingsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method == http.MethodGet {
		userID := auth.GetUserID(r.Context())
		if userID == "" {
			http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
			return
		}
		classID := r.URL.Query().Get("class_id")
		if classID == "" {
			classID = "default_class"
		}
		sched, ok := auth.GlobalScheduleStore.GetUpdatedSchedule(userID, classID, time.Now())
		if !ok {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"user_id":           userID,
				"class_id":          classID,
				"preferred_days":    []int{},
				"daily_pace":        0,
				"current_streak":    0,
				"course_start_date": "",
			})
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(sched)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		PreferredDays   []int  `json:"preferred_days"`
		DailyPace       int    `json:"daily_pace"`
		CurrentStreak   int    `json:"current_streak"`
		CourseStartDate string `json:"course_start_date"`
		ClassID         string `json:"class_id"`
		ClassName       string `json:"class_name"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	classID := req.ClassID
	if classID == "" {
		classID = "default_class"
	}

	className := req.ClassName
	if className == "" {
		className = "Default Class"
	}

	courseStartDate := req.CourseStartDate
	if courseStartDate == "" {
		courseStartDate = time.Now().Format("2006-01-02")
	}

	sched, ok := auth.GlobalScheduleStore.GetSchedule(userID, classID)
	isModified := false
	if ok {
		if !slicesEqual(sched.PreferredDays, req.PreferredDays) || sched.DailyPace != req.DailyPace || sched.CourseStartDate != courseStartDate || (req.ClassName != "" && sched.ClassName != req.ClassName) {
			isModified = true
		}
	}

	if isModified && ok {
		now := time.Now()
		allowed, reason := auth.CanModifySchedule(sched, now)
		if !allowed {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusForbidden)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"status":  "error",
				"message": reason,
			})
			return
		}
		sched.PreferredDays = req.PreferredDays
		sched.DailyPace = req.DailyPace
		sched.CourseStartDate = courseStartDate
		if req.ClassName != "" {
			sched.ClassName = req.ClassName
		}
		sched.Modifications = append(sched.Modifications, now.Format(time.RFC3339))
		err := auth.GlobalScheduleStore.SaveScheduleStruct(sched)
		if err != nil {
			http.Error(w, "Failed to save schedule settings: "+err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		err := auth.GlobalScheduleStore.SaveSchedule(userID, classID, className, req.PreferredDays, req.DailyPace, req.CurrentStreak, courseStartDate)
		if err != nil {
			http.Error(w, "Failed to save schedule settings: "+err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"message": "Schedule settings saved successfully",
	})
}

func listClassesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	var list []auth.UserSchedule
	schedules := auth.GlobalScheduleStore.GetAllSchedules()
	for _, s := range schedules {
		if s.UserID == userID {
			updated, ok := auth.GlobalScheduleStore.GetUpdatedSchedule(userID, s.ClassID, time.Now())
			if ok {
				list = append(list, updated)
			} else {
				list = append(list, s)
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}

func checkTopicSufficiencyHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	classID := r.PathValue("class_id")
	if classID == "" {
		classID = r.URL.Query().Get("class_id")
	}
	if classID == "" {
		classID = "default_class"
	}

	weekStr := r.URL.Query().Get("week_number")
	var weekNum int32 = 1
	if weekStr != "" {
		var wVal int
		fmt.Sscanf(weekStr, "%d", &wVal)
		weekNum = int32(wVal)
	} else {
		if sched, ok := auth.GlobalScheduleStore.GetSchedule(userID, classID); ok {
			courseStartDate := sched.CourseStartDate
			if courseStartDate == "" {
				courseStartDate = time.Now().Format("2006-01-02")
			}
			weekNum = int32(auth.CalculateCurrentSyllabusWeek(courseStartDate))
		}
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	resp, err := tutorClient.CheckTopicSufficiency(ctx, &pb.SufficiencyRequest{
		UserId:     userID,
		ClassId:    classID,
		WeekNumber: weekNum,
	})
	if err != nil {
		log.Printf("[Error] CheckTopicSufficiency gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"insufficient_materials": resp.InsufficientMaterials,
		"insufficient_topics":    resp.InsufficientTopics,
		"all_topics":             resp.AllTopics,
	})
}

func startBackgroundWorker() {
	ticker := time.NewTicker(24 * time.Hour)
	go func() {
		// Run a check immediately on startup
		runDailySchedulerCheck()
		for range ticker.C {
			runDailySchedulerCheck()
		}
	}()
}

func runDailySchedulerCheck() {
	ctx := context.Background()
	log.Println("[SchedulerWorker] Running daily schedule checks...")

	schedules := auth.GlobalScheduleStore.GetAllSchedules()
	todayWeekday := int(time.Now().Weekday())

	for _, sched := range schedules {
		isScheduledToday := false
		for _, day := range sched.PreferredDays {
			if day == todayWeekday {
				isScheduledToday = true
				break
			}
		}

		if !isScheduledToday {
			continue
		}

		classID := sched.ClassID
		if classID == "" {
			classID = "default_class"
		}

		log.Printf("[SchedulerWorker] User %s is scheduled to study class %s today. Checking completion...", sched.UserID, classID)

		completed, err := hasCompletedQuizToday(ctx, sched.UserID, classID)
		if err != nil {
			log.Printf("[SchedulerWorker] Warning: Failed to check BQ quiz completion for user %s, class %s: %v. Proceeding assuming not completed.", sched.UserID, classID, err)
			completed = false
		}

		if completed {
			log.Printf("[SchedulerWorker] User %s has already completed their study session today for class %s. Skipping.", sched.UserID, classID)
			continue
		}

		log.Printf("[SchedulerWorker] User %s has NOT completed a session today for class %s. Scheduling Google Calendar event...", sched.UserID, classID)

		weakTopics, err := getWeakTopicsFromBigQuery(ctx, sched.UserID, classID)
		if err != nil {
			log.Printf("[SchedulerWorker] Warning: Failed to fetch weak topics for user %s, class %s: %v.", sched.UserID, classID, err)
			weakTopics = []string{}
		}

		// Calculate current week
		currentWeek := auth.CalculateCurrentSyllabusWeek(sched.CourseStartDate)

		// Query Python Brain for topics sufficiency / all topics for this week
		var newTopics []string
		if tutorClient != nil {
			suffResp, err := tutorClient.CheckTopicSufficiency(ctx, &pb.SufficiencyRequest{
				UserId:     sched.UserID,
				ClassId:    classID,
				WeekNumber: int32(currentWeek),
			})
			if err != nil {
				log.Printf("[SchedulerWorker] Warning: Failed to fetch topics from Python Brain: %v", err)
			} else if suffResp != nil {
				newTopics = suffResp.AllTopics
			}
		}

		if len(newTopics) == 0 {
			newTopics = []string{fmt.Sprintf("Week %d Core Concepts", currentWeek)}
		}

		preferredTime := "afternoon" // default


		frontendURL := os.Getenv("FRONTEND_URL")
		if frontendURL == "" {
			frontendURL = "http://localhost:4200"
		}
		dashboardURL := frontendURL + "/dashboard"

		err = calendar.ScheduleStudySession(ctx, sched.UserID, preferredTime, newTopics, weakTopics, dashboardURL)
		if err != nil {
			log.Printf("[SchedulerWorker] Error: Failed to schedule study session for user %s: %v", sched.UserID, err)
		} else {
			log.Printf("[SchedulerWorker] Successfully scheduled proactive study session for user %s", sched.UserID)
		}
	}
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
		ClassID    string           `json:"class_id"`
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

	userID := auth.GetUserID(r.Context())
	classID := r.PathValue("class_id")
	if classID == "" {
		classID = req.ClassID
	}
	if classID == "" {
		classID = "default_class"
	}

	scorePercentage := (float64(correctAnswers) / float64(totalQuestions)) * 100.0
	attemptID := uuid.New().String()

	telemetry := &QuizAttemptTelemetry{
		AttemptID:       attemptID,
		UserID:          userID,
		ClassID:         classID,
		WeekNumber:      req.WeekNumber,
		TotalQuestions:  totalQuestions,
		CorrectAnswers:  correctAnswers,
		ScorePercentage: scorePercentage,
		Timestamp:       time.Now(),
	}

	var classStreak, globalStreak int
	if updatedSched, ok := auth.GlobalScheduleStore.UpdateStreaks(userID, classID, req.WeekNumber, time.Now()); ok {
		classStreak = updatedSched.ClassStreak
		globalStreak = updatedSched.GlobalStreak
		log.Printf("[Streak] User %s daily streak updated: class_streak=%d, global_streak=%d (completed week %d)", userID, classStreak, globalStreak, req.WeekNumber)
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
		"class_streak":    classStreak,
		"global_streak":   globalStreak,
	})
}

func googleLoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		return
	}

	var tokenStr string
	authHeader := r.Header.Get("Authorization")
	if len(authHeader) >= 8 && authHeader[:7] == "Bearer " {
		tokenStr = authHeader[7:]
	} else if qToken := r.URL.Query().Get("token"); qToken != "" {
		tokenStr = qToken
	}

	state := "login"
	if tokenStr != "" {
		userID, err := auth.ParseToken(tokenStr)
		if err == nil && userID != "" {
			state = tokenStr
		}
	}

	loginURL := calendar.GetLoginURL(state)
	http.Redirect(w, r, loginURL, http.StatusTemporaryRedirect)
}

func googleCallbackHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	code := r.URL.Query().Get("code")
	if code == "" {
		http.Error(w, "Missing code parameter", http.StatusBadRequest)
		return
	}

	state := r.URL.Query().Get("state")

	ctx := context.Background()
	token, err := calendar.OAuthConfig.Exchange(ctx, code)
	if err != nil {
		log.Printf("[OAuth] Token exchange failed: %v", err)
		http.Error(w, "Token exchange failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	refreshToken := token.RefreshToken
	if refreshToken == "" {
		log.Println("[OAuth] Warning: Refresh token is empty in callback.")
	}

	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:4200"
	}

	if state == "login" || state == "" {
		client := calendar.OAuthConfig.Client(ctx, token)
		resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
		if err != nil {
			log.Printf("[OAuth] Failed to get user info: %v", err)
			http.Error(w, "Failed to get user info: "+err.Error(), http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		var userInfo struct {
			Email string `json:"email"`
			Name  string `json:"name"`
		}
		if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
			log.Printf("[OAuth] Failed to decode user info: %v", err)
			http.Error(w, "Failed to decode user info: "+err.Error(), http.StatusInternalServerError)
			return
		}

		if userInfo.Email == "" {
			http.Error(w, "Google OAuth did not return email", http.StatusBadRequest)
			return
		}

		userID, err := auth.GlobalUserStore.GetOrCreateUserByUsername(userInfo.Email)
		if err != nil {
			log.Printf("[OAuth] Failed to get or create user: %v", err)
			http.Error(w, "Failed to manage user account: "+err.Error(), http.StatusInternalServerError)
			return
		}

		jwtToken, err := auth.GenerateToken(userID)
		if err != nil {
			log.Printf("[OAuth] Failed to generate token: %v", err)
			http.Error(w, "Failed to generate session token: "+err.Error(), http.StatusInternalServerError)
			return
		}

		if refreshToken != "" {
			_ = calendar.SaveRefreshToken(ctx, userID, refreshToken)
		}

		redirectURL := fmt.Sprintf("%s/dashboard?token=%s&user_id=%s&calendar_connected=true", frontendURL, jwtToken, userID)
		http.Redirect(w, r, redirectURL, http.StatusFound)
		return
	}

	userID, err := auth.ParseToken(state)
	if err != nil {
		log.Printf("[OAuth] Invalid state token: %v", err)
		http.Error(w, "Unauthorized: Invalid state token", http.StatusUnauthorized)
		return
	}

	if refreshToken != "" {
		err = calendar.SaveRefreshToken(ctx, userID, refreshToken)
		if err != nil {
			log.Printf("[OAuth] Secret Manager storage failed: %v", err)
			http.Error(w, "Secure storage failed: "+err.Error(), http.StatusInternalServerError)
			return
		}
	}

	http.Redirect(w, r, frontendURL+"/dashboard?calendar_connected=true", http.StatusFound)
}

func userConfigHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		PreferredStudyTimes []string `json:"preferred_study_times"`
		WeeklyCommitment    int      `json:"weekly_commitment"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID := auth.GetUserID(r.Context())
	log.Printf("[UserConfig] Saved configuration for user %s: preferredTimes=%v, weeklyCommitment=%d",
		userID, req.PreferredStudyTimes, req.WeeklyCommitment)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"message": "Configuration saved successfully",
	})
}

func schedulePreferencesHandler(w http.ResponseWriter, r *http.Request) {
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
		PreferredStudyTime string   `json:"preferred_study_time"`
		DaysToAvoid        []string `json:"days_to_avoid"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("[Schedule] Received preferences: studyTime=%s, daysToAvoid=%v", req.PreferredStudyTime, req.DaysToAvoid)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"message": "Preferences saved successfully",
	})
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Username == "" || req.Password == "" {
		http.Error(w, "Username and password are required", http.StatusBadRequest)
		return
	}

	userID, err := auth.GlobalUserStore.Register(req.Username, req.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := auth.GenerateToken(userID)
	if err != nil {
		http.Error(w, "Failed to generate token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"user_id": userID,
		"token":   token,
	})
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID, err := auth.GlobalUserStore.Login(req.Username, req.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	token, err := auth.GenerateToken(userID)
	if err != nil {
		http.Error(w, "Failed to generate token: "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "success",
		"user_id": userID,
		"token":   token,
	})
}

func cramSessionHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		StartWeek int32  `json:"start_week"`
		EndWeek   int32  `json:"end_week"`
		ClassID   string `json:"class_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID := auth.GetUserID(r.Context())
	classID := r.PathValue("class_id")
	if classID == "" {
		classID = req.ClassID
	}
	if classID == "" {
		classID = "default_class"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 90*time.Second)
	defer cancel()

	// Extract weak topics
	weakTopics, err := getWeakTopicsFromBigQuery(ctx, userID, classID)
	if err != nil {
		log.Printf("[Cram] Warning: Failed to fetch weak topics: %v", err)
		weakTopics = []string{}
	}

	grpcReq := &pb.CramRequest{
		UserId:     userID,
		StartWeek:  req.StartWeek,
		EndWeek:    req.EndWeek,
		WeakTopics: weakTopics,
		ClassId:    classID,
	}

	resp, err := tutorClient.GenerateCramSession(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GenerateCramSession gRPC failed: %v", err)
		http.Error(w, "gRPC Call failed: "+err.Error(), http.StatusInternalServerError)
		return
	}

	type CramQuestionJSON struct {
		ID                 string   `json:"id"`
		QuestionText       string   `json:"question_text"`
		Options            []string `json:"options"`
		CorrectOptionIndex int32    `json:"correct_option_index"`
	}

	questions := make([]CramQuestionJSON, 0, len(resp.RapidFireQuiz))
	for _, q := range resp.RapidFireQuiz {
		questions = append(questions, CramQuestionJSON{
			ID:                 q.Id,
			QuestionText:       q.QuestionText,
			Options:            q.Options,
			CorrectOptionIndex: q.CorrectOptionIndex,
		})
	}

	jsonResponse := map[string]interface{}{
		"dense_review_markdown": resp.DenseReviewMarkdown,
		"rapid_fire_quiz":       questions,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jsonResponse)
}

func loadEnv() {
	files := []string{".env", "../.env"}
	for _, fp := range files {
		content, err := os.ReadFile(fp)
		if err != nil {
			continue
		}
		lines := strings.Split(string(content), "\n")
		for _, line := range lines {
			line = strings.TrimSpace(line)
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}
			parts := strings.SplitN(line, "=", 2)
			if len(parts) == 2 {
				key := strings.TrimSpace(parts[0])
				val := strings.TrimSpace(parts[1])
				if len(val) >= 2 && val[0] == '"' && val[len(val)-1] == '"' {
					val = val[1 : len(val)-1]
				}
				if len(val) >= 2 && val[0] == '\'' && val[len(val)-1] == '\'' {
					val = val[1 : len(val)-1]
				}
				os.Setenv(key, val)
			}
		}
		log.Printf("[Env] Loaded environment from %s", fp)
		break
	}
}

func main() {
	loadEnv()
	// Start BigQuery initialization in background
	go initBigQuery()

	// Initialize user database in persistent data folder
	if err := os.MkdirAll("data", 0755); err != nil {
		log.Printf("[Warning] Failed to create data directory: %v", err)
	}
	auth.InitUserStore("data/users.json")
	auth.InitScheduleStore("data/schedules.json")
	auth.InitDailySessionStore("data/daily_sessions.json")


	// Start daily background worker loop
	startBackgroundWorker()

	// Initialize Google Calendar OAuth config
	calendar.InitOAuthConfig()

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
        // LOCALLY: We use insecure credentials
        log.Printf("[Go] Connecting locally/insecurely to: %s", tutorAddr)
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
	mux.HandleFunc("/api/v1/classes/{class_id}/syllabus/upload", auth.JWTMiddleware(uploadHandler))
	mux.HandleFunc("/ws", wsHandler)
	mux.HandleFunc("/quiz/submit", submitQuizResultHandler)
	mux.HandleFunc("/quiz/scores", getQuizScoresHandler)
	mux.HandleFunc("/quiz/adaptive", generateAdaptiveQuizHandler)
	mux.HandleFunc("/api/v1/auth/register", registerHandler)
	mux.HandleFunc("/api/v1/auth/login", loginHandler)
	mux.HandleFunc("/api/v1/ingest", auth.JWTMiddleware(ingestMaterialHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/materials/upload", auth.JWTMiddleware(ingestMaterialHandler))
	mux.HandleFunc("/api/v1/quiz", auth.JWTMiddleware(generateQuizHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/quiz", auth.JWTMiddleware(generateQuizHandler))
	mux.HandleFunc("/api/v1/quiz/submit", auth.JWTMiddleware(submitQuizTelemetryHandler))
	mux.HandleFunc("/api/v1/study/quiz/submit", auth.JWTMiddleware(submitQuizTelemetryHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/quiz/submit", auth.JWTMiddleware(submitQuizTelemetryHandler))
	mux.HandleFunc("/api/v1/study/cram", auth.JWTMiddleware(cramSessionHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/cram", auth.JWTMiddleware(cramSessionHandler))
	mux.HandleFunc("/api/v1/auth/google/login", googleLoginHandler)
	mux.HandleFunc("/api/v1/auth/google/callback", googleCallbackHandler)
	mux.HandleFunc("/api/v1/schedule/preferences", auth.JWTMiddleware(schedulePreferencesHandler))
	mux.HandleFunc("/api/v1/user/config", auth.JWTMiddleware(userConfigHandler))
	mux.HandleFunc("/api/v1/user/schedule-settings", auth.JWTMiddleware(userScheduleSettingsHandler))
	mux.HandleFunc("/api/v1/study/today/state", auth.JWTMiddleware(getDailySessionStateHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/today/state", auth.JWTMiddleware(getDailySessionStateHandler))
	mux.HandleFunc("/api/v1/study/exercise/submit", auth.JWTMiddleware(submitExerciseHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/exercise/submit", auth.JWTMiddleware(submitExerciseHandler))
	mux.HandleFunc("/api/v1/study/lesson", auth.JWTMiddleware(generateLessonHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/lesson", auth.JWTMiddleware(generateLessonHandler))
	mux.HandleFunc("/api/v1/classes", auth.JWTMiddleware(listClassesHandler))
	mux.HandleFunc("/api/v1/classes/{class_id}/study/sufficiency", auth.JWTMiddleware(checkTopicSufficiencyHandler))

	fmt.Println("[Go] Gateway running on :8080")
	if err := http.ListenAndServe(":8080", CORSMiddleware(mux)); err != nil {
		log.Fatal(err)
	}
}

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Expose-Headers", "Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func slicesEqual(a, b []int) bool {
	if len(a) != len(b) {
		return false
	}
	counts := make(map[int]int)
	for _, v := range a {
		counts[v]++
	}
	for _, v := range b {
		counts[v]--
		if counts[v] < 0 {
			return false
		}
	}
	return true
}

func getDailySessionStateHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	classID := r.PathValue("class_id")
	if classID == "" {
		classID = r.URL.Query().Get("class_id")
	}
	if classID == "" {
		classID = "default_class"
	}

	state := auth.GlobalDailySessionStore.GetSessionState(userID, classID)

	var currentWeek int32 = 1
	var courseStartDate string
	if sched, ok := auth.GlobalScheduleStore.GetSchedule(userID, classID); ok {
		courseStartDate = sched.CourseStartDate
		if courseStartDate == "" {
			courseStartDate = time.Now().Format("2006-01-02")
		}
		currentWeek = int32(auth.CalculateCurrentSyllabusWeek(courseStartDate))
	}

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	insufficientMaterials := false
	suffResp, err := tutorClient.CheckTopicSufficiency(ctx, &pb.SufficiencyRequest{
		UserId:     userID,
		ClassId:    classID,
		WeekNumber: currentWeek,
	})
	if err == nil && suffResp != nil {
		insufficientMaterials = suffResp.InsufficientMaterials
	} else {
		log.Printf("[getDailySessionStateHandler] Warning: CheckTopicSufficiency failed: %v", err)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"user_id":                state.UserID,
		"class_id":               state.ClassID,
		"date":                   state.Date,
		"lesson_completed":       state.LessonCompleted,
		"exercises_completed":    state.ExercisesCompleted,
		"quiz_unlocked":          state.QuizUnlocked,
		"insufficient_materials": insufficientMaterials,
	})
}

func submitExerciseHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	type ExerciseAnswer struct {
		ExerciseID          string `json:"exercise_id"`
		SelectedOptionIndex int    `json:"selected_option_index"`
		CorrectOptionIndex  int    `json:"correct_option_index"`
	}

	var req struct {
		Answers []ExerciseAnswer `json:"answers"`
		ClassID string           `json:"class_id"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	classID := r.PathValue("class_id")
	if classID == "" {
		classID = req.ClassID
	}
	if classID == "" {
		classID = "default_class"
	}

	totalQuestions := len(req.Answers)
	if totalQuestions == 0 {
		http.Error(w, "No answers provided", http.StatusBadRequest)
		return
	}

	correctCount := 0
	for _, ans := range req.Answers {
		if ans.SelectedOptionIndex == ans.CorrectOptionIndex {
			correctCount++
		}
	}

	scorePercentage := (float64(correctCount) / float64(totalQuestions)) * 100.0
	passed := scorePercentage >= 60.0

	sessionState := auth.GlobalDailySessionStore.GetSessionState(userID, classID)
	if passed {
		sessionState.ExercisesCompleted = true
		sessionState.QuizUnlocked = true
		auth.GlobalDailySessionStore.SaveSessionState(sessionState)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":           "success",
		"passed":           passed,
		"score_percentage": scorePercentage,
		"message":          fmt.Sprintf("You got %d/%d exercises correct (%.1f%%).", correctCount, totalQuestions, scorePercentage),
		"quiz_unlocked":    sessionState.QuizUnlocked,
	})
}
func generateLessonHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		WeekNumber         int32  `json:"week_number"`
		ClassID            string `json:"class_id"`
		Regenerate         bool   `json:"regenerate"`
		RegenerationPrompt string `json:"regeneration_prompt"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	userID := auth.GetUserID(r.Context())
	if userID == "" {
		http.Error(w, "Unauthorized: User ID missing", http.StatusUnauthorized)
		return
	}

	classID := r.PathValue("class_id")
	if classID == "" {
		classID = req.ClassID
	}
	if classID == "" {
		classID = "default_class"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// Calculate current syllabus week if week_number is 0
	if req.WeekNumber == 0 {
		var currentWeek int32 = 1
		var courseStartDate string
		if sched, ok := auth.GlobalScheduleStore.GetSchedule(userID, classID); ok {
			courseStartDate = sched.CourseStartDate
			if courseStartDate == "" {
				courseStartDate = time.Now().Format("2006-01-02")
			}
			currentWeek = int32(auth.CalculateCurrentSyllabusWeek(courseStartDate))
		}
		req.WeekNumber = currentWeek
	}

	// Extract weak topics from BigQuery
	weakTopics, err := getWeakTopicsFromBigQuery(ctx, userID, classID)
	if err != nil {
		log.Printf("[Lesson] Warning: Failed to fetch weak topics from BigQuery: %v", err)
		weakTopics = []string{}
	}

	// Call python gRPC client
	grpcReq := &pb.LessonRequest{
		WeekNumber:         req.WeekNumber,
		UserId:             userID,
		WeakTopics:         weakTopics,
		ClassId:            classID,
		Regenerate:         req.Regenerate,
		RegenerationPrompt: req.RegenerationPrompt,
	}

	resp, err := tutorClient.GenerateLessonAndExercises(ctx, grpcReq)
	if err != nil {
		log.Printf("[Error] GenerateLessonAndExercises gRPC failed: %v", err)
		if strings.Contains(err.Error(), "NO_MATERIALS_FOUND") {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
			json.NewEncoder(w).Encode(map[string]string{"code": "NO_MATERIALS_FOUND"})
			return
		}
		http.Error(w, "Failed to generate lesson: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set LessonCompleted = true
	sessionState := auth.GlobalDailySessionStore.GetSessionState(userID, classID)
	sessionState.LessonCompleted = true
	auth.GlobalDailySessionStore.SaveSessionState(sessionState)

	type ExerciseResponse struct {
		ID                 string   `json:"id"`
		QuestionText       string   `json:"question_text"`
		Options            []string `json:"options"`
		CorrectOptionIndex int32    `json:"correct_option_index"`
		Explanation        string   `json:"explanation"`
	}

	var exercises []ExerciseResponse
	for _, ex := range resp.Exercises {
		exercises = append(exercises, ExerciseResponse{
			ID:                 ex.Id,
			QuestionText:       ex.QuestionText,
			Options:            ex.Options,
			CorrectOptionIndex: ex.CorrectOptionIndex,
			Explanation:        "Review this concept to verify details.",
		})
	}

	jsonResponse := map[string]interface{}{
		"lesson_markdown":        resp.LessonMarkdown,
		"exercises":              exercises,
		"insufficient_materials": resp.InsufficientMaterials,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jsonResponse)
}
