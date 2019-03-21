/**
 * @param {string} str
 * @returns {string}
 */
var reverseWords = function (str) {
  const handleStr = str.trim().replace(/\s\s+/g, ' ')
  const reverseStr = handleStr.split(' ').reverse().join(' ')

  return reverseStr
};