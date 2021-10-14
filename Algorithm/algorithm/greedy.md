<!--
abbrlink: pkr9cdeo
-->

### 贪心算法

贪心算法是一种求近似解的思想。当能满足大部分最优解时就认为符合逻辑要求。

### 例子

以 [最小找零硬币数](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/动态规划.md#案例--最小找零硬币数) 这个案例为例, 考虑使用贪心算法解题: 比如当找零数为 36 时, 从硬币数的最大值 20 开始填充, 填充不下后再用 10 来填充, 以此类推, 找到最优解。

```
场景: 假如有 1, 5, 10, 20 美分的硬币

36             // 找零数
[20, 10, 5, 1] // 需 20、10、5、1美分的硬币各一个
```

代码如下:

```js
var MinChange = function (changeType) {
  this.changeType = changeType.sort((r1, r2) => r2 - r1)
}

MinChange.prototype.makeChange = function(amount) {
  const arr = []
  for (let i = 0; i < this.changeType.length; i++) {
    while (amount - this.changeType[i] >= 0) {
      arr.push(this.changeType[i])
      amount = amount - this.changeType[i]
    }
  }
  return arr
}
```

来测试下:

```js
var minChange = new MinChange([1, 5, 10, 20])

minChange.makeChange(36) // [20, 10, 5, 1]
```

相比于动态规划算法, 贪心算法实现得相对简单, 而且也确实满足了大部分情况下的最优解。但是如下情况贪心算法就不满足了:

```js
var minChange = new MinChange([1, 3, 3, 4])

minChange.makeChange(6) // 结果输出 [4, 1, 1], 而我们期望的是 [3, 3]
```