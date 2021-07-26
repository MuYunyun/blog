(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5310],{35310:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>c});var a=n(59713),l=n.n(a),r=n(6479),p=n.n(r),o=(n(67294),n(3905));function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function c(e){var t=e.components,n=p()(e,["components"]);return(0,o.kt)("wrapper",s(s(s({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"71.Simplify_Path"),(0,o.kt)("p",null,"Given an absolute path for a file (Unix-style), simplify it. Or in other words, convert it to the canonical path."),(0,o.kt)("p",null,"In a UNIX-style file system, a period . refers to the current directory. Furthermore, a double period .. moves the directory up a level. For more information, see: Absolute path vs relative path in Linux/Unix"),(0,o.kt)("p",null,"Note that the returned canonical path must always ",(0,o.kt)("inlineCode",{parentName:"p"},"begin with a slash /"),", and there must be ",(0,o.kt)("inlineCode",{parentName:"p"},"only a single slash / between two directory names"),". The last directory name (if it exists) must ",(0,o.kt)("inlineCode",{parentName:"p"},"not end with a trailing /"),". Also, the canonical path must be the shortest string representing the absolute path."),(0,o.kt)("p",null,"Example 1:"),(0,o.kt)("p",null,"Explanation: Note that there is no trailing slash after the last directory name."),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/home/"\nOutput: "/home"\n')),(0,o.kt)("p",null,"Example 2:"),(0,o.kt)("p",null,"Explanation: Going one level up from the root directory is a no-op, as the root level is the highest level you can go."),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/../"\nOutput: "/"\n')),(0,o.kt)("p",null,"Example 3:"),(0,o.kt)("p",null,"Explanation: In the canonical path, multiple consecutive slashes are replaced by a single one."),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/home//foo/"\nOutput: "/home/foo"\n')),(0,o.kt)("p",null,"Example 4:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/a/./b/../../c/"\nOutput: "/c"\n')),(0,o.kt)("p",null,"Example 5:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/a/../../b/../c//.//"\nOutput: "/c"\n')),(0,o.kt)("p",null,"Example 6:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'Input: "/a//b////c/d//././/.."\nOutput: "/a/b/c"\n')),(0,o.kt)("h3",null,"Analyze"),(0,o.kt)("p",null,"可以用栈的思想来完成解题;"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"使用 '/' 分割 path 为得到数组;"),(0,o.kt)("li",{parentName:"ol"},"对以下几种情况分别处理:",(0,o.kt)("ol",{parentName:"li"},(0,o.kt)("li",{parentName:"ol"},"如果遇见 '.' 或者 '', 则忽略;"),(0,o.kt)("li",{parentName:"ol"},"如果遇见字母, 则将其推入栈的末尾;"),(0,o.kt)("li",{parentName:"ol"},"如果遇见 '..', 则从栈末尾移除一个元素;")))),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),"/**\n * @param {string} path\n * @return {string}\n */\nvar simplifyPath = function(path) {\n  const pathArr = path.split('/')\n  const stack = []\n  for (let i = 0; i < pathArr.length; i++) {\n    if (pathArr[i] === '..') {\n      stack.pop()\n    } else if (pathArr[i] === '.' || pathArr[i] === '') {\n      continue\n    } else {\n      stack.push(pathArr[i])\n    }\n  }\n\n  return `/${stack.join('/')}`\n}\n")),(0,o.kt)("h3",null,"Similar Title"),(0,o.kt)("p",null,"20、150"))}c.isMDXComponent=!0}}]);