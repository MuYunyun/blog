(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4065],{64065:n=>{n.exports="### 120. Triangle\n\nGiven a triangle array, return the `minimum path sum` from top to bottom.\n\nFor each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either `index i` or `index i + 1` on the next row.\n\nExample 1:\n\n```js\nInput: triangle = [[2], [3,4], [6,5,7], [4,1,8,3]]\nOutput: 11\nExplanation: The triangle looks like:\n   2\n  3 4\n 6 5 7\n4 1 8 3\nThe minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).\n```\n\nExample 2:\n\n```js\nInput: triangle = [[-10]]\nOutput: -10\n```\n\n* Constraints:\n  * 1 <= triangle.length <= 200\n  * triangle[0].length == 1\n  * triangle[i].length == triangle[i - 1].length + 1\n  * -104 <= triangle[i][j] <= 104\n \nFollow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?\n\n### Analyze\n\n      0\n    0\n  0   1\n0   1\n  1   2\n    2\n      3\n\n```js\n/**\n * @param {number[][]} triangle\n * @return {number}\n */\nvar minimumTotal = function(triangle) {\n  let result = 0\n  let pick = 0\n  for (let i = 0; i < triangle.length; i++) {\n    const smallerValue = triangle[i][pick + 1]\n      && (triangle[i][pick + 1] < triangle[i][pick]) ? triangle[i][pick + 1] : triangle[i][pick]\n    result += smallerValue\n  }\n  return result\n}\n```\n"}}]);