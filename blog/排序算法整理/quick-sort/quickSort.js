// 双指针法
function quickSort (arr, left, right, orderType) {
  if (left >= right) {
    return
  }
  let i = left
  let j = right
  // 选取基准元素
  let pivot = left
  while (i < j) {
    if (orderType === 'ASC') {
      while (arr[j] >= arr[pivot] && i < j) {
        j--
      }
      while (arr[i] <= arr[pivot] && i < j) {
        i++
      }
    } else if (orderType === 'DESC') {
      while (arr[j] <= arr[pivot] && i < j) {
        j--
      }
      while (arr[i] >= arr[pivot] && i < j) {
        i++
      }
    }

    let temp = arr[j]
    arr[j] = arr[i]
    arr[i] = temp
  }
  // 交换基准元素
  let temp = arr[pivot]
  arr[pivot] = arr[i]
  arr[i] = temp
  // 递归调用
  quickSort(arr, left, j - 1, orderType)
  quickSort(arr, j + 1, right, orderType)
}

const arr = [2, 1, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2]
quickSort(arr, 0, arr.length - 1, 'ASC')
console.log('ASC', arr)
quickSort(arr, 0, arr.length - 1, 'DESC')
console.log('DESC', arr)
