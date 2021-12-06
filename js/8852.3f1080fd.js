(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8852],{78852:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>c});var n=a(59713),r=a.n(n),l=a(6479),o=a.n(l),p=(a(67294),a(3905));function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var u={};function c(e){var t=e.components,a=o()(e,["components"]);return(0,p.kt)("wrapper",s(s(s({},u),a),{},{components:t,mdxType:"MDXLayout"}),(0,p.kt)("h3",null,"lerna"),(0,p.kt)("h3",null,"background"),(0,p.kt)("p",null,(0,p.kt)("del",{parentName:"p"},"需求背景: 需要在 ",(0,p.kt)("inlineCode",{parentName:"del"},"pc")," 端容器里嵌套一个 ",(0,p.kt)("inlineCode",{parentName:"del"},"mobile")," 容器，相当于要同时启动两个项目。")),(0,p.kt)("p",null,(0,p.kt)("del",{parentName:"p"},"将其定位为一个 ",(0,p.kt)("inlineCode",{parentName:"del"},"monorepos")," 项目。")),(0,p.kt)("p",null,"From lerna"),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.")),(0,p.kt)("h3",null,"Usage"),(0,p.kt)("pre",null,(0,p.kt)("code",s({parentName:"pre"},{}),"$ mkdir lerna-repo && cd $_\n$ npx lerna init\n")),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"lerna init: 初始化当前项目"),(0,p.kt)("li",{parentName:"ul"},"lerna run: 跑各个子包里的 ",(0,p.kt)("inlineCode",{parentName:"li"},"script")),(0,p.kt)("li",{parentName:"ul"},"lerna bootstrap: Bootstrap the packages in the current Lerna repo. Installs all of their dependencies and links any cross-dependencies."),(0,p.kt)("li",{parentName:"ul"},"lerna add: add module to child module from the root dir. ",(0,p.kt)("a",s({parentName:"li"},{href:"https://github.com/lerna/lerna/tree/master/commands/add#examples"}),"document"),(0,p.kt)("ul",{parentName:"li"},(0,p.kt)("li",{parentName:"ul"},"lerna add eslint --scope=crd-scripts --dev")))),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"details see ",(0,p.kt)("a",s({parentName:"p"},{href:"https://lerna.js.org/"}),"lerna doc"))),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",s({parentName:"li"},{href:"https://medium.com/@banyudu/mono-repo-%E8%BF%81%E7%A7%BB%E5%AE%9E%E8%B7%B5-eaf955aaf4d7"}),"Mono repo 迁移实践")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",s({parentName:"li"},{href:"https://github.com/korfuri/awesome-monorepo"}),"awesome-monorepo"))),(0,p.kt)("h3",null,"Advandage"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},"Quick jump to reference file.",(0,p.kt)("ul",{parentName:"li"},(0,p.kt)("li",{parentName:"ul"},"Instead webpack alias maybe do extra config.")))),(0,p.kt)("h3",null,"Q & A"),(0,p.kt)("blockquote",null,(0,p.kt)("p",{parentName:"blockquote"},"why should add workspaces and private props in the root?")),(0,p.kt)("p",null,"The root package.json usually not have any effect, and workspaces and private props are used together."),(0,p.kt)("h3",null,"Question"),(0,p.kt)("p",null,"It seems it should be named @crd/theme instead of @crd-theme."),(0,p.kt)("h3",null,"相关资料"),(0,p.kt)("ul",null,(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",s({parentName:"li"},{href:"https://github.com/lerna"}),"lerna github")),(0,p.kt)("li",{parentName:"ul"},(0,p.kt)("a",s({parentName:"li"},{href:"https://github.com/alibaba/alist"}),"alist"))))}c.isMDXComponent=!0}}]);