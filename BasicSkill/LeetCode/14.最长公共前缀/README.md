### title

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀, 返回空字符串 ""。

示例 1:

```
输入: ["flower","flow","flight"]
输出: "fl"
```

示例 2:

```
输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

说明:

所有输入只包含小写字母 a-z 。

### analyze

emm, 虽然是道简单难度的题目, 但是通过率不是很高, 大多数应该是方法没有采取恰当。思路可以如下:

1.选取数组的第一个值 str
2.让数组中的每个值分别 indexOf(str), 如果 indexOf(str) !== 0, 则让 str = str.slice(0, str.length - 1)

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return ''

  let str = strs[0]

  for (let i = 0; i < strs.length; i++) {
    while (strs[i].indexOf(str) !== 0) {
      str = str.slice(0, str.length - 1)
      if (str.length === 0) { return '' }
    }
  }

  return str
};
```