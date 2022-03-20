### 416. Partition Equal Subset Sum

Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:

```js
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
```

Example 2:

```js
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
```

Constraints:

* 1 <= nums.length <= 200
* 1 <= nums[i] <= 100

### Analyze

1. 若数组中所有元素相加之和为奇数，则不满足。
2. 判断数组中部分元素相加之和是否达到 sum / 2。

#### 递归

两个子数组中的值之和相等条件为：对于任何一子数组，sum / 2 刚好分配完。

过程：

* 使用 nums[i]，剩余背包为 target = target - nums[i]，在 [i + 1, nums.length - 1] 区间内找寻。
* 没有使用 nums[i]，剩余背包为 target，在 [i + 1, nums.length - 1] 区间内找寻。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  const result = recursive(nums, 0, sum / 2, {})
  return result
}

var recursive = function(nums, index, target, cache) {
  if (target < 0 || index === nums.length) return false
  if (target === 0) return true
  if (typeof cache[`${index}-${target}`] === 'boolean') {
    return cache[`${index}-${target}`]
  }

  return cache[`${index}-${target}`] = (recursive(nums, index + 1, target - nums[index], cache)
    || recursive(nums, index + 1, target, cache))
}
```

#### 动态规划

在上文递归题解中，核心思路是通过 target = target || (target - nums[i]) 来对数组中的剩余部分来递归计算。

我们也可以使用动态规划。

以 `nums = [1,5,11,5]` 为例进行分析：

* 初始状态：
* 状态转移：dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]]
  * dp[i][j] 的语义：在 nums 数组 0 到 i 的范围内，挑选若干个值，使它们之和为 j。

| 物品容量\背包容量 | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   |
| :---------------- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| nums[0]: 1        | T    | T    | F    | F    | F    | F    | F    | F    | F    | F    | F    | F    |
| nums[1]: 5        | T    | T    | F    | F    | F    | T    | T    | F    | F    | F    | F    | F    |
| nums[2]: 11       | T    | T    | F    | F    | F    | T    | T    | F    | F    | F    | F    | T    |
| nums[3]: 5        | T    | T    | F    | F    | F    | T    | T    | F    | F    | F    | T    | T    |

> dp[i][0] 声明为 true，可以理解为视场景决定的兜底，比如 dp[1][5] = dp[0][5] || dp[0][0] = false || dp[0][0]，推理得 dp[0][0] 应为 true。

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
  }
  if (sum % 2 !== 0) return false
  const target = sum / 2
  // [[pick, no pick]]
  const arr = [
    [nums[0], 0]
  ]
  for (let i = 1; i < nums.length; i++) {
    arr[i] = [
arr[i - 1][0] + nums[i]
    ]
  }

  return false
}
```
