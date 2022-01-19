<!--
abbrlink: g3v1c5bq
-->

## 基于 SSR 的预渲染首屏直出方案

[Create React Doc](https://github.com/MuYunyun/create-react-doc) 是一个使用 React 的 markdown 文档站点生成工具。此前（参考 [SEO 在 SPA 站点中的实践](http://muyunyun.cn/blog/ettzfags/)）为了使基于 React 开发的 SPA 文档站点也能享受到 SEO(Search Engine Optimization) 能力，在 Create React Doc 中引入了**预渲染技术**来实现静态页面预生成的能力。如此一来，便支持了在享受 SEO 的能力的同时，也加快了首屏访问加载速度。

### 新的挑战

在使用 Create React Doc 创建的文档项目中，其渲染周期大致如下所示：

![](http://with.muyunyun.cn/7f7c6ab865547639df62164f53086c78.jpg)

以访问章节[快速上手](http://muyunyun.cn/create-react-doc/290a4219/)为例，用户从访问页面到页面可交互，项目会经历如下阶段：

`预渲染阶段`: 如上述蓝色线框流程图部分，根据 React SPA 各路由，使用预渲染技术获取各路由对应的 DOM 结构后，生成 HTML 文件，并将生成文件存放在 gh-pages 服务中(可自行选择其它存储服务)。

![](http://with.muyunyun.cn/4eaf5b05769b838bbe470176cf22e246.jpg-400)

`首屏渲染阶段`: 当用户访问[快速上手](http://muyunyun.cn/create-react-doc/290a4219/)章节时，gp-pages 服务会推送其对应的预渲染页面，此时用户可以获得友好的首屏体验 😁。值得注意的是，预渲染的页面仅仅只是生成静态的 HTML 页面，因而首屏渲染阶段的页面是无法交互的。

![](http://with.muyunyun.cn/29a0df7a6788a1781c87d6bf4a35deae.jpg)

`衔接阶段`: 衔接阶段是`首屏渲染阶段`与`页面可交互阶段`的中间态阶段，在该阶段执行 JavaScript 逻辑，从而使页面从无交互到可交互。但是观察发现从预渲染页面到页面可交互，出现了干扰体验的加载，体验十分不好 😭。

(不被期望的中间加载页展示)

![](http://with.muyunyun.cn/56d89fdc818925754251729e0b61ba2c.jpg)

`可交互阶段`：该阶段用户可以与页面进行交互。比如点击左侧菜单按钮可以展开、收起等。

![](http://with.muyunyun.cn/35a856670eb3f676f37a558e2be0d093.jpg)

究其原因为客户端渲染页面与预渲染页面都使用了 `ReactDom.render` 并指定相同根路径节点进行渲染(这里为 root)。在访问首屏预渲染页面之后，执行 JavaScript 逻辑时，`React 会移除存量 Html 结构，并基于 root 节点重新开始渲染`，因而必然会导致页面不被期望的抖动。

```js
ReactDOM.render(
  <RouterRoot />,
  document.getElementById('root'),
)
```

### 思路解法

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

基于上述代码，可实现静态页面节点与动态交互节点的分开渲染。但该方案的缺陷是`静态节点与动态交互节点之间的联系被完全割裂开`，衔接阶段渲染的节点不能影响到静态页面节点，如页面布局、路由跳转等。

* 思路三：基于思路二，我们既要`拆分静态节点与动态交互节点渲染的时机`，同时要`保证静态节点与动态交互节点渲染之间的联系`。此时自然而然的联想到 SSR —— 在服务端首屏直出静态页面，在客户端注水交互逻辑。只不过我们这里的服务端可以`使用 github 提供的 gh-pages 服务来存放基于 SSR 提前预渲染好的节点`。相关流程图变更如下：

