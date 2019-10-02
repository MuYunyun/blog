### 题目

给定一个字符串，验证它是否是`回文串`，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例 1:

```js
输入: "A man, a plan, a canal: Panama"
输出: true
```

```js
示例 2:

输入: "race a car"
输出: false
```

### 解题

解法一: 对撞指针

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  const sToLowerCase = s.toLowerCase()

  let left = 0, right = s.length - 1
  while (left <= right) {
    if (isValidate(sToLowerCase[left]) && isValidate(sToLowerCase[right])) {
      if (sToLowerCase[left] !== sToLowerCase[right]) {
        return false
      }
      left++
      right--
    }
    if (!isValidate(sToLowerCase[left])) {
      left++
    }
    if (!isValidate(sToLowerCase[right])) {
      right--
    }
  }

  return true
}

/* 校验函数 */
var isValidate = (value) => {
  return /[a-z]|[0-9]/.test(value)
}
```

### 相似题目

167、344、345