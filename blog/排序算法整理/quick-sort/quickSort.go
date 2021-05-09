package main

import "fmt"

func main() {
	data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	quickSort(data, 0, len(data)-1, "ASC")
	fmt.Println("ASC", data)
	quickSort(data, 0, len(data)-1, "DESC")
	fmt.Println("DESC", data)
}

func quickSort(arr []int, left int, right int, order string) {
	if left >= right {
		return
	}
	i, j := left, right
	// 选取基准元素
	pivot := left
	for i < j {
		if order == "ASC" {
			for arr[j] >= arr[pivot] && i < j {
				j--
			}
			for arr[i] <= arr[pivot] && i < j {
				i++
			}
		}
		if order == "DESC" {
			for arr[j] <= arr[pivot] && i < j {
				j--
			}
			for arr[i] >= arr[pivot] && i < j {
				i++
			}
		}
		arr[i], arr[j] = arr[j], arr[i]
	}
	arr[i], arr[pivot] = arr[pivot], arr[i]
	// 递归处理
	quickSort(arr, left, j-1, order)
	quickSort(arr, j+1, right, order)
}
