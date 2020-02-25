### title

给定一个可包含重复数字的序列, 返回所有不重复的全排列。

示例:

```
输入: [1,1,2]
输出:
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

### analyze

[题目 46](https://github.com/MuYunyun/blog/blob/master/LeetCode/46.全排列/README.md) 的升级版

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = []
  const sortNum = nums.sort()
  const used = new Array(nums.length).fill(false)
  const DFS = function (arr) {
    if (arr.length === sortNum.length) {
      result.push(arr.slice())
      return
    }

    for (let i = 0; i < sortNum.length; i++) {
      if (i > 0 && sortNum[i] === sortNum[i - 1] && !used[i - 1]) { // !used[i - 1] 表示相同的元素之前已经使用过了
        continue
      }

      if (!used[i]) {
        arr.push(sortNum[i])
        used[i] = true
        DFS(arr)
        arr.pop(sortNum[i])
        used[i] = false
      }
    }
  }

  DFS([])

  return result
};
```