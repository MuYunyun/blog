### title

给定一个数组 candidates 和一个目标数 target , 找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明:

所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。
示例 1:

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]
```

示例 2:

```
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]
```

### analyze

是[题目 39](https://github.com/MuYunyun/blog/blob/master/LeetCode/39.组合总和/index.js) 的改版, 在 DFS 的基础上, 对于题目要求`解集不能包含重复的组合`要稍加处理。

思路:

1. 对 candidates 排序
2. 对这种情况要过滤: `i !== start && candidates[i] === candidates[i - 1]`, 可以以 ([1, 1, 2], 3) 这个例子进行思考不产生两个 [1, 2]

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const result = []

  const sortCandidates = candidates.sort((r1, r2) => r1 - r2)
  const DFS = function (sum, arr, start) {
    if (sum === target) {
      result.push(arr.slice())
      return
    }
    if (sum > target) {
      return
    }

    for (let i = start; i < sortCandidates.length; i++) {
      if (i !== start && sortCandidates[i] === sortCandidates[i - 1]) { // [1,1,2], 3 避免产生两个 [1, 2]
        continue
      }

      sum += sortCandidates[i]
      arr.push(sortCandidates[i])
      DFS(sum, arr, i + 1)
      arr.pop(sortCandidates[i])
      sum -= sortCandidates[i]
    }
  }

  DFS(0, [], 0)

  return result
};
```