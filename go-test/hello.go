package main

import "fmt"

func main() {
	fmt.Println("hello world!")

	var i int
	var f float64
	var b bool
	var s string
	fmt.Printf("%v %v %v %q\n", i, f, b, s)

	var a int
	a = 4
	var ptr *int
	ptr = &a
	fmt.Println("a的值为", a)
	fmt.Println("*ptr的值为", *ptr)
	fmt.Println("ptr的值为", ptr)
}
