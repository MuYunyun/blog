<!--
abbrlink: g3v1c5bq
-->

## 基于 SSR 的预渲染首屏直出方案

[Create React Doc](https://github.com/MuYunyun/create-react-doc) 是一个使用 React 的 markdown 文档站点生成工具。[此前](http://muyunyun.cn/blog/ettzfags/)在 Create React Doc 中引入了**预渲染**技术来预先生成对应路由的静态页面，以使基于其搭建的文档站点能享用到 SEO(Search Engine Optimization) 同时加快了首屏访问加载。

### 新的挑战

Create React Doc 使用预渲染技术获取各页面路由对应的 DOM 结构以生成对应的 HTML 文件，并将静态文件存放于 gh-pages 服务中(可自行选择其它存储服务)从而达到加快首屏访问加载以及 SEO。见如下蓝色线框流程图部分：

![](http://with.muyunyun.cn/4f6fa055a7c5577eee39cafcdb53bfad.jpg-400)

![](http://with.muyunyun.cn/4eaf5b05769b838bbe470176cf22e246.jpg-400)

在访问 Create React Doc 创建的文档时，页面渲染周期可分为`首屏渲染阶段`、`衔接阶段`、`可交互阶段`。

`首屏渲染阶段`: 以访问[快速上手](http://muyunyun.cn/create-react-doc/290a4219/)章节为例，当用户在浏览器输入 http://muyunyun.cn/create-react-doc/290a4219/ 时，gp-pages 服务会推送预先渲染好的页面，此时用户可以获得十分快速的首屏体验 😁。不过需要指出的是，预渲染的页面仅仅只是生成静态的 HTML 页面，因而在首屏渲染阶段的页面时用户是无法交互的。

![](http://with.muyunyun.cn/29a0df7a6788a1781c87d6bf4a35deae.jpg)

`衔接阶段`: 衔接阶段是`首屏渲染阶段`与`页面可交互阶段`的中间态阶段，在该阶段执行 JavaScript 逻辑，从而使页面从无交互到可交互。但是观察发现从预渲染页面到页面可交互，出现了干扰体验的加载页，体验十分不好 😭。

![](http://with.muyunyun.cn/56d89fdc818925754251729e0b61ba2c.jpg)

不被期望的中间加载页（见上图）出现的原因为预渲染页面与客户端渲染页面都使用了 `ReactDom.render` 并指定相同根路径节点进行渲染(这里为 root)。在访问首屏预渲染页面之后，执行 JavaScript 逻辑时，`React 会移除存量 HTML 结构，并基于 root 节点重新开始渲染`，因而必然会导致出现不被期望的加载页或者页面抖动。

```js
ReactDOM.render(
  <RouterRoot />,
  document.getElementById('root'),
)
```

`可交互阶段`：该阶段用户可以与页面进行交互。比如点击左侧菜单按钮可以展开、收起等。

![](http://with.muyunyun.cn/35a856670eb3f676f37a558e2be0d093.jpg)

### 基于 SSR 的预渲染首屏直出方案

基于文档站点大部分为静态内容，少部分为动态可交互内容。抽象出以下几种可行性思路：

* 思路一：`调整交互布局，减少动态节点的交互`。比如使用面包屑组件与平铺菜单结构来替换多层级菜单，或者探寻更优雅的 CSS 交互方案。

* 思路二：`拆分静态节点与动态交互节点渲染的时机`。预渲染时完成大部分静态页面的渲染，在衔接阶段中完成动态逻辑节点的执行。伪代码如下：

```js
if (!ifProdRender) {
  // 预渲染静态节点
  ReactDOM.render(
    <QuietNode />,
    document.getElementById('quietNode'),
  )
} else {
  // 衔接阶段完成动态交互节点的渲染
  ReactDOM.render(
    <DynamicNode />,
    document.getElementById('dynamicNode'),
  )
}
```

基于上述代码，可实现静态页面节点与动态交互节点的分开渲染。但该方案的缺陷是`静态节点与动态交互节点之间的联系被完全割裂开`，衔接阶段渲染的节点不能影响到静态页面节点，比如页面布局、路由跳转等。

* 思路三：`拆分静态节点渲染与动态交互生效的时机，保证静态节点与动态交互节点渲染之间的联系`。在思路二基础上，进一步联想到如果基于服务端渲染（在服务端首屏直出静态页面，在客户端注水交互逻辑）不就可以完美支持`静态节点与动态交互隔离执行，同时保证衔接阶段页面不出现抖动`了么。只不过我们这里的服务端可以使用 gh-pages 服务来存放基于 SSR 提前预渲染好的节点。

![](http://with.muyunyun.cn/b83d4505777794eb21251f15272e8d4b.jpg-400)

根据环境执行不同的渲染逻辑的代码如下示意，完整改动可见 [mr](https://github.com/MuYunyun/create-react-doc/pull/240/files)。

```js
if (ifDev) {
  // dev render
  document.getElementById('root').innerHTML = ReactDOMServer.renderToString(<RouterRoot />)
  ReactDOM.hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
} else if (ifPrerender) {
  // prerender
  document.getElementById('root').innerHTML = ReactDOMServer.renderToString(<RouterRoot />)
} else {
  // prod render
  ReactDOM.hydrate(
    <RouterRoot />,
    document.getElementById('root'),
  )
}
```

至此在衔接阶段中页面抖动（不被期望的加载页）得到优化。
