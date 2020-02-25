### title

给定一个字符串 s, 找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1:

输入: "babad"
输出: "bab"
注意: "aba"也是一个有效答案。

示例 2:

输入: "cbbd"
输出: "bb"

### analyze

目前的解法判断字符串 s 和它的倒序 s' 是否拥有公有字符串, 且它们的公有字符串应该符合倒序。目前用暴力法实现~~

题目可以转换为求 s 和它的倒序 s' 的最长公有字符串。以后再看。

```js
/**
 * @param {string} s
 * @return {string}
 */

// 暴力法 有几个用例超时
var longestPalindrome = function (s) {
  const reverseS = s.split('').reverse().join('')
  let result = '', len = 0
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sliceS = s.slice(i, j + 1)
      if (sliceS.length > len) {
        if (reverseS.indexOf(sliceS) >= 0 && sliceS === sliceS.split('').reverse().join('')) {
          len = sliceS.length
          result = sliceS
        }
      }
    }
  }
  return result
};
```