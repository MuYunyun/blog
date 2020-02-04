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
  * points 中的值是否会重合? 如果考虑重合的话, 需注意特殊处理斜率为`无穷大`的情况;
  * 针对除不尽的数字, 精度问题是否需要考虑?
* 为避免上述除法带来的问题, 可以求最大公约数, 将 9/6, 18/12 转化为 3/2;

求最大公约数用到了数学中的辗转相除法: 两个正整数 a 和 b(a>b), 它们的最大公约数等于 a 除以 b 的余数 c 和 b 之间的最大公约数。比如 25 和 10, 25 除以 10 商 2 余 5, 那么 25 和 10 的最大公约数, 等同于 10 和 5 的最大公约数。

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
  if (points.length === 0) return 0
  const getFractions = (points0, points1) => {
    const gcdValue = gcd((points1[1] - points0[1]), (points1[0] - points0[0]))
    const numerator = (points1[1] - points0[1]) / gcdValue
    const denominator = (points1[0] - points0[0]) / gcdValue
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
    for (let n = 0; n < points.length; n++) {
      if (m !== n) {
        const fractions = getFractions(points[m], points[n])
        if (map.has(fractions)) {
          map.set(fractions, map.get(fractions) + 1)
        } else {
          map.set(fractions, 1)
        }
      }
    }
    debugger
    map.forEach((value) => {
      result = Math.max(result, value)
    })
  }

  return result + 1
}
```

测试用例没通过: 35/37

```js
输入：
[[1,1],[1,1],[2,2],[2,2]]

输出：
3

预期：
4
```


### Sister Title

149