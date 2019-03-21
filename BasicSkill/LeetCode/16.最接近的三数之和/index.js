/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let sum = 0
  let close = nums[0] + nums[1] + nums[2]
  let sortedNums = nums.sort((a, b) => a - b)

  for (let i = 0; i < sortedNums.length; i++) {
    let l = i + 1, r = sortedNums.length - 1
    while (l < r) {
      sum = nums[i] + nums[l] + nums[r] // 分别对应左、中、右
      if (Math.abs(sum - target) < Math.abs(close - target)) {
        close = sum
      }

      if (sum < target) {
        l++
      } else if (sum > target) {
        r--
      } else {
        return sum
      }

    }

  }

  return close
};