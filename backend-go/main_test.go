package main

import "testing"

func TestAllowedOAuthReturnOrigin(t *testing.T) {
	t.Setenv("FRONTEND_URL", "https://ace.example.com/")

	tests := []struct {
		name   string
		origin string
		want   bool
	}{
		{"local Angular app", "http://localhost:4200", true},
		{"local IP", "http://127.0.0.1:4200", true},
		{"configured production app", "https://ace.example.com", true},
		{"different local port", "http://localhost:4201", false},
		{"untrusted host", "https://evil.example.com", false},
		{"user info", "https://ace.example.com@evil.example.com", false},
		{"redirect path", "https://ace.example.com/other", false},
		{"query string", "https://ace.example.com?next=evil", false},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			_, ok := allowedOAuthReturnOrigin(test.origin)
			if ok != test.want {
				t.Fatalf("allowedOAuthReturnOrigin(%q) = %t, want %t", test.origin, ok, test.want)
			}
		})
	}
}
