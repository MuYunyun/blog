Babel 是下一代 JavaScript 编译器。

### babel 执行机制

babel 执行三部曲如下:

* 解析

使用 [babel-parse](https://github.com/babel/babel/tree/master/packages/babel-parser) 将 JS 代码解析成 AST 树

* 转换

配合 [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse) 进行 AST 树的遍历, 同时使用 [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 对外暴露的 `transform` 来调用相应插件来转化 AST 树

```js
babal.transform(code, {
  plugins: { pluginA, pluginB }
})
```

* 生成

使用 [babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator) 将 AST 树转换回 JS 代码

#### 值得阅读的文章

* [babel 中文官网](https://www.babeljs.cn/)
* [剖析 Babel —— Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/), 这篇文章讲得比较透彻
* [babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md), babel 手册, 推荐
* [Babel 插件开发一些示例](http://web.jobbole.com/91277/), 这篇文章 bug 比较多, 可以作为上面文章的补充
* [AST explore](https://astexplorer.net/#/KJ8AjD6maa), 可以在这个网站上看到 JS 代码对应的 AST
* [@babel/types](https://babeljs.io/docs/en/next/babel-types.html), babel-types 可以用来生成转换相应的 babel 节点, 同时文案可以作为 api 来参考。