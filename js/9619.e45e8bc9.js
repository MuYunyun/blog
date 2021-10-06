(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9619],{19619:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>p});var l=t(59713),o=t.n(l),r=t(6479),i=t.n(r),c=(t(67294),t(3905));function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function u(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var s={};function p(e){var n=e.components,t=i()(e,["components"]);return(0,c.kt)("wrapper",u(u(u({},s),t),{},{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h3",null,"Modal"),(0,c.kt)("p",null,"值得学习的是在 Modal 系列组件中 Alert/Promt 组件采用函数式进行弹框的调用。"),(0,c.kt)("h3",null,"蒙层"),(0,c.kt)("p",null,"场景: 点击蒙层区, 内容弹框关闭蒙层消失; 点击内容弹框区, 内容弹框不关闭蒙层不消失;"),(0,c.kt)("p",null,"有什么方法实现这个效果呢?"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"方案一: target 与 currentTarget 的使用")),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-html"}),"<div>蒙层区</div> \x3c!-- ① 只修饰样式 --\x3e\n<div>             \x3c!-- 和 ① 相同的点击区域 --\x3e\n  <div>内容区</div>\n</div>\n")),(0,c.kt)("p",null,"伪代码逻辑: 在 JavaScript 中通过 ",(0,c.kt)("inlineCode",{parentName:"p"},"target")," 与 ",(0,c.kt)("inlineCode",{parentName:"p"},"currentTarget")," 区分"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"if (target === currentTarget) { // 点击蒙层\n  // 关闭弹框\n}\n")),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"方案二: z-index 的运用")),(0,c.kt)("h3",null,"滑动穿透解决方案"),(0,c.kt)("p",null,(0,c.kt)("img",u({parentName:"p"},{src:"http://with.muyunyun.cn/5ad52dbc5716fb92b823898557cc94fa.gif",alt:null}))),(0,c.kt)("p",null,"下面为解决移动端滑动穿透的解决方案:"),(0,c.kt)("ol",null,(0,c.kt)("li",{parentName:"ol"},"首先先将 document 上的 touchmove 事件禁用掉。(防止遮罩层滚动)"),(0,c.kt)("li",{parentName:"ol"},"然后再阻止浮层内容冒泡, 这样子浮层内容就能 touchmove 了。(使浮层中需滚动的元素可滚动)"),(0,c.kt)("li",{parentName:"ol"},"最后对浮层的边界值做处理, 在浮层内容拉到最顶部(scrollTop 为 0) 还上滑动或者浮层内容拉到最底部(scrollTop + clientHeight >= scrollHeight) 还下滑动时\n防止其滑动穿透, 所以需要对其进行 event.preventDefault()")),(0,c.kt)("p",null,"具体代码如下:"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"import { isNotReachIOS } from './mobileDetect'\n\n/* 该方法解决 ios 滑动穿透问题, 经测试安卓 8.0 版本也适用 */\nlet lockedNum = 0\nlet initialClientY = 0\nlet documentListenerAdded = false\n\nconst lockedElements: HTMLElement[] = []\n\nconst preventDefault = (event: Event) => {\n  if (!event.cancelable) return\n  event.preventDefault()\n}\n\n// 如果位于滚动元素的\nconst handleScroll = (event: TouchEvent, targetElement: HTMLElement) => {\n  const clientY = event.targetTouches[0].clientY - initialClientY\n\n  if (targetElement) {\n    const { scrollTop, scrollHeight, clientHeight } = targetElement\n    const isOnTop = clientY > 0 && scrollTop === 0\n    const isOnBottom = clientY < 0 && scrollTop + clientHeight >= scrollHeight\n\n    if (isOnTop || isOnBottom) {\n      return preventDefault(event)\n    }\n  }\n\n  event.stopPropagation()\n  return false\n}\n\n/* 逻辑: 首先先将 document 上的 touchmove 事件禁用掉。(防止遮罩层滚动)\n然后再将需要进行滚动的元素阻止其冒泡, 这样子滚动的元素就能 touchmove 了。(使弹框层中需滚动的元素可滚动)\n最后对弹框层的边界值做处理, 在浮层内容拉到最顶部(scrollTop 为 0) 还上滑动或者浮层内容拉到最底部(scrollTop + clientHeight >= scrollHeight) 还下滑动时\n要防止其滑动穿透, 所以需要对其进行 event.prevent */\nconst lock = (targetElement: HTMLElement) => {\n  if (!documentListenerAdded) {\n    // 针对 ios9 以下的机型需要单独处理\n    isNotReachIOS(10)\n      ? document.addEventListener('touchmove', preventDefault)\n      : document.addEventListener('touchmove', preventDefault, { passive: false })\n    documentListenerAdded = true\n  }\n\n  if (targetElement && lockedElements.indexOf(targetElement) === -1) {\n    targetElement.ontouchstart = (event: TouchEvent) => {\n      initialClientY = event.targetTouches[0].clientY\n    }\n\n    targetElement.ontouchmove = (event: TouchEvent) => {\n      if (event.targetTouches.length !== 1) return\n      handleScroll(event, targetElement)\n    }\n\n    lockedElements.push(targetElement)\n    lockedNum += 1\n  }\n}\n\nconst unlock = (targetElement: HTMLElement) => {\n  const index = lockedElements.indexOf(targetElement)\n  if (index !== -1) {\n    lockedNum -= 1\n    targetElement.ontouchmove = null\n    targetElement.ontouchstart = null\n    lockedElements.splice(index, 1)\n  }\n\n  if (lockedNum === 0 && documentListenerAdded) {\n    isNotReachIOS(10)\n      ? (document as any).removeEventListener('touchmove', preventDefault)\n      : (document as any).removeEventListener('touchmove', preventDefault, { passive: false })\n    documentListenerAdded = false\n  }\n}\n\nexport { lock, unlock }\n")),(0,c.kt)("p",null,"使用了上述方法后效果如下:"),(0,c.kt)("p",null,(0,c.kt)("img",u({parentName:"p"},{src:"http://with.muyunyun.cn/0a5886e43e522b183415c62d29890ebc.gif",alt:null}))),(0,c.kt)("blockquote",null,(0,c.kt)("p",{parentName:"blockquote"},"参考 ",(0,c.kt)("a",u({parentName:"p"},{href:"https://juejin.im/post/5ca4816e5188250b251e34e9"}),"滑动穿透(锁 body)终极探索"))),(0,c.kt)("h3",null,"微信 ios 下 input 唤醒键盘视图错误兼容问题"),(0,c.kt)("p",null,(0,c.kt)("img",u({parentName:"p"},{src:"http://with.muyunyun.cn/0547f0a98df8c2d3df62c87569d07502.gif",alt:null}))),(0,c.kt)("p",null,"该问题其实和 modal 没关系, 但是在这个场景中被遇到了, 在动图中可以看到 input 唤醒键盘后然后待键盘消失后, 键盘占用的那部分位置并没有被重新填充上, 使用了 ",(0,c.kt)("inlineCode",{parentName:"p"},"scrollIntoView")," 也没有效果。"),(0,c.kt)("p",null,"解决方案如下:"),(0,c.kt)("p",null,"使用 ",(0,c.kt)("inlineCode",{parentName:"p"},"focusin")," 和 ",(0,c.kt)("inlineCode",{parentName:"p"},"focusout")," 能分别监听键盘的弹起与关闭, 在 focusout 事件中使用 window.scrollTo() 将 body 视图移动回原来位置。"),(0,c.kt)("p",null,"实现代码如下:"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"// 微信 ios 下 input 唤醒键盘视图错误兼容问题\nfunction HackWxIos() {\n  ;(function() {\n    let myFunction: any\n    let isWXAndIos = isWeiXinAndIos()\n    if (isWXAndIos) {\n      // 保存当前视图的滚动位置, 供键盘关闭时使用;\n      const originScrollY = window.scrollY\n      // 既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）\n      document.body.addEventListener('focusin', () => {\n        // 软键盘弹起事件\n        clearTimeout(myFunction)\n      })\n      document.body.addEventListener('focusout', () => {\n        // 软键盘关闭事件\n        clearTimeout(myFunction)\n        myFunction = setTimeout(function() {\n          window.scrollTo({ top: originScrollY, left: 0, behavior: 'smooth' }) // 重点  =======当键盘收起的时候让页面回到原始位置\n        }, 200)\n      })\n    }\n  })()\n\n  function isWeiXinAndIos() {\n    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型\n    let ua = '' + window.navigator.userAgent.toLowerCase()\n    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串且是IOS系统\n    let isWeixin = /MicroMessenger/i.test(ua) // 是在微信浏览器\n    let isIos = /\\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua) // 是IOS系统\n    return isWeixin && isIos\n  }\n}\n\nexport default HackWxIos\n")),(0,c.kt)("blockquote",null,(0,c.kt)("p",{parentName:"blockquote"},(0,c.kt)("a",u({parentName:"p"},{href:"https://www.zhihu.com/question/357548379/answer/919983914"}),"知乎 —— Modal 为什么设计成组件的形式，为啥不全设计成函数 api 直接调用？"))))}p.isMDXComponent=!0}}]);