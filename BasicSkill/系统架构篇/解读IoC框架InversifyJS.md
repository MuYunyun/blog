### 解读 IoC 框架 InversifyJS

InversityJS 是一个 IoC 框架。IoC(Inversion of Control) 包括依赖注入(Dependency Injection) 和依赖查询(Dependency Lookup)。

相比于类继承的方式，控制反转解耦了父类和子类的联系。

### 案例解析

```ts
import 'reflect-metadata'
import { inject, injectable, Container } from 'inversify'

const container = new Container()

@injectable()
class PopMusic {
  getName() {
    return '流行音乐'
  }
}
container.bind('request1').to(PopMusic)

@injectable()
class ClassicalMusic {
  getName() {
    return '古典音乐'
  }
}
container.bind('request2').to(ClassicalMusic)

@injectable()
class Music {
  pm: any
  cm: any
  constructor(
    @inject('request1') popMusic: any,
    @inject('request2') classicalMusic: any) {
    this.pm = popMusic
    this.cm = classicalMusic
  }

  getName() {
    const result = this.pm.getName() + this.cm.getName()
    return result
  }
}
container.bind('Plan').to(Music)

const music: any = container.get('Plan')
console.log(music.getName()) // 流行音乐古典音乐
```

上述案例可以抽象为下图：

![](http://phrd9aiu0.bkt.clouddn.com/8a9ccba28d00ea0c752c3601d716ebcd.jpg-400)

> 虚线表示可以注入，但在代码中没有表现出来。

代码流程可概括如下：

1.将所有相关类(这里指 Music、popMusic、classicMusic) 通过 `@injectable` 声明进 `container` 容器;
2.通过 `container.get()` 获取 `container.bind().to(target)` 中的目标对象(这里指 Music);
3.如果目标对象中的 constructor() 里有 `@inject()`, 则将相应的实例(这里指 PopMusic 与 classicalMusic 的实例)当作构造函数的参数'注入';

### inject/injectable 相关源码

inject 源码简化如下：

```js
// 这是一个属性装饰器
function inject(serviceIdentifier) {
  return function (target, targetKey) {
    const metadataValue = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    Reflect.defineMetadata('inversify:tagged_props', metadataValue, target.constructor);
  }
}
```

injectable 源码简化如下：

```js
// 这是一个类装饰器
function injectable() {
  return function (target) {
    const metadataValue = []
    Reflect.defineMetadata('inversify:paramtypes', metadataValue, target)
    return target
  }
}
```

从简化版源码中可以看到 inject/injectable 最终是对 `Reflect.defineMetadata()` 的一个使用。可以将 metadata 看成是一种相对高效的数据结构。

#### reflect-metadata

InversityJS 深度结合了 [reflect-metadata](https://github.com/rbuckton/reflect-metadata), reflect-metadata 在 Reflect 基础上对其 api 进行了扩展。

> metadata 本质上是一个 `WeakMap` 对象。扩展：[Map 和 WeakMap 的区别](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/字典.md#map-和-weakmap-的区别)

`Reflect.defineMetadata(metadataKey, metadataValue, target[, propertyKey])` 简化版实现如下：

```js
const Metadata = new WeakMap()

function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
  metadataMap = new Map()
  metadataMap.set(metadataKey, metadataValue)
  targetMetadata = new Map()
  targetMetadata.set(propertyKey, metadataMap)
  Metadata.set(target, targetMetadata)
}
```

`Reflect.getOwnMetadata(metadataKey, target[, propertyKey])` 简化版实现如下：

```js
function getOwnMetadata(metadataKey, target, propertyKey) {
  var targetMetadata = Metadata.get(target)
  var metadataMap = targetMetadata.get(propertyKey)
  return metadataMap.get(metadataKey)
}
```

其数据结构可表示如下：

```js
WeakMap {
  target: Map {
    propertyKey: Map {
      metadataKey: metadataValue
    }
  }
}
```

### 相关文章

* [Architecture overview](https://github.com/inversify/InversifyJS/blob/master/wiki/architecture.md)