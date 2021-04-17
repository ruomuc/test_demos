package main

import "fmt"

func main() {
	data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	asc := bubblePop(data, "ASC")
	fmt.Println(asc)
	desc := bubblePop(data, "DESC")
	fmt.Println(desc)
}

func bubblePop(nums []int, order string) []int {
	for i := range nums {
		for j := 0; j < len(nums)-i-1; j++ {
			if nums[j] > nums[j+1] && order == "ASC" || nums[j] < nums[j+1] && order == "DESC" {
				nums[j], nums[j+1] = nums[j+1], nums[j]
			}
		}
	}
	return nums
}
