### 题目: 反转字符串中的元音字母

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

示例 1:

```js
输入: "hello"
输出: "holle"
```

示例 2:

```js
输入: "leetcode"
输出: "leotcede"
```

说明:
元音字母不包含字母"y"。

### 解题

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  let left = 0, right = s.length - 1
  let result = s
  while (left <= right) {
    const isValidateLeft = isValidate(s[left])
    const isValidateRight = isValidate(s[right])
    if (isValidateLeft && isValidateRight) {
      result = swap(s, left, right)
      left++
      right--
    }
    if (!isValidateLeft) {
      left++
    }
    if (!isValidateRight) {
      right--
    }
  }
  return result
}

var isValidate = (value) => {
  return ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(value)
}

/* 交换位置
  a, b 为下标
*/
var swap = function(str, a, b) {
  const arr = str.split('')
  const tmp = arr[a]
  arr[a] = arr[b]
  arr[b] = tmp
  return arr.join('')
}
```

### 相似题目

125、167、344