const obj = {}

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) { return 1 }
  if (n === 2) { return 2 }

  if (obj[n]) {
    return obj[n]
  } else {
    obj[n] = climbStairs(n - 1) + climbStairs(n - 2)
    return obj[n]
  }
};