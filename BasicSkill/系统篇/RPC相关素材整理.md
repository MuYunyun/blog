### RPC 是什么

* RPC(Remote Procedure Call) 译为远端过程调用。即在一台机子上能调用到另外一台机子上的服务;
* RPC 可以基于 HTTP 调用也可以基于 TCP 调用。基于 TCP 调用性能更佳，但是实现也更为复杂;
* RPC 通常要实现两部分协议，一个是应用层协议(如 JSON)，一个是用来传输数据的通讯层协议(如 Dubbo);

### RPC 调用过程

1. 调用方通过本地网关调用相应服务
2. 网关将服务名和参数封装为 RPC 对象传给客户端 RPC 框架
3. 客户端 RPC 框架(noob)将数据转化成二进制形式，然后以 TCP 的形式传递给服务端 RPC 框架
4. 服务端 RPC 框架将二进制数据反序列化为 RPC 对象，并交由服务方处理，服务端处理后返回结果
5. 执行上述阶段的逆序操作

在正式 RPC 调用过程之前，noob 会以(发布-订阅模式，待确认)与 zk(路由管理系统) 进行相应的连接，这个过程的作用是找寻对应后端组的服务。

### 当调用相关服务时，noob 是如何获得通知的

线索：在初始化阶段，网关会将 zk 地址(routerServer)，包名地址(reference)，注册地址(registry) 传递给 noob。见文件 `utils/dubbo.ts`。

```js
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

结合 `com.dianwoba.appversions.rpc.service.rpcappupdateconfigservice.ts` 这个文件来分析包的调用过程。

```ts
import { Reference } from '@dwd/noob'
import { Client } from '@dwd/noob-client'
import { provideService, javaType} from '../../util/dubbo'

@provideService('com.dianwoba.appversions.rpc.service.RPCAppUpdateConfigService')
export default class RPCAppUpdateConfigService implements com.dianwoba.appversions.rpc.service.RPCAppUpdateConfigService {

    constructor(private _ref: Reference<com.dianwoba.appversions.rpc.service.RPCAppUpdateConfigService> ) {}

    _setCityId(cityId: number) {
      // 异地多活相关，下回分析
    }

    async selectOne(@javaType({"name":"java.lang.String","isPrimitive":false,"isArray":false,"isGeneric":false}) appCode: string, @javaType({"name":"java.lang.String","isPrimitive":false,"isArray":false,"isGeneric":false}) clientPlatform: string) : Promise<com.dianwoba.appversions.codec.Response<com.dianwoba.appversions.model.AppUpdateConfig>> {
        return this._ref.invoke('selectOne', Array.from(arguments))
    }
}
```

一些阻碍阅读代码的点先记下后续整理：

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

-------------- 什么地方 new RPCAppUpdateConfigService() 的 --------------

### 为什么要使用 js-to-java 进行参数的转化

### 为什么枚举值转化不了

### 相关链接

* [聊聊 Node.js RPC（一）— 协议](https://www.yuque.com/egg/nodejs/dklip5)