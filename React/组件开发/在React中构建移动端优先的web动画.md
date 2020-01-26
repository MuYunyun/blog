### 在 React 中构建移动端优先的 web 动画

移动端优先动画是指在移动设备上开发的, 旨在在移动浏览器而非桌面浏览器的上下文中工作的动画。它有着类似原生 App 的交互体验, 尤其是体贴的手势交互, 同时即使在中低档设备上其也具有不错的流畅体验。

### 难点罗列

* scroll、swipe-to-refresh 会受到浏览器默认行为干扰;
* 触摸反应迟钝, 没有直接操作的感觉;
* 反物理直觉;qq中、低设备;

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

### to watch

Designing Fluid Interfaces

### some advice

* Immediate Response
  * stiff spring
  * one-to-one movement

### links

* [Progressive Web Animations | Alexandra Holachek](https://www.youtube.com/watch?v=laPsceJ4tTY&list=PLPxbbTqCLbGHPxZpw4xj_Wwg8-fdNxJRh&index=21)