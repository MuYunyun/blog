(self.webpackChunkblog=self.webpackChunkblog||[]).push([[5522],{55522:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var n=r(59713),p=r.n(n),o=r(6479),a=r.n(o),c=(r(67294),r(3905));function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){p()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={};function s(e){var t=e.components,r=a()(e,["components"]);return(0,c.kt)("wrapper",l(l(l({},m),r),{},{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h2",null,"TypeScript 模块篇"),(0,c.kt)("h3",null,"TypeScript 之模块导入"),(0,c.kt)("p",null,"为什么在 TypeScript 中会使用 ",(0,c.kt)("inlineCode",{parentName:"p"},"import * as React from react"),"，而不是 ",(0,c.kt)("inlineCode",{parentName:"p"},"import React from react"),", 这个问题困惑了一些时日。"),(0,c.kt)("p",null,"观察 React 的导出代码:"),(0,c.kt)("pre",null,(0,c.kt)("code",l({parentName:"pre"},{className:"language-js"}),"if (process.env.NODE_ENV === 'production') {\n  module.exports = require('./cjs/react.production.min.js');\n} else {\n  module.exports = require('./cjs/react.development.js');\n}\n")),(0,c.kt)("p",null,"可以发现其是 ",(0,c.kt)("inlineCode",{parentName:"p"},"common.js")," 形式的导出, 而我们知道 ",(0,c.kt)("inlineCode",{parentName:"p"},"import")," 是 es6 的引入, 所以 TypeScript 中出现的 ",(0,c.kt)("inlineCode",{parentName:"p"},"import * as ___ from ___")," 提供了使用 ",(0,c.kt)("inlineCode",{parentName:"p"},"import")," 语法调用 ",(0,c.kt)("inlineCode",{parentName:"p"},"common.js")," 的口子。"),(0,c.kt)("p",null,"比如 ",(0,c.kt)("inlineCode",{parentName:"p"},"import * as React from react")," 等价于 ",(0,c.kt)("inlineCode",{parentName:"p"},"const React = require('react')"),", 它还等价于另外一种写法 ",(0,c.kt)("inlineCode",{parentName:"p"},"import React = require('react')")," (在 webpack 语境下生效)"),(0,c.kt)("p",null,"而 ",(0,c.kt)("inlineCode",{parentName:"p"},"import React from 'react'")," 在 TS 中等价于 ",(0,c.kt)("inlineCode",{parentName:"p"},"const React = require('react').default")),(0,c.kt)("p",null,"在 typescript 的配置文件中可以加上 ",(0,c.kt)("inlineCode",{parentName:"p"},"esModuleInterop")," 参数, 具体见 ",(0,c.kt)("a",l({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/compiler-options.html"}),"官网"),", 其效果可以将 ",(0,c.kt)("inlineCode",{parentName:"p"},"import React from react")," 转为 ",(0,c.kt)("inlineCode",{parentName:"p"},"import * as React from react")),(0,c.kt)("p",null,"在使用了 esModuleInterop 参数后, 像 React、ReactDOM(对象块) 使用 import * as React from 'react' 的形式, warning、classnames(函数) 等库使用 import warning from 'warning' 形式。"),(0,c.kt)("blockquote",null,(0,c.kt)("p",{parentName:"blockquote"},"在 webpack 中的话使用 import React from 'react'  和 import * as React from 'react' 都能帮你打包, 但是其它的 Rollup 和 Parcel 没有支持")))}s.isMDXComponent=!0}}]);