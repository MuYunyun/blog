### title

Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

Example 1:

```js
Input: [[1,1],[2,2],[3,3]]
Output: 3
Explanation:
^
|
|        o
|     o
|  o  
+------------->
0  1  2  3  4
```

```js
Example 2:

Input: [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
Output: 4
Explanation:
^
|
|  o
|     o        o
|        o
|  o        o
+------------------->
0  1  2  3  4  5  6
```

### Analyze

* 需要考虑的条件
  * points 中的值是否会重合?
  * 针对除不尽的数字, 精度问题是否需要考虑?
  * 传入参数个数;
* 为避免除法带来的问题, 可以求最大公约数, 将 9/6, 18/12 转化为 3/2;
  * 在同一排可以表示为 '0/x', 在同一列可以表示为 'y/0';
  * 重合的点可以表示为 '0/0', 并用变量 samePoint 来记录它;

> 求最大公约数用到了数学中的辗转相除法: 两个正整数 a 和 b(a>b), 它们的最大公约数等于 a 除以 b 的余数 c 和 b 之间的最大公约数。比如 25 和 10, 25 除以 10 商 2 余 5, 那么 25 和 10 的最大公约数, 等同于 10 和 5 的最大公约数。

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
  if (points.length === 0) return 0
  if (points.length === 1) return 1
  const getFractions = (pointsdiffX, pointsdiffY) => {
    if (pointsdiffX === 0 && pointsdiffY !== 0) return `y/0`
    if (pointsdiffX !== 0 && pointsdiffY === 0) return `0/x`
    if (pointsdiffX === 0 && pointsdiffY === 0) return `0/0`
    const gcdValue = gcd(pointsdiffY, pointsdiffX)
    const numerator = pointsdiffY / gcdValue
    const denominator = pointsdiffX / gcdValue
    return `${numerator}/${denominator}`
  }

  const gcd = (a, b) => {
    if (b === 0) {
      return a
    }
    return gcd(b, a % b)
  }

  let result = 0

  for (let m = 0; m < points.length; m++) {
    const map = new Map()
    let samePoint = 0
    for (let n = 0; n < points.length; n++) {
      if (m !== n) {
        const pointsdiffX = points[n][0] - points[m][0]
        const pointsdiffY = points[n][1] - points[m][1]
        if (pointsdiffX === 0 && pointsdiffY === 0) {
          samePoint++
        }
        const fractions = getFractions(pointsdiffX, pointsdiffY)
        if (map.has(fractions)) {
          map.set(fractions, map.get(fractions) + 1)
        } else {
          map.set(fractions, 1)
        }
      }
    }
    map.forEach((value, key) => {
      if (key !== '0/0') {
        result = Math.max(result, value + samePoint + 1)
      } else {
        result = Math.max(result, value + 1)
      }
    })
  }

  return result
}
```

![](http://with.muyunyun.cn/490006ca96e92c2bbcbca3856d71c1df.jpg-400)

### Sister Title

149