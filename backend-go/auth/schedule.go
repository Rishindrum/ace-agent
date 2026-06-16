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
	ClassID         string   `json:"class_id"`
	ClassName       string   `json:"class_name"`
	PreferredDays   []int    `json:"preferred_days"`
	DailyPace       int      `json:"daily_pace"`
	CurrentStreak   int      `json:"current_streak"`
	CourseStartDate string   `json:"course_start_date"`
	LastStudyDate   string   `json:"last_study_date"`
	Modifications   []string `json:"modifications"`
	ClassStreak     int      `json:"class_streak"`
	GlobalStreak    int      `json:"global_streak"`
	CalendarEnabled bool     `json:"calendar_enabled"`
	CalendarNotifs  bool     `json:"calendar_notifs"`
	DefaultQuizLen  int      `json:"default_quiz_len"`
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
	if err := DownloadFromGCS(s.path); err != nil {
		fmt.Printf("[Schedule] Warning: failed to download schedule store from GCS: %v\n", err)
	}
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
	if err := UploadToGCS(s.path); err != nil {
		fmt.Printf("[Schedule] Warning: failed to upload schedule store to GCS: %v\n", err)
	}
}

func (s *ScheduleStore) SaveSchedule(userID, classID, className string, preferredDays []int, dailyPace int, currentStreak int, courseStartDate string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := userID + "_" + classID
	existing, ok := s.schedules[key]
	lastStudyDate := ""
	var mods []string
	globalStreak := 0
	if ok {
		lastStudyDate = existing.LastStudyDate
		mods = existing.Modifications
		globalStreak = existing.GlobalStreak
	} else {
		for _, v := range s.schedules {
			if v.UserID == userID {
				globalStreak = v.GlobalStreak
				break
			}
		}
	}

	sched := UserSchedule{
		UserID:          userID,
		ClassID:         classID,
		ClassName:       className,
		PreferredDays:   preferredDays,
		DailyPace:       dailyPace,
		CurrentStreak:   currentStreak,
		ClassStreak:     currentStreak,
		GlobalStreak:    globalStreak,
		CourseStartDate: courseStartDate,
		LastStudyDate:   lastStudyDate,
		Modifications:   mods,
	}
	s.schedules[key] = sched
	s.save()
	return nil
}

func (s *ScheduleStore) SaveScheduleStruct(sched UserSchedule) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := sched.UserID + "_" + sched.ClassID
	sched.ClassStreak = sched.CurrentStreak
	s.schedules[key] = sched
	s.save()
	return nil
}

func (s *ScheduleStore) GetSchedule(userID, classID string) (UserSchedule, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	key := userID + "_" + classID
	sched, ok := s.schedules[key]
	return sched, ok
}

func (s *ScheduleStore) GetUpdatedSchedule(userID, classID string, now time.Time) (UserSchedule, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := userID + "_" + classID
	sched, ok := s.schedules[key]
	if !ok {
		return sched, false
	}

	classBroken := false
	if sched.CurrentStreak > 0 {
		prevPrefDay := GetPreviousPreferredDay(now, sched.PreferredDays)
		if sched.LastStudyDate == "" {
			classBroken = true
		} else {
			lastStudyTime, err := time.Parse("2006-01-02", sched.LastStudyDate)
			if err != nil {
				classBroken = true
			} else if IsBeforeDay(lastStudyTime, prevPrefDay) {
				classBroken = true
			}
		}

		if classBroken {
			sched.CurrentStreak = 0
			sched.ClassStreak = 0
			s.schedules[key] = sched
		}
	}

	var userScheds []UserSchedule
	for _, v := range s.schedules {
		if v.UserID == userID {
			userScheds = append(userScheds, v)
		}
	}

	globalPreferredDays := make(map[int]bool)
	for _, us := range userScheds {
		for _, d := range us.PreferredDays {
			globalPreferredDays[d] = true
		}
	}

	getPrevGlobalPrefDay := func() time.Time {
		if len(globalPreferredDays) == 0 {
			return now.AddDate(0, 0, -1)
		}
		for i := 1; i <= 7; i++ {
			prev := now.AddDate(0, 0, -i)
			if globalPreferredDays[int(prev.Weekday())] {
				return prev
			}
		}
		return now.AddDate(0, 0, -1)
	}

	prevGlobalPrefDay := getPrevGlobalPrefDay()

	maxLastStudyDate := ""
	for _, us := range userScheds {
		if us.LastStudyDate != "" {
			if maxLastStudyDate == "" || us.LastStudyDate > maxLastStudyDate {
				maxLastStudyDate = us.LastStudyDate
			}
		}
	}

	globalBroken := false
	currentGlobalStreak := 0
	for _, us := range userScheds {
		if us.GlobalStreak > currentGlobalStreak {
			currentGlobalStreak = us.GlobalStreak
		}
	}

	if currentGlobalStreak > 0 {
		if maxLastStudyDate == "" {
			globalBroken = true
		} else {
			lastGlobalStudyTime, err := time.Parse("2006-01-02", maxLastStudyDate)
			if err != nil {
				globalBroken = true
			} else if IsBeforeDay(lastGlobalStudyTime, prevGlobalPrefDay) {
				globalBroken = true
			}
		}

		if globalBroken {
			for k, v := range s.schedules {
				if v.UserID == userID {
					v.GlobalStreak = 0
					s.schedules[k] = v
				}
			}
			sched.GlobalStreak = 0
		}
	}

	s.save()
	return s.schedules[key], true
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

func (s *ScheduleStore) UpdateStreaks(userID, classID string, quizWeek int, now time.Time) (UserSchedule, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	key := userID + "_" + classID
	sched, ok := s.schedules[key]
	if !ok {
		return sched, false
	}

	var userScheds []UserSchedule
	for _, v := range s.schedules {
		if v.UserID == userID {
			userScheds = append(userScheds, v)
		}
	}

	startDate := sched.CourseStartDate
	if startDate == "" {
		startDate = now.Format("2006-01-02")
	}
	currentWeek := CalculateCurrentSyllabusWeek(startDate)

	isPreferredDay := false
	for _, d := range sched.PreferredDays {
		if d == int(now.Weekday()) {
			isPreferredDay = true
			break
		}
	}

	todayStr := now.Format("2006-01-02")

	alreadyStudiedTodayClass := (sched.LastStudyDate == todayStr)

	alreadyStudiedTodayGlobal := false
	maxLastStudyDate := ""
	for _, us := range userScheds {
		if us.LastStudyDate == todayStr {
			alreadyStudiedTodayGlobal = true
		}
		if us.LastStudyDate != "" {
			if maxLastStudyDate == "" || us.LastStudyDate > maxLastStudyDate {
				maxLastStudyDate = us.LastStudyDate
			}
		}
	}

	if quizWeek >= currentWeek {
		if isPreferredDay {
			prevPrefDay := GetPreviousPreferredDay(now, sched.PreferredDays)
			if sched.LastStudyDate == "" {
				sched.CurrentStreak = 1
				sched.ClassStreak = 1
				sched.LastStudyDate = todayStr
			} else {
				lastStudyTime, err := time.Parse("2006-01-02", sched.LastStudyDate)
				if err != nil {
					sched.CurrentStreak = 1
					sched.ClassStreak = 1
					sched.LastStudyDate = todayStr
				} else if IsSameDay(lastStudyTime, now) {
					// Already studied today. Do nothing to class streak.
				} else if IsBeforeDay(lastStudyTime, prevPrefDay) {
					sched.CurrentStreak = 1
					sched.ClassStreak = 1
					sched.LastStudyDate = todayStr
				} else {
					sched.CurrentStreak = sched.CurrentStreak + 1
					sched.ClassStreak = sched.CurrentStreak
					sched.LastStudyDate = todayStr
				}
			}
		} else {
			sched.LastStudyDate = todayStr
		}
	}

	globalPreferredDays := make(map[int]bool)
	for _, us := range userScheds {
		for _, d := range us.PreferredDays {
			globalPreferredDays[d] = true
		}
	}

	getPrevGlobalPrefDay := func() time.Time {
		if len(globalPreferredDays) == 0 {
			return now.AddDate(0, 0, -1)
		}
		for i := 1; i <= 7; i++ {
			prev := now.AddDate(0, 0, -i)
			if globalPreferredDays[int(prev.Weekday())] {
				return prev
			}
		}
		return now.AddDate(0, 0, -1)
	}

	prevGlobalPrefDay := getPrevGlobalPrefDay()

	currentGlobalStreak := 0
	for _, us := range userScheds {
		if us.GlobalStreak > currentGlobalStreak {
			currentGlobalStreak = us.GlobalStreak
		}
	}

	newGlobalStreak := currentGlobalStreak

	if quizWeek >= currentWeek && isPreferredDay && !alreadyStudiedTodayClass {
		if !alreadyStudiedTodayGlobal {
			if maxLastStudyDate == "" {
				newGlobalStreak = 1
			} else {
				lastGlobalStudyTime, err := time.Parse("2006-01-02", maxLastStudyDate)
				if err != nil {
					newGlobalStreak = 1
				} else if IsBeforeDay(lastGlobalStudyTime, prevGlobalPrefDay) {
					newGlobalStreak = 1
				} else {
					newGlobalStreak = currentGlobalStreak + 1
				}
			}
		}
	}

	sched.GlobalStreak = newGlobalStreak
	sched.ClassStreak = sched.CurrentStreak
	s.schedules[key] = sched

	for k, v := range s.schedules {
		if v.UserID == userID {
			v.GlobalStreak = newGlobalStreak
			s.schedules[k] = v
		}
	}

	s.save()
	return s.schedules[key], true
}

func (s *ScheduleStore) DeleteSchedule(userID, classID string) {
	s.mu.Lock()
	defer s.mu.Unlock()
	key := userID + "_" + classID
	delete(s.schedules, key)
	s.save()
}

