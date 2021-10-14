<!--
abbrlink: lps6uv7k
-->

虚拟列表

### IntersectionObserver

* threshold 属性: 决定了什么时候触发回调函数。

```js
new IntersectionObserver(
  entries => {/* ... */},
  {
    threshold: [0, 0.25, 0.5, 0.75, 1]
  }
)
```

表示当目标元素 0%、25%、50%、75%、100% 可见时, 会触发回调函数。

### 应用场景

* 资源懒加载
*

### link

[intersectionobserver_api](https://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)