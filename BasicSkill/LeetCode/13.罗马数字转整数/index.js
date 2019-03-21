/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const RomanArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  const intArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const length = s.length
  let pick, result = 0
  for (let i = 0; i < length; i++) {
    pick = s.slice(i, i + 1)
    if (pick === 'C' || pick === 'X' || pick === 'I') {
      pick = s.slice(i, i + 2)
      if (pick === 'CM' || pick === 'CD' || pick === 'XC' || pick === 'XL' || pick === 'IX' || pick === 'IV') {
        i++
      } else {
        pick = s.slice(i, i + 1)
      }
    }
    result += intArr[RomanArr.indexOf(pick)]
  }
  return result
};