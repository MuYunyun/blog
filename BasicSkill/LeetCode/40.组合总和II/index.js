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