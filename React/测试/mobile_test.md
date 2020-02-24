### 移动端组件测试指北

移动端组件测试分为以下几个环节

1. 单元测试
2. 模拟真机测试
3. 真机测试

### 单元测试

使用过 `jest` + `ensyme`/`react-test-library`, 推荐 `react-test-library`。

### ios 机型测试

首先需注意的是`低版本的手机是`不支持 ES6 的, 所以打包到线上环境的代码应该是编译成 ES5。

![](http://with.muyunyun.cn/fcec13352f1a210d2f9718281ffca685.jpg)

然后使用 Xcode 中的 Simulator 配合 Sarari 进行模拟真机测试。

#### 如何在 simulator 中测试双指拖拽放大缩小

按住 shift + alt 按键进行锁定区域。

### 安卓机型测试

1. start up developer mode in android app;
2. input [url](chrome://inspect) Chrome to test;