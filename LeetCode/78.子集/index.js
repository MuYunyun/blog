/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const list = []
  const tmpList = []

  backTrack(list, tmpList, nums, 0)

  return list
};

function backTrack(list, tmpList, nums, start) {
  list.push(tmpList.slice())

  for (let i = start; i < nums.length; i++) {
    tmpList.push(nums[i])
    backTrack(list, tmpList, nums, i + 1)
    tmpList.splice(tmpList.length - 1, 1)
  }
}