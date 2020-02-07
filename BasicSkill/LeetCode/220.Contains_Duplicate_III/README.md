### Title

Given an array of integers, find out whether there are `two distinct indices` i and j in the array such that the absolute difference between nums[i] and nums[j] is at most t and the absolute difference between i and j is at most k.

Example 1:

```js
Input: nums = [1,2,3,1], k = 3, t = 0
Output: true
```

Example 2:

```js
Input: nums = [1,0,1,1], k = 1, t = 2
Output: true
```

Example 3:

```js
Input: nums = [1,5,9,1,5,9], k = 2, t = 3
Output: false
```

### Analyze

题目理解需要绕过弯: 在`剩余数组找到距离当前数组下标值最小的值`。

* 需要考虑的点
  * nums 数组长度;
  * k 是否可以为 0;
  * 需要保留每一个数值, 所以数据结构不能用 Set;

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  if (nums.length <= 1) return false
  const temArr = []

  let l = 0
  let r = nums.length
  while (l < r) {
    if (temArr.length < k + 1) {
      temArr.push(nums[l])
    } else if (temArr.length = k + 1  && k > 0) {
      temArr.shift()
      temArr.push(nums[l])
    }
    l++

    if (temArr.length > 2) {

    }
  }

  return false
}
```