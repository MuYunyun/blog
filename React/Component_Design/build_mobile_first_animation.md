### 在 React 中构建移动端优先的 web 动画

移动端优先动画是指在移动设备上开发的, 旨在在移动浏览器而非桌面浏览器的上下文中工作的动画。它有着类似原生 App 的交互体验, 尤其是体贴的手势交互, 同时即使在中低档设备上其也具有不错的流畅体验。

### 难点罗列

* scroll、swipe-to-refresh 会受到浏览器默认行为干扰;
* 触摸反应迟钝, 没有直接操作的感觉;
* 反物理直觉;
* 兼容中、低设备;

### 框架方案

The way to take is usually `an animation library` with `a gesture hooks`.

* [Framer](https://github.com/koenbok/Framer)
* [react spring](https://github.com/react-spring/react-spring) + [react-use-gesture](https://github.com/react-spring/react-use-gesture)
* animation library([anime](https://github.com/juliangarnier/anime)) + [react-swipeable](https://github.com/dogfessional/react-swipeable)
* animation library([GSAP](https://github.com/greensock/GSAP)) + [Hammer.js](https://github.com/hammerjs/hammer.js/)

### Some Principles

* `Immediate Response`: If not response immediately, it feels super disconnected. [demo](https://mobile-first-animation.netlify.com/21)
* `Scroll Decay`: The concepts of scroll decay can help us decide how our UIs should respect to users interaction. [demo](https://mobile-first-animation.netlify.com/23)
  * `-webkit-overflow-scrolling: touch`
* `Rubberbanding`

### Touch cancellation

* Use the `touch-action` CSS property to disable default browser behaviors with precision.

use touch-action before:

![](http://with.muyunyun.cn/2f284758868304dabad94d2a25500562.gif)

use touch-action after:

![](http://with.muyunyun.cn/a458a78d287e08627f4dd6b1502fc33e.gif)

* [Interactive touch-action demo](https://www.chenhuijing.com/touch-action/)
* [Mozilla introduction to touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)

### resource links

* [Progressive Web Animations | Alexandra Holachek](https://www.youtube.com/watch?v=laPsceJ4tTY&list=PLPxbbTqCLbGHPxZpw4xj_Wwg8-fdNxJRh&index=21)

#### Springs & Gestures

- [ ] [Material Design guide to gestures](https://material.io/design/interaction/gestures.html#types-of-gestures)
- [ ] [Great intro to using springs in animations](https://medium.com/ios-os-x-development/demystifying-uikit-spring-animations-2bb868446773)
- [ ] [In-depth look at projection](https://medium.com/ios-os-x-development/gestures-in-fluid-interfaces-on-intent-and-projection-36d158db7395)
- [ ] [Apple's "Designing Fluid Interfaces" talk](https://developer.apple.com/mobile-app-examples/play/wwdc2018/803/)
- [ ] [In-depth exploration of momentum scrolling](https://ariya.io/2013/08/javascript-kinetic-scrolling-part-1)
- [ ] [Implementation of iOS animation principles](https://medium.com/@nathangitter/building-fluid-interfaces-ios-swift-9732bb934bf5)

#### Touch on the web

- [ ] [Google introduction to touch on the web](https://developers.google.com/web/fundamentals/design-and-ux/input/touch)
- [ ] [Mozilla introduction to pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [ ] [Overscroll behavior](https://developers.google.com/web/updates/2017/11/overscroll-behavior)
- [ ] [Passive event listeners](https://developers.google.com/web/updates/2016/06/passive-event-listeners)