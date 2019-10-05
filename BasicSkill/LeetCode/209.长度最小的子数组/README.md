### 题目: 长度最小的子数组

给定一个含有 n 个正整数的数组和一个正整数 s, 找出该数组中满足其和 ≥ s 的长度最小的连续子数组。如果不存在符合条件的连续子数组，返回 0。

示例: 

```js
输入: s = 7, nums = [2,3,1,2,4,3]
输出: 2
解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
```

进阶:

如果你已经完成了 `O(n)` 时间复杂度的解法, 请尝试 `O(nlogn)` 时间复杂度的解法。

### 解题

思路: `滑动列表`。时间复杂度为 `O(n)`, 空间复杂度为 `1`。

1. 取滑动列表 [left, right];
2. 若列表 [left, right] 中的取值之和小于 s, 则列表的有边界 right 往右扩张。
3. 若列表 [left, right] 中的取值之和大于 s, 则列表的左边界 left 往右扩张。

```js
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
  let left = 0, right = -1 // [left, right], 左闭右闭
  let minDistance = nums.length + 1 // 存储 left 与 right 间的距离
  let sum = 0 // [left, right] 间值的总和
  while (left < nums.length - 1) {
    if (right < nums.length - 1 && sum < s) {
      right++
      sum = sum + nums[right]
    } else {
      sum = sum - nums[left]
      left++
    }
    if (sum >= s) {
      minDistance = Math.min(minDistance, right - left + 1)
    }
  }

  if (minDistance === nums.length + 1) return 0

  return minDistance
}
```

### 相关题目