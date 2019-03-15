### React.memo 和 useMemo 的区别

`React.memo` 修饰一个函数组件, `useMemo` 修饰一个函数。它们本质都是运用缓存。

### Each Render Has Its Own Everything

* `hooks` 中每一次 `render` 都有自己的 `state` 和 `props`, 这和 `class` 中有点差异;
* class 中可以用闭包模拟 hooks 的表现;
* hooks 中可以使用 ref 模拟 class 的表现;

> 见 [](https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-everything)
- [ ] [a-complete-guide-to-useeffect](https://overreacted.io/a-complete-guide-to-useeffect/)

> 阅读到 So What About Cleanup?

### 一些资源

* [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
* [usehooks](https://github.com/gragland/usehooks)