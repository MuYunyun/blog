/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const obj = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  const cacheArr = []
  for (let i = 0; i < s.length; i++) {
    if (Object.keys(obj).includes(s[i])) {
      cacheArr.push(s[i])
    } else {
      const pick = cacheArr.pop()
      if (obj[pick] !== s[i]) {
        return false
      }
    }
  }

  return cacheArr.length === 0
};