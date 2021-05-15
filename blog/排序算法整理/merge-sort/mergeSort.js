/**
 * 归并排序
 * @param {*} nums 需要排序的数组
 * @param {*} order ASC-升序 DESC-降序
 */
function mergeSort (nums, order) {
  const n = nums.length
  var divide = function (left, right) {
    if (left >= right) {
      return
    }
    const mid = parseInt((left + right) / 2)
    divide(left, mid)
    divide(mid + 1, right)
    merge(left, right, mid)
  }

  var merge = function (left, right, mid) {
    const temp = []
    let p1 = left
    let p2 = mid + 1

    // 合并
    if (order === 'ASC') {
      while (p1 <= mid && p2 <= right) {
        if (nums[p1] <= nums[p2]) {
          temp.push(nums[p1])
          p1++
        } else {
          temp.push(nums[p2])
          p2++
        }
      }
    } else if (order === 'DESC') {
      while (p1 <= mid && p2 <= right) {
        if (nums[p1] >= nums[p2]) {
          temp.push(nums[p1])
          p1++
        } else {
          temp.push(nums[p2])
          p2++
        }
      }
    }

    // 处理单边的情况
    while (p1 <= mid) {
      temp.push(nums[p1])
      p1++
    }
    while (p2 <= right) {
      temp.push(nums[p2])
      p2++
    }
    // 拷贝temp排好序的元素到源数组
    for (let i = left; i <= right; i++) {
      nums[i] = temp.shift()
    }
  }
  divide(0, nums.length - 1)
  return nums
}

const arr = [2, 1, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2]
console.log('升序', mergeSort(arr, 'ASC'))
console.log('降序', mergeSort(arr, 'DESC'))
