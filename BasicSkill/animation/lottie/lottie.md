### Lottie

* 针对营销动画场景, 业界用的较多的是使用 Lottie 来开发。
  * 优点
    * AE 香
    * 还原度高
  * 缺点
    * 不支持动态数据
    * 沟通、适配成本
    * 低端机性能问题
    * 官方文档匮乏
* 使用 css 来完成营销动效的效果(比如光影、滤镜效果)不会很好。
* 支付宝营销动效方案:
  * 在线制作 -> 发布优化 -> 播放 JSON
  * 类 lottie 方案, 提供网页 ae, https://render.alipay.com/p/s/mars-editor/, 转化为 WebGl
* [网易云音乐年度报告从设计到代码](https://zhuanlan.zhihu.com/p/57576659)。

### 场景

* 直播: 手势拜年特效
* 素材属性编辑
* 内容平台操作

### 实时动画

* 还原度
  * 还原曲线描点等数据
  * 不同平台的渲染差异
* 性能
  * Mars Player: https://render.alipay.com/p/s/mars-editor/
    * 图层、粒子、拖尾、模型、交互
    * WebGl
  * Oasis 3d(蚂蚁): https://oasis-engine.github.io/ 动画引擎、Hilo 3d(淘宝 开源)
  * 小程序、H5、Web3D 游戏
* 稳定性

### Lottie 库使用

lottie-web gzip 压缩后大小有 40kb 的大小。如果使用 npm 包的形式进行加载, 那么 vendor.js 会增加 40kb 的大小, 这样会使页面性能下降。

* 方案一: 采用 script 标签的形式来加载 lottie 文件, 并且使用 defer 或 async 属性来进行异步加载。一般情况下, 我们只需要 svg 格式的动画, 所以可以使用 lottie_light 版本（仅支持 svg 渲染）。
* 方案二: 因为 lottie 目前只在商家年度之夜中使用, 因此在特定路由中进行按需引入加载。

#### JSON 文件

通过 bodymovin 插件导出的动画 JSON 文件大小也可能比较大(复杂的动画达到上百 kb), 所以不建议将 JSON 数据内联到页面中, 而最好是当做一个 JSON 文件来进行下载。

#### lottie-web 的基本用法

```js
const animation = bodymovin.loadAnimation({
  container: element,    // 要包含该动画的dom元素
  renderer: 'svg',       // 渲染方式, svg、canvas、html（轻量版仅svg渲染）
  loop: true,            // 是否循环播放
  autoplay: true,        // 是否自动播放
  animationData,         // 动画 JSON 文件(优先级比 path 高)
  path: animateJsonPath, // 动画 JSON 文件路径
});
```

#### lottie-web 常用方法

lottie-web 提供了很多的控制动画播放的方法, 下面是一些常用的方法。animation 等于上面代码中的 animation。

```js
animation.play(); // 播放该动画, 从目前停止的帧开始播放
animation.stop(); // 停止播放该动画, 回到第 0 帧
animation.pause(); // 暂停该动画, 在当前帧停止并保持
animation.goToAndStop(value, isFrame); // 跳到某个时刻/帧并停止。isFrame(默认false) 指示 value 表示帧还是时间(毫秒)
animation.goToAndPlay(value, isFrame); // 跳到某个时刻/帧并进行播放
animation.goToAndStop(30, true); // 跳转到第 30 帧并停止
animation.goToAndPlay(300); // 跳转到第 300 毫秒并播放
animation.playSegments(arr, forceFlag); // arr 可以包含两个数字或者两个数字组成的数组, forceFlag 表示是否立即强制播放该片段
animation.playSegments([10,20], false); // 播放完之前的片段, 播放 10-20 帧
animation.playSegments([[0,5],[10,18]], true); // 直接播放 0-5 帧和 10-18 帧
animation.setSpeed(speed); // 设置播放速度, speed为 1 表示正常速度
animation.setDirection(direction); // 设置播放方向, 1 表示正向播放, -1 表示反向播放
animation.destroy(); // 删除该动画, 移除相应的元素标签等。在unmount的时候, 需要调用该方法
```

#### lottie-web 常用的事件

lottie-web 中可能也需要监听一些事件, 比如加载完动画 JSON 文件时的 data_ready 事件。监听方法如下:

```js
animation.addEventListener('data_ready', () => {
  console.log('animation data has loaded');
});
```

除了 `data_ready` 事件, 下面还有一些其他常用的事件可以监听:

* complete: 播放完成（循环播放下不会触发）
* loopComplete: 当前循环下播放（循环播放/非循环播放）结束时触发
* enterFrame: 每进入一帧就会触发, 播放时每一帧都会触发一次, stop 方法也会触发
* segmentStart: 播放指定片段时触发
* playSegments、resetSegments 等方法刚开始播放指定片段时会发出, 如果 playSegments 播放多个片段, 多个片段最开始都会触发。
* data_ready: 动画 JSON 文件加载完毕触发
* DOMLoaded: 动画相关的 dom 已经被添加到 html 后触发
* destroy: 将在动画删除时触发

#### lottie-web 部分高阶用法

1. 在制作 AE 动画时, 将图层命名为 #svgId 格式, 前端加载该动画后, 相应的图层的 id 会被设置为 svgId, 可以通过 dom 方法获取该元素并做相应的操作;
2. 在制作 AE 动画时, 将图层命名为 .svgClass 格式, 前端加载该动画后, 相应的图层的 class 会被设置为 svgClass, 可以通过 dom 方法获取这些元素并做相应的操作;

### 相关链接

* [lottie 动效社区资源](https://lottiefiles.com/featured)
* [现在你可以把 Lottie 动画导回 AE 了](https://zhuanlan.zhihu.com/p/104751997)
  * 经验证, 简单的动效可以, 复杂的不行。
- [ ] [剖析 lottie-web 动画实现原理](https://juejin.cn/post/6914835547588395022)
- [ ] [使用 Lottie 快速开发动画](https://jelly.jd.com/article/5fcf44b5a1c4e30142d0a472)
