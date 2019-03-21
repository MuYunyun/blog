/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const convert = x.toString().split('').reverse().join('')
  if (x === Number(convert)) {
    return true
  } else {
    return false
  }
};