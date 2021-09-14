(self.webpackChunkblog=self.webpackChunkblog||[]).push([[2257],{52257:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>i});var a=n(59713),r=n.n(a),c=n(6479),l=n.n(c),o=(n(67294),n(3905));function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m={};function i(e){var t=e.components,n=l()(e,["components"]);return(0,o.kt)("wrapper",s(s(s({},m),n),{},{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"Merge Interface"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-ts"}),'interface Document {\n  createElement(tagName: any): Element;\n}\ninterface Document {\n  createElement(tagName: "div"): HTMLDivElement;\n  createElement(tagName: "span"): HTMLSpanElement;\n}\ninterface Document {\n  createElement(tagName: string): HTMLElement;\n  createElement(tagName: "canvas"): HTMLCanvasElement;\n}\n')),(0,o.kt)("p",null,"在 TypeScript 中，上述三个 Document 接口此时会发生合并，因此在实际使用中，也需要合并使用三个 Document 的参数与结果。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-ts"}),"var obj: Document = {\n  createElement: function (tagName: 'div' | 'span' | 'canvas') {\n    return {} as any\n  }\n}\n")),(0,o.kt)("p",null,"TypeScript 此时会根据传参自动帮助我们推导出结果的类型。"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-ts"}),"var result1 = obj.createElement('div')  // HTMLDivElement\nvar result2 = obj.createElement('span') // HTMLSpanElement\n")),(0,o.kt)("p",null,"to read: ",(0,o.kt)("a",s({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces"}),"https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces")),(0,o.kt)("h3",null,"link"),(0,o.kt)("ul",s({},{className:"contains-task-list"}),(0,o.kt)("li",s({parentName:"ul"},{className:"task-list-item"}),(0,o.kt)("input",s({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",(0,o.kt)("a",s({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/declaration-merging.html"}),"Declaration Merging"))))}i.isMDXComponent=!0}}]);