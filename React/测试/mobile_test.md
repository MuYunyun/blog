<!--
abbrlink: x2orssyg
-->

## 移动端测试指北

移动端测试分为以下几个环节

1. 单元测试
2. 模拟真机/真机测试
3. 真机自动化测试

## 单元测试

使用过 `jest` + `ensyme`/`react-test-library`, 推荐 `react-test-library`。

## 模拟真机/真机测试

### IOS 机型

* 方案一: 使用 Xcode 中的 Simulator 配合 Safari 进行模拟真机测试。

![](http://with.muyunyun.cn/fcec13352f1a210d2f9718281ffca685.jpg)

* 方案二: 使用 IOS 真机配合 Safari 进行真机测试。

步骤一: Mac 端配置。`Safari -> Preferences -> Advanced -> Show Develop menu in menu bar`

![](http://with.muyunyun.cn/dc4029223c181baa0dd12643136894ac.jpg-400)

步骤二: IOS 真机配置(通过数据线连接到 Mac)。`Settings -> Safari -> Advanced -> open JavaScript & open Web Inspector`

![](http://with.muyunyun.cn/26e848d6445e04f44dbb41a63e55567e.jpg-300)

步骤三: 在 Mac 端的 `Safari -> Developer` 菜单中此时就能看到个人的设备。此时在 IOS 中的 Safari 中访问对应网页，即可在 Mac 中的 Safari 个人开发工具进行调试。

#### 如何在 Mac 安装多个 xcode

> 结论: 当前没有有效方法。

1. 在 [apple 官网](https://developer.apple.com/download/all/) 安装对应的 xcode 版本。

> 也可以参考 [所有Xcode版本的链接](https://stackoverflow.com/a/10335943/6685113)

2. 基于新下载的 Xcode，点击 Preferences -> Components -> 下载对应的 iOS 机型。
3. 经过多番尝试（下载多个老版本 Xcode、参考 https://hiraku.tw/2021/04/6428/ 更改 iOS 机型限制列表），遗憾的是最后也没能在菜单栏中找到 10.3 版本的模拟器。

快捷指令：

```bash
// 切换 Xcode 版本
sudo xcode-select -s /Applications/Xcode/Xcode.app/Contents/Developer
```

#### 兼容性

需注意低版本的 IOS 机型未支持 ES6，因此打包到线上环境的代码应该是编译成 ES5。

#### 如何在 Simulator 中测试双指拖拽放大缩小

按住 `shift + alt` 按键可模拟双指拖拽放大、缩小的能力。

### Android 机型

1. start up developer mode in android app;
2. input [url](chrome://inspect) Chrome to test;
