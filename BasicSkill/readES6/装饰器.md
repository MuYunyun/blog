随着 ES6 和 TypeScript 中类的引入, 在某些场景需要在不改变原有类和类属性的基础上扩展些功能, 这也是装饰器出现的原因。

<!--more-->

### 装饰器简介

作为一种可以动态增删功能模块的模式(比如 [redux 的中间件机制](https://github.com/MuYunyun/blog/issues/15)), 装饰器同样具有很强的动态灵活性, 只需在类或类属性之前加上 `@方法名` 就完成了相应的类或类方法功能的变化。

不过装饰器模式仍处于[第 2 阶段提案中](https://github.com/tc39/proposal-decorators), 使用它之前需要使用 babel 模块 `transform-decorators-legacy` 编译成 ES5 或 ES6。

在 TypeScript 的 [lib.es5.d.ts](https://github.com/Microsoft/TypeScript/blob/c48662c891ce810f5627a0f6a8594049cccceeb5/lib/lib.es5.d.ts#L1291) 中, 定义了 4 种不同装饰器的接口:

```ts
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
```

下面对装饰类以及装饰类方法进行解析。

### 作用于类的装饰器

当装饰的对象是类时, 我们操作的就是这个`类本身`。

```js
@log
class MyClass { }

function log(target) { // 这个 target 在这里就是 MyClass 这个类
   target.prototype.logger = () => `${target.name} 被调用`
}

const test = new MyClass()
test.logger() // MyClass 被调用
```

由于装饰器是表达式, 我们也可以在装饰器后面再添加提个参数:

```js
@log('hello')
class MyClass { }

function log(text) {
  return function(target) {
    target.prototype.logger = () => `${text}, ${target.name} 被调用`
  }
}

const test = new MyClass()
test.logger() // hello, MyClass 被调用
```

在使用 redux 中, 我们最常使用 react-redux 的写法如下:

```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyComponent extends React.Component {}
```

经过上述分析, 我们知道了上述写法等价于下面这种写法:

```js
class MyComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

### 作用于类方法的装饰器

与装饰类不同, 对类方法的装饰本质是操作其描述符。可以把此时的装饰器理解成是 `Object.defineProperty(obj, prop, descriptor)` 的语法糖, 看如下代码:

```js
class C {
  @readonly(false)
  method() { console.log('cat') }
}

function readonly(value) {
  return function (target, key, descriptor) { // 此处 target 为 C.prototype; key 为 method;
    // 原 descriptor 为: { value: f, enumarable: false, writable: true, configurable: true }
    descriptor.writable = value
    return descriptor
  }
}

const c = new C()
c.method = () => console.log('dog')

c.method() // cat
```

可以看到装饰器函数接收的三个参数与 Object.defineProperty 是完全一样的, 具体实现可以看 babel 转化后的代码, 主要实现如下所示:

```js
var C = (function() {
  class C {
    method() { console.log('cat') }
  }

  var temp
  temp = readonly(false)(C.prototype, 'method',
    temp = Object.getOwnPropertyDescriptor(C.prototype, 'method')) || temp // 通过 Object.getOwnPropertyDescriptor 获取到描述符传入到装饰器函数中

  if (temp) Object.defineProperty(C.prototype, 'method', temp)
  return C
})()
```

再将再来看看如果有多个装饰器作用于同一个方法上呢？

```js
class C {
  @readonly(false)
  @log
  method() { }
}
```

经 babel 转化后的代码如下:

```js
desc = [readonly(false), log]
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
```

可以清晰地看出, 经过 reverse 倒序后, 装饰器方法会至里向外执行。

### 相关链接

[javascript-decorators](https://github.com/wycats/javascript-decorators)
[Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html)
[JS 装饰器（Decorator）场景实战](https://juejin.im/post/59f1c484f265da431c6f8940)
[修饰器](http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0)
[Babel](http://babeljs.io)
