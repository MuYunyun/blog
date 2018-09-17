/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const perGroupNum = numRows + numRows - 2 // 每组个数
  const GroupNum = Math.ceil(s.length / perGroupNum) // 有几组

  const arr = []
  for (let i = 0; i < GroupNum; i++) {
    let linkStr = ''
    let position = i * perGroupNum
    linkStr += s.slice(0 + position, numRows + position)
    linkStr += s.slice(numRows + position, numRows + position + perGroupNum - numRows).split('').reverse().join('')
    arr.push(linkStr)
  }

  let str = ''

  let num = 0 // 第几行
  while (num < numRows) {
    for (let i = 0; i < GroupNum; i++) {
      arr[i][num] ? str += arr[i][num] : ''
      if (num > 0 && num < numRows - 1 && arr[i][num + numRows - 1]) {
        str += arr[i][num + numRows - 1]
      }
    }
    num++
  }

  return str
};