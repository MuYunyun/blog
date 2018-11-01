### InversityJS 源码解读与实践

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

用法示意：

```js
// defineMetadata
function Parents() {}
const arr = []
Reflect.defineMetadata('test', arr, Parents)

// getOwnMetadata
Reflect.getOwnMetadata('test', Parents) // []
```

#### 场景代入

假设这样子的场景：Parent 打电话给 Child, Child 回应 'Here I am'。编写代码如下：

```ts
// parent.ts
class Parent {
  callChild() {
    const child = new Child()
    const result = child.reply()
    return result
  }
}

// child.ts
class Child {
  reply() {
    return 'Here I am'
  }
}

const parent = new Parent()
parent.callChild() // Here I am
```

可以看到上面这种做法需要手动的调用 new 来创建实例。而下面介绍的 IoC 思想则可以在容器内帮我们完成实例的创建，我们需要做的只是依赖注入以及依赖查询。

```ts
// parent.ts
class Parent {
  @inject('Child')
  child: any

  callChild() {
    const result = this.child.reply()
    return result
  }
}

// child.ts
@injectable()
class Child {
  reply() {
    return 'Here I am'
  }
}

container.bind('Child').to(Child)
```

#### inject

`inject` 的作用是向容器内注入相应的 `metadataValue` (注入过程框架完成)。

```js
class Parent {
  @inject('Child')
  child: any
}
```

inject 源码如下：

```js
function inject(serviceIdentifier) {
  return function (target, targetKey) {
    const metadataValue = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    Reflect.defineMetadata('inversify:tagged_props', metadataValue, target.constructor);
  }
}
```

> 在上述 demo 中，`serviceIdentifier` 为 Child，`target` 为 Parent，`targetKey` 为 child

在调用 `container.getNamed(TYPE.Controller, controllerName)` 时，最终会运用到 inject 注入的 metadataValue 对象。这之间调用栈做的事：找到与 serviceIdentifier 同名的实例对象，并将该实例对象赋值给 targetKey。

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

#### injectable、Container

```js
@injectable()
export default class Child {
  public async getList(title: string) {
    return [{ title: '卡路里（电影《西虹市首富》插曲）', author: '火箭少女101', country: '内地', language: '国语' }]
  }
}

container.bind('MusicManager').to(MusicManager)
```

injectable 源码如下：

```js
function injectable() {
  return function (target) {
    const metadataValue = []
    Reflect.defineMetadata('inversify:paramtypes', metadataValue, target)
    return target
  }
}
```

----- 补充 ----- injectable 思想，为什么要使用 injectable()，晚上分析。

Container 是 InversityJS 对外暴露的容器，

来看 `container.bind('MusicManager').to(MusicManager)` 这语句，首先 bind 的作用是在将标志符添加到字典中，代码如下：

```js
Container.prototype.bind = function (serviceIdentifier) {
  var binding = new binding_1.Binding(serviceIdentifier, 'Transient')
  this._bindingDictionary.add(serviceIdentifier, binding) // 字典
  return new binding_to_syntax_1.BindingToSyntax(binding)
}
```

to 的作用是将 type 和 implementationType 赋给 _binding 对象。

```js
BindingToSyntax.prototype.to = function (constructor) {
  this._binding.type = "Instance"
  this._binding.implementationType = constructor // MusicManager
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