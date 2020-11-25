package error_test

import (
	"errors"
	"testing"
)

func GetFibonacci(n int) (int, error) {
	if n < 2 || n > 10 {
		return 0, errors.New("n should be in [2,100]")
	}
	a, b := 1, 1
	for i := 0; i < n; i++ {
		tmep := a
		a = b
		b += tmep
	}
	return b, nil
}

func TestGetFibonacci(t *testing.T) {
	if val, err := GetFibonacci(110); err != nil {
		t.Error("----", err)
	} else {
		t.Log("----", val)
	}
}
