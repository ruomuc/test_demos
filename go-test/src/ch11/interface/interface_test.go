package interfacetest

import (
	"fmt"
	"reflect"
	"testing"
)

type Programmer interface {
	WriteHelloWorld() string
}

type GoProgrammer struct {
}

func (gop *GoProgrammer) WriteHelloWorld() string {
	return "fmt.Println(\"Hello World!\")"
}

func TestInterface(t *testing.T) {
	var p Programmer
	p = new(GoProgrammer)
	t.Log(p.WriteHelloWorld())
	fmt.Println(reflect.TypeOf(p))
}
