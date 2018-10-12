/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let length = digits.length
  let tag = 0
  while (length) {
    if (length === digits.length) {
      if (digits[length - 1] + 1 + tag >= 10) {
        digits[length - 1] = 0
        tag = 1
      } else {
        digits[length - 1] = digits[length - 1] + 1
        tag = 0
        break
      }
    } else {
      if (digits[length - 1] + tag >= 10) {
        digits[length - 1] = 0
        tag = 1
      } else {
        digits[length - 1] = digits[length - 1] + 1
        tag = 0
        break
      }
    }
    length--
  }
  if (tag === 1) {
    digits.unshift(1)
  }
  return digits
};