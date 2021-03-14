package functest

import (
	"fmt"
	"testing"
	"time"
)

func TestFn(t *testing.T) {
	TimeSpent(slowFunc)(11)
}

func TimeSpent(inner func(op int) int) func(op int) int {
	return func(n int) int {
		start := time.Now()
		res := inner(n)
		fmt.Println("time spent:", time.Since(start).Seconds())
		return res
	}
}

func slowFunc(op int) int {
	time.Sleep(time.Second * 2)
	return op
}
