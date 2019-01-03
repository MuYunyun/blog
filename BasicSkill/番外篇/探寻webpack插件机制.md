webpack 可谓是让人欣喜又让人忧, 功能强大但需要一定的学习成本。在探寻 webpack 插件机制前, 首先需要了解一件有意思的事情, webpack 插件机制是整个 webpack 工具的骨架, 而 webpack 本身也是利用这套插件机制构建出来的。因此在深入认识 webpack 插件机制后, 再来进行项目的相关优化, 想必会大有裨益。

### webpack 插件

先来瞅瞅 webpack 插件在项目中的运用

```js
const MyPlugin = require('myplugin')
const webpack = require('webpack')

webpack({
  ...,
  plugins: [new MyPlugin()]
  ...,
})
```

那么符合什么样的条件能作为 webpack 插件呢？一般来说, webpack 插件有以下特点:

1. 独立的 JS 模块, 暴露相应的函数

2. 函数原型上的 apply 方法会注入 compiler 对象

3. compiler 对象上挂载了相应的 webpack 事件钩子

4. 事件钩子的回调函数里能拿到编译后的 compilation 对象, 如果是异步钩子还能拿到相应的 callback

下面结合代码来看看:

```js
function MyPlugin(options) {}
// 2.函数原型上的 apply 方法会注入 compiler 对象
MyPlugin.prototype.apply = function(compiler) {
  // 3.compiler 对象上挂载了相应的 webpack 事件钩子 4.事件钩子的回调函数里能拿到编译后的 compilation 对象
  compiler.plugin('emit', (compilation, callback) => {
    ...
  })
}
// 1.独立的 JS 模块, 暴露相应的函数
module.exports = MyPlugin
```

这样子, webpack 插件的基本轮廓就勾勒出来了, 此时疑问点有几点,

