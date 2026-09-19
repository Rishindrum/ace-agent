package auth

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"
)

type DailySessionState struct {
	UserID             string `json:"user_id"`
	ClassID            string `json:"class_id"`
	WeekNumber         int    `json:"week_number,omitempty"`
	TopicName          string `json:"topic_name,omitempty"`
	Date               string `json:"date"` // YYYY-MM-DD
	LessonCompleted    bool   `json:"lesson_completed"`
	ExercisesCompleted bool   `json:"exercises_completed"`
	QuizUnlocked       bool   `json:"quiz_unlocked"`
}

type DailySessionStore struct {
	mu       sync.RWMutex
	sessions map[string]DailySessionState
	path     string
}

var GlobalDailySessionStore *DailySessionStore

func InitDailySessionStore(path string) {
	GlobalDailySessionStore = &DailySessionStore{
		sessions: make(map[string]DailySessionState),
		path:     path,
	}
	GlobalDailySessionStore.load()
}

func (s *DailySessionStore) load() {
	s.mu.Lock()
	defer s.mu.Unlock()
	if err := DownloadFromGCS(s.path); err != nil {
		fmt.Printf("[SessionStore] Warning: failed to download session store from GCS: %v\n", err)
	}
	file, err := os.Open(s.path)
	if err != nil {
		if os.IsNotExist(err) {
			return
		}
		fmt.Printf("[SessionStore] Failed to load session store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewDecoder(file).Decode(&s.sessions)
}

func (s *DailySessionStore) save() {
	file, err := os.Create(s.path)
	if err != nil {
		fmt.Printf("[SessionStore] Failed to save session store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewEncoder(file).Encode(s.sessions)
	if err := UploadToGCS(s.path); err != nil {
		fmt.Printf("[SessionStore] Warning: failed to upload session store to GCS: %v\n", err)
	}
}

func (s *DailySessionStore) GetSessionState(userID, classID string) DailySessionState {
	return s.GetUnitSessionState(userID, classID, 0, "")
}

func sessionKey(userID, classID string, weekNumber int, topicName string) string {
	key := userID + "_" + classID
	if topicName != "" {
		key += "_unit_" + strconv.Itoa(weekNumber) + "_" + topicName
	}
	return key
}

func (s *DailySessionStore) GetUnitSessionState(userID, classID string, weekNumber int, topicName string) DailySessionState {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := sessionKey(userID, classID, weekNumber, topicName)
	today := time.Now().Format("2006-01-02")
	state, ok := s.sessions[key]
	if !ok || state.Date != today {
		state = DailySessionState{
			UserID:             userID,
			ClassID:            classID,
			WeekNumber:         weekNumber,
			TopicName:          topicName,
			Date:               today,
			LessonCompleted:    false,
			ExercisesCompleted: false,
			QuizUnlocked:       false,
		}
		s.sessions[key] = state
		s.save()
	}
	return state
}

func (s *DailySessionStore) SaveSessionState(state DailySessionState) {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := sessionKey(state.UserID, state.ClassID, state.WeekNumber, state.TopicName)
	s.sessions[key] = state
	s.save()
}

func (s *DailySessionStore) DeleteSessionState(userID, classID string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := sessionKey(userID, classID, 0, "")
	delete(s.sessions, key)
	for sessionKey := range s.sessions {
		if strings.HasPrefix(sessionKey, key+"_unit_") {
			delete(s.sessions, sessionKey)
		}
	}
	s.save()
}

func (s *DailySessionStore) DeleteWeekSessionStates(userID, classID string, weekNumber int) {
	s.mu.Lock()
	defer s.mu.Unlock()
	prefix := sessionKey(userID, classID, 0, "") + "_unit_" + strconv.Itoa(weekNumber) + "_"
	for key := range s.sessions {
		if strings.HasPrefix(key, prefix) {
			delete(s.sessions, key)
		}
	}
	s.save()
}
