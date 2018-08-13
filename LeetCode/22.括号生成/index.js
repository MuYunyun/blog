/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = []
  let str = ''
  function judege(left, right, str) {
    if (left === 0 && right === 0) {
      result.push(str)
      str = ''
      return
    }

    if (left === right) {
      judege(left - 1, right, str + '(')
    } else if (left === 0) {
      judege(left, right - 1, str + ')')
    } else {
      judege(left - 1, right, str + '(')
      judege(left, right - 1, str + ')')
    }
  }

  judege(n, n, str)
  return result
};