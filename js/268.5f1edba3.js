(self.webpackChunkblog=self.webpackChunkblog||[]).push([[268],{40268:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>p});var n=l(59713),a=l.n(n),r=l(6479),o=l.n(r),s=(l(67294),l(3905));function i(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function m(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?i(Object(l),!0).forEach((function(t){a()(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):i(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}var c={};function p(e){var t=e.components,l=o()(e,["components"]);return(0,s.kt)("wrapper",m(m(m({},c),l),{},{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h3",null,"方案调研"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("a",m({parentName:"li"},{href:"https://blog.csdn.net/m0_37792354/article/details/82012278"}),"https://blog.csdn.net/m0_37792354/article/details/82012278"),": 这个方案可以实现, 利用动态切换样式表, 每种主题需要一份样式, 可以实现但后期维护成本高(不考虑);"),(0,s.kt)("li",{parentName:"ol"},"CSS Variables 的方案, 基于项目本身是 scss 不考虑此种方案, 但是其浏览器支持度还是可以的;")),(0,s.kt)("p",null,(0,s.kt)("img",m({parentName:"p"},{src:"http://with.muyunyun.cn/fe11d88b92efa1249d58fe13d5c737dd.jpg",alt:null}))),(0,s.kt)("ol",m({},{start:3}),(0,s.kt)("li",{parentName:"ol"},"入口文件引入自定义变量(参照 antd/饿了么/taro 的方案); 因为组内组件使用了 css module, 所以该方案不能适用我们的业务场景;"),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElemeFE/element/issues/3054#issuecomment-282527907"}),"浏览器端涂色板换色方案"),";")),(0,s.kt)("p",null,"所以最终方案分为两步:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"编译阶段在 sass-loader 中注入颜色生成算法;"),(0,s.kt)("li",{parentName:"ul"},"浏览器调色板可以使用 element、taro 的正则替换思路;")),(0,s.kt)("h3",null,"antd"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"整理组件将和颜色相关的属性进行整理梳理出一份 ",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ant-design/ant-design/blob/c6f991d5af/components/style/themes/default.less"}),"default.less"),";"),(0,s.kt)("li",{parentName:"ol"},"整理一份 ",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ant-design/ant-design/blob/c6f991d5af/components/style/color/colors.less"}),"color.less")," 文件, 颜色由 ",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ant-design/ant-design/blob/c6f991d5af/components/style/color/colorPalette.less"}),"colorPalette.less")," 动态生成;")),(0,s.kt)("p",null,"用户使用方式:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},"选择一个颜色(切换主题色)"),(0,s.kt)("li",{parentName:"ol"},"下载"),(0,s.kt)("li",{parentName:"ol"},"引用")),(0,s.kt)("h3",null,"相关项目"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("a",m({parentName:"li"},{href:"%E5%AE%9E%E6%97%B6%E6%8D%A2%E8%89%B2%E6%96%B9%E6%A1%88"}),"theme-preview"),":",(0,s.kt)("ol",{parentName:"li"},(0,s.kt)("li",{parentName:"ol"},"先把默认主题文件中涉及到颜色的 CSS 值替换成关键词：",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274"}),"https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L250-L274"),";"),(0,s.kt)("li",{parentName:"ol"},"根据用户选择的主题色生成一系列对应的颜色值：",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json"}),"https://github.com/ElementUI/theme-preview/blob/master/src/utils/formula.json"),";"),(0,s.kt)("li",{parentName:"ol"},"把关键词再换回刚刚生成的相应的颜色值：",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js"}),"https://github.com/ElementUI/theme-preview/blob/master/src/utils/color.js"),";"),(0,s.kt)("li",{parentName:"ol"},"直接在页面上加 style 标签，把生成的样式填进去：",(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211"}),"https://github.com/ElementUI/theme-preview/blob/master/src/app.vue#L198-L211"),";"))),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/ElementUI/theme-chalk"}),"theme-chalk"),";")),(0,s.kt)("h3",null,"scss 中使用 antd 来自定义主题"),(0,s.kt)("p",null,"如果业务方使用 less/css: 基于 css modules 的 hash 不能覆盖的点，",(0,s.kt)("del",{parentName:"p"},"一个方案是本地打好包给业务方使用方案了(兜底方案)，但是比较笨重(相当于是要打包出多份不同的 css 样式文件在项目中了, 然后业务方每要一种主题就要新增维护一份打包文件)")),(0,s.kt)("p",null,"如果业务方使用 scss: 如果 css modules hash 不能去掉, 有一个 scss + css variable 的方案可以代替 sass-loader 方案(成本是要写相应的插件); 如果 css modules hash 能去掉, 可以使用之前提到的 taro 上的第一种方案, 在 app 进入的地方引入主题色进行覆盖 scss Variable;"),(0,s.kt)("h3",null,"自适应颜色"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"colorPalette")," 函数。"),(0,s.kt)("p",null,"RGB 可以方便的进行计算机存储和读取, 但对人进行颜色判断十分不友好, 因此有了 HSB/HSV。"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"RGB: 面向硬件"),(0,s.kt)("li",{parentName:"ul"},"HSB: 面向用户")),(0,s.kt)("p",null,"HSB(Hue, Saturation, Brightness) 分别表示色调(色相), 饱和度, 亮度。"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://baike.baidu.com/item/HSB%E6%A8%A1%E5%9E%8B"}),"HSB 模型")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://baike.baidu.com/item/HSV/547122"}),"HSV 模型"),": 有关 H、S 的解释这个更清晰"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://ant.design/docs/spec/colors-cn"}),"antd 色彩"))),(0,s.kt)("h3",null,"Version One"),(0,s.kt)("details",null,(0,s.kt)("summary",null,"version one"),(0,s.kt)("pre",null,(0,s.kt)("code",m({parentName:"pre"},{className:"language-scss"}),"$theme-color: #1199ee !default;\n\n/* mix white */\n@function tint($theme-color, $percent) {\n  @return mix(#fff, $theme-color, $percent);\n}\n\n/* mix black */\n@function shade($theme-color, $percentage) {\n  @return mix(black, $theme-color, $percentage);\n}\n\n/* There are ten color in on theme, from left to right, they are\n*  tint($theme-color, 50%), tint($theme-color, 40%), tint($theme-color, 30%), tint($theme-color, 20%), tint($theme-color, 10%),\n*  $theme-color, shade($theme-color, 10%), shade($theme-color, 20%), shade($theme-color, 30%), shade($theme-color, 40%)\n,*/\n@function colorPallete1($theme-color) {\n  @return tint($theme-color, 50%);\n}\n\n@function colorPallete2($theme-color) {\n  @return tint($theme-color, 40%);\n}\n\n@function colorPallete3($theme-color) {\n  @return tint($theme-color, 30%);\n}\n\n/* 悬停态 */\n@function colorPallete4($theme-color) {\n  @return tint($theme-color, 20%);\n}\n\n@function colorPallete5($theme-color) {\n  @return tint($theme-color, 10%);\n}\n\n/* 主色 */\n@function colorPallete6($theme-color) {\n  @return $theme-color;\n}\n\n@function colorPallete7($theme-color) {\n  @return shade($theme-color, 10%);\n}\n\n/* 点击态 */\n@function colorPallete8($theme-color) {\n  @return shade($theme-color, 20%);\n}\n\n@function colorPallete9($theme-color) {\n  @return shade($theme-color, 30%);\n}\n\n@function colorPallete10($theme-color) {\n  @return shade($theme-color, 40%);\n}\n"))),(0,s.kt)("h3",null,"Sass 踩坑"),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"sass-loader")," 的 options 配置要参阅 ",(0,s.kt)("a",m({parentName:"p"},{href:"https://sass-lang.com/documentation/js-api"}),"sass 文档")),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"I think itl's necessary to prompt what features can be used in the options.😄 And the usage of the custom function is found in ",(0,s.kt)("a",m({parentName:"p"},{href:"https://github.com/webpack-contrib/sass-loader/issues/210"}),"this issue")," instead of doc.")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://sass-lang.com/documentation/js-api#new-types-color-red-green-blue-alpha-1"}),"sass 中使用 JavaScript 的口子")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://github.com/bgrins/TinyColor"}),"tinyColor"))),(0,s.kt)("h3",null,"设计师的角度"),(0,s.kt)("h4",null,"关于悬浮态"),(0,s.kt)("p",null,"悬浮态颜色变浅: hover 相当于按钮被鼠标吸起来了，所以上升后离光源更近，所以变白了。（类似前面某位同学提到的：距离越近越亮"),(0,s.kt)("p",null,"悬浮态颜色变深: 商家/客服显示器很差，Hover 上去底色变亮了字是白的，有些情况影响识别度"),(0,s.kt)("h3",null,"参阅资料"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://juejin.im/post/5ca41617f265da3092006155"}),"聊一聊前端换肤")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",m({parentName:"li"},{href:"https://zhuanlan.zhihu.com/p/32422584"}),"Ant Design 色板生成算法演进之路"))),(0,s.kt)("h3",null,"CSS Variable"),(0,s.kt)("p",null,"TODO:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"全局/局部变量",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},"或逻辑: var(--a, var(--b))")))))}p.isMDXComponent=!0}}]);