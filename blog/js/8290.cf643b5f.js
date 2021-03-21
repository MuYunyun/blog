(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8290],{78290:n=>{n.exports="### 什么是动态规划\n\n动态规划`将一个大问题拆分成若干个子问题`, 同时保存子问题的答案, 使得每个子问题只求解一次, 最终获得原问题的答案。其本质也是`递归问题`。\n\n### 动态规划是自下而上的递归\n\n通常自上而下的递归会产生`重复的函数调用栈`, 以[递归](./recursive.md) 章节中`斐波那契数列`为例, 其使用了`自上而下`的思路来解决问题。\n\n> 关于重复的函数调用栈解释: 比如求斐波那契数列 f(4) 的值时, 其转化为 `f(3) + f(2)`, 进而转化为 `2f(2) + f(1)`, 可以看到此时重复调用了 f(2)。\n\n```js\n                            fn(n) = fn(n - 1) + fn(n - 2)\n                                     /                 \\\n        fn(n - 1) = fn(n - 2) + fn(n - 3)          fn(n - 2) = fn(n - 3) + fn(n - 4)\n                        /             \\                            /             \\\n                      ...             ...                         ...            ...\n```\n\n动态规划则与其相反, 其使用了`自下而上`的思路来解决问题。伪代码示意如下:\n\n```js\nfn(n) = fn(1) + fn(2) + ... + f(n)\n```\n\n具体实现:\n\n```js\nvar fibonacci = function(n) {\n  const arr = [1, 1]\n  for (let i = 2; i <= n; i++) {\n    arr[i] = arr[i - 1] + arr[i - 2]\n  }\n\n  return arr[n]\n}\n```\n\n\n|      递归方向      |     优点     |           缺点           |\n| :----------------: | :----------: | :----------------------: |\n|      自上而下      | 思路容易理顺 |  会出现函数栈重复的调用  |\n| 自下而上(动态规划) | 思路不易理顺 | 不会出现函数栈重复的调用 |\n\n### 动态规划解题思路\n\n1. 确定子问题\n2. 确定终止条件\n\n### 案例 —— 最小找零硬币数\n\n场景: 假如有 1, 5, 10, 20 美分的硬币\n\n```\n[1, 5, 10, 20]\n\n4              // 找零数\n[1, 1, 1, 1]   // 需 4 个 1 美分的硬币\n\n5              // 找零数\n[5]            // 需 1 个 5 美分的硬币\n\n36             // 找零数\n[20, 10, 5, 1] // 需 20、10、5、1美分的硬币各一个\n```\n\n下面用代码来实现:\n\n```js\nvar MinChange = function (changeType) {\n  this.changeType = changeType\n  this.cache = {}\n}\n\nMinChange.prototype.makeChange = function (amount) {\n  let min = []\n  if (!amount) {\n    return []\n  }\n  if (this.cache[amount]) {   // 读缓存\n    return this.cache[amount]\n  }\n\n  for (let i = 0; i < this.changeType.length; i++) {\n    const leftAmount = amount - this.changeType[i]\n    let newMin\n    if (leftAmount >= 0) {\n      newMin = this.makeChange(leftAmount) // 这一句是动态规划的提现\n    }\n    if (leftAmount >= 0\n      && (newMin.length < min.length - 1 || !min.length)) { // 如果存在更小的找零硬币数, 则执行后面语句\n      min = [this.changeType[i]].concat(newMin)\n    }\n  }\n\n  return this.cache[amount] = min\n}\n```\n\n下面进行测试:\n\n```js\nvar minChange = new MinChange([1, 5, 10, 20])\n\nminChange.makeChange(2)  // [1, 1]\nminChange.makeChange(5)  // [5]\nminChange.makeChange(36) // [1, 5, 10, 20]\n```\n"}}]);