(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2981],{82981:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>k});var l=n(59713),r=n.n(l),a=n(6479),i=n.n(a),o=(n(67294),n(3905));function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u={};function k(e){var t=e.components,n=i()(e,["components"]);return(0,o.kt)("wrapper",s(s(s({},u),n),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"Suspense 设计模式"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"fetch on render"),": 目前一般数据获取写在 componentDidMount 阶段, 其获取数据的过程中, 执行顺序如下所示:")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"start fetchA"),(0,o.kt)("li",{parentName:"ol"},"...",(0,o.kt)("inlineCode",{parentName:"li"},"wait Time1"),"..."),(0,o.kt)("li",{parentName:"ol"},"finish fetchA"),(0,o.kt)("li",{parentName:"ol"},"start fetchB"),(0,o.kt)("li",{parentName:"ol"},"...",(0,o.kt)("inlineCode",{parentName:"li"},"wait Time2"),"..."),(0,o.kt)("li",{parentName:"ol"},"finish fetchB")),(0,o.kt)("p",null,"这么做存在的问题: 在 B 组件中开始请求数据时至少要等上 ",(0,o.kt)("inlineCode",{parentName:"p"},"Time1")," 时间, 是一种 ",(0,o.kt)("inlineCode",{parentName:"p"},"network waterfall")," 而非",(0,o.kt)("inlineCode",{parentName:"p"},"并发请求"),";"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"fetch then render"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"调用 setState 之前先获取数据"),", 比如在 A 组件的 componentDidMount 中使用 ",(0,o.kt)("inlineCode",{parentName:"li"},"Promise.all()")," 同时执行 ",(0,o.kt)("inlineCode",{parentName:"li"},"fetchA, fetchB"))),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"start fetchA"),(0,o.kt)("li",{parentName:"ol"},"start fetchB"),(0,o.kt)("li",{parentName:"ol"},"finish fetchA"),(0,o.kt)("li",{parentName:"ol"},"finish fetchB"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"render"))),(0,o.kt)("p",null,"这么做存在的问题: A 组件和 B 组件上的数据显示时间取决于请求时间更长的接口, 所以",(0,o.kt)("inlineCode",{parentName:"p"},"页面上渲染数据必然会存在延时"),";"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"render as fetch"),": 使用 Suspense 后的效果呢?")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"start fetchA"),(0,o.kt)("li",{parentName:"ol"},"start fetchB"),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("inlineCode",{parentName:"li"},"render")),(0,o.kt)("li",{parentName:"ol"},"finish fetchA"),(0,o.kt)("li",{parentName:"ol"},"finish fetchB")),(0,o.kt)("p",null,"它很好地规避了上述遇到的两个问题:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"解决接口根据 render 走导致",(0,o.kt)("inlineCode",{parentName:"li"},"不能并发请求接口"),"的痛点;"),(0,o.kt)("li",{parentName:"ol"},"解决使用 Promise.all 带来的",(0,o.kt)("inlineCode",{parentName:"li"},"页面数据内容存在延时"),"的问题;")),(0,o.kt)("h3",null,"Concurrent UI patterns"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Default Mode"),": Receded → Skeleton → Complete"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"Preferred Mode"),": Pending → Skeleton → Complete")),(0,o.kt)("p",null,"总结:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Receded 不好的原因是因为其把页面现有的内容给弄丢了。"),(0,o.kt)("li",{parentName:"ul"},"可以使用 ",(0,o.kt)("inlineCode",{parentName:"li"},"useTransition")," 进入 Pending 状态 —— 位于当前页的同时, 加载下一页(想象多元宇宙)"),(0,o.kt)("li",{parentName:"ul"},"如果不想下一个页面的非核心组件延长 Pending 的时间, 用 Suspense 包裹它;")),(0,o.kt)("h3",null,"useDeferredValue"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"useDeferredValue")," 的作用: 能让组件中的部分内容",(0,o.kt)("inlineCode",{parentName:"p"},"延迟加载"),"。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),"const deferredText = useDeferredValue(text, {\n  timeoutMs: 5000\n})\n")),(0,o.kt)("p",null,"这里第二个参数表示, 能确保 5s 之内输入框内的输入是顺滑的。"),(0,o.kt)("h3",null,"SuspenseList"),(0,o.kt)("p",null,"SuspenseList 中的 ",(0,o.kt)("inlineCode",{parentName:"p"},"revealOrder")," 字段能控制其里面 Suspense 节点的输出顺序, ",(0,o.kt)("inlineCode",{parentName:"p"},"tail")," 字段控制当前加载的节点数。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-js"}),'function ProfilePage({ resource }) {\n  return (\n    <SuspenseList revealOrder="forwards" tail="collapsed">\n      <ProfileDetails resource={resource} />\n      <Suspense fallback={<h2>Loading posts...</h2>}>\n        <ProfileTimeline resource={resource} />\n      </Suspense>\n      <Suspense fallback={<h2>Loading fun facts...</h2>}>\n        <ProfileTrivia resource={resource} />\n      </Suspense>\n    </SuspenseList>\n  );\n}\n')))}k.isMDXComponent=!0}}]);