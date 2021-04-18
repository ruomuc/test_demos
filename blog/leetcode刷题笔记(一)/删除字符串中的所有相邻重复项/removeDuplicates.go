package main

import "fmt"

func main() {
	data := "abbaca"
	ans := removeDuplicates(data)
	fmt.Println(ans)
}

func removeDuplicates(s string) string {
	stack := make([]byte, 0)
	for i := range s {
		if len(stack) > 0 && stack[len(stack)-1] == s[i] {
			stack = stack[:len(stack)-1]
		} else {
			stack = append(stack, s[i])
		}
	}
	return string(stack)
}
