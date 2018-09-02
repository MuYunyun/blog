### Reflect

Reflect 是 ES6 新引人的特性，其目的是把一些 JavaScript 特有的属性 api 抽离出来。其有如下优点：

* 返回值更加合理

```js
var obj = {}

// 在 obj 中定义 a 属性
Object.defineProperty(obj, 'a', {
  value: 2
})

// 使用 Object.defineProperty 在 obj 中重复定义 a 属性就会抛错
try {
  Object.defineProperty(obj, 'a', { value: 3 })
} catch(e) {
  console.log(e) // Uncaught TypeError: Cannot redefine property: a
}

// 使用 Reflect.defineProperty 在 obj 中重复定义 a 属性则是返回 false
if (Reflect.defineProperty(obj, 'a', { value: 3 })) {
  console.log('属性添加成功')
}
```

* 将一些对象属性的操作判断统一为函数操作。

比如 `props in Obj` 现在可写成 `Reflect.hasOwnProperty(Obj, props)`，又比如 `delete Obj[props]` 现在可写成 `Reflect.deleteProperty(Obj, props)`

* 与 [Proxy Handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler#Methods) 方法参数同步