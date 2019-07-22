### resolve.mainFields

在引用模块时，指明使用 package.json 中哪个字段指定的文件，默认是 main

```js
resolve: {
  // 配置 target === "web" 或者 target === "webworker" 时 mainFields 默认值是：
  mainFields: ['browser', 'module', 'main'],

  // target 的值为其他时，mainFields 默认值为：
  mainFields: ["module", "main"],
}
```

通常情况下，模块的 package 都不会声明 browser 或 module 字段，所以便是使用 main 了。
