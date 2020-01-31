### title

Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

Example:

```js
Given array nums = [-1, 2, 1, -4], and target = 1.

The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

### analyze

1.排序;
2.有个巧妙的地方, 比较三个数之和与 target 的大小, 具体看题解;

```js
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
      // 分别对应左、中、右三个下标对应的值
      sum = nums[i] + nums[l] + nums[r]
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
}
```

### Sister Title

1、15、18