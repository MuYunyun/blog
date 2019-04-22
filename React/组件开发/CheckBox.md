### CheckBox 组件

* 勾的定制化: 首先使用 `appearance: none` 去掉原生自带的勾。接着创建一个矩形, 保留 `border-left` 与 `border-bottom` 的边, 进行旋转得到勾。

### 能用 css 解决的场景尽量用 css 解决

![](http://with.muyunyun.cn/6a44d5cba2693eea4e162f8514aa72ba.jpg)

场景: 蓝色区域为可以更改 `checked` 的地方, 最开始使用 JS 计算出区域 1 与区域 2 的宽度, 使之相加得到蓝色区域的宽度。其实使用 css 中的 `display: inline-block` 可以自动获取子节点的宽度。

### css 的常量属性(比如 color、size)不要设置默认属性值(defaultProps)

使用了默认属性值则会配合 JS 动态插入到 `style` 属性, 这样子有个缺陷: 用户传入自定义的 `class 属性` 不会生效。(因为 style 的优先级大于 class 传入的优先级)