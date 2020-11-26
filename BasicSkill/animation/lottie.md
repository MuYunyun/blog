### Lottie

* Lottie
  * 优点
    * AE 真香
    * 还原度高
  * 缺点
    * 不支持动态数据
    * 交互游戏
    * 不好看
      * 没有粒子系统
      * 缺少骨骼动画
        * 可以用 spnae, 有学习成本、商业收费
      * 缺少模型动画(支持旋转)
    * 沟通、适配成本
    * 低端机性能问题

### 实时动画

* 还原度
  * 还原曲线描点等数据
  * 不同平台的渲染差异
* 性能
  * Mars Player: https://render.alipay.com/p/s/mars-editor/
    * 图层、粒子、拖尾、模型、交互
    * WebGl
  * Oasis 3d(蚂蚁): https://oasis-engine.github.io/ 动画引擎、Hilo 3d(淘宝 开源)
  * 小程序、H5、Web3D游戏
* 稳定性

### 支付宝

* 类似 lottie 方案
  * 网页 AE
    * 在线制作 -> 发布优化 -> 播放 JSON

* png、jpg 大图片通过缩小并不能减少内存消耗, 如何用工具检验内存?