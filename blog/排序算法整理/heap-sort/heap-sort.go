package main

import "fmt"

func main() {
	// data := []int{1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2}
	data := []int{2, 5, 1, 4, 3}
	heapSort(data, "ASC")
	fmt.Println("ASC", data)
	heapSort(data, "DESC")
	fmt.Println("DESC", data)
}

func heapSort(arr []int, orderType string) {
	length := len(arr)
	if orderType == "ASC" {
		// 创建最大堆
		buildMaxHeap(arr, length)
		// 把堆顶元素放到数组最后
		// 然后调整除了最后一个元素的最大堆
		// 重复
		for i := length - 1; i >= 0; i-- {
			arr[0], arr[i] = arr[i], arr[0]
			length--
			maxHeadpify(arr, 0, length)
		}
	} else if orderType == "DESC" {
		// 创建最小堆
		buildMinHeap(arr, length)
		for i := length - 1; i >= 0; i-- {
			arr[0], arr[i] = arr[i], arr[0]
			length--
			minHeadpify(arr, 0, length)
		}
	}
}

// 建立最大堆
func buildMaxHeap(arr []int, length int) {
	for i := length / 2; i >= 0; i-- {
		maxHeadpify(arr, i, length)
	}
}

// 调整最大堆
func maxHeadpify(arr []int, i, length int) {
	left := 2*i + 1
	right := 2*i + 2
	largest := i

	if left < length && arr[left] > arr[largest] {
		largest = left
	}
	if right < length && arr[right] > arr[largest] {
		largest = right
	}
	if largest != i {
		arr[i], arr[largest] = arr[largest], arr[i]
	}
}

// 创建最小堆
func buildMinHeap(arr []int, length int) {
	for i := length / 2; i >= 0; i-- {
		minHeadpify(arr, i, length)
	}
}

// 调整最小堆
func minHeadpify(arr []int, i, length int) {
	left := 2*i + 1
	right := 2*i + 2
	minimum := i

	if left < length && arr[left] < arr[minimum] {
		minimum = left
	}
	if right < length && arr[right] < arr[minimum] {
		minimum = right
	}
	if minimum != i {
		arr[i], arr[minimum] = arr[minimum], arr[i]
	}
}
