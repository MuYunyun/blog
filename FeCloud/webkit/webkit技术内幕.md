<!--
abbrlink: opv4lnaq
-->

### webkit

* [WebKit](https://webkit.org/): 如何下载、编译 webkit
  * [github](https://github.com/WebKit/webkit)
* [Chromium](www.chromium.org)

### webkit 架构

![](http://with.muyunyun.cn/93c9dbe4d56eb2c5f3be2a14e265ca2b.jpg-muyy)

* JavaScriptCore: JavaScriptCore 引擎是 Webkit 中的默认 JavaScript 引擎。在 Google 的 Chromium 中, 它被替换为 V8 引擎。
* WebKit Ports: 为 WebKit 中的非共享部分。包括硬件加速架构、网络栈、视频解码、图片解码。

### webkit 目录

* LayoutTests
* PerformanceTests
* Source
  * JavaScriptCore // Webkit 默认的的 JavaScript 引擎
  * Platform
  * WebCore
    * css         // css 解释器
    * dom         // DOM 节点的基础类及树结构
    * html        // HTML 解释器和 DOM 节点
    * inspector   // Web Inspector 的实现
    * loader      // 资源加载器、缓存等
    * page        // 与页面相关的全局对象的实现, 包括 window、navigator 等 DOM 对象, 事件, 动画处理
    * platform    // 各个移植的代码
    * storage     // 存储的共享代码
  * WebKit        // 绑定和嵌入式接口层)
  * Webkit2       // 绑定和嵌入式接口层)
    * efl             // efl 的主函数, 构建一个简单的浏览器, 还有其它移植的代码
    * NetworkProcess  // 网络进程相关代码
    * UIProcess       // UI 进程相关代码
    * WebProcess      // Web 进程相关代码
  * WTF       // 智能类库。字符串操作、各种容器、指针、线程、算法等
* Tools

### Chromium 多进程模型

![](http://with.muyunyun.cn/af3e700cca1056b8796667751e27e7ec.jpg-muyy)

* `Browser 进程`: 浏览器的主进程, 是其它类型进程的祖先, 负责它们的创建和销毁。
* `Renderer 进程`: 网页的渲染进程。
* `NPAPI 插件进程`。
* `GPU 进程`: 对 3D 图形加速调用的实现。
* `Pepper 插件进程`。

每个进程内部有多个线程。

### 深入理解 WKWebView（入门篇）—— WebKit 源码调试与分析

WebKit 项目非常庞大，clone 下来体积有 11.98 GB。

- [ ] [深入理解 WKWebView（入门篇）—— WebKit 源码调试与分析](https://mp.weixin.qq.com/s/VdkVBIQwj7WkAk8-5wppmQ)

源码编译

1. 下载的 WebKit 目录里面有一个Tools/Scripts 目录，这里面有各种脚本，包括使用命令行编译 WebKit 的脚本，其中一个重要的脚本就是 configure-Xcode-for-embedded-development，在 Mac 终端控制台运行如下命令:

```bash
sudo Tools/Scripts/configure-Xcode-for-embedded-development
```

之所以需要执行这个脚本，是因为 iOS 属于嵌入式平台，编译嵌入式平台的 WebKit 需要用到一些命令行工具，Xcode 正是利用该脚本构建这些命令行工具。

2.

### Todo

如何在 Mac 中调试线程?

> Linux: 使用 GDB 调试该进程，然后输入 “info threads” 查看结果。

read page 68:

### read more

* [深入理解 WKWebView（基础篇）—— WKWebView 加载生命周期与代理方法剖析](https://mp.weixin.qq.com/s/ZFui9IiMTWyLXGKZlbnzwQ)
  * 该文提到了「如果返回的 data 是普通文本文字，或返回的数据中包含普通文本文字，那只需要达到非空 200 字节即可以触发上屏渲染」，对应解决商品管理业务在 iOS 机型首屏渲染较慢的问题。

- [ ] [深入理解 WKWebView (渲染篇) —— DOM 树的构建](https://mp.weixin.qq.com/s/9FBKMJo0GaGJ1kEhCiNNZA)
