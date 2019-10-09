### title

给定一个字符串, 找出不含有重复字符的最长子串的长度。

示例:

```js
给定 "abcabcbb", 没有重复字符的最长子串是 "abc", 那么长度就是 3。

给定 "bbbbb", 最长的子串就是 "b", 长度是 1。

给定 "pwwkew", 最长子串是 "wke", 长度是 3。请注意答案必须是一个子串, "pwke" 是子序列而不是子串。
```

### 题解

方法名: 滑动窗口

滑动窗口是字符串/数组中常用概念, 这道题的解法如下: `判断字符串 s[i, j) 中是否有 s.charAt(j + 1), 如果有, 给左区间加上相应的值`。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  if (s.length < 1) {
    return 0
  }
  let i = 0, j = 1, longest = 1
  while (j < s.length) {
    if (s.slice(i, j).indexOf(s.charAt(j)) > -1) {
      i += s.slice(i, j).indexOf(s.charAt(j)) + 1
    } else {
      longest = Math.max(j - i + 1, longest)
    }
    j++
  }
  return longest
}
```

针对 `判断字符串 s[i, j) 中是否有 s.charAt(j + 1)` 这一句, 是否能使用 O(n) 复杂度的算法代替 indexOf 呢?

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

}
```

### 相似题目

209、438(todo)、76(todo)