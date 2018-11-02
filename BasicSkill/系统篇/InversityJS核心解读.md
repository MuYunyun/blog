### InversityJS 核心解读

InversityJS 是一个 IoC 框架。IoC(Inversion of Control) 译为控制反转，它包括依赖注入(Dependency Injection) 和依赖查询(Dependency Lookup)。是面向对象编程的一种设计模式。

> 控制反转指的是将实例化的过程放到了类外部的容器中进行，在各个类里通过引用相应的类名（依赖查询）调用所需要的类。

#### 类继承 vs 对象组合

假设这样子的场景：Child 打电话给 Parent, Parent 回应 'Here I am'。编写代码如下：

```ts
class Parent {
  reply() {
    console.log('Here I am')
  }
}

class Child extends Parent {
  callParent() {
    this.reply()
  }
}

const child = new Child()
child.callParent() // Here I am
```

显而易见，用类继承的方式编写的代码子类和父类具有强耦合性。

下面用对象组合的方式(IoC) 重写上述代码。

```ts
// parent.ts
@injectable()
class Parent {
  reply() {
    return 'Here I am'
  }
}
container.bind('Parent').to(Parent)

// child.ts
@injectable()
class Child {
  constructor(@inject("Parent") parent: Parent) {
    this.parent = parent
  }

  callParent() {
    this.parent.reply()
  }
}
```

类与类之间进行解耦

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

> 1.在上述 demo 中，`serviceIdentifier` 为 Child，`target` 为 Parent，`targetKey` 为 child；2.关于 Reflect.defineMetadata()，后文有解释。

从 inject 的源码看到其只是结合属性装饰器对 `Reflect.defineMetadata()` 的一个使用，在调用 `container.getNamed()` 时，调用栈会使用用到 inject 注入的 metadataValue 对象。

<details>
<summary>相关调用栈</summary>

```js
=> // container/container.js
=> Container.prototype.getNamed()
=> Container.prototype.getTagged()
=> Container.prototype._get()
=> Container.prototype._planAndResolve()

=> // src/planning/planner.ts
=> plan()
=> _createSubRequests()

=> // reflection_utils.js
=> getDependencies()
=> getTargets()
=> getClassPropsAsTargets()

MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
  var userGeneratedMetadata = Reflect.getMetadata('inversify:tagged_props', constructorFunc) || []
  return userGeneratedMetadata
}
```
</details>

抛开调用栈细节，其实 inject 的本质作用是将 Child(serviceIdentifier) 的实例对象赋值给 child(targetKey)，效果与如下代码相同。

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

<!-- #### 标准形式的书写

调用阶段

```ts
@provideNamed(TYPE.Controller, 'MusicController')
class MusicController {}
```

```js

let provideNamed = function (identifier: any, name: string) {
  return fluentProvide(container)(identifier)
    .whenTargetNamed(name) // new ProvideWhenSyntax(bindingWhenOnSyntax, provideDoneSyntax).whenTargetNamed(name)
    .done()                // new ProvideInSyntax(bindingWhenOnSyntax, provideDoneSyntax).done()
}
```

```js
function fluentProvide(container) {
  // function is named for testing
  return function _fluentProvide(serviceIdentifier) {
    var bindingWhenOnSyntax = container.bind(serviceIdentifier).to(null);
    var binding = bindingWhenOnSyntax._binding;
    var provideDoneSyntax = new ProvideDoneSyntax(binding);
    var provideInWhenOnSyntax = new ProvideInWhenOnSyntax(new ProvideInSyntax(bindingWhenOnSyntax, provideDoneSyntax), new ProvideWhenSyntax(bindingWhenOnSyntax, provideDoneSyntax), new ProvideOnSyntax(bindingWhenOnSyntax, provideDoneSyntax));
    return provideInWhenOnSyntax;
  };
}
```

1. container.bind(serviceIdentifier).to(null);
2. container.bind(serviceIdentifier).to(null).whenTargetNamed(name)
3.

```js
import { decorate, injectable } from "inversify";
decorate(injectable(), target)
``` -->

<!-- #### inject 和 lazyInject 的区别 -->