### 解读 IoC 框架 InversifyJS

InversityJS 是一个 IoC 框架。IoC(Inversion of Control) 译为控制反转，它包括依赖注入(Dependency Injection) 和依赖查询(Dependency Lookup)。

相比于类继承的方式，控制反转可以解耦了父类和子类的联系。

### InversifyJS 架构图

---- 此处插入相应图 ----

下面结合以下代码，代入架构图

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

#### 解析 inject

inject 源码简化如下：

```js
function inject(serviceIdentifier) {
  return function (target, targetKey) {
    const metadataValue = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    Reflect.defineMetadata('inversify:tagged_props', metadataValue, target.constructor);
  }
}
```

从 inject 的源码看到其只是结合属性装饰器对 `Reflect.defineMetadata()` 的一个使用(关于 Reflect.defineMetadata()，文末有解释)。在调用 `container.get()` 时，框架会在 inject() 相应的地方传入相应的实例(这是一个遍历的过程)。

#### injectable、Container

injectable 源码简化如下：

```js
function injectable() {
  return function (target) {
    const metadataValue = []
    Reflect.defineMetadata('inversify:paramtypes', metadataValue, target)
    return target
  }
}
```

Container 是 InversityJS 对外暴露的容器

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



<!-- #### inject 和 lazyInject 的区别 -->