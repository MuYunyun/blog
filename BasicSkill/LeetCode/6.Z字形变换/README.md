### title

将字符串 "PAYPALISHIRING" 以 Z 字形排列成给定的行数:

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后从左往右, 逐行读取字符: "PAHNAPLSIIGYIR"

实现一个将字符串进行指定行数变换的函数:

string convert(string s, int numRows);

示例 1:

```
输入: s = "PAYPALISHIRING", numRows = 3
输出: "PAHNAPLSIIGYIR"
```

示例 2:

```
输入: s = "PAYPALISHIRING", numRows = 4
输出: "PINALSIGYAHRPI"
解释:

P     I    N
A   L S  I G
Y A   H R
P     I
```

### analyze

很受伤, 暴力解题后超出内存限制, 日后再看。

```js
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
```