(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7607],{77607:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>m});var r=t(59713),a=t.n(r),o=t(6479),l=t.n(o),u=(t(67294),t(3905));function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){a()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var i={};function m(e){var n=e.components,t=l()(e,["components"]);return(0,u.kt)("wrapper",s(s(s({},i),t),{},{components:n,mdxType:"MDXLayout"}),(0,u.kt)("h3",null,"129.Sum Root to Leaf Numbers"),(0,u.kt)("p",null,"Given a binary tree ",(0,u.kt)("inlineCode",{parentName:"p"},"containing digits from 0-9 only"),", each root-to-leaf path could represent a number."),(0,u.kt)("p",null,"An example is the root-to-leaf path 1->2->3 which represents the number 123."),(0,u.kt)("p",null,"Find the total sum of all root-to-leaf numbers."),(0,u.kt)("p",null,"Note: A leaf is a node with no children."),(0,u.kt)("p",null,"Example:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: [1,2,3]\n    1\n   / \\\n  2   3\nOutput: 25\n")),(0,u.kt)("p",null,"Explanation:"),(0,u.kt)("p",null,"The root-to-leaf path 1->2 represents the number 12.\nThe root-to-leaf path 1->3 represents the number 13.\nTherefore, sum = 12 + 13 = 25."),(0,u.kt)("p",null,"Example 2:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"Input: [4,9,0,5,1]\n    4\n   / \\\n  9   0\n / \\\n5   1\nOutput: 1026\n\nExplanation:\n\nThe root-to-leaf path 4->9->5 represents the number 495.\nThe root-to-leaf path 4->9->1 represents the number 491.\nThe root-to-leaf path 4->0 represents the number 40.\nTherefore, sum = 495 + 491 + 40 = 1026.\n")),(0,u.kt)("h3",null,"Analyze"),(0,u.kt)("p",null,"递归解题"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar sumNumbers = function(root) {\n  const analyzeObj = { sum: 0 }\n  if (!root) return analyzeObj.sum\n\n  analyzeSum(root, '', analyzeObj)\n  return analyzeObj.sum\n};\n\nvar analyzeSum = function(node, str, analyzeObj) {\n  if (!node) return\n  if (!node.left && !node.right) {\n    str += String(node.val)\n    analyzeObj.sum = analyzeObj.sum + parseInt(str, 10)\n    return\n  }\n\n  str += String(node.val)\n\n  analyzeSum(node.left, str, analyzeObj)\n  analyzeSum(node.right, str, analyzeObj)\n}\n")),(0,u.kt)("h3",null,"Similar Title"),(0,u.kt)("p",null,"113、257"))}m.isMDXComponent=!0}}]);