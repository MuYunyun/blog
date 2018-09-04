/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let i = 0
  while (i < nums.length) {
    if (target <= nums[i]) {
      return i
    }

    if (target > nums[nums.length - 1]) {
      return nums.length
    }
    i++
  }
};