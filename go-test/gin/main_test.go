package main

import (
	"encoding/json"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

type PingBody struct {
	Message string `json:"message"`
}

func TestPingRouter(t *testing.T) {
	router := SetupRouter()

	w := httptest.NewRecorder()
	req := httptest.NewRequest("GET", "/ping", nil)
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
	b, _ := json.Marshal(PingBody{"pong"})
	t.Log("----", string(b), w.Body.String())
	assert.Equal(t, string(b), w.Body.String())
}
