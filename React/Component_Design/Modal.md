### Modal

值得学习的是在 Modal 系列组件中 Alert/Promt 组件采用函数式进行弹框的调用。

### 蒙层

场景: 点击蒙层区, 内容弹框关闭蒙层消失; 点击内容弹框区, 内容弹框不关闭蒙层不消失;

有什么方法实现这个效果呢?

* 方案一: target 与 currentTarget 的使用

```html
<div>蒙层区</div> <!-- ① 只修饰样式 -->
<div>             <!-- 和 ① 相同的点击区域 -->
  <div>内容区</div>
</div>
```

伪代码逻辑: 在 JavaScript 中通过 `target` 与 `currentTarget` 区分

```js
if (target === currentTarget) { // 点击蒙层
  // 关闭弹框
}
```

* 方案二: z-index 的运用

### 滑动穿透解决方案

![](http://with.muyunyun.cn/5ad52dbc5716fb92b823898557cc94fa.gif)

下面为解决移动端滑动穿透的解决方案:

1. 首先先将 document 上的 touchmove 事件禁用掉。(防止遮罩层滚动)
2. 然后再阻止浮层内容冒泡, 这样子浮层内容就能 touchmove 了。(使浮层中需滚动的元素可滚动)
3. 最后对浮层的边界值做处理, 在浮层内容拉到最顶部(scrollTop 为 0) 还上滑动或者浮层内容拉到最底部(scrollTop + clientHeight >= scrollHeight) 还下滑动时
防止其滑动穿透, 所以需要对其进行 event.preventDefault()

具体代码如下:

```js
import { isNotReachIOS } from './mobileDetect'

/* 该方法解决 ios 滑动穿透问题, 经测试安卓 8.0 版本也适用 */
let lockedNum = 0
let initialClientY = 0
let documentListenerAdded = false

const lockedElements: HTMLElement[] = []

const preventDefault = (event: Event) => {
  if (!event.cancelable) return
  event.preventDefault()
}

// 如果位于滚动元素的
const handleScroll = (event: TouchEvent, targetElement: HTMLElement) => {
  const clientY = event.targetTouches[0].clientY - initialClientY

  if (targetElement) {
    const { scrollTop, scrollHeight, clientHeight } = targetElement
    const isOnTop = clientY > 0 && scrollTop === 0
    const isOnBottom = clientY < 0 && scrollTop + clientHeight >= scrollHeight

    if (isOnTop || isOnBottom) {
      return preventDefault(event)
    }
  }

  event.stopPropagation()
  return false
}

/* 逻辑: 首先先将 document 上的 touchmove 事件禁用掉。(防止遮罩层滚动)
然后再将需要进行滚动的元素阻止其冒泡, 这样子滚动的元素就能 touchmove 了。(使弹框层中需滚动的元素可滚动)
最后对弹框层的边界值做处理, 在浮层内容拉到最顶部(scrollTop 为 0) 还上滑动或者浮层内容拉到最底部(scrollTop + clientHeight >= scrollHeight) 还下滑动时
要防止其滑动穿透, 所以需要对其进行 event.prevent */
const lock = (targetElement: HTMLElement) => {
  if (!documentListenerAdded) {
    // 针对 ios9 以下的机型需要单独处理
    isNotReachIOS(10)
      ? document.addEventListener('touchmove', preventDefault)
      : document.addEventListener('touchmove', preventDefault, { passive: false })
    documentListenerAdded = true
  }

  if (targetElement && lockedElements.indexOf(targetElement) === -1) {
    targetElement.ontouchstart = (event: TouchEvent) => {
      initialClientY = event.targetTouches[0].clientY
    }

    targetElement.ontouchmove = (event: TouchEvent) => {
      if (event.targetTouches.length !== 1) return
      handleScroll(event, targetElement)
    }

    lockedElements.push(targetElement)
    lockedNum += 1
  }
}

const unlock = (targetElement: HTMLElement) => {
  const index = lockedElements.indexOf(targetElement)
  if (index !== -1) {
    lockedNum -= 1
    targetElement.ontouchmove = null
    targetElement.ontouchstart = null
    lockedElements.splice(index, 1)
  }

  if (lockedNum === 0 && documentListenerAdded) {
    isNotReachIOS(10)
      ? (document as any).removeEventListener('touchmove', preventDefault)
      : (document as any).removeEventListener('touchmove', preventDefault, { passive: false })
    documentListenerAdded = false
  }
}

export { lock, unlock }
```

使用了上述方法后效果如下:

![](http://with.muyunyun.cn/0a5886e43e522b183415c62d29890ebc.gif)

> 参考 [滑动穿透(锁 body)终极探索](https://juejin.im/post/5ca4816e5188250b251e34e9)

### 微信 ios 下 input 唤醒键盘视图错误兼容问题

![](http://with.muyunyun.cn/0547f0a98df8c2d3df62c87569d07502.gif)

该问题其实和 modal 没关系, 但是在这个场景中被遇到了, 在动图中可以看到 input 唤醒键盘后然后待键盘消失后, 键盘占用的那部分位置并没有被重新填充上, 使用了 `scrollIntoView` 也没有效果。

解决方案如下:

使用 `focusin` 和 `focusout` 能分别监听键盘的弹起与关闭, 在 focusout 事件中使用 window.scrollTo() 将 body 视图移动回原来位置。

实现代码如下:

```js
// 微信 ios 下 input 唤醒键盘视图错误兼容问题
function HackWxIos() {
  ;(function() {
    let myFunction: any
    let isWXAndIos = isWeiXinAndIos()
    if (isWXAndIos) {
      // 保存当前视图的滚动位置, 供键盘关闭时使用;
      const originScrollY = window.scrollY
      // 既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
      document.body.addEventListener('focusin', () => {
        // 软键盘弹起事件
        clearTimeout(myFunction)
      })
      document.body.addEventListener('focusout', () => {
        // 软键盘关闭事件
        clearTimeout(myFunction)
        myFunction = setTimeout(function() {
          window.scrollTo({ top: originScrollY, left: 0, behavior: 'smooth' }) // 重点  =======当键盘收起的时候让页面回到原始位置
        }, 200)
      })
    }
  })()

  function isWeiXinAndIos() {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = '' + window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串且是IOS系统
    let isWeixin = /MicroMessenger/i.test(ua) // 是在微信浏览器
    let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua) // 是IOS系统
    return isWeixin && isIos
  }
}

export default HackWxIos
```

> [知乎 —— Modal 为什么设计成组件的形式，为啥不全设计成函数 api 直接调用？](https://www.zhihu.com/question/357548379/answer/919983914)