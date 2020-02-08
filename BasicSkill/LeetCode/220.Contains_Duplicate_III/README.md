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

参照官方题解该题可以使用桶排序的思想来实现。

桶排序的思想: 将数据根据归类划分到若干个区域, 然后对该些区域分别进行排序;

```js
| i - j | ≤ k
| nums[i] - nums[j] | ≤ t
```

比较好理解的一个例子: 小敏生日在 3 月份, 她想知道是否有其他同学生日和她在 30 天以内, 假设每个月有 30 天, 那么只要找 2 月份和 4 月份两个月生日的同学就行了。

<!-- * 需要考虑的点
  * nums 数组长度;
  * k 是否可以为 0; -->

> 这道题在 JavaScript 中用滑动窗口的思想来解不方便, 因为在 JS 中没有类似 Java 中 TreeSet 的数据结构能在当前数组中快速获取距离当前值最小的且比它大的值。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, k, t) {

}
```