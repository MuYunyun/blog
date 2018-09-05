### babel 执行机制

babel 执行三部曲如下:

* 解析

使用 [babel-parse](https://github.com/babel/babel/tree/master/packages/babel-parser) 将 JS 代码解析成 AST 树

* 转换

配合 [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse) 进行 AST 树的遍历，同时使用 [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) 对外暴露的 `transform` 来调用相应插件来转化 AT 树

```
babal.transform(code, {
  plugins: { pluginA, pluginB }
})
```

* 生成

使用 [babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator) 将 AST 树转换回 JS 代码