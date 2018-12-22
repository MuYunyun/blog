/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max = 0
  const length = prices.length
  for (let i = 0; i < length; i++) {
    for (let x = i + 1; x < length; x++) {
      max = Math.max(max, prices[x] - prices[i])
    }
  }
  return max
};