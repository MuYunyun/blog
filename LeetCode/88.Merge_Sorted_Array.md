### 题目

给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。

说明:

* 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
* 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

示例:

```js
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

### 解题

解法一: 运用 JavaScript 提供的 sort 函数来排序函数。时间复杂度 O(nLogn)

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  const length = nums1.length
  for (let i = 0; i < length - m; i++) {
    nums1.pop()
  }
  for (let i = 0; i < n; i++) {
    nums1.push(nums2[i])
    nums1.sort((a, b) => a - b)
  }
}
```

解法二: 题目的本质是归并排序的合部分。所以使用归并排序的思想即可解决。事件复杂度 O(n)

```js
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let l = 0 // 第一个数组下标
  let r = 0 // 第二个数组下标
  const arr = []

  while (l < m && r < n) {
    if (nums1[l] <= nums2[r]) {
      arr.push(nums1[l])
      l++
    } else if (nums1[l] > nums2[r]) {
      arr.push(nums2[r])
      r++
    }
  }

  while (l < m) {
    arr.push(nums1[l])
    l++
  }

  while (r < n) {
    arr.push(nums2[r])
    r++
  }

  for (let i = 0; i < m + n; i++) {
    nums1[i] = arr[i]
  }
}
```

### todo

因为解法二多用了一个数组空间, 后续看看怎么优化。