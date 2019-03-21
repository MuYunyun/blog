// 暴力法
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let maxArea = 0
  const length = height.length
  for (let i = 0; i < length; i++) {
    for (let y = i + 1; y < length; y++) {
      result = Math.min(height[i], height[y]) * (y - i)
      if (result > maxArea) {
        maxArea = result
      }
    }
  }
  return maxArea
};

// 双指针法
var maxArea = function (height) {
  let head = 0, tail = height.length - 1, maxArea = 0
  while (head < tail) {
    result = Math.min(height[head], height[tail]) * (tail - head)
    if (result > maxArea) {
      maxArea = result
    }
    if (height[head] <= height[tail]) {
      head++
    } else {
      tail--
    }
  }
  return maxArea
};