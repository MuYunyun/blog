### title

给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

`字母异位词指字母相同，但排列不同的字符串`。
不考虑答案输出的顺序。

示例 1:

```js
输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]
```

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。

示例 2:

```js
输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]
```

示例 3:

```js
输入:
s: "baa" p: "aa"

输出:
[1]
```

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。

### 题解

花了半天, 用类似滑动窗口的思想地解决了该题。思路如下:

1. 首先将 p 字符串中各字母出现的频率统计在 `targetObj`;
2. 针对 s 字符创声明双指针 left、right
   1. 如若当前 right 的位置在 targetObj `有对应字段且其不大于` targetObj 对应字段的值, 则向右偏移 right 指针的位置;
   2. 如若当前 right 指针的位置在 targetObj `无对应字段`, 则将 left 的位置移到 right 字段的位置;
   3. 如若当前 right 指针的位置在 targetObj `有对应字段且大于` targetObj 对应字段的值, 则向右偏移 left 指针的位置;

> 需要考虑的点, `字符串是否会重复`。比如 s 为 'baa', p 为 'aa'。

```js
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  const pLength = p.length
  const initHashObj = {} // 初始化 hash 对象
  let hashObj = {}
  const targetObj = {}
  for (let i = 0; i < p.length; i++) {
    targetObj[p[i]] = typeof(targetObj[p[i]]) === 'number' ? targetObj[p[i]] + 1 : 0
    initHashObj[p[i]] = 0
    hashObj[p[i]] = 0
  }

  const result = [] // 存储结果

  let left = 0, right = 0

  while (left < s.length && right < s.length) {
    if (typeof(hashObj[s[right]]) === 'number' && hashObj[s[right]] <= targetObj[s[right]]) {
      hashObj[s[right]] = hashObj[s[right]] + 1
      if (right - left + 1 === pLength) result.push(left)
      right++
    } else if (typeof(hashObj[s[right]]) !== 'number') {
      right++
      left = right
      hashObj = JSON.parse(JSON.stringify(initHashObj))
    } else {
      hashObj[s[left]] !== initHashObj[s[left]] && (hashObj[s[left]] = hashObj[s[left]] - 1)
      left++
    }
  }

  return result
};
```

### 相似题目

76