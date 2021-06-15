(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3014],{23014:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});var r=a(59713),l=a.n(r),n=a(6479),i=a.n(n),p=(a(67294),a(3905));function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){l()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var k={};function s(e){var t=e.components,a=i()(e,["components"]);return(0,p.kt)("wrapper",o(o(o({},k),a),{},{components:t,mdxType:"MDXLayout"}),(0,p.kt)("h3",null,"逆向工程思维"),(0,p.kt)("p",null,"阅读源码可以分三步走:"),(0,p.kt)("ol",null,(0,p.kt)("li",{parentName:"ol"},"观察"),(0,p.kt)("li",{parentName:"ol"},"假设"),(0,p.kt)("li",{parentName:"ol"},"验证")),(0,p.kt)("h4",null,"一些技巧"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"使用逆向工程思维阅读源码可以一边在本地看 ",(0,p.kt)("inlineCode",{parentName:"li"},"source")," 代码(结合 IDE 找代码更加快)，一边使用 ",(0,p.kt)("a",o({parentName:"li"},{href:"https://reactjs.org/docs/add-react-to-a-website.html"}),"Add React to a Website")," 的方式调试 demo / 验证猜想;"),(0,p.kt)("li",{parentName:"ul"},"读源码的时候可以将零星的知识记录下来，最后合成一张思维导图;"),(0,p.kt)("li",{parentName:"ul"},"有些复杂的递归逻辑可以结合自己的原生知识在需要的位置上进行断点调试;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("inlineCode",{parentName:"li"},"debugger")," 在 ",(0,p.kt)("inlineCode",{parentName:"li"},"chrome")," 上运用 ",(0,p.kt)("inlineCode",{parentName:"li"},"decorator"),", 如下图;")),(0,p.kt)("p",null,(0,p.kt)("img",o({parentName:"p"},{src:"https://cdn-images-1.medium.com/max/1600/1*h9Uo6Su5-Y1LcVRfox4UqA.jpeg",alt:"debugger 在 chrome 上的方法"}))),(0,p.kt)("h3",null,"一些注意"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},"pr 到 master 分支")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("p",{parentName:"li"},(0,p.kt)("a",o({parentName:"p"},{href:"https://github.com/facebook/react/issues?q=is:open+is:issue+label:%22good+first+issue%22"}),"good-first-issues")))),(0,p.kt)("h3",null,"代码库概览"),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},(0,p.kt)("a",o({parentName:"p"},{href:"https://github.com/reactjs/reactjs.org"}),"官网 repo"),"、",(0,p.kt)("a",o({parentName:"p"},{href:"https://github.com/facebook/fbjs"}),"React 依赖的工具库"))),(0,p.kt)("h4",null,"根目录"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages"}),"packages"),": 核心模块"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/fixtures"}),"fixtures"),": 一些测试 App"),(0,p.kt)("li",{parentName:"ul"},"build: 开发者本地执行 yarn build 后生成")),(0,p.kt)("h4",null,"monorepo"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react"}),"packages/react"),": 包含 React.createElement()、React.component、React.children;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react-dom"}),"packages/react-dom"),": 浏览器端渲染;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/events"}),"packages/events"),": 合成事件;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/scheduler"}),"packages/scheduler"),": 调度事件;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react-native-renderer"}),"packages/react-native-renderer"),": ",(0,p.kt)("inlineCode",{parentName:"li"},"React-Native")," 端渲染"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react-test-renderer"}),"packages/react-test-renderer"),": 用在 ",(0,p.kt)("inlineCode",{parentName:"li"},"jest")," 的 ",(0,p.kt)("inlineCode",{parentName:"li"},"Snapshot Test")," 中;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react-art"}),"packages/react-art"),": ",(0,p.kt)("inlineCode",{parentName:"li"},"Canvas"),", ",(0,p.kt)("inlineCode",{parentName:"li"},"SVG")," 等渲染;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/react-reconciler"}),"packages/react-reconciler"),": ",(0,p.kt)("inlineCode",{parentName:"li"},"Fiber Reconciler")," 的实现;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/tree/master/packages/shared"}),"packages/shared"),": 共享工具函数;")),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"最为重要的是前 4 块内容。")),(0,p.kt)("h3",null,"React 中的设计原则"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"组合。组件是可以互相组合的函数。"),(0,p.kt)("li",{parentName:"ul"},"抽象。",(0,p.kt)("inlineCode",{parentName:"li"},"React")," 只会抽象一些确实对使用者有帮助的特性(比如 ",(0,p.kt)("inlineCode",{parentName:"li"},"State、LifeCycle"),")，而不会抽象一些使用者自己可以实现的功能。",(0,p.kt)("inlineCode",{parentName:"li"},"React 团队")," 会在 ",(0,p.kt)("a",o({parentName:"li"},{href:"https://github.com/facebook/react/issues?q=is:open+is:issue+label:%22Type:+Big+Picture%22"}),"Big Picture")," 中和大家商榷这些抽象。")),(0,p.kt)("h3",null,"React 项目运行"),(0,p.kt)("h3",null,"React 16 之后的打包方式"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"16 之前是每个文件单独打包在 lib 文件夹下, ",(0,p.kt)("a",o({parentName:"li"},{href:"https://unpkg.com/react@15.6.2/lib/"}),"15.6.2")),(0,p.kt)("li",{parentName:"ul"},"16 版本只暴露两个包在 umd 文件夹下, ",(0,p.kt)("a",o({parentName:"li"},{href:"https://unpkg.com/react@16.0.0/umd/"}),"16.0.0"))),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"打包方式有这个转变的原因是因为之前打成多个包的形式对于打包器来说是低效的(会多出大量胶水代码)。")),(0,p.kt)("h3",null,"相关资源"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://blog.angularindepth.com/level-up-your-reverse-engineering-skills-8f910ae10630"}),"Level Up Your Reverse Engineering Skills"),": 这篇文章中介绍了逆向工程思维是什么 —— 去探究新知识点，并为之兴奋;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://medium.com/react-in-depth/practical-application-of-reverse-engineering-guidelines-and-principles-784c004bb657"}),"Practical application of reverse-engineering guidelines and principles"),": 结合 React 介绍逆向工程思维;"),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://reactjs.org/docs/how-to-contribute.html"}),"How to Contribute")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",o({parentName:"li"},{href:"https://react.docschina.org/blog/2017/12/15/improving-the-repository-infrastructure.html"}),"Repository Infrastructure"))))}s.isMDXComponent=!0}}]);