### babel 执行机制

babel 执行三部曲如下。

* 解析，使用 [babel-parse](https://github.com/babel/babel/tree/master/packages/babel-parser)
* 转换，使用 [babel-traverse](https://github.com/babel/babel/tree/master/packages/babel-traverse)
* 生成，使用 [babel-generator](https://github.com/babel/babel/tree/master/packages/babel-generator)