(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6609],{36609:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>k});var l=t(59713),a=t.n(l),r=t(6479),p=t.n(r),o=(t(67294),t(3905));function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){a()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var c={};function k(e){var n=e.components,t=p()(e,["components"]);return(0,o.kt)("wrapper",s(s(s({},c),t),{},{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"核心原则"),(0,o.kt)("p",null,"以简为美，简约至上。"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"可以当成一门新语言来学")),(0,o.kt)("h3",null,"String"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"SCSS")," 的属性应该使用单引号;"),(0,o.kt)("li",{parentName:"ul"},"但有一些特殊的属性 (比如 ",(0,o.kt)("inlineCode",{parentName:"li"},"sans-serif/initial"),") 无须使用引号, 例子如下:")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),"$font-type: sans-serif\n")),(0,o.kt)("h3",null,"Number"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"0")," 作为长度时后面不应该带有单位;"),(0,o.kt)("li",{parentName:"ul"},"给数字添加单位应该使用乘法, 例子如下:")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),"$value: 42\n\n// yep\n$length: $value * 1px\n\n// nope\n$length: $value + 1px\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"数字间计算需要带上括号, 例子如下:")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),"// yep\n.foo {\n  width: (100% / 3);\n}\n")),(0,o.kt)("h3",null,"嵌套选择器"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),".foo {\n  .bar {\n    &:hover {\n      color: red\n    }\n  }\n}\n")),(0,o.kt)("p",null,"生成 ",(0,o.kt)("inlineCode",{parentName:"p"},"css")," 为:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-css"}),".foo .bar:hover {\n  color: red;\n}\n")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),".foo {\n  &-bar {\n    color: red;\n  }\n}\n")),(0,o.kt)("p",null,"生成 ",(0,o.kt)("inlineCode",{parentName:"p"},"css")," 为:"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-css"}),".foo-bar {\n  color: red;\n}\n")),(0,o.kt)("h3",null,"混合宏"),(0,o.kt)("p",null,"在 ",(0,o.kt)("inlineCode",{parentName:"p"},"SCSS")," 中提供函数的支持"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-SCSS"}),"@mixin dummy($a, $b, $c) {\n  // ...\n}\n\n@include dummy(true, 1, 'pdd')\n")),(0,o.kt)("h3",null,"条件语句"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-scss"}),"@if ($support-legacy) {\n  // ..\n} @else {\n  // ..\n}\n")),(0,o.kt)("h3",null,"循环"),(0,o.kt)("p",null,"一般使用 ",(0,o.kt)("inlineCode",{parentName:"p"},"each")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-scss"}),"@each $key, $value in $map {\n  // ...\n}\n")),(0,o.kt)("p",null,"结合伪类可以使用 ",(0,o.kt)("inlineCode",{parentName:"p"},"for")),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-scss"}),"@for $i from 0 through 10 {\n  .foo:nth-of-type(#{$i}) {\n    // ...\n  }\n}\n")),(0,o.kt)("h3",null,"继承"),(0,o.kt)("pre",null,(0,o.kt)("code",s({parentName:"pre"},{className:"language-scss"}),".demo1 {}\n\n.demo {\n  @extend .demo1\n}\n")),(0,o.kt)("h3",null,"参考文献"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",s({parentName:"li"},{href:"https://sass-guidelin.es/"}),"sassguidelines")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",s({parentName:"li"},{href:"https://sass-guidelin.es/zh"}),"sassguidelines 中文文档"))))}k.isMDXComponent=!0}}]);