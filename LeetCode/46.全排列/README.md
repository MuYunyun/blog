### title

给定一个没有重复数字的序列, 返回其所有可能的全排列。

示例:

```
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### analyze

DFS 思想解题

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = []
  const DFS = function(arr) {
    if (arr.length === nums.length) {
      result.push(arr.slice())
      return
    }

    for (let i = 0; i < nums.length; i++) {
      if (!arr.includes(nums[i])) {
        arr.push(nums[i])
        DFS(arr)
        arr.pop(nums[i])
      }
    }
  }

  DFS([])

  return result
};
```