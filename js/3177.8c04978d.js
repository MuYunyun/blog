(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3177],{3177:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>a});var r=t(59713),l=t.n(r),s=t(6479),o=t.n(s),c=(t(67294),t(3905));function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function p(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){l()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u={};function a(e){var n=e.components,t=o()(e,["components"]);return(0,c.kt)("wrapper",p(p(p({},u),t),{},{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h3",null,"title"),(0,c.kt)("p",null,"给定一个字符串 s, 找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。"),(0,c.kt)("p",null,"示例 1:"),(0,c.kt)("p",null,'输入: "babad"\n输出: "bab"\n注意: "aba"也是一个有效答案。'),(0,c.kt)("p",null,"示例 2:"),(0,c.kt)("p",null,'输入: "cbbd"\n输出: "bb"'),(0,c.kt)("h3",null,"analyze"),(0,c.kt)("p",null,"目前的解法判断字符串 s 和它的倒序 s' 是否拥有公有字符串, 且它们的公有字符串应该符合倒序。目前用暴力法实现~~"),(0,c.kt)("p",null,"题目可以转换为求 s 和它的倒序 s' 的最长公有字符串。以后再看。"),(0,c.kt)("pre",null,(0,c.kt)("code",p({parentName:"pre"},{className:"language-js"}),"/**\n * @param {string} s\n * @return {string}\n */\n\n// 暴力法 有几个用例超时\nvar longestPalindrome = function (s) {\n  const reverseS = s.split('').reverse().join('')\n  let result = '', len = 0\n  for (let i = 0; i < s.length; i++) {\n    for (let j = i; j < s.length; j++) {\n      const sliceS = s.slice(i, j + 1)\n      if (sliceS.length > len) {\n        if (reverseS.indexOf(sliceS) >= 0 && sliceS === sliceS.split('').reverse().join('')) {\n          len = sliceS.length\n          result = sliceS\n        }\n      }\n    }\n  }\n  return result\n};\n")))}a.isMDXComponent=!0}}]);