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
  * 如果考虑重合的话, 需注意特殊处理斜率为`无穷大`的情况;
  * 针对除不尽的数字, 精度问题是否需要考虑?

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function(points) {
  if (points.length === 0) return 0
  const getK = (points0, points1) => {
    return (points1[1] - points0[1]) / (points1[0] - points0[0])
  }

  let result = 0
  debugger
  for (let m = 0; m < points.length; m++) {
    const map = new Map()
    let equalPoint = 0
    for (let n = 0; n < points.length; n++) {
      if (m !== n) {
        const k = getK(points[m], points[n])
        if (k === 0) {

          break
        }
        if (map.has(k)) {
          map.set(k, map.get(k) + 1)
        } else {
          map.set(k, 1)
        }
      }
    }

    map.forEach((value) => {
      result = Math.max(result, value)
    })
  }

  return result + 1
}
```

### Sister Title

149