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