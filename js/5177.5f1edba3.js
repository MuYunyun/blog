(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5177],{5177:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>m});var a=t(59713),r=t.n(a),o=t(6479),l=t.n(o),u=(t(67294),t(3905));function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var i={};function m(e){var n=e.components,t=l()(e,["components"]);return(0,u.kt)("wrapper",p(p(p({},i),t),{},{components:n,mdxType:"MDXLayout"}),(0,u.kt)("h3",null,"213.House_Robber_II"),(0,u.kt)("p",null,"You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are ",(0,u.kt)("inlineCode",{parentName:"p"},"arranged in a circle"),". That means ",(0,u.kt)("inlineCode",{parentName:"p"},"the first house is the neighbor of the last one"),". Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night."),(0,u.kt)("p",null,"Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police."),(0,u.kt)("p",null,"Example 1:"),(0,u.kt)("pre",null,(0,u.kt)("code",p({parentName:"pre"},{className:"language-js"}),"Input: nums = [2,3,2]\nOutput: 3\nExplanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.\n")),(0,u.kt)("p",null,"Example 2:"),(0,u.kt)("pre",null,(0,u.kt)("code",p({parentName:"pre"},{className:"language-js"}),"Input: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4.\n")),(0,u.kt)("p",null,"Example 3:"),(0,u.kt)("pre",null,(0,u.kt)("code",p({parentName:"pre"},{className:"language-js"}),"Input: nums = [0]\nOutput: 0\n")),(0,u.kt)("p",null,"Constraints:"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"1 <= nums.length <= 100"),(0,u.kt)("li",{parentName:"ul"},"0 <= nums","[i]"," <= 1000")),(0,u.kt)("h3",null,"Analyze"),(0,u.kt)("p",null,"思考🤔:"),(0,u.kt)("pre",null,(0,u.kt)("code",p({parentName:"pre"},{className:"language-js"}),"                                    [0, n - 2] || [1, n - 1]\n            /        |  ...      \\                                      /        |  ...      \\\n      [2, n - 2]     [3, n - 2]  ...  [n - 2]                 [3, n - 1]     [4, n - 1]  ...  [n - 1]\n      /\n[4, n - 2]: 此时找到了重复子项\n")),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"状态的定义"),"(即函数的定义): 考虑偷取 ",(0,u.kt)("inlineCode",{parentName:"li"},"[m, n - 2] || [z, n - 1]")," 范围内的房子"),(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"状态转移"),": f(0) = ",(0,u.kt)("inlineCode",{parentName:"li"},"Math.max(v(0) + f(2), v(1) + f(3), v(2) + f(4), ..., v(n - 3) + f(n - 1), v(n - 2), v(n - 1))"))),(0,u.kt)("pre",null,(0,u.kt)("code",p({parentName:"pre"},{className:"language-js"}),"/**\n * @param {number[]} nums\n * @return {number}\n */\nvar rob = function(nums) {\n\n};\n")))}m.isMDXComponent=!0}}]);