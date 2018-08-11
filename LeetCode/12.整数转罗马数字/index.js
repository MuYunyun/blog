/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  let result = ''
  const intArr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const RomanArr = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

  for (let i = 0; i < intArr.length; i++) {
    while (num % intArr[i] < num) {
      result += RomanArr[i]
      num -= intArr[i]
    }
  }

  return result
}