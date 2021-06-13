package main

import "fmt"

func main() {
	data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	selectionSort(data, "ASC")
	fmt.Println("ASC", data)
	selectionSort(data, "DESC")
	fmt.Println("DESC", data)
}

func selectionSort(nums []int, orderType string) {
	n := len(nums)
	for i := range nums[1:] {
		tempIdx := i
		if orderType == "ASC" {
			for j := i + 1; j < n; j++ {
				if nums[j] < nums[tempIdx] {
					tempIdx = j
				}
			}
		} else if orderType == "DESC" {
			for j := i + 1; j < n; j++ {
				if nums[j] > nums[tempIdx] {
					tempIdx = j
				}
			}
		}
		nums[i], nums[tempIdx] = nums[tempIdx], nums[i]
	}
}
