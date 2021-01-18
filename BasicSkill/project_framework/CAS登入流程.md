本文对 CAS(Central Authentication Service) 流程作个梳理。

### 什么是 CAS

中央认证服务([CAS](https://github.com/apereo/cas))是是单点登录(SSO)的一种方案。使用它后所有应用可以公用一套登录系统, 在任意一个应用中进行登录后, 其它应用便无须再次登录。

CAS 分为 CAS Client 和 CAS Server, 它们分工如下:

CAS Client: 处理对受保护方应用的访问请求 (可以理解成网关项目);
CAS Server: 处理账号、密码的认证, 需要独立部署 (部署在后端那边);

### 以 Batman 系统为例剖析登录 CAS 系统的流程

下面以 Batman 为例对 CAS(Central Authentication Service) 流程作个梳理。

![](http://with.muyunyun.cn/89fccb6391b0697815078d6f725dc124.jpg)

1. 在浏览器中输入 batman.dianwoda.cn;
2. 如果没有登录(session 里没有相应信息), 则重定向到 `https://cas.nidianwo.com/login?service=http%3A%2F%2Fbatman.dianwoda.cn%2F`;
3. 输入账号密码进行认证;
4. CAS Server 下发 ticket;
5. 校验 ticket;
6. 校验通过, 重定向回 batman.dianwoda.cn;

> 登录了 batman 以后, 再在浏览器输入 http://newhawkeye.dianwoda.com 不用再次登录的原因？

在 CAS Server 中进行了判断, 如果已经登录过, 则省略了步骤 3。

> 在 batman 登录了 CAS 系统以后, 为什么还要 `fetch https://cas.nidianwo.com/login?service=http://batman-gateway.dianwoda.com/auth/cas`

应该是网关的搭建原因。batman 的 CAS Client 在后端那里, batman-gateway 作为一个 node 项目相当于又作为了一个 CAS Client。在已经登录 CAS 的基础上, 访问 `https://cas.nidianwo.com/login?service=http://batman-gateway.dianwoda.com/auth/cas` 相当于执行上图的 2、4、5 步骤(省略了步骤 3)

### 相关链接

* [CAS 实现 SSO 单点登录原理](https://blog.csdn.net/cruise_h/article/details/51013597)