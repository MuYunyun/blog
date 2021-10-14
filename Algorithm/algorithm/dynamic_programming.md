<!--
abbrlink: wjncoyei
-->

### 什么是动态规划

动态规划`将一个大问题拆分成若干个子问题`, 同时保存子问题的答案, 使得每个子问题只求解一次, 最终获得原问题的答案。其本质也是`递归问题`。

### 动态规划是自下而上的递归

通常自上而下的递归会产生`重复的函数调用栈`, 以[递归](./recursive.md) 章节中`斐波那契数列`为例, 其使用了`自上而下`的思路来解决问题。

> 关于重复的函数调用栈解释: 比如求斐波那契数列 f(4) 的值时, 其转化为 `f(3) + f(2)`, 进而转化为 `2f(2) + f(1)`, 可以看到此时重复调用了 f(2)。

```js
                            fn(n) = fn(n - 1) + fn(n - 2)
                                     /                 \
        fn(n - 1) = fn(n - 2) + fn(n - 3)          fn(n - 2) = fn(n - 3) + fn(n - 4)
                        /             \                            /             \
                      ...             ...                         ...            ...
```

动态规划则与其相反, 其使用了`自下而上`的思路来解决问题。伪代码示意如下:

```js
fn(n) = fn(1) + fn(2) + ... + f(n)
```

具体实现:

```js
var fibonacci = function(n) {
  const arr = [1, 1]
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }

  return arr[n]
}
```


|      递归方向      |     优点     |           缺点           |
| :----------------: | :----------: | :----------------------: |
|      自上而下      | 思路容易理顺 |  会出现函数栈重复的调用  |
| 自下而上(动态规划) | 思路不易理顺 | 不会出现函数栈重复的调用 |

### 动态规划解题思路

1. 确定子问题
2. 确定终止条件

### 案例 —— 最小找零硬币数

场景: 假如有 1, 5, 10, 20 美分的硬币

```
[1, 5, 10, 20]

4              // 找零数
[1, 1, 1, 1]   // 需 4 个 1 美分的硬币

5              // 找零数
[5]            // 需 1 个 5 美分的硬币

36             // 找零数
[20, 10, 5, 1] // 需 20、10、5、1美分的硬币各一个
```

下面用代码来实现:

```js
var MinChange = function (changeType) {
  this.changeType = changeType
  this.cache = {}
}

MinChange.prototype.makeChange = function (amount) {
  let min = []
  if (!amount) {
    return []
  }
  if (this.cache[amount]) {   // 读缓存
    return this.cache[amount]
  }

  for (let i = 0; i < this.changeType.length; i++) {
    const leftAmount = amount - this.changeType[i]
    let newMin
    if (leftAmount >= 0) {
      newMin = this.makeChange(leftAmount) // 这一句是动态规划的提现
    }
    if (leftAmount >= 0
      && (newMin.length < min.length - 1 || !min.length)) { // 如果存在更小的找零硬币数, 则执行后面语句
      min = [this.changeType[i]].concat(newMin)
    }
  }

  return this.cache[amount] = min
}
```

下面进行测试:

```js
var minChange = new MinChange([1, 5, 10, 20])

minChange.makeChange(2)  // [1, 1]
minChange.makeChange(5)  // [5]
minChange.makeChange(36) // [1, 5, 10, 20]
```
