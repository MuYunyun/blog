### 279. Perfect Squares

Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

```js
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
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

这里简单构建图的数据结构:

![](http://with.muyunyun.cn/47ab817c48b6cb5dfb829d96f508996d.jpg)

[{cur: 1, step: 2}]
[{cur: 5, step: 1}]
[{cur: 6, step: 0}]

比如数字 6 到 0, 可以 1 1 1 1 1 1, 也可以是 4 1 1;

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  const list = []
  list.push({ cur: n, step: 0 })

  while (list.length > 0) {
    const { cur, step } = list.shift()
    if (cur === 0) return step

    {
      list.push({ cur: , step: step + 1 })
    }
  }
}
```