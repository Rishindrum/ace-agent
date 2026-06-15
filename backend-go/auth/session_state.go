package auth

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
	"time"
)

type DailySessionState struct {
	UserID             string `json:"user_id"`
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
}

func (s *DailySessionStore) GetSessionState(userID string) DailySessionState {
	s.mu.Lock()
	defer s.mu.Unlock()

	today := time.Now().Format("2006-01-02")
	state, ok := s.sessions[userID]
	if !ok || state.Date != today {
		state = DailySessionState{
			UserID:             userID,
			Date:               today,
			LessonCompleted:    false,
			ExercisesCompleted: false,
			QuizUnlocked:       false,
		}
		s.sessions[userID] = state
		s.save()
	}
	return state
}

func (s *DailySessionStore) SaveSessionState(state DailySessionState) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.sessions[state.UserID] = state
	s.save()
}
