(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9062],{79062:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>c});var r=t(59713),u=t.n(r),a=t(6479),l=t.n(a),p=(t(67294),t(3905));function s(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function m(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?s(Object(t),!0).forEach((function(e){u()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var o={};function c(n){var e=n.components,t=l()(n,["components"]);return(0,p.kt)("wrapper",m(m(m({},o),t),{},{components:e,mdxType:"MDXLayout"}),(0,p.kt)("h3",null,"46.Permutations"),(0,p.kt)("p",null,"Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order."),(0,p.kt)("p",null,"Example 1:"),(0,p.kt)("pre",null,(0,p.kt)("code",m({parentName:"pre"},{className:"language-js"}),"Input: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n")),(0,p.kt)("p",null,"Example 2:"),(0,p.kt)("pre",null,(0,p.kt)("code",m({parentName:"pre"},{className:"language-js"}),"Input: nums = [0,1]\nOutput: [[0,1],[1,0]]\n")),(0,p.kt)("p",null,"Example 3:"),(0,p.kt)("pre",null,(0,p.kt)("code",m({parentName:"pre"},{className:"language-js"}),"Input: nums = [1]\nOutput: [[1]]\n")),(0,p.kt)("p",null,"Constraints:"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"1 <= nums.length <= 6"),(0,p.kt)("li",{parentName:"ul"},"-10 <= nums","[i]"," <= 10"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"All the integers of nums are unique"))),(0,p.kt)("h3",null,"analyze"),(0,p.kt)("p",null,"该问题可以看成为一道排列问题, 排列问题的一种常见解法是回溯法:"),(0,p.kt)("pre",null,(0,p.kt)("code",m({parentName:"pre"},{className:"language-bash"}),"* 1\n  * 2\n    * 3\n  * 3\n    * 2\n* 2\n  * 1\n    * 3\n  * 3\n    * 1\n* 3\n  * 1\n    * 2\n  * 2\n    * 1\n")),(0,p.kt)("pre",null,(0,p.kt)("code",m({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function (nums) {\n  const res = []\n  backtracking(nums, [], res)\n  return res\n};\n\nvar backtracking = function(nums, temp, res) {\n  if (temp.length === nums.length) {\n    res.push([...temp])\n    return\n  }\n\n  for (let i = 0; i < nums.length; i++) {\n    if (!temp.includes(nums[i])) {\n      temp.push(nums[i])\n      backtracking(nums, temp, res)\n      temp.pop(nums[i])\n    } else {\n      continue\n    }\n  }\n}\n")))}c.isMDXComponent=!0}}]);