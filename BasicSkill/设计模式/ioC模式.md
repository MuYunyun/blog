### IoC 模式

IoC(Inversion of Control) 译为控制反转，它包括依赖注入(Dependency Injection) 和依赖查询(Dependency Lookup)。是面向对象编程的一种设计模式。

> 控制反转指的是将实例化的过程放到了类外部的容器中进行，在各个类里通过引用相应的类名（依赖查询）调用所需要的类。

### Inversity 库的使用实现探究

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

### inject() 分析：

```js
@inject('MusicManager')
musicManager: MusicManager
```

```js
function inject(serviceIdentifier) {
  return function (target, targetKey) {
    const propertiesMetadata = { [targetKey]: [Metadata { key: 'inject', value: serviceIdentifier })] }
    Reflect.defineMetadata('inversify:tagged_props', propertiesMetadata, target.constructor);
  }
}
```

<!-- ```js
function inject(serviceIdentifier) {
  return function (target, targetKey, index) {
    const propertiesMetadata = { musicManager: [Metadata { key: 'inject', value: 'MusicManager' }] }
    Reflect.defineMetadata('inversify:tagged_props', propertiesMetadata, target.constructor);
  }
}
``` -->

### injectable()

```js
function injectable() {
  return function (target) {
    Reflect.defineMetadata('inversify:paramtypes', [], target)
    return target
  }
}
```

### container.bind('MusicManager').to(MusicManager)


#### inject 和 lazyInject 的区别


### 坑点：关于字符请求

Content-Type: application/json      会将类型传到网关
Content-Type: x-www-form-urlencoded 变成相应字符串
