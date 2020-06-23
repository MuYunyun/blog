### title

报数序列是指一个整数序列, 按照其中的整数的顺序进行报数, 得到下一个数。其前五项如下:

```
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

1 被读作  "one 1"  ("一个一") , 即 11。
11 被读作 "two 1s" ("两个一"）, 即 21。
21 被读作 "one 2",  "one 1" （"一个二" ,  "一个一") , 即 1211。

给定一个正整数 n , 输出报数序列的第 n 项。

注意: 整数顺序将表示为一个字符串。

示例 1:

```
输入: 1
输出: "1"
```

示例 2:

```
输入: 4
输出: "1211"
```

### analyze

题目被吐槽啊, 看 [Look-and-Say Sequence](https://www.geeksforgeeks.org/look-and-say-sequence/) 比较容易理解题意。用递归的思路解题。

```js
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
```