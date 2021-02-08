package const_test

import "testing"

const (
	Monday = iota + 1
	Tuesday
	Wednesday
)

const (
	Readable = 1 << iota
	Wirteable
	Executable
)

func TestConstFirstTry(t *testing.T) {
	t.Log(Monday, Tuesday, Wednesday)
}

func TestConstSecondTry(t *testing.T) {
	a := 7
	t.Log(Readable, Wirteable, Executable)
	t.Log(a&Readable, a&Wirteable, a&Executable)
}
