### 题目

在`未排序的数组中`找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

示例 1:

```js
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

示例 2:

```js
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

说明:

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

### 解题

解法一: 排序。空间复杂度为 O(NlogN), 空间复杂度为 O(1)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  nums.sort((r1, r2) => r2 - r1)
  return nums[k - 1]
}
```

解法二: Todo 快速选择

思路: 本方法大致上与快速排序相同。简便起见，注意到第 k 个最大元素也就是第 N - k 个最小元素，因此可以用第 k 小算法来解决本问题。

![](http://with.muyunyun.cn/503d3b6311c2f401a50bcdb5c57f0f52.jpg)

算法复杂度为 O(n), 计算: n + (1/2) * n + (1/4) * n + ... + (1/2)^n * n, 经等比数列求和为 2n - 2n / 2^n, 当 n 趋于无穷大时,

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  let m = 0 // 挑选的中枢元素的下标
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < nums[m]) {
      [nums[m], nums[i]] = [nums[i], nums[m]]
      m = i
    }
  }

  if (m < nums.length - k) {

  }
}

var quickSelect = function(left, right) {

}
```

### 镜像题目

75