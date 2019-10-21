### title

给定一种规律 pattern 和一个字符串 str ，判断 str 是否遵循相同的规律。

这里的「遵循」指完全匹配，例如 pattern 里的每个字母和字符串 str 中的每个非空单词之间存在着双向连接的对应规律。

示例1:

```js
输入: pattern = "abba", str = "dog cat cat dog"
输出: true
```

示例 2:

```js
输入:pattern = "abba", str = "dog cat cat fish"
输出: false
```

示例 3:

```js
输入: pattern = "aaaa", str = "dog cat cat dog"
输出: false
```

示例 4:

```js
输入: pattern = "abba", str = "dog dog dog dog"
输出: false
```

说明:
你可以假设 pattern 只包含小写字母，str 包含了由单个空格分隔的小写字母。    

### 解题

思路:

使用 patternMap 与 strArrMap 分别存储 `pattern => strArrMap` 与 `strArrMap => pattern` 的映射, 当存在一对多映射的情况时, 则它们非完全匹配, 否则是完全匹配的。

```js
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function(pattern, str) {
  const strArr = str.split(' ')
  if (pattern.length !== strArr.length) return false

  const patternMap = new Map()
  const strArrMap = new Map()

  for (let i = 0; i < pattern.length; i++) {
    const getPatternMap = patternMap.get(pattern[i])
    const getStrArrMap = strArrMap.get(strArr[i])
    if (!getPatternMap) {
      patternMap.set(pattern[i], strArr[i])
    } else if (getPatternMap !== strArr[i]) {
      return false
    }

    if (!getStrArrMap) {
      strArrMap.set(strArr[i], pattern[i])
    } else if (getStrArrMap !== pattern[i]) {
      return false
    }
  }

  return true
};
```

### 相关题目

202、205、242、349、350、451