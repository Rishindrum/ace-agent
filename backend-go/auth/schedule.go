package auth

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
	"time"
)

type UserSchedule struct {
	UserID          string   `json:"user_id"`
	PreferredDays   []int    `json:"preferred_days"`
	DailyPace       int      `json:"daily_pace"`
	CurrentStreak   int      `json:"current_streak"`
	CourseStartDate string   `json:"course_start_date"`
	LastStudyDate   string   `json:"last_study_date"`
	Modifications   []string `json:"modifications"`
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

func (s *ScheduleStore) SaveSchedule(userID string, preferredDays []int, dailyPace int, currentStreak int, courseStartDate string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	existing, ok := s.schedules[userID]
	lastStudyDate := ""
	var mods []string
	if ok {
		lastStudyDate = existing.LastStudyDate
		mods = existing.Modifications
	}

	sched := UserSchedule{
		UserID:          userID,
		PreferredDays:   preferredDays,
		DailyPace:       dailyPace,
		CurrentStreak:   currentStreak,
		CourseStartDate: courseStartDate,
		LastStudyDate:   lastStudyDate,
		Modifications:   mods,
	}
	s.schedules[userID] = sched
	s.save()
	return nil
}

func (s *ScheduleStore) SaveScheduleStruct(sched UserSchedule) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.schedules[sched.UserID] = sched
	s.save()
	return nil
}

func (s *ScheduleStore) GetSchedule(userID string) (UserSchedule, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	sched, ok := s.schedules[userID]
	return sched, ok
}

func (s *ScheduleStore) GetUpdatedSchedule(userID string, now time.Time) (UserSchedule, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	sched, ok := s.schedules[userID]
	if !ok {
		return sched, false
	}

	if sched.CurrentStreak > 0 {
		prevPrefDay := GetPreviousPreferredDay(now, sched.PreferredDays)
		broken := false
		if sched.LastStudyDate == "" {
			broken = true
		} else {
			lastStudyTime, err := time.Parse("2006-01-02", sched.LastStudyDate)
			if err != nil {
				broken = true
			} else if IsBeforeDay(lastStudyTime, prevPrefDay) {
				broken = true
			}
		}

		if broken {
			sched.CurrentStreak = 0
			s.schedules[userID] = sched
			s.save()
		}
	}

	return sched, true
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

func CalculateCurrentSyllabusWeek(startDateStr string) int {
	t, err := time.Parse("2006-01-02", startDateStr)
	if err != nil {
		return 1
	}
	days := int(time.Since(t).Hours() / 24)
	if days < 0 {
		return 1
	}
	return (days / 7) + 1
}

// Custom Streak Math helpers

func GetPreviousPreferredDay(t time.Time, preferredDays []int) time.Time {
	if len(preferredDays) == 0 {
		return t.AddDate(0, 0, -1) // Fallback to yesterday
	}
	isPreferred := make(map[int]bool)
	for _, d := range preferredDays {
		isPreferred[d] = true
	}
	for i := 1; i <= 7; i++ {
		prev := t.AddDate(0, 0, -i)
		weekday := int(prev.Weekday())
		if isPreferred[weekday] {
			return prev
		}
	}
	return t.AddDate(0, 0, -1)
}

func IsSameDay(t1, t2 time.Time) bool {
	return t1.Year() == t2.Year() && t1.Month() == t2.Month() && t1.Day() == t2.Day()
}

func IsBeforeDay(t1, t2 time.Time) bool {
	if t1.Year() < t2.Year() {
		return true
	}
	if t1.Year() > t2.Year() {
		return false
	}
	if t1.Month() < t2.Month() {
		return true
	}
	if t1.Month() > t2.Month() {
		return false
	}
	return t1.Day() < t2.Day()
}

func CanModifySchedule(sched UserSchedule, now time.Time) (bool, string) {
	currentYear, currentMonth, _ := now.Date()
	currentWeekYear, currentWeekNo := now.ISOWeek()

	monthCount := 0
	weekCount := 0

	for _, modStr := range sched.Modifications {
		modTime, err := time.Parse(time.RFC3339, modStr)
		if err != nil {
			continue
		}
		modYear, modMonth, _ := modTime.Date()
		if modYear == currentYear && modMonth == currentMonth {
			monthCount++
		}

		modWeekYear, modWeekNo := modTime.ISOWeek()
		if modWeekYear == currentWeekYear && modWeekNo == currentWeekNo {
			weekCount++
		}
	}

	if monthCount >= 2 {
		return false, "You have reached your limit of 2 schedule modifications per calendar month."
	}
	if weekCount >= 1 {
		return false, "You have reached your limit of 1 schedule modification per calendar week."
	}

	return true, ""
}
