<!--
abbrlink: 4id99bn9
-->

### Optimize fibonacci sequence

> 题目: 求斐波那契数列 1,1,2,3,5,8,13,21,34,55,89...中的第 n 项

斐波那契数列考察的是递归算法, 但是要注意优化, 探寻下面优化前后的代码片段。

优化前:

```js
let count1 = 0
function fn(n) {
  count1++
  if (n === 1 || n === 2) {
    return 1
  }
  return fn(n - 1) + fn(n - 2)
}

console.log(fn(20), count1) // 6765 13529
```

优化后:

```js
function _fn(n) {
  if (cache[n]) {
    return cache[n]
  }
  count2++
  if (n === 1 || n === 2) {
    return 1
  }
  cache[n - 1] = _fn(n - 1)
  cache[n - 2] = _fn(n - 2)
  return cache[n - 1] + cache[n - 2]
}

let count2 = 0
function fn(n) {
  const cache = {}
  return _fn(n)
}

console.log(fn(20), count2) // 6765 20
```

小结: 通过`记忆化缓存数据`, 可以看到大大提高了运行性能。