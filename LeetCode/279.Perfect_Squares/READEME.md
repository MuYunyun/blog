### 279. Perfect Squares

Given a positive integer n, find `the least number` of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

```js
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4
```

Example 2:

```js
Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
```

### Analyze

题目转化: 数字 n 到 0 最少能由几个平方数相加得到?

首先思考能否使用贪心算法, 比如针对数字 12, 使用贪心算法先取能使用最大的数字 9, 结果为 9 1 1 1, 长度为 4; 但其实是有更短长度的答案 4 4 4 的, 因此不能使用贪心算法。

建模: 构建树的数据结构:

![](http://with.muyunyun.cn/1ec5a5a75516e0ae7fa96c9c9a74bd79.jpg)

```js
6
```

比如数字 6 到 0, 可以 1 1 1 1 1 1, 也可以是 4 1 1;

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  const list = []
  list.push({ num: n, step: 0 })

  while (list.length > 0) {
    const { num, step } = list.shift()
    if (num === 0) return step

    for (let i = 1; num - i * i >= 0; i++) {
      list.push({ num: num - i * i, step: step + 1 })
    }
  }
}
```

todo: 思路相通了, 代码目前运行超时, 树和图之间的转换;