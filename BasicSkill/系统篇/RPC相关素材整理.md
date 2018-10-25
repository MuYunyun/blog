### RPC 是什么

* RPC(Remote Procedure Call) 译为远端过程调用。即在一台机子上能调用到另外一台机子上的服务;
* RPC 可以基于 HTTP 调用也可以基于 TCP 调用。基于 TCP 调用性能更佳，但是实现也更为复杂;
* RPC 通常要实现两部分协议，一个是应用层协议(如 JSON)，一个是用来传输数据的通讯层协议(如 Dubbo);

### RPC 调用过程

1. 调用方通过本地网关调用相应服务
2. 网关将服务名和参数封装为 RPC 对象传给客户端 RPC 框架(@dwd/noob-client)
3. 客户端 RPC 框架(@dwd/noob-client)将数据转化成二进制形式，然后以 TCP 的形式传递给服务端 RPC 框架
4. 服务端 RPC 框架将二进制数据反序列化为 RPC 对象，并交由服务方处理，服务端处理后返回结果
5. 执行上述阶段的逆序操作

### 初始化阶段 —— RPC 调用之前

即上述第 3 阶段之前，@dwd/noob-client 会与 zk(路由管理系统) 进行相应的连接，这个过程的作用是找寻对应后端组的服务。初始化完成后，后续按上述流程照常进行。

在初始化阶段，网关项目会将项目信息(application)、注册中心(registry)、远程引用(reference) 等传给 [@dwd/noob-client](http://192.168.1.66:9090/FE/noob-client)，使用代码如下：

```js
import { Client } from '@dwd/noob-client'

const client = new Client({
  application: {
    name: config.name,
  },
  registry: config.registry,
  reference: config.references,
  routerServer: { address: routerAddress },
})

return client.init().then(() => {
  for (const r of config.references) {
    loadService(r.id)
  }
})
```

### 分析包的调用过程

结合 `com.dianwoba.rider.elastic.provider.RiderElasticProvider` 这个包来分析下调用过程：

```ts
import { Reference } from '@dwd/noob'
import { Client } from '@dwd/noob-client'
import { provideService, javaType} from '../../util/dubbo'

@provideService('com.dianwoba.appversions.rpc.service.RPCAppUpdateConfigService')
export default class RiderElasticProvider implements com.dianwoba.rider.elastic.provider.RiderElasticProvider {

  constructor(private _ref: Reference<com.dianwoba.rider.elastic.provider.RiderElasticProvider> ) {}

  _setCityId(cityId: number) {
    // 异地多活相关，下回分析
  }

  async findById(@javaType({"name":"java.lang.Integer","isPrimitive":false,"isArray":false,"isGeneric":false}) id: number) : Promise<com.dianwoba.rider.elastic.domain.dto.result.RiderEsDTO> {
    return this._ref.invoke('findById', Array.from(arguments))
  }
}
```

一些阻碍阅读代码的点先记下后续整理：

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

#### RiderElasticProvider 的实例化

点开 `provideService` 方法, 代码如下：

```ts
// dubbo.ts
import { Client } from '@dwd/noob-client'

export const provideService = <T>(interfaceName: string) => (ServiceClass: interfaces.Newable<T>) => {
  const reference = Client.reference.get(interfaceName)                    // 获取远程引用资源
  const service = proxyService(new ServiceClass(reference), interfaceName)
  moduleBind<T>(interfaceName).toConstantValue(service) // [InversifyJS](https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md)，关于 inversify，后续后单独拿来研究。
}
```

可以看到实例化的过程 `new ServiceClass(reference)`

> `reference` 对象的 `__proto__` 属性上有 invoke 方法(继承自 @dwd/noob)

#### apply 的调用时机

```ts
// dubbo.ts
function proxyService<T>(service:T, identifier: string) {
  let handler = {
    apply: function(target: Function, thisArgument: any, argumentsList: any[]) {
        ...
      }
  }
  Object.getOwnPropertyNames(Object.getPrototypeOf(service)).filter(name => name !== 'constructor' && !name.startsWith('_')).forEach(methodName => {
    service[methodName] = new Proxy(service[methodName], handler)
  })
  return service
}
```

--- 未完待续 ---

### 聊聊 inverify 库

项目中的核心框架是使用了 [inverify](https://github.com/inversify/InversifyJS)(一个 ioC 模式的库)，后续会单独研究。

### 为什么要使用 js-to-java 进行参数的转化

### 为什么枚举值转化不了

### 相关链接

* [聊聊 Node.js RPC（一）— 协议](https://www.yuque.com/egg/nodejs/dklip5)