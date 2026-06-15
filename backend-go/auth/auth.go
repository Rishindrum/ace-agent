package auth

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var (
	jwtKey = []byte("ace-agent-secret-key") // Default key
)

type User struct {
	UserID       string `json:"user_id"`
	Username     string `json:"username"`
	PasswordHash string `json:"password_hash"`
}

type UserStore struct {
	mu    sync.RWMutex
	users map[string]User
	path  string
}

var GlobalUserStore *UserStore

func InitUserStore(path string) {
	GlobalUserStore = &UserStore{
		users: make(map[string]User),
		path:  path,
	}
	GlobalUserStore.load()
}

func (s *UserStore) load() {
	s.mu.Lock()
	defer s.mu.Unlock()
	if err := DownloadFromGCS(s.path); err != nil {
		fmt.Printf("[Auth] Warning: failed to download user store from GCS: %v\n", err)
	}
	file, err := os.Open(s.path)
	if err != nil {
		if os.IsNotExist(err) {
			return
		}
		fmt.Printf("[Auth] Failed to load user store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewDecoder(file).Decode(&s.users)
}

func (s *UserStore) save() {
	file, err := os.Create(s.path)
	if err != nil {
		fmt.Printf("[Auth] Failed to save user store: %v\n", err)
		return
	}
	defer file.Close()
	json.NewEncoder(file).Encode(s.users)
	if err := UploadToGCS(s.path); err != nil {
		fmt.Printf("[Auth] Warning: failed to upload user store to GCS: %v\n", err)
	}
}

func (s *UserStore) Register(username, password string) (string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Check if username already exists
	for _, u := range s.users {
		if u.Username == username {
			return "", errors.New("username already exists")
		}
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	userID := fmt.Sprintf("u-%d", time.Now().UnixNano())
	user := User{
		UserID:       userID,
		Username:     username,
		PasswordHash: string(hash),
	}
	s.users[userID] = user
	s.save()
	return userID, nil
}

func (s *UserStore) Login(username, password string) (string, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var matchedUser *User
	for _, u := range s.users {
		if u.Username == username {
			matchedUser = &u
			break
		}
	}

	if matchedUser == nil {
		return "", errors.New("invalid username or password")
	}

	err := bcrypt.CompareHashAndPassword([]byte(matchedUser.PasswordHash), []byte(password))
	if err != nil {
		return "", errors.New("invalid username or password")
	}

	return matchedUser.UserID, nil
}

type Claims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

func GenerateToken(userID string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func ParseToken(tokenStr string) (string, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		return "", errors.New("invalid token")
	}
	return claims.UserID, nil
}

type contextKey string

const (
	UserIDKey contextKey = "user_id"
	TokenKey  contextKey = "token"
)

// JWTMiddleware extracts user_id and injects it into request context
func JWTMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		var tokenStr string
		authHeader := r.Header.Get("Authorization")
		if len(authHeader) >= 8 && authHeader[:7] == "Bearer " {
			tokenStr = authHeader[7:]
		} else if qToken := r.URL.Query().Get("token"); qToken != "" {
			tokenStr = qToken
		} else if qState := r.URL.Query().Get("state"); qState != "" {
			tokenStr = qState
		}

		if tokenStr == "" {
			http.Error(w, "Unauthorized: Missing Token", http.StatusUnauthorized)
			return
		}

		userID, err := ParseToken(tokenStr)
		if err != nil {
			http.Error(w, "Unauthorized: "+err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(r.Context(), UserIDKey, userID)
		ctx = context.WithValue(ctx, TokenKey, tokenStr)
		next(w, r.WithContext(ctx))
	}
}

// GetUserID retrieves the user_id from context
func GetUserID(ctx context.Context) string {
	if val := ctx.Value(UserIDKey); val != nil {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

// GetToken retrieves the token from context
func GetToken(ctx context.Context) string {
	if val := ctx.Value(TokenKey); val != nil {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

// GetOrCreateUserByUsername looks up a user by username (email) or registers them if not found.
func (s *UserStore) GetOrCreateUserByUsername(username string) (string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	// Look for existing user
	for _, u := range s.users {
		if u.Username == username {
			return u.UserID, nil
		}
	}

	// Create new user if not found
	userID := fmt.Sprintf("u-%d", time.Now().UnixNano())
	hash, err := bcrypt.GenerateFromPassword([]byte("google-oauth-placeholder-pass"), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	user := User{
		UserID:       userID,
		Username:     username,
		PasswordHash: string(hash),
	}
	s.users[userID] = user
	s.save()
	return userID, nil
}

