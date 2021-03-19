### 什么是动态规划

动态规划`将一个大问题拆分成若干个子问题`, 同时保存子问题的答案, 使得每个子问题只求解一次, 最终获得原问题的答案。其本质也是`递归问题`。

以[递归](./recursive.md) 章节中斐波那契数列为例, 其使用了`自上而下`的思路来解决问题。同时为了避免多次重复的调用递归函数, 使用了记忆化缓存数据。伪代码表示如下:

```
                            fn(n) = fn(n - 1) + fn(n - 2)
                                     /                 \
        fn(n - 1) = fn(n - 2) + fn(n - 3)          fn(n - 2) = fn(n - 3) + fn(n - 4)
                        /             \                            /             \
                      ...             ...                         ...            ...
```

动态规划则与其相反, 其使用了`自下而上`的思路来解决问题。



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
