给定一个已按照升序排列的`有序数组`，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2, 其中 index1 必须小于 index2。

说明:

返回的下标值(index1 和 index2)不是从零开始的。
你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

示例:

```js
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1, 2]
解释: 2 与 7 之和等于目标数 9。因此 index1 = 1, index2 = 2。
```

### 题解

注意题目给出的条件 `有序数组`

解法一: 因为是有序数组, 题目可以转化为: 第一个值的下标为 `i` 时, 在剩余的有序数组中寻找 `target - number[i]`。因而该算法时间复杂度为 `O(NlogN)`。

![](http://with.muyunyun.cn/4bd2e0a2986f09b8efa56972810291d4.jpg)

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    const index = binarySearch(numbers, target - numbers[i])
    if (typeof(index) === 'number') {
      return [i + 1, index + 1]
    }
  }
}

var binarySearch = function(arr, value) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = left + Math.ceil((right - left) / 2)
    if (arr[mid] === value) {
      return mid
    } else if (arr[mid] < value) {
      left = mid + 1
    } else if (arr[mid] > value) {
      right = mid - 1
    }
  }
  return null
}
```

解法二: 用`对撞指针(双指针)`实现时间复杂度为 `O(n)` 的算法。

```js
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let left = 0
  let right = numbers.length - 1

  while (left <= right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) {
      return [left + 1, right + 1]
    } else if (sum > target) {
      right--
    } else if (sum < target) {
      left++
    }
  }
}
```

### 相似问题

125、344、345