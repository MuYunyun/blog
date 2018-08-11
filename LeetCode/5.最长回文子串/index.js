/**
 * @param {string} s
 * @return {string}
 */

// 暴力法 有几个用例超时
var longestPalindrome = function (s) {
  const reverseS = s.split('').reverse().join('')
  let result = '', len = 0
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sliceS = s.slice(i, j + 1)
      if (sliceS.length > len) {
        if (reverseS.indexOf(sliceS) >= 0 && sliceS === sliceS.split('').reverse().join('')) {
          len = sliceS.length
          result = sliceS
        }
      }
    }
  }
  return result
};