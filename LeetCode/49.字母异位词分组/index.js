/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const tmpObj = {}

  for (let i = 0; i < strs.length; i++) {
    const sortStr = strs[i].split('').sort().join('')
    if (tmpObj[sortStr]) {
      tmpObj[sortStr].push(strs[i])
    } else {
      tmpObj[sortStr] = [strs[i]]
    }
  }

  const result = []

  const keyArr = Object.keys(tmpObj)
  for (let i = 0; i < keyArr.length; i++) {
    result.push(tmpObj[keyArr[i]])
  }

  return result
};