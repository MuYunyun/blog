### webkit

* [WebKit](https://webkit.org/): 如何下载、编译 webkit
  * [github](https://github.com/WebKit/webkit)
* [Chromium](www.chromium.org)

### webkit 架构

![](http://with.muyunyun.cn/93c9dbe4d56eb2c5f3be2a14e265ca2b.jpg-muyy)

* JavaScript 引擎: Google 的 Chromium 中, 它被替换为 V8 引擎。

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

read page 56