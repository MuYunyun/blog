/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const cacheObj = {}
  let count = 0
  while (count < nums.length) {
    if (cacheObj[nums[count]]) {
      nums.splice(count, 1)
      count--
    } else {
      cacheObj[nums[count]] = nums[count].toString() // 防止 0 被判断为 false
    }
    count++
  }
  return nums.length
};