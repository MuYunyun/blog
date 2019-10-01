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

解法二: 快速选择

思路: 本方法大致上与快速排序相同。简便起见，注意到第 k 个最大元素也就是升序排序后下标为 `N - k` 的元素。递归使用[划分算法](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/划分算法.md)。

* 使用划分算法, 定义一个枢纽值, 并将其放到指定位置(小于该枢纽值的都在其左边, 大于该枢纽值的都在其右边);
* 比较枢纽值的下标 m 与 N - k 的大小关系

![](http://with.muyunyun.cn/503d3b6311c2f401a50bcdb5c57f0f52.jpg)

> 算法复杂度为 O(n)。计算: `n + (1/2) * n + (1/4) * n + ... + (1/2)^n * n`, 经等比数列求和为 `2n - 2n / 2^n`, 当 n 趋于无穷大时, 结果趋近为 2n。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  const length = nums.length
  return quickSelect(0, length - 1, length - k, nums)
}

var quickSelect = function(left, right, kthSmall, arr) {
  const position = partition(arr, left, right)
  if (position === kthSmall) {
    return arr[position]
  } else if (position < kthSmall) {
    return quickSelect(position + 1, right, kthSmall, arr)
  } else if (position > kthSmall) {
    return quickSelect(left, position - 1, kthSmall, arr)
  }
}

/* 分区算法 */
function partition(nums, left, right) {
  const pivot = nums[left] // 枢纽值
  let pos = left           // 用来记住最后枢纽值 pivot 应该置于的位置
  for (let i = left + 1; i <= right; i++) {
    if (nums[i] < pivot) {
      pos++
      swap(nums, pos, i)
    }
  }
  swap(nums, pos, left)
  return pos
}

/* 交换位置
  nums 数组, a, b 为下标
*/
var swap = function(nums, a, b) {
  const tmp = nums[a]
  nums[a] = nums[b]
  nums[b] = tmp
}
```

### 镜像题目

75