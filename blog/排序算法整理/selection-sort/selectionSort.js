function selectionSort (arr, orderType) {
  let len = arr.length
  for (let i = 0; i < len - 1; i++) {
    let tempIdx = i
    let temp
    if (orderType === 'ASC') {
      // 寻找最小的数
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[tempIdx]) {
          tempIdx = j
        }
      }
    } else if (orderType === 'DESC') {
      // 寻找最大的数
      for (let j = i + 1; j < len; j++) {
        if (arr[j] > arr[tempIdx]) {
          tempIdx = j
        }
      }
    }
    // 交换元素
    temp = arr[i]
    arr[i] = arr[tempIdx]
    arr[tempIdx] = temp
  }
  return arr
}

const arr = [1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2]
console.log(selectionSort(arr, 'ASC'))
console.log(selectionSort(arr, 'DESC'))
