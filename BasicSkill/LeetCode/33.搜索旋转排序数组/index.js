// 这道题卡在如何确定返回的指标
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const length = nums.length
  const middle = Math.floor(length / 2)
  const leftArr = nums.slice(0, middle)
  const rightArr = nums.slice(middle, length)

  if (isOrder(leftArr)) {
    sortByDivided(leftArr, target)
  } else {
    search(leftArr, target)
  }

  if (isOrder(rightArr)) {
    sortByDivided(rightArr, target)
  } else {
    search(rightArr, target)
  }
};

var isOrder = function(arr) {
  return arr[0] < arr[arr.length - 1]
}

var sortByDivided = function(arr, target) {
  const length = arr.length
  let left = 0
  let right = length
  let middle

  while (left <= right) {
    middle = Math.floor((left + right) / 2)
    if (target > arr[middle]) {
      left = middle + 1
    } else if (target < arr[middle]) {
      right = middle - 1
    } else if (target === arr[middle]) {
      return middle
    }
  }

  return false
}