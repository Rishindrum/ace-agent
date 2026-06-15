package auth

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
)

type UserSchedule struct {
	UserID        string `json:"user_id"`
	PreferredDays []int  `json:"preferred_days"`
	DailyPace     int    `json:"daily_pace"`
	CurrentStreak int    `json:"current_streak"`
}

type ScheduleStore struct {
	mu        sync.RWMutex
	schedules map[string]UserSchedule
	path      string
}

var GlobalScheduleStore *ScheduleStore

func InitScheduleStore(path string) {
	GlobalScheduleStore = &ScheduleStore{
		schedules: make(map[string]UserSchedule),
		path:      path,
	}
	GlobalScheduleStore.load()
}

func (s *ScheduleStore) load() {
	s.mu.Lock()
	defer s.mu.Unlock()
	file, err := os.Open(s.path)
	if err != nil {
		if os.IsNotExist(err) {
			return
		}
		fmt.Printf("[Schedule] Failed to load schedule store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewDecoder(file).Decode(&s.schedules)
}

func (s *ScheduleStore) save() {
	file, err := os.Create(s.path)
	if err != nil {
		fmt.Printf("[Schedule] Failed to save schedule store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewEncoder(file).Encode(s.schedules)
}

func (s *ScheduleStore) SaveSchedule(userID string, preferredDays []int, dailyPace int, currentStreak int) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	sched := UserSchedule{
		UserID:        userID,
		PreferredDays: preferredDays,
		DailyPace:     dailyPace,
		CurrentStreak: currentStreak,
	}
	s.schedules[userID] = sched
	s.save()
	return nil
}

func (s *ScheduleStore) GetSchedule(userID string) (UserSchedule, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	sched, ok := s.schedules[userID]
	return sched, ok
}

func (s *ScheduleStore) GetAllSchedules() []UserSchedule {
	s.mu.RLock()
	defer s.mu.RUnlock()
	list := make([]UserSchedule, 0, len(s.schedules))
	for _, v := range s.schedules {
		list = append(list, v)
	}
	return list
}
