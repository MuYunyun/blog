### 思路

下一级的台阶能从上一级台阶 + 1, 或者从上上一级台阶 + 2。要能联想到斐波那契数列。

### Analyze

```js
const obj = {}

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n === 1) { return 1 }
  if (n === 2) { return 2 }

  if (obj[n]) {
    return obj[n]
  } else {
    obj[n] = climbStairs(n - 1) + climbStairs(n - 2)
    return obj[n]
  }
};
```