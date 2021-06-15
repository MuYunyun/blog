(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8516],{98516:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>m});var l=t(59713),a=t.n(l),i=t(6479),p=t.n(i),o=(t(67294),t(3905));function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function k(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u={};function m(e){var n=e.components,t=p()(e,["components"]);return(0,o.kt)("wrapper",k(k(k({},u),t),{},{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h3",null,"移动端 click 事件存在 300ms 时延"),(0,o.kt)("p",null,"移动端 ",(0,o.kt)("inlineCode",{parentName:"p"},"click")," 事件存在 ",(0,o.kt)("inlineCode",{parentName:"p"},"300ms")," 时延的原因: 设备需要根据这段时间用户的操作来判断是单点还是双点。"),(0,o.kt)("p",null,"解决思路: 使用 ",(0,o.kt)("inlineCode",{parentName:"p"},"touchStart")," 和 ",(0,o.kt)("inlineCode",{parentName:"p"},"touchEnd")," 来取代 ",(0,o.kt)("inlineCode",{parentName:"p"},"click")," 事件。"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},(0,o.kt)("a",k({parentName:"p"},{href:"https://juejin.im/entry/6844903427147825165"}),"相关链接"))),(0,o.kt)("h3",null,"点击穿透"),(0,o.kt)("p",null,"点击 a 标签下的一个返回按钮, 触发了 a 中的 href 跳转"),(0,o.kt)("p",null,"方法同上, 也是封装一个 ",(0,o.kt)("inlineCode",{parentName:"p"},"tap")," 方法;"),(0,o.kt)("h3",null,"一些移动端上的有用的 css 属性"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"在 ios 上增加 scroll 的灵敏度(出现滑动条): ",(0,o.kt)("inlineCode",{parentName:"li"},"-webkit-overflow-scrolling: touch;")),(0,o.kt)("li",{parentName:"ul"},"滑动场景下防止用户选中文字: ",(0,o.kt)("inlineCode",{parentName:"li"},"use-select: none;"))),(0,o.kt)("h3",null,"scrollTo"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"scrollTo")," 这个 api 作用在滚动子元素的父节点上。但是如果要有平缓的动画效果用其的属性 ",(0,o.kt)("inlineCode",{parentName:"p"},"behavior: 'smooth'")," 是不生效的。解决方案如下:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"方案一: 结合 ",(0,o.kt)("inlineCode",{parentName:"li"},"setTimeout")," 使用 ",(0,o.kt)("inlineCode",{parentName:"li"},"css transition")," 属性, 在异步时间后移除 ",(0,o.kt)("inlineCode",{parentName:"li"},"transition"),";"),(0,o.kt)("li",{parentName:"ol"},"方案二: 使用 ",(0,o.kt)("inlineCode",{parentName:"li"},"requestAnimationFrame")," 来完成效果;")),(0,o.kt)("h3",null,"移动端移除滚动条"),(0,o.kt)("p",null,"移除滚动条有一个 css 属性 ",(0,o.kt)("inlineCode",{parentName:"p"},"-webkit-scrollbar"),", 其用法如下:"),(0,o.kt)("pre",null,(0,o.kt)("code",k({parentName:"pre"},{className:"language-css"}),"&::-webkit-scrollbar {\n  display: none;\n  width: 0px;\n}\n")),(0,o.kt)("p",null,"但是在 ",(0,o.kt)("inlineCode",{parentName:"p"},"ios")," 是不生效的, 解决方案如下:"),(0,o.kt)("p",null,"以竖直滑动为例: 在外层设置宽度为 400px(假设内容宽度为 400px)并设置 ",(0,o.kt)("inlineCode",{parentName:"p"},"overflow-x: hidden"),", 内层宽度为 417px(17px 为滚动条宽度)。"),(0,o.kt)("h3",null,"解决 ios 下输入框自带圆角的问题;"),(0,o.kt)("pre",null,(0,o.kt)("code",k({parentName:"pre"},{className:"language-css"}),".demo {\n  -webkit-appearance: none;\n}\n")),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"见 SearchBar 组件开发")),(0,o.kt)("h3",null,"ios 下 input 光标大小调整"),(0,o.kt)("p",null,"在 ios 中: 该行无文字时, 光标高度与 ",(0,o.kt)("inlineCode",{parentName:"p"},"line-height")," 一致; 该行有文字时, 光标高度从 ",(0,o.kt)("inlineCode",{parentName:"p"},"input")," 顶部到文字底部(这两种情况都是在有设定 ",(0,o.kt)("inlineCode",{parentName:"p"},"line-height")," 的时候)，如果没有 ",(0,o.kt)("inlineCode",{parentName:"p"},"line-height"),"，则是与 ",(0,o.kt)("inlineCode",{parentName:"p"},"font-size")," 一致(可能表述有误差)。"),(0,o.kt)("p",null,"解决方法如下: 设置 ",(0,o.kt)("inlineCode",{parentName:"p"},"line-height")," 为一个较小值(期望的光标大小), 再用 ",(0,o.kt)("inlineCode",{parentName:"p"},"padding")," 来撑开 ",(0,o.kt)("inlineCode",{parentName:"p"},"input")," 的区域;"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"见 SearchBar 组件开发")),(0,o.kt)("h3",null,"移动端 1px 解决方案"),(0,o.kt)("p",null,"手机屏幕上存在 ",(0,o.kt)("inlineCode",{parentName:"p"},"devicePixelRatio")," 属性, 其值为物理像素和屏幕像素之比。"),(0,o.kt)("p",null,"方案一: 伪元素 + ",(0,o.kt)("inlineCode",{parentName:"p"},"transform: scaleY(0.5)"),";\n方案二: 使用 box-shadow。"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"box-shadow")," 这个方案有个缺陷是画上划线容易。方式如下:"),(0,o.kt)("pre",null,(0,o.kt)("code",k({parentName:"pre"},{}),"box-shadow: 0px -1px 0px 0px rgba(245, 245, 245, 1);\n")),(0,o.kt)("p",null,"但是缺陷是画下划线不便, 需要配合 ",(0,o.kt)("inlineCode",{parentName:"p"},"position: relative")," 以及 ",(0,o.kt)("inlineCode",{parentName:"p"},"z-index")," 来调整层级。"),(0,o.kt)("h3",null,"滑动穿透解决方案"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",k({parentName:"li"},{href:"https://github.com/MuYunyun/blog/blob/master/React/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91/modal.md#%E6%BB%91%E5%8A%A8%E7%A9%BF%E9%80%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88"}),"滑动穿透解决方案"))),(0,o.kt)("h3",null,"移动端适配"),(0,o.kt)("h4",null,"分辨率"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"PPI(Pixel Per Inch): 每英寸包括的像素数"),(0,o.kt)("li",{parentName:"ul"},"DPI(Dot Per Inch): 每英寸包括的点数")),(0,o.kt)("h4",null,"设备独立像素"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"DP 或者 DIP(Device Independent Pixels): 设备独立像素, 用于安卓系统;"),(0,o.kt)("li",{parentName:"ul"},"PT(Point): 用于 IOS 系统;")),(0,o.kt)("h4",null,"设备像素比"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"DPR(device pixel ratio)")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"物理像素与设备独立像素的比值, 浏览器上获取设备像素比的方法 ",(0,o.kt)("inlineCode",{parentName:"p"},"window.devicePixelRatio"),";"))),(0,o.kt)("h3",null,"reference link"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",k({parentName:"li"},{href:"https://juejin.im/post/5cddf289f265da038f77696c#heading-3"}),"关于移动端适配，你必须要知道的"),": 此篇文章总结得蛮好的。")),(0,o.kt)("h3",null,"IOS8 兼容情况"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"Symbol"),"、",(0,o.kt)("inlineCode",{parentName:"p"},"Map")," 在 ios8 中是不支持的"),(0,o.kt)("p",null,(0,o.kt)("img",k({parentName:"p"},{src:"http://with.muyunyun.cn/2da80724739178534ac4bb03459654d5.jpg",alt:null}))),(0,o.kt)("p",null,"后续陆续兼容以下属性"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"数组/字符串的 ",(0,o.kt)("inlineCode",{parentName:"li"},"includes")," 方法, ios9 开始支持"),(0,o.kt)("li",{parentName:"ul"},"document.body.append:")),(0,o.kt)("h3",null,"IOS9 兼容情况"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"window.scrollTo")," 在 IOS12.1 以下的机子下是不兼容的;"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"insertAdjacentHTML")," 虽然在 ",(0,o.kt)("a",k({parentName:"li"},{href:"https://caniuse.com/#search=insertAdjacentHTML"}),"caniuse")," 中看起来兼容性很好, 但是在 IOS10.2 以下的机子中部分节点是没有这个 api 的, 所以从中也能看出 caniuse 可以作为部分参考, 但不能全信;")),(0,o.kt)("h3",null,"其它兼容"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"new Date('xxxx-xx-xx xx:xx')")," 在 IOS 系统中会报 Invalid Date, 在安卓中正常。",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"兼容方法: ",(0,o.kt)("inlineCode",{parentName:"li"},"new Date('xxxx/xx/xx xx:xx')"),", 经验证该方法在 IOS 与 Android 都可运行。")))),(0,o.kt)("h3",null,"user-select"),(0,o.kt)("pre",null,(0,o.kt)("code",k({parentName:"pre"},{className:"language-css"}),".demo {\n  /* 阻止触摸选中文字 */\n  user-select: none;\n  /* 阻止 b 端 app 保存图片的弹框弹出 */\n  pointer-events: none;\n  /* 长按会选中文字 */\n  -webkit-touch-callout: none;\n}\n")),(0,o.kt)("h3",null,"ios13"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"在弹框类组件中使用 input 光标会消失")),(0,o.kt)("p",null,"见 ",(0,o.kt)("a",k({parentName:"p"},{href:"https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/449#issuecomment-541907141"}),"issue")),(0,o.kt)("h3",null,"移动开发指南"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"H5: 需要发版"),(0,o.kt)("li",{parentName:"ul"},"组件包: 不需要发版"),(0,o.kt)("li",{parentName:"ul"},"原生: 性能高")),(0,o.kt)("h3",null,"IOS && Android"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"scrollTop 区分")),(0,o.kt)("p",null,"Anchor 组件"),(0,o.kt)("pre",null,(0,o.kt)("code",k({parentName:"pre"},{className:"language-js"}),"// document.documentElement.scrollTop do effect in ios, and document.body.scrollTop do effect in android.\nconst scrollTop = document.documentElement.scrollTop || document.body.scrollTop\n")),(0,o.kt)("ol",k({},{start:2}),(0,o.kt)("li",{parentName:"ol"},"font-weight 在安卓机上失效: 0 ~ 400 一种粗细, 500 ~ 900 一种粗细。")))}m.isMDXComponent=!0}}]);