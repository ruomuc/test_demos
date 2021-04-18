package main

import "fmt"

func main() {
	data := "deeedbbcccbdaa"
	k := 3
	ans := removeDuplicates(data, k)
	fmt.Println(ans)
}

func removeDuplicates(s string, k int) string {
	// 用两个栈，一个记录字符，一个记录字符出现的次数
	stack := make([]byte, 0)
	count := make([]int, 0)

	for i := range s {
		if i == 0 || len(stack) == 0 || s[i] != stack[len(stack)-1] {
			count = append(count, 1)
			stack = append(stack, s[i])
		} else {
			countTop := count[len(count)-1]
			fmt.Println(countTop, string(stack), count)
			if countTop+1 == k {
				stack = stack[:len(stack)-countTop]
				count = count[:len(count)-1]
			} else {
				count[len(count)-1] = countTop + 1
				stack = append(stack, s[i])
			}
		}
	}
	return string(stack)
}
