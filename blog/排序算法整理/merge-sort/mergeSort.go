package main

import "fmt"

func main() {
	data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	mergeSort(data, "ASC")
	fmt.Println("升序:", data)
	mergeSort(data, "DESC")
	fmt.Println("降序:", data)
}

func mergeSort(nums []int, order string) {
	var divide func(left, right int)
	var merge func(left, right, mid int)

	divide = func(left, right int) {
		if left >= right {
			return
		}
		mid := (left + right) / 2
		divide(left, mid)
		divide(mid+1, right)
		merge(left, right, mid)
	}

	merge = func(left, right, mid int) {
		temp := make([]int, 0)
		p1, p2 := left, mid+1

		if order == "ASC" {
			for p1 <= mid && p2 <= right {
				// 升序小的在前
				if nums[p1] <= nums[p2] {
					temp = append(temp, nums[p1])
					p1++
				} else {
					temp = append(temp, nums[p2])
					p2++
				}
			}
		} else if order == "DESC" {
			for p1 <= mid && p2 <= right {
				// 降序大的在前
				if nums[p1] >= nums[p2] {
					temp = append(temp, nums[p1])
					p1++
				} else {
					temp = append(temp, nums[p2])
					p2++
				}
			}
		}

		// 处理单边的情况
		for p1 <= mid {
			temp = append(temp, nums[p1])
			p1++
		}
		for p2 <= right {
			temp = append(temp, nums[p2])
			p2++
		}
		// 把排好序的元素，拷贝到源数组上
		for i := left; i <= right; i++ {
			nums[i] = temp[0]
			temp = temp[1:]
		}
	}
	divide(0, len(nums)-1)
}
