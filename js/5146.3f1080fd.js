(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5146],{75146:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});var l=n(59713),o=n.n(l),r=n(6479),a=n.n(r),p=(n(67294),n(3905));function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function i(e){var t=e.components,n=a()(e,["components"]);return(0,p.kt)("wrapper",s(s(s({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,p.kt)("h3",null,"前端项目中的 global 对象"),(0,p.kt)("p",null,"webpack 项目中是能使用 global 的。"),(0,p.kt)("pre",null,(0,p.kt)("code",s({parentName:"pre"},{className:"language-js"}),"(function(global) {\n\n})(window)\n")),(0,p.kt)("h3",null,"浏览器竟然存在 global"),(0,p.kt)("p",null,"开发/测试环境有 global 对象, 线上环境没有 global 对象, 应该是 core.js 这个库的版本不一致造成的。"),(0,p.kt)("p",null,"在 ",(0,p.kt)("inlineCode",{parentName:"p"},"batman/node_modules/core-js/modules/_redefine.js")," 这个包里进行了 ",(0,p.kt)("inlineCode",{parentName:"p"},"window.global")," 的赋值操作。"),(0,p.kt)("h3",null,"项目中枚举值前端自己维护的原因"),(0,p.kt)("p",null,"枚举是根据后端的注释所生成的, 如果后端注释写错或者没有写注释, javadoc 就生成不了。"),(0,p.kt)("h3",null,"Content-Type"),(0,p.kt)("p",null,"这个部分的知识对使用 postman 很有帮助。"),(0,p.kt)("p",null,"Content-Type: application/json      会将相应类型传到网关\nContent-Type: x-www-form-urlencoded 所有类型都以字符串的形式传到网关"),(0,p.kt)("h3",null,"痛点"),(0,p.kt)("ul",s({},{className:"contains-task-list"}),(0,p.kt)("li",s({parentName:"ul"},{className:"task-list-item"}),(0,p.kt)("input",s({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ","结合 vscode 插件定制模板, 快速插入")))}i.isMDXComponent=!0}}]);