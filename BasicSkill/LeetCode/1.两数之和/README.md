### Title

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have `exactly one solution`, and you may `not use the same element twice`.

### Example

```js
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

### Analyze

题解 1: 暴力法

```js
var twoSum = function(nums, target) {
  var length = nums.length
  for (var x = 0; x < length; x++) {
    for (var y = x + 1; y < length; y++) {
      if (nums[x] + nums[y] === target) {
        var arr = []
        arr.push(x)
        arr.push(y)
        return arr
      }
    }
  }
}
```

* Time Complexity: O(n^2)
* Space Complexity: O(1)

题解 2-1: Hash Table

> 需要留意的是, 如果数组中有重复的值比如 [5, 5], target = 10 这种情况的处理

```js
var twoSum = function(nums, target) {
  let numsObj = {}
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i]
    let match = target - current
    if (match in numsObj) {
      return [i, numsObj[match]]
    }
    numsObj[current] = i
  }
}
```

* Time Complexity: O(n)
* Space Complexity: O(n)

题解 2-2: 使用 Map