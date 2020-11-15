package customertypetest

import (
	"fmt"
	"testing"
	"time"
)

type IntConv func(op int) int

func TimeSpent(inner IntConv) IntConv {
	return func(n int) int {
		start := time.Now()
		res := inner(n)
		fmt.Println("time spent:", time.Since(start).Seconds())
		return res
	}
}

func TestCustomer(t *testing.T) {
	TimeSpent(slowFunc)(11)
}

func slowFunc(op int) int {
	time.Sleep(time.Second * 2)
	return op
}
