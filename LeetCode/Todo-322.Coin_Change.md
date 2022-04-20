<!--
abbrlink: mipdo1si
tags: ['背包问题']
-->

### 322. Coin Change

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the `fewest number` of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an `infinite number` of each kind of coin.

Example 1:

```js
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

Example 2:

```js
Input: coins = [2], amount = 3
Output: -1
```

Example 3:

```js
Input: coins = [1], amount = 0
Output: 0
```

* Constraints:
  * 1 <= coins.length <= 12
  * 1 <= coins[i] <= 231 - 1
  * 0 <= amount <= 104

### Analyze

描述中有两个关键信息

1. `fewest number`：意味着应用最大的数字来逆序放入背包。
2. `infinite number`: 意味着背包中可以重复的数字。

以 `nums = [1,2,5]` 为例进行分析：

> dp[i] 的语义：在 nums 数组中挑选若干个值(可重复挑选)，使它们之和为 i。

<!-- * 初始状态：dp[0]
* 状态转移：dp[i][j] = Math.min(dp[i - 1][j] + dp[i - 1][j]) -->

每一行分别

| 背包容量 | 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    | 8    | 9    | 10   | 11   |
| :------- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|          | -1   | 1    | 1    | 3    | 2    | 1    | 2    | 2    | 3    | 3    | 2    | 3    |

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const sortedArr = coins.sort((a, b) => b - a)
  const deDuplicate = Array.from(new Set(sortedArr))

  let count = 0
  let extra = amount

  for (let i = 0; i < deDuplicate.length; i++) {
    while (extra > 0) {
      extra = extra - deDuplicate[i]
      count = count + 1
    }

    if (extra === 0) {
      return count
    } else {
      if (i === deDuplicate.length - 1) return -1

      extra = extra + deDuplicate[i]
      count = count - 1
    }
  }
  return count
}
```

```js
[186,419,83,408]
6249

输出：
-1
预期结果：
20
```

递归

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const sortedArr = coins.sort((a, b) => b - a)
  const deDuplicate = Array.from(new Set(sortedArr))
  if (amount === 0) return 0
  const cache = {}
  return recursive(deDuplicate, amount, cache, 0)
}

var recursive = function(arr, extra, cache, count) {
  if (cache[extra]) return cache[extra]
  let result
  // the problem is once return then extra loop logic can't be performed.
  for (let i = 0; i < arr.length; i++) {
    const extraVal = extra - arr[i]
    console.log('extraVal', extraVal)
    if (extraVal === 0) {
      result = Math.min(result, count + 1)
    } else if (extraVal > 0) {
      const recursiveVal = recursive(arr, extraVal, cache, count + 1)
      // console.log('recursiveVal', recursiveVal)
      cache[extraVal] = Math.min(cache[extraVal], recursiveVal)
    }
  }
  return result || -1
}
```

try

```js
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  const sortedArr = coins.sort((a, b) => b - a)
  const deDuplicate = Array.from(new Set(sortedArr))
  if (amount === 0) return 0
  const cache = {}
  recursive(deDuplicate, amount, cache, 0)
  return cache.count ? cache.count : -1
}

var recursive = function(arr, extra, cache, count) {
  if (extra < 0) return
  if (extra === 0) {
    cache.count = count
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (cache.count) return
    recursive(arr, extra - arr[i], cache, count + 1)
  }
}
```