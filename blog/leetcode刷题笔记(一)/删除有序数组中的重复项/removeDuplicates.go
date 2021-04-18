package main

import "fmt"

func main() {
	data := []int{0, 0, 1, 1, 1, 2, 2, 3, 3, 4}
	ans := removeDuplicates(data)
	fmt.Println(ans, data[:ans])
}

func removeDuplicates(nums []int) int {
	n := len(nums)
	if n == 0 {
		return 0
	}
	pre := 1
	for cur := 1; cur < n; cur++ {
		if nums[cur] != nums[pre-1] {
			nums[pre] = nums[cur]
			pre++
		}
	}
	return pre
}
