### Contains Duplicate II

Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j] and the absolute difference between i and j is at most k.

```js
Example 1:

Input: nums = [1,2,3,1], k = 3
Output: true
```

```js
Example 2:

Input: nums = [1,0,1,1], k = 1
Output: true
```

```js
Example 3:

Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```

### 解法

* 遍历当前 nums, 维护一个队列 arr 来存储 k 个数值, 判断该队列 arr 中是否包含当前遍历值 nums[l];
  * 若有, 则返回 true;
* 若遍历结束, 则返回 false;

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  const arr = []

  let l = 0
  let r = nums.length

  while (l < r) {
    if (arr.indexOf(nums[l]) > -1) {
      return true
    }
    if (arr.length < k) {
      arr.push(nums[l])
    } else if (arr.length >= k && k > 0) {
      arr.shift(arr[0])
      arr.push(nums[l])
    }
    l++
  }

  return false
}
```

![](http://with.muyunyun.cn/db151c5e5eef41a30b2e8cbca9fd417e.jpg-400)

算法时间复杂度是 NlogN 级别的, 不知道为何执行时间花了 1800ms(如果有朋友知道原因请告诉我。)

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  const temSet = new Set()

  let l = 0
  let r = nums.length

  while (l < r) {
    if (temSet.has(nums[l])) {
      return true
    }
    if (temSet.size < k) {
      temSet.add(nums[l])
    } else if (temSet.size >= k && k > 0) {
      temSet.delete(nums[l - k])
      temSet.add(nums[l])
    }
    l++
  }

  return false
}
```

![](http://with.muyunyun.cn/c756eba46d7c18d4fe4acfbc011e3a78.jpg-400)

使用 Set 用相同的思路来实验下, 结果发现执行时间比之前用数组队列的实现快了很多。