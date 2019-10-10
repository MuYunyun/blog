### title

给定一个字符串, 找出不含有重复字符的最长子串的长度。

示例:

```js
给定 "abcabcbb", 没有重复字符的最长子串是 "abc", 那么长度就是 3。

给定 "bbbbb", 最长的子串就是 "b", 长度是 1。

给定 "pwwkew", 最长子串是 "wke", 长度是 3。请注意答案必须是一个子串, "pwke" 是子序列而不是子串。
```

### 题解

方法名: 滑动窗口是字符串/数组中常用概念

解法一: `判断字符串 s[i, j) 中是否有 s.charAt(j + 1), 如果有, 给左区间加上相应的值`, 执行时间大致为 98ms 左右。

具体步骤如下:

1. 取滑动列表 [left, right];
2. 若列表 [left, right] 中的取值之和小于 s, 则列表的有边界 right 往右扩张。
3. 若列表 [left, right] 中的取值之和大于 s, 则列表的左边界 left 往右扩张。

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

思考: 针对 `判断字符串 s[i, j) 中是否有 s.charAt(j + 1)` 这一句, 是否能使用 O(n) 时间复杂度的算法代替 indexOf 呢? 使用 cacheObj 来缓存值, 测试执行时间大致为 170ms 左右。

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let left = 0, right = 0 // [left, right] 区域
  let result = 0 // 假定结果的初始值为 0
  const cacheObj = {}

  while (left < s.length) {
    if (right < s.length && !cacheObj[s[right]]) {
      cacheObj[s[right]] = 1
      result = Math.max(result, right - left + 1)
      right++
    } else {
      cacheObj[s[left]] = null
      left++
    }
  }
  if (result === 0) {
    return 0
  }
  return result
}
```

### 相似题目

209、438(todo)、76(todo)