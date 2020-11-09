package fib

import (
	"testing"
)

func TestFibFirst(t *testing.T) {
	a, b := 1, 1
	t.Log(a)
	for i := 0; i < 5; i++ {
		t.Log(b)
		tmep := a
		a = b
		b += tmep
	}
}
