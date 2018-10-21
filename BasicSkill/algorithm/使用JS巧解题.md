输入：['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
输出: a, b, c, 2, d, e, f, g, 3, 4

```js
// 方法一
// let resultArr = []
// function arrToValue(arr) {
//   for (let i of arr) {
//     if (!Array.isArray(i)) {
//       resultArr.push(i)
//     } else {
//       arrToValue(i)
//     }
//   }
//   return resultArr.toString()
// }

// 方法二
function arrToValue(arr) {
  const tmpArray = Array.prototype.toString
  Array.prototype.toString = function() {
    return this.join(',')
  }
  let result = arr + ''
  Array.prototype.toString = tmpArray
  return result
}
```