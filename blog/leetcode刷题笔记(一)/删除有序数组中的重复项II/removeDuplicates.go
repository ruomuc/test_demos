package main

import "fmt"

func main() {
	data := []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	ans := removeDuplicates(data)
	fmt.Println(ans, data[:ans])
}

func removeDuplicates(nums []int) int {
	n := len(nums)
	if n <= 2 {
		return n
	}

	pre := 2
	for cur := 2; cur < n; cur++ {
		if nums[pre-2] != nums[cur] {
			nums[pre] = nums[cur]
			pre++
		}
	}
	return pre
}