1. 疑问 1: 函数的原型上为什么要定义 apply 方法？阅读[源码](https://github.com/webpack/webpack/blob/10282ea20648b465caec6448849f24fc34e1ba3e/lib/webpack.js#L35)后发现源码中是通过 `plugin.apply()` 调用插件的。

```js
const webpack = (options, callback) => {
  ...
  for (const plugin of options.plugins) {
    plugin.apply(compiler);
  }
  ...
}
```

2. 疑问 2: compiler 对象是什么呢？

3. 疑问 3: compiler 对象上的事件钩子是怎样的？

4. 疑问 4: 事件钩子的回调函数里能拿到的 compilation 对象又是什么呢？

这些疑问也是本文的线索, 让我们一个个探索。

### compiler 对象

compiler 即 webpack 的编辑器对象, 在调用 webpack 时, 会自动初始化 compiler 对象, [源码](https://github.com/webpack/webpack/blob/10282ea20648b465caec6448849f24fc34e1ba3e/lib/webpack.js#L30)如下:

```js
// webpack/lib/webpack.js
const Compiler = require("./Compiler")

const webpack = (options, callback) => {
  ...
  options = new WebpackOptionsDefaulter().process(options) // 初始化 webpack 各配置参数
  let compiler = new Compiler(options.context)             // 初始化 compiler 对象, 这里 options.context 为 process.cwd()
  compiler.options = options                               // 往 compiler 添加初始化参数
  new NodeEnvironmentPlugin().apply(compiler)              // 往 compiler 添加 Node 环境相关方法
  for (const plugin of options.plugins) {
    plugin.apply(compiler);
  }
  ...
}
```

终上, compiler 对象中包含了所有 webpack 可配置的内容, 开发插件时, 我们可以从 compiler 对象中拿到所有和 webpack 主环境相关的内容。

### compilation 对象

compilation 对象代表了一次单一的版本构建和生成资源。当运行 webpack 时, 每当检测到一个文件变化, 一次新的编译将被创建, 从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。

结合源码来理解下上面这段话, 首先 webpack 在每次执行时会调用 `compiler.run()` [(源码位置)](https://github.com/webpack/webpack/blob/e7c8fa414b718ac98d94a96e2553faceabfbc92f/lib/webpack.js#L58), 接着追踪 [onCompiled 函数](https://github.com/webpack/webpack/blob/3a5fda909f2ecf911c73429cb4770948dbd31d24/lib/Compiler.js#L163)传入的 compilation 参数, 可以发现 compilation 来自构造函数 Compilation。

```js
// webpack/lib/Compiler.js
const Compilation = require("./Compilation");

newCompilation(params) {
  const compilation = new Compilation(this);
  ...
  return compilation;
}
```

### 不得不提的 tapable 库

再介绍完 compiler 对象和 compilation 对象后, 不得不提的是 [tapable](https://github.com/webpack/tapable) 这个库, 这个库暴露了所有和事件相关的 pub/sub 的方法。而且函数 [Compiler](https://github.com/webpack/webpack/blob/e7c8fa414b718ac98d94a96e2553faceabfbc92f/lib/Compiler.js#L29) 以及函数 [Compilation](https://github.com/webpack/webpack/blob/e7c8fa414b718ac98d94a96e2553faceabfbc92f/lib/Compilation.js#L98) 都继承自 Tapable。

### 事件钩子

事件钩子其实就是类似 MVVM 框架的生命周期函数, 在特定阶段能做特殊的逻辑处理。了解一些常见的事件钩子是写 webpack 插件的前置条件, 下面列举些常见的事件钩子以及作用:

| 钩子 | 作用 | 参数 | 类型 |
| :-: | :-: | :-: | :-: |
| after-plugins | 设置完一组初始化插件之后 | compiler | sync |
| after-resolvers | 设置完 resolvers 之后 | compiler | sync |
| run | 在读取记录之前 | compiler | async |
| compile | 在创建新 compilation 之前 | compilationParams | sync |
| compilation | compilation 创建完成 | compilation | sync |
| emit | 在生成资源并输出到目录之前 | compilation | async |
| after-emit | 在生成资源并输出到目录之后 | compilation | async |
| done | 完成编译 | stats | sync |

完整地请参阅[官方文档手册](https://doc.webpack-china.org/api/compiler/#%E4%BA%8B%E4%BB%B6%E9%92%A9%E5%AD%90), 同时浏览[相关源码](https://github.com/webpack/webpack/blob/eca7bad8de54c39b9cb8b138793362b8a17ac11b/lib/Compiler.js#L32) 也能比较清晰地看到各个事件钩子的定义。

### 插件流程浅析

拿 emit 钩子为例, 下面分析下插件调用源码:

```js
compiler.plugin('emit', (compilation, callback) => {
  // 在生成资源并输出到目录之前完成某些逻辑
})
```

此处调用的 plugin 函数源自上文提到的 tapable 库, 其最终调用栈指向了 hook.tapAsync(), 其作用类似于 EventEmitter 的 on, [源码](https://github.com/webpack/tapable/blob/42b520760e138c23e7808881cb4322557e878307/lib/Tapable.js#L35)如下:

```js
// Tapable.js
options => {
  ...
  if(hook !== undefined) {
    const tapOpt = {
      name: options.fn.name || "unnamed compat plugin",
      stage: options.stage || 0
    };
    if(options.async)
      hook.tapAsync(tapOpt, options.fn); // 将插件中异步钩子的回调函数注入
    else
      hook.tap(tapOpt, options.fn);
    return true;
  }
};
```

有注入必有触发的地方, 源码中通过 callAsync 方法触发之前注入的异步事件, callAsync 类似 EventEmitter 的 emit, [相关源码](https://github.com/webpack/webpack/blob/e7c8fa414b718ac98d94a96e2553faceabfbc92f/lib/Compiler.js#L307)如下:

```js
this.hooks.emit.callAsync(compilation, err => {
	if (err) return callback(err);
	outputPath = compilation.getPath(this.outputPath);
	this.outputFileSystem.mkdirp(outputPath, emitFiles);
});
```

一些深入细节这里就不展开了, 说下关于阅读比较大型项目的源码的两点体会,

* 要抓住一条主线索去读, 忽视细节。否则会浪费很多时间而且会有挫败感；

* 结合调试工具来分析, 很多点不用调试工具的话很容易顾此失彼；

### 动手实现个 webpack 插件

结合上述知识点的分析, 不难写出自己的 webpack 插件, 关键在于想法。为了统计项目中 webpack 各包的有效使用情况, 在 fork [webpack-visualizer](https://github.com/chrisbateman/webpack-visualizer) 的基础上对代码升级了一番, [项目地址](https://github.com/MuYunyun/analyze-webpack-plugin)。效果如下:

![](http://with.muyunyun.cn/329ec042a73aecd0a1947bdcc1f0dcb4.jpg-400)

插件核心代码正是基于上文提到的 emit 钩子, 以及 compiler 和 compilation 对象。代码如下:

```js
class AnalyzeWebpackPlugin {
  constructor(opts = { filename: 'analyze.html' }) {
    this.opts = opts
  }

  apply(compiler) {
    const self = this
    compiler.plugin("emit", function (compilation, callback) {
      let stats = compilation.getStats().toJson({ chunkModules: true }) // 获取各个模块的状态
      let stringifiedStats = JSON.stringify(stats)
      // 服务端渲染
      let html = `<!doctype html>
          <meta charset="UTF-8">
          <title>AnalyzeWebpackPlugin</title>
          <style>${cssString}</style>
          <div id="App"></div>
          <script>window.stats = ${stringifiedStats};</script>
          <script>${jsString}</script>
      `
      compilation.assets[`${self.opts.filename}`] = { // 生成文件路径
        source: () => html,
        size: () => html.length
      }
      callback()
    })
  }
}
```

### 参考资料

[看清楚真正的 Webpack 插件
](https://zoumiaojiang.com/article/what-is-real-webpack-plugin/#compiler)

[webpack 官网](https://doc.webpack-china.org/)