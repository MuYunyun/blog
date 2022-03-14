### 309. Best Time to Buy and Sell Stock with Cooldown

You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

* `After you sell your stock, you cannot buy stock on the next day` (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., `you must sell the stock before you buy again`).

Example 1:

```js
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell]
(-1 + 2 - 0 + 2)
```

Example 2:

```js
Input: prices = [1]
Output: 0
```

Constraints:

* 1 <= prices.length <= 5000
* 0 <= prices[i] <= 1000

### Analyze

```js
                                [0, n - 1]
                            /       |  ...       \             \
                    [2, n - 1]     [3, n - 1]    [4, n - 1]  ...  [n - 1]
              /
      [4, n - 1]: 此时找到了重复子项
```

* 状态定义：考虑从 `[0, n - 1]` 中获取最大利润。
* 状态转移：
  * f(n - 1) = 0
  * f(n - 2) = Math.max(0, -prices[n - 2] + prices[n - 1])
  * f(n - 3) = Math.max(0, f(n - 2), -prices[n - 3] + prices[n - 1])
  * f(n - 4) = Math.max(0, f(n - 3), -prices[n - 3] + prices[n - 1])

// 第 n 天股票没买：
// 第 n 天股票购买：
  * f(n) = Max{f(n + 1), }

转化冷冻期的概念：当日是否可卖出股票取决于昨日是否有卖出股票。

进一步抽象出以下几种状态。

1. 当日无 stock，有购买
2. 当日无 stock，无购买
3. 当日有 stock，有出售
4. 当日有 stock，无出售

初始值赋值：

1. f[0][0] =
2. f[0][1] = 0
3. f[0][2] = -1
4. f[0][3] = -1

状态转移：



```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {

}
```