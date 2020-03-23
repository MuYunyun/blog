### 150.Evaluate Reverse Polish Notation

Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are `+, -, *, /`. Each operand may be an `integer` or `another expression`.

Note:

* Division between two integers should truncate toward zero.
* The given RPN expression is `always valid`. That means the expression would always evaluate to a result and there won't be any divide by zero operation.

Example 1:

```js
Input: ["2", "1", "+", "3", "*"]
Output: 9

Explanation: ((2 + 1) * 3) = 9
```

Example 2:

```js
Input: ["4", "13", "5", "/", "+"]
Output: 6

Explanation: (4 + (13 / 5)) = 6
```

Example 3:

```js
Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22

Explanation:
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

### Analyze

栈的使用, 思路大致如下:

1. 遇到数字推入栈;
2. 遇到符号则从栈中取出最后两位进行数学操作;

> 稍加留意的是, 需要对 / 运算进行取整操作;

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  const stack = []
  const operateTag = ['+', '-', '*', '/']
  for (let i = 0; i < tokens.length; i++) {
    const operateTagIndex = operateTag.indexOf(tokens[i])
    if (operateTagIndex === -1) {
      stack.push(tokens[i])
    } else {
      const y = stack.pop()
      const x = stack.pop()
      let result
      if (operateTagIndex === 0) {
        result = Number(x) + Number(y)
      } else if (operateTagIndex === 1) {
        result = Number(x) - Number(y)
      } else if (operateTagIndex === 2) {
        result = Number(x) * Number(y)
      } else if (operateTagIndex === 3) {
        result = parseInt((Number(x) / Number(y)), 10)
      }
      stack.push(result)
    }
  }
  return stack[0]
}
```

### Similar Title

20、71