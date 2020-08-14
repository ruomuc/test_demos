package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	var s, sep string
	for i := 1; i < len(os.Args); i++ {
		s += sep + os.Args[i] // 和c++ 、 js一样，`+`表示字符串的连接
		sep = " "
	}
	fmt.Println(s)

	var s2, sep2 string
	for _, value := range os.Args[1:] {
		s2 += sep2 + value
		sep2 = " "
	}
	fmt.Println(s2)

	fmt.Println(os.Args[1:])
	fmt.Println(strings.Join(os.Args[1:], " "))
}
