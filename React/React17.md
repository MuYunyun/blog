<!--
abbrlink: xvnmyonq
-->

### React 17

* ![](http://with.muyunyun.cn/1b3163fff33edde81761d580e40f0725.jpg)
  * 17 版本之后支持多版本共存。mark, 后续跟进。
* 冒泡机制更改: 向原生靠拢;
* 降低开发心智;

### React 18

#### automatic batching setState

* React 18 默认支持在 setTimeout、fetch 中, automatic batching setState。[discussion](https://github.com/reactwg/react-18/discussions/21)

#### startTransition

* [startTransition](https://github.com/reactwg/react-18/discussions/41)

> In a typical React app, most updates are conceptually transition updates. But for backwards compatibility reasons, transitions are opt-in. By default, React 18 still handles updates as urgent, and you can mark an update as a transition by wrapping it into startTransition.

#### New Suspense SSR Architecture in React 18

* [New Suspense SSR Architecture in React 18](https://github.com/reactwg/react-18/discussions/37)
  * React 18: Streaming HTML and Selective Hydration

- [ ] [marko](https://tech.ebayinc.com/engineering/async-fragments-rediscovering-progressive-html-rendering-with-marko/)

### link

* [react-v17](https://reactjs.org/blog/2020/08/10/react-v17-rc.html)