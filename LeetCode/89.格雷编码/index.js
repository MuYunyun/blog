/**
 * @param {number} n
 * @return {number[]}
 */
// 00 // 01 => // 10 // 11
var grayCode = function (n) {
  const arr = new Array()
  arr[0] = [0]
  for (let i = 1; i <= n; i++) {
    const newArr = arr[i - 1].slice().reverse().map(r => r + Math.pow(2, i - 1))
    arr[i] = [...arr[i - 1], ...newArr]
  }
  return arr[n]
}