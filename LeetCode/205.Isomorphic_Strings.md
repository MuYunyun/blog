### 205. Isomorphic Strings

Given two strings s and t, determine if they are isomorphic.

Two strings are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. `No two characters may map to the same character` but `a character may map to itself`.

Example 1:

```js
Input: s = "egg", t = "add"
Output: true
```

Example 2:

```js
Input: s = "foo", t = "bar"
Output: false
```

Example 3:

```js
Input: s = "paper", t = "title"
Output: true
```

Note:
You may assume both s and t have the same length.

### 题解

方法一: 字典哈希

* 遍历字符串, 使用`字典 map` 构建 s 中字符串与 t 中字符串(以及 t 中字符串与 s 中字符串)的映射关系;
  * 若发现存在`一对多`的情况, 则 s 与 t 不是同构的;
* 遍历结束, 则 s 与 t 是同构的;

> 一对多: 比如 s 为 'aa', t 为 'ab', 此时 ’a' 字符就对应了 'a'、'b' 两个字符, 即为一对多。

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  const mapS = new Map()
  const mapT = new Map()
  for (let i = 0; i < s.length; i++) {
    const getS = mapS.get(s[i])
    const getT = mapT.get(t[i])
    if ((getS && getS !== t[i]) || (getT && getT !== s[i])) {
      return false
    }
    mapS.set(s[i], t[i])
    mapT.set(t[i], s[i])
  }

  return true
}
```

方法二: 判断 s 与 t 字符串中字符出现的第一个位置。(针对本题的巧妙解法, 不过推荐优先掌握方法一)

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function(s, t) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false
    }
  }
  return true
};
```

### 相关题目

202、242、290、349、350、451