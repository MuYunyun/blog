### Inversity 库源码解读与实践

#### 标准形式的书写

不用 inversify-binding-decorators 这个库的书写形式

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
```

### injectable、inject、container

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
  @inject('Child') // 依赖查询
  child: Child

  callChild() {
    const result = this.child.reply()
    return result
  }
}

// child.ts
@injectable() // 依赖注入
class Child {
  reply() {
    return 'Here I am'
  }
}

container.bind('Child').to(Child)
```

### inject

```js
class MusicController {
  @inject('MusicManager')
  musicManager: MusicManager
}
```

inject 源码如下：

```js
function inject(serviceIdentifier) {
  return function (target, targetKey) {
    const propertiesMetadata = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    Reflect.defineMetadata('inversify:tagged_props', propertiesMetadata, target.constructor);
  }
}
```

> 在上述 demo 中，`targetKey` 为 musicManager，`serviceIdentifier` 为 MusicManager

```js
// 何时获取 metadata_reader.js
MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
  var userGeneratedMetadata = Reflect.getMetadata('inversify:tagged_props', constructorFunc) || []
  return userGeneratedMetadata
}

=> // reflection_utils.js
=> getClassPropsAsTargets()
=> getTargets()
=> getDependencies()

=> // src/planning/planner.ts
=> _createSubRequests()
=> plan()

=> // container/container.js
=> Container.prototype._planAndResolve()
=> Container.prototype._get()
=> Container.prototype.getTagged()
=> Container.prototype.getNamed()

=> // server.ts
handlerFactory() // this._container.getNamed(TYPE.Controller, controllerName) 找到答案
```

### 依赖注入

```js
@injectable()
export default class MusicManager {
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
    Reflect.defineMetadata('inversify:paramtypes', [], target)
    return target
  }
}
```

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

### reflect-metadata

reflect-metadata 对 Reflect api 进行了补充。

[reflect-metadata](https://github.com/rbuckton/reflect-metadata)

```js
Reflect.defineMetadata(metadataKey, metadataValue, target)
let result = Reflect.getOwnMetadata(metadataKey, target)
```

用代码来解释下这种数据结构：

```js
const obj = {}

obj['metadata'] = {
  customProperty1: {
    property: 'someValue'
  }
}

Object.prototype.defineMetadata = function(metadataKey, metadataValue, target, key) {
  this['metadata'][metadataKey] = {key: metadataValue};
}
```

```js
function defineMetadata(metadataKey, metadataValue, target) {
  return function OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined) {
    var metadataMap = GetOrCreateMetadataMap(target, undefined, true);
    metadataMap.set(MetadataKey, MetadataValue);
  }
```

未完待续，继续探索 metadata 代码

<!-- #### inject 和 lazyInject 的区别 -->