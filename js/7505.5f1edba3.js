(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7505],{77505:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var r=n(59713),a=n.n(r),l=n(6479),o=n.n(l),i=(n(67294),n(3905));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var p={};function u(e){var t=e.components,n=o()(e,["components"]);return(0,i.kt)("wrapper",s(s(s({},p),n),{},{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",null,"63. Unique Paths II"),(0,i.kt)("p",null,"A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below)."),(0,i.kt)("p",null,"The robot can only move either ",(0,i.kt)("inlineCode",{parentName:"p"},"down or right")," at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below)."),(0,i.kt)("p",null,"Now consider if some obstacles are added to the grids. How many unique paths would there be?"),(0,i.kt)("p",null,"An obstacle and space is marked as 1 and 0 respectively in the grid."),(0,i.kt)("p",null,"Example 1:"),(0,i.kt)("p",null,(0,i.kt)("img",s({parentName:"p"},{src:"https://assets.leetcode.com/uploads/2020/11/04/robot1.jpg",alt:null}))),(0,i.kt)("pre",null,(0,i.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]\nOutput: 2\n")),(0,i.kt)("p",null,"Explanation: There is one obstacle in the middle of the 3x3 grid above.\nThere are two ways to reach the bottom-right corner:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Right -> Right -> Down -> Down"),(0,i.kt)("li",{parentName:"ol"},"Down -> Down -> Right -> Right")),(0,i.kt)("p",null,"Example 2:"),(0,i.kt)("p",null,(0,i.kt)("img",s({parentName:"p"},{src:"https://assets.leetcode.com/uploads/2020/11/04/robot2.jpg",alt:null}))),(0,i.kt)("pre",null,(0,i.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: obstacleGrid = [[0,1],[0,0]]\nOutput: 1\n")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Constraints:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"m == obstacleGrid.length"),(0,i.kt)("li",{parentName:"ul"},"n == obstacleGrid","[i]",".length"),(0,i.kt)("li",{parentName:"ul"},"1 <= m, n <= 100"),(0,i.kt)("li",{parentName:"ul"},"obstacleGrid","[i][j]"," is 0 or 1.")))),(0,i.kt)("h3",null,"Analyze"),(0,i.kt)("pre",null,(0,i.kt)("code",s({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number[][]} obstacleGrid\n * @return {number}\n */\nvar uniquePathsWithObstacles = function(obstacleGrid) {\n  const m = obstacleGrid.length\n  const n = obstacleGrid[0].length\n\n  if (obstacleGrid[m - 1][n - 1] === 1) return 0\n  const cache = {\n    [`${m - 1}_${n - 1}`]: 1\n  }\n\n  for (let i = m - 1; i >= 0; i--) {\n    for (let j = n - 1; j >= 0; j--) {\n      if (obstacleGrid[i][j] === 1) {\n        continue\n      }\n      if (i === m - 1 && j === n - 1) {\n        continue\n      } else if (i === m - 1) {\n        if (!cache[`${i}_${j + 1}`]) continue\n        cache[`${i}_${j}`] = cache[`${i}_${j + 1}`]\n      } else if (j === n - 1) {\n        if (!cache[`${i + 1}_${j}`]) continue\n        cache[`${i}_${j}`] = cache[`${i + 1}_${j}`]\n      } else {\n        cache[`${i}_${j}`] = (cache[`${i + 1}_${j}`] || 0) + (cache[`${i}_${j + 1}`] || 0)\n      }\n    }\n  }\n\n  return cache[`0_0`] || 0\n}\n")),(0,i.kt)("h3",null,"Similar Title"),(0,i.kt)("p",null,"62"))}u.isMDXComponent=!0}}]);