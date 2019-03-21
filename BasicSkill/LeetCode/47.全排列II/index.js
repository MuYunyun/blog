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