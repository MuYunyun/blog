### 20.Valid_Parentheses

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

Example 1:

```js
Input: "()"
Output: true
```

Example 2:

```js
Input: "()[]{}"
Output: true
```

Example 3:

```js
Input: "(]"
Output: false
```

Example 4:

```js
Input: "([)]"
Output: false
```

Example 5:

```js
Input: "{[]}"
Output: true
```

### analyze

考察栈的使用。

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const obj = {
    '(': ')',
    '{': '}',
    '[': ']',
  }
  const cacheArr = []
  for (let i = 0; i < s.length; i++) {
    if (Object.keys(obj).includes(s[i])) {
      cacheArr.push(s[i])
    } else {
      const pick = cacheArr.pop()
      if (obj[pick] !== s[i]) {
        return false
      }
    }
  }

  return cacheArr.length === 0
}
```

### Similar Title

* 71、150