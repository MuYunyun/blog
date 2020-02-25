### title

编写一个算法来判断一个数是不是“快乐数”。

一个“快乐数”定义为：对于一个正整数，每一次将该数替换为它`每个位置上的数字的平方和`，然后重复这个过程直到这个数变为 1，也可能是无限循环但始终变不到 1。如果可以变为 1，那么这个数就是快乐数。

示例: 

```js
输入: 19
输出: true
解释:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

### 题解

* 使用`字典 Map` 来记录循环过程中各个位置上的数字的平方和
  * 若平方和的值为 1, 则跳出循环, 这个数是快乐数;
  * 若平方和的值不为 1, 则判断字典 Map 中是否已有该值;
    * 若字典 Map 中已有该值, 则这个数不是快乐数;

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  const mapResult = new Map()

  let currentSum = getSum(n)
  while (currentSum !== 1) {
    const getMapResult = mapResult.get(currentSum)
    if (!getMapResult) {
      mapResult.set(currentSum, 1)
    } else {
      return false
    }
    currentSum = getSum(currentSum)
  }
  return true
}

/* 获取数字各个位数之和 */
var getSum = function(num) {
  let sum = 0
  const numStr = String(num)
  for (let i = 0; i < numStr.length; i++) {
    sum = sum + Math.pow(numStr[i], 2)
  }
  return sum
}
```

### 相关题目

205、242、290、349、350、451