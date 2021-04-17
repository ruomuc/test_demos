/**
 * 冒泡排序
 * @param {number[]} nums
 * @param {number[]} order ASC-升序 DESC-降序
 */
function bubblePop (nums, order) {
  const length = nums.length
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        (nums[j] > nums[j + 1] && order === 'ASC') ||
        (nums[j] < nums[j + 1] && order === 'DESC')
      ) {
        const temp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = temp
      }
    }
  }
  return nums
}

const arr = [1, 2, 90, 29, 32, 17, 51, 100, 99, 3, 9, 8, 6, 2]
console.log(bubblePop(arr, 'ASC'))
console.log(bubblePop(arr, 'DESC'))
