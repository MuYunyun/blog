/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) { // '23'
  const keyString = [
    '',
    '',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ]

  if (digits === '' || digits.length === 0) {
    return []
  }

  const result = ['']

  for (let x of digits) {
    const size = result.length
    for (let i = 0; i < size; i++) {
      const old = result.shift()

      for (let y of keyString[x]) {
        result.push(old + y)
      }
    }
  }
  return result
};