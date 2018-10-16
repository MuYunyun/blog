/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let [j, k] = [0, nums.length - 1]
  for (let i = 0; i <= k; i++) {
    if (nums[i] === 0) {
      [nums[i], nums[j]] = [nums[j], nums[i]]
      j++
    }

    if (nums[i] === 2) {
      [nums[i], nums[k]] = [nums[k], nums[i]]
      i--
      k--
    }
  }
};