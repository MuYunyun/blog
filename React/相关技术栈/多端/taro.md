### @tarojs/components

```js
import { View, Text, Navigator, Image } from '@tarojs/components'
```

* 在小程序端，React/Nerv 指向 mini/index.js，Vue 无需使用此包。
* 在 H5 端，React/Nerv 指向 h5/react/index.js，Vue 指向 h5/vue/index.js。H5 端使用 stencil 把组件编译为 Web Components 以提供跨框架调用。

原则: 在满足 B 端移动视觉规范的基础上, 优先将 beast-mobile 组件迁移成小程序组件,

* 跨平台开发
  * 通过内置环境变量来解决

* [View](https://taro-docs.jd.com/taro/docs/components/viewContainer/view)
* [Text](https://taro-docs.jd.com/taro/docs/components/base/text)
* [swiper](https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html), [swiper in taro](https://taro-docs.jd.com/taro/docs/components/viewContainer/swiper): 考虑可用
* [progress](https://developers.weixin.qq.com/miniprogram/dev/component/progress.html): 考虑可用
* [button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)
* [checkbox](https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html)
* [input](https://developers.weixin.qq.com/miniprogram/dev/component/input.html)
* [switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html)

### link

* [小程序跨框架开发的探索与实践](https://mp.weixin.qq.com/s?__biz=MzU3NDkzMTI3MA==&mid=2247483770&idx=1&sn=ba2cdea5256e1c4e7bb513aa4c837834)
* [入门教程](https://taro-docs.jd.com/taro/docs/guide/)
