package main

import "fmt"

func main() {
	data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	asc := insertSort(data, "ASC")
	fmt.Println(asc)
	desc := insertSort(data, "DESC")
	fmt.Println(desc)
}

func insertSort(nums []int, order string) []int {
	for i := 1; i < len(nums); i++ {
		key := nums[i]
		j := i - 1
		if order == "ASC" {
			for j >= 0 && nums[j] > key {
				nums[j+1] = nums[j]
				j--
			}
		} else if order == "DESC" {
			for j >= 0 && nums[j] < key {
				nums[j+1] = nums[j]
				j--
			}
		}
		nums[j+1] = key
	}
	return nums
}
