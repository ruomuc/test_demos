/**
 * 插入排序
 * @param {*} nums 需要排序的数组
 * @param {*} order ASC-升序 DESC-降序
 */
function insertSort (nums, order) {
  for (let i = 1, length = nums.length; i < length; i++) {
    const key = nums[i]
    let j = i - 1
    if (order === 'ASC') {
      while (j >= 0 && nums[j] > key) {
        nums[j + 1] = nums[j]
        j--
      }
    } else if (order === 'DESC') {
      while (j >= 0 && nums[j] < key) {
        nums[j + 1] = nums[j]
        j--
      }
    }
    nums[j + 1] = key
  }
  return nums
}

// const arr = [2, 1, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2]
const arr = [1,2,3,4,5,6]

console.log(insertSort(arr, 'ASC'))
console.log(insertSort(arr, 'DESC'))
