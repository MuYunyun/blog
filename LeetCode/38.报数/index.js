const cacheObj = {1: '1'}
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) { // 5
  if (cacheObj[n]) {
    return cacheObj[n]
  } else {
    const findValue = countAndSay(n - 1) // 1211
    let str = ''
    let tmp = 0 // 截断不同数字的下标
    for (let i = 0; i < findValue.length; i++) {
      if (findValue[i] !== findValue[i + 1]) {
        str += i - tmp + 1
        str += findValue[i]
        tmp = i + 1
      }
    }
    cacheObj[n] = str
    return str
  }
};