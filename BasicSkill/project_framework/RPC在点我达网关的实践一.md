<!--
abbrlink: exzzjh9z
-->

### RPC 是什么

* RPC(Remote Procedure Call) 译为远端过程调用。即在一台机子上能调用到另外一台机子上的服务;
* RPC 可以基于 HTTP 调用也可以基于 TCP 调用。基于 TCP 调用性能更佳, 但是实现也更为复杂;
* RPC 通常要实现两部分协议, 一个是应用层协议(如 JSON), 一个是用来传输数据的通讯层协议(如 Dubbo);

### RPC 调用过程

1. 调用方通过本地网关调用相应服务;
2. 网关将服务名和参数封装为 RPC 对象传给客户端 RPC 框架(@dwd/noob-client);
3. 客户端 RPC 框架(@dwd/noob-client)将数据转化成二进制形式, 然后以 TCP 的形式传递给服务端 RPC 框架;
4. 服务端 RPC 框架将二进制数据反序列化为 RPC 对象, 并交由服务方处理, 服务端处理后返回结果;
5. 执行上述阶段的逆序操作;

> 关于 RPC 细节点, 可以阅读 [聊聊 Node.js RPC（一）— 协议](https://www.yuque.com/egg/nodejs/dklip5)

### 结合代码分析 Java 包的调用过程

#### 初始化阶段 —— RPC 调用之前

在项目刚启动阶段, 网关项目会通过 zk(路由管理系统) 进行路由寻址(寻找相应后端组的服务), 后续网关项目就能和相应的后端组的服务直接通讯了。

在初始化阶段, 网关项目会将项目信息、注册区域(异地多活)、所需服务等传递给 [@dwd/noob-client](http://192.168.1.66:9090/FE/noob-client), 相关代码如下:

```js
import { Client } from '@dwd/noob-client'

const client = new Client({
  application: {                // 项目信息
    name: config.name,
  },
  registry: config.registry,    // 注册区域
  reference: config.references, // 所需服务
  routerServer: { address: routerAddress },
})

return client.init().then(() => {
  for (const r of config.references) {
    loadService(r.id)
  }
})
```

#### 根据 xml 文件生成相关的包文件

在项目伊始时, 会通过后端给出的 xml 文件, 根据脚本生成相应包的 ts 文件。比如以下代码为骑手服务组的一个包的 ts 文件。

```ts
import { Reference } from '@dwd/noob'
import { provideService, javaType} from '../../util/dubbo'

@provideService('com.dianwoba.rider.elastic.provider.RiderElasticProvider')
export default class RiderElasticProvider implements com.dianwoba.rider.elastic.provider.RiderElasticProvider {

  constructor(private _ref: Reference<com.dianwoba.rider.elastic.provider.RiderElasticProvider> ) {}

  async pageSearch(@javaType({"name":"com.dianwoba.rider.elastic.domain.dto.param.RiderEsParamDTO","isPrimitive":false,"isArray":false,"isGeneric":false}) paramDTO: com.dianwoba.rider.elastic.domain.dto.param.RiderEsParamDTO) : Promise<com.dianwoba.dubbo.base.result.Pagination<com.dianwoba.rider.elastic.domain.dto.result.RiderEsDTO>> {
    return this._ref.invoke('pageSearch', Array.from(arguments))
  }

  ...
}
```

#### RiderElasticProvider 的实例化

网关的核心架构使用了 IoC 框架 [inverify](https://github.com/inversify/InversifyJS)。在 IoC 架构下, 实例化的过程在容器内进行。

在上述代码点开 `provideService` 方法, 可以看到实例化的过程 `new ServiceClass(reference)`, 代码如下:

```ts
// dubbo.ts
import { Client } from '@dwd/noob-client'

export const provideService = <T>(interfaceName: string) => (ServiceClass: interfaces.Newable<T>) => {
  const reference = Client.reference.get(interfaceName)                    // 获取远程引用资源
  const service = proxyService(new ServiceClass(reference), interfaceName) // 代理实例对象, 下文解析
  moduleBind<T>(interfaceName).toConstantValue(service)                    // 依赖注入
}
```

> `reference` 对象的 `__proto__` 属性上有 invoke 方法(继承自 @dwd/noob)

#### proxyService 代理

proxyService 方法的作用给包类的每个方法做了一层代理, 代理的具体作用是将传入参数和包名包装为 RPC 对象。

```ts
// dubbo.ts
function proxyService<T>(service:T, identifier: string) {
  let handler = {
    apply: function(target: Function, thisArgument: any, argumentsList: any[]) {
      let funcName = target.name
      // 获取前面代码 @javaType({}) 中声明的对象
      let paramTypes: JavaType[] = Reflect.getMetadata(JAVATYPE_SYMBOL, service, funcName)
      // 工厂模式创建转化为 RPC 对象的方法
      let transform = converter.methodParameterTransformerFactory(...paramTypes)
      // 将传入参数和包名转化为 RPC 对象
      let args = transform(argumentsList)
      return target.apply(thisArgument, args)
    }
  }
  Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => name !== 'constructor' && !name.startsWith('_')).forEach(methodName => {
    service[methodName] = new Proxy(service[methodName], handler) // 将原型链上 service[methodName] 赋值到 service[methodName] 上, 并用 handler 进行代理
  })
  return service
}
```

### 番外笔记

#### ts 的语法

```ts
class Test {
  constructor(private _ref) {}
}
```

ts 转换为 js 的形式如下

```js
function Test(_ref) {
  this._ref = _ref
}
```
