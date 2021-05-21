(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6926],{16926:n=>{n.exports="### 213.House_Robber_II\n\nYou are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are `arranged in a circle`. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\nExample 1:\n\n```js\nInput: nums = [2,3,2]\nOutput: 3\nExplanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\n```\n\nExample 2:\n\n```js\nInput: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n```\n\nExample 3:\n\n```js\nInput: nums = [0]\nOutput: 0\n```\n\nConstraints:\n* 1 <= nums.length <= 100\n* 0 <= nums[i] <= 1000\n\n### Analyze\n\n思考🤔:\n\n```js\n                                [0, n - 1]\n                            /       |  ...       \\             \\\n                    [2, n - 1]     [3, n - 1]    [4, n - 1]  ...  [n - 1]\n              /\n      [4, n - 1]: 此时找到了重复子项\n```\n\n* `状态的定义`(即函数的定义): 考虑偷取 `[m, n - 1]` 范围内的房子\n* `状态转移`: f(0) = `Math.max(v(0) + f(2), v(1) + f(3), v(2) + f(4), ..., v(n - 3) + f(n - 1), v(n - 2), v(n - 1))`\n\n```js\n/**\n * @param {number[]} nums\n * @return {number}\n */\nvar rob = function(nums) {\n\n};\n```"}}]);