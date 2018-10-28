const cache = {}
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  if (m === 1 || n === 1) {
    return 1
  }

  if (cache[`${m}~${n}`]) {
    return cache[`${m}~${n}`]
  } else {
    const nums = uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
    cache[`${m}~${n}`] = nums

    return nums
  }
};