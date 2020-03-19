### title

给定一个无重复元素的数组 candidates 和一个目标数 target , 找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明:

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。
示例 1:

输入: candidates = [2,3,6,7], target = 7,
所求解集为:
[
  [7],
  [2,2,3]
]
示例 2:

输入: candidates = [2,3,5], target = 8,
所求解集为:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]

### analyze

用到了 DFS 的思想(包含栈的思想)。

```js
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = []

  const DFS = function (sum, arr, start) {
    if (sum === target) {
      result.push(arr.slice())
      return
    }
    if (sum > target) {
      return
    }

    for (let i = start; i < candidates.length; i++) {
      sum += candidates[i]
      arr.push(candidates[i])
      DFS(sum, arr, i)
      arr.pop(candidates[i])
      sum -= candidates[i]
    }
  }

  DFS(0, [], 0, candidates)

  return result
};
```