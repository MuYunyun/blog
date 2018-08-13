/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let place
  while (~nums.indexOf(val)) {
    place = nums.indexOf(val)
    nums.splice(place, 1)
  }
  return nums.length
};