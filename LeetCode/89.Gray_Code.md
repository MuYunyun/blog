### 什么是格雷编码

![](http://with.muyunyun.cn/e4701735e8d53cdc38f92b050bd31f93.jpg)

规律: 虚线的上下除去首位是映射关系

[参考链接](https://zh.wikipedia.org/wiki/%E6%A0%BC%E9%9B%B7%E7%A0%81)

### Analyze

```js
/**
 * @param {number} n
 * @return {number[]}
 */
// 00 // 01 => // 10 // 11
var grayCode = function (n) {
  const arr = new Array()
  arr[0] = [0]
  for (let i = 1; i <= n; i++) {
    const newArr = arr[i - 1].slice().reverse().map(r => r + Math.pow(2, i - 1))
    arr[i] = [...arr[i - 1], ...newArr]
  }
  return arr[n]
}
```