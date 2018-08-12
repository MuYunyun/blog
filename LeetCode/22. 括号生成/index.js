/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  function judege(left, right, cache, str) {
    if (left === 0 && right === 0) {

    }

    if (left === right) {
      judege(left - 1, right, cache, str + '(')
    } else if (left === 0) {
      judege(left, right - 1, cache, str + ')')
    }

  }

  judege(n, n, [], '')
};