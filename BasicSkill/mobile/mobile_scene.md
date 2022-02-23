<!--
abbrlink: 4ocu6ahz
-->

### 移动端 click 事件存在 300ms 时延

移动端 `click` 事件存在 `300ms` 时延的原因: 设备需要根据这段时间用户的操作来判断是单点还是双点。

解决思路: 使用 `touchStart` 和 `touchEnd` 来取代 `click` 事件。

> [相关链接](https://juejin.im/entry/6844903427147825165)

### 点击穿透

点击 a 标签下的一个返回按钮, 触发了 a 中的 href 跳转

方法同上, 也是封装一个 `tap` 方法;

### 一些移动端上的有用的 css 属性

#### -webkit-overflow-scrolling

[-webkit-overflow-scrolling](http://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-overflow-scrolling) 属性，一般配合 overflow: 'auto' 一起使用，增加在 IOS 上增加滑动的灵敏度。

在特定场景，比如 PullToRefresh 的下拉场景，`-webkit-overflow-scrolling` 属性要设置为 'auto' 以避免 iOS 下滑刷新时出现的卡顿效果。

#### use-select: none

阻止触摸选中文字

### scrollTo

`scrollTo` 这个 api 作用在滚动子元素的父节点上。但是如果要有平缓的动画效果用其的属性 `behavior: 'smooth'` 是不生效的。解决方案如下:

1. 方案一: 结合 `setTimeout` 使用 `css transition` 属性, 在异步时间后移除 `transition`;
2. 方案二: 使用 `requestAnimationFrame` 来完成效果;

### 移动端 1px 解决方案

手机屏幕上存在 `devicePixelRatio` 属性, 其值为物理像素和屏幕像素之比。

方案一: 伪元素 + `transform: scaleY(0.5)`;
方案二: 使用 box-shadow。

`box-shadow` 这个方案有个缺陷是画上划线容易。方式如下:

```css
box-shadow: 0px -1px 0px 0px rgba(245, 245, 245, 1);
```

但是缺陷是画下划线不便, 需要配合 `position: relative` 以及 `z-index` 来调整层级。

### 滑动穿透解决方案

- [滑动穿透解决方案](https://github.com/MuYunyun/blog/blob/master/React/%E7%BB%84%E4%BB%B6%E5%BC%80%E5%8F%91/modal.md#%E6%BB%91%E5%8A%A8%E7%A9%BF%E9%80%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88)

### 移动端适配

#### 分辨率

* PPI(Pixel Per Inch): 每英寸包括的像素数
* DPI(Dot Per Inch): 每英寸包括的点数

#### 设备独立像素

* DP 或者 DIP(Device Independent Pixels): 设备独立像素, 用于安卓系统;
* PT(Point): 用于 IOS 系统;

#### 设备像素比

* DPR(device pixel ratio)
* 物理像素与设备独立像素的比值, 浏览器上获取设备像素比的方法 `window.devicePixelRatio`;

### user-select

```css
.demo {
  /* 阻止触摸选中文字 */
  user-select: none;
  /* 阻止 B 端 App 保存图片的弹框弹出 */
  pointer-events: none;
  /* 长按会选中文字 */
  -webkit-touch-callout: none;
}
```

## 移动开发指南

* H5: 需要发版
* 组件包: 不需要发版
* 原生: 性能高

## IOS 特有

### 模拟器中隐藏地址栏与工具栏, 便于查看、调试刘海屏样式

结论: 在 IOS 大于 13 版本的机型中，可以点击左上角阅读器图标，选择「隐藏地址栏与工具栏」。

![](http://with.muyunyun.cn/0d488254b20c9ffc2146367f1be7a43f.jpg)

### IOS 13 机型中在弹框类组件中使用 input 光标会消失

见 [issue](https://github.com/ionic-team/cordova-plugin-ionic-webview/issues/449#issuecomment-541907141)

### 移动端移除滚动条

移除滚动条有一个 css 属性 `-webkit-scrollbar`, 其用法如下:

```css
&::-webkit-scrollbar {
  display: none;
  width: 0px;
}
```

但是在 `IOS` 是不生效的, 解决方案如下:

以竖直滑动为例: 在外层设置宽度为 400px(假设内容宽度为 400px)并设置 `overflow-x: hidden`, 内层宽度为 417px(17px 为滚动条宽度)。

### 解决 IOS 下输入框自带圆角的问题

```css
.demo {
  -webkit-appearance: none;
}
```

> 见 SearchBar 组件开发

### IOS 下 input 光标大小调整

在 IOS 中: 该行无文字时, 光标高度与 `line-height` 一致; 该行有文字时, 光标高度从 `input` 顶部到文字底部(这两种情况都是在有设定 `line-height` 的时候)，如果没有 `line-height`，则是与 `font-size` 一致(可能表述有误差)。

解决方法如下: 设置 `line-height` 为一个较小值(期望的光标大小), 再用 `padding` 来撑开 `input` 的区域;

> 见 SearchBar 组件开发

### IOS9 兼容情况

* `window.scrollTo` 在 IOS12.1 以下的机子下是不兼容的;
* `insertAdjacentHTML` 虽然在 [caniuse](https://caniuse.com/#search=insertAdjacentHTML) 中看起来兼容性很好, 但是在 IOS10.2 以下的机子中部分节点是没有这个 api 的, 所以从中也能看出 caniuse 可以作为部分参考, 但不能全信;

### IOS8 兼容情况

`Symbol`、`Map` 在 ios8 中是不支持的

![](http://with.muyunyun.cn/2da80724739178534ac4bb03459654d5.jpg)

后续陆续兼容以下属性

* 数组/字符串的 `includes` 方法, ios9 开始支持
* document.body.append:

### 其它兼容

* `new Date('xxxx-xx-xx xx:xx')` 在 IOS 系统中会报 Invalid Date, 在安卓中正常。
  * 兼容方法: `new Date('xxxx/xx/xx xx:xx')`, 经验证该方法在 IOS 与 Android 都可运行。

## Android 特有

### font-weight 在安卓机上失效

0 ~ 400 一种粗细, 500 ~ 900 一种粗细。

针对各种机型提供适配字体。

## IOS && Android

### scrollTop 区分

Anchor 组件

```js
// document.documentElement.scrollTop do effect in ios, and document.body.scrollTop do effect in android.
const scrollTop =
  document.documentElement.scrollTop // iOS
  || document.body.scrollTop         // android
```