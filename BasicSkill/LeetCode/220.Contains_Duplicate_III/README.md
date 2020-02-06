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

* 需要考虑的点
  * nums 数组长度;
  * k 是否可以为 0;

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {
  if (nums.length <= 1) return false
  const temSet = new Set()

  let l = 0
  let r = nums.length

  while (l < r) {
    if (temSet.size > 0) {
      const curMinValue = Math.min(...temSet)
      const curMaxValue = Math.max(...temSet)
      if (curMaxValue - curMinValue <= t) {
        return true
      }
    }

    if (temSet.size < k) {
      temSet.add(nums[l])
    } else if (temSet.size = k && k > 0) {
      temSet.delete(nums[l - k])
      temSet.add(nums[l])
    }
    l++
  }

  return false
}
```

```js
[1,5,9,1,5,9]
2
3

true

false
```