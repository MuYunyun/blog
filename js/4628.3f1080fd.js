(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4628],{94628:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>c});var a=t(59713),r=t.n(a),l=t(6479),u=t.n(l),o=(t(67294),t(3905));function p(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?p(Object(t),!0).forEach((function(e){r()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var s={};function c(n){var e=n.components,t=u()(n,["components"]);return(0,o.kt)("wrapper",i(i(i({},s),t),{},{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"216.Combination_Sum_III"),(0,o.kt)("p",null,"Find all valid combinations of k numbers that sum up to n such that the following conditions are true:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Only numbers 1 through 9 are used."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Each number is used at most once"),".")),(0,o.kt)("p",null,"Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order."),(0,o.kt)("p",null,"Example 1:"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"Input: k = 3, n = 7\nOutput: [[1,2,4]]\n\nExplanation:\n1 + 2 + 4 = 7\nThere are no other valid combinations.\n")),(0,o.kt)("p",null,"Example 2:"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"Input: k = 3, n = 9\nOutput: [[1,2,6],[1,3,5],[2,3,4]]\n\nExplanation:\n1 + 2 + 6 = 9\n1 + 3 + 5 = 9\n2 + 3 + 4 = 9\nThere are no other valid combinations.\n")),(0,o.kt)("p",null,"Example 3:"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"Input: k = 4, n = 1\nOutput: []\n\nExplanation: There are no valid combinations. [1,2,1] is not valid because 1 is used twice.\n")),(0,o.kt)("p",null,"Example 4:"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"Input: k = 3, n = 2\nOutput: []\n\nExplanation: There are no valid combinations.\n")),(0,o.kt)("p",null,"Example 5:"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"Input: k = 9, n = 45\nOutput: [[1,2,3,4,5,6,7,8,9]]\n\nExplanation:\n1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45\n​​​​​​​There are no other valid combinations.\n")),(0,o.kt)("p",null,"Constraints:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"2 <= k <= 9"),(0,o.kt)("li",{parentName:"ul"},"1 <= n <= 60")),(0,o.kt)("h3",null,"Analyze"),(0,o.kt)("p",null,"从题目 ",(0,o.kt)("inlineCode",{parentName:"p"},"Each number is used at most once")," 得知, 该题属于组合问题。"),(0,o.kt)("pre",null,(0,o.kt)("code",i({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number} k\n * @param {number} n\n * @return {number[][]}\n */\nvar combinationSum3 = function(k, n) {\n  const result = []\n\n  recursive(k, n, 1, [], result)\n  return result\n};\n\nvar recursive = function(k, n, start, temp, result) {\n  if (n < 0 || temp.length > k) return\n  if (n === 0 && temp.length === k) {\n    result.push([...temp])\n    return\n  }\n\n  for (let i = start; i <= 9; i++) {\n    temp.push(i)\n    n = n - i\n    recursive(k, n, i + 1, temp, result)\n    n = n + i\n    temp.pop()\n  }\n}\n")),(0,o.kt)("h3",null,"Sister Title"),(0,o.kt)("p",null,"39、40"))}c.isMDXComponent=!0}}]);