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