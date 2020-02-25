### title

给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。

请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。

你可以假设 nums1 和 nums2 均不为空。

### Analyze

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let arr = nums1.concat(nums2).sort((r1, r2) => r1 - r2)
  const length = arr.length
  if (length % 2 === 0) {
    return (arr[length / 2 - 1] + arr[length / 2]) / 2
  } else {
    return arr[(length + 1) / 2 - 1]
  }
}
```