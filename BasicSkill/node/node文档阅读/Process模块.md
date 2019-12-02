### Process

Process 模块继承自 eventEmitter 模块。

#### Event: exit

监听:

```js
process.on('exit', (code) => {
  ...
})
```

> 注意的是 process.on() 中第二个参数必须是同步函数;

触发时机:

1. 调用 `process.exit()`;
2. Node.js 事件循环中不再有额外的工作要执行;


to read: Signal Events