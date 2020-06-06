### 包下载的前置知识

一个包的版本号基本由三位数字构成 `x.x.x`, 它们分别是 Major(主版本号), Minor(次版本号), Patch(修订号)。

* `*`: 升级 `Major` + `Minor` + `Patch`;
* `^`: 升级 `Minor` + `Patch`;
* `~`: 升级 `Patch`;

比如 `^4.3.1 表示 4.x.x` 的最新版, `~4.3.1 表示 4.3.x` 的最新版

### npm

`npm` 经历了 3 次升级:

* `npm1`: 嵌套结构

缺点: 相同的包会被重复下载多次, 比如下列 a、b、c 都依赖了 xxx 这个包, xxx 这个包被下载了 3 次。

```text
-node-modules
  - a
    - node-modules
      - xxx @1.0.0
  - b
    - node-modules
      - xxx @1.0.0
  - c
    - node-modules
      - xxx @1.0.1
```

* `npm3`: 扁平结构

所依赖的包的依赖也安装于根目录, 如果所依赖的包的依赖在根目录已存在但是版本不一致, 则在所依赖的包下面单独加上依赖的包。例子如下:

```
-node-modules
- a
- b
- xxx @1.0.0
- c
  - node-modules
    - xxx @1.0.1
```

* `npm5`: 扁平结构 + package-lock.json

加上锁文件, 确保在不同电脑上安装的包的版本号相同。

### yarn

* 更快, 离线缓存
* yarn.lock 文件

#### yarn 和 npm5 的区别

##### 同

* `npm` 通过 `package-lock.json` 推断出 `node_modules` 目录
* `yarn` 也能通过 `yarn.lock` 文件推断出 `node_modules` 顶层目录的。就是要通过稍微计算, 比如下方:

```
// yarn 的 yarn.lock 类似如下
- a
- b
- c
  - xxx@1.0.1
- xxx@1.0.1
- xxx@1.0.0
```

这个例子中, 我们能得出顶层目录如下:

```
// node_modules
- a
- b
- c
- xxx@1.0.0
```

##### 异

* 依赖于 `yarn` 的缓存机制(类似 `cnpm` 的引用机制？), `yarn` 的安装速度更快, 甚至能离线加载；

也就是说 `yarn` 结合了 `npm` 和 `cnpm` 的优点。

### 写法

```
yarn add xx -D
```

-------------- 分割线 ---------------

### yarn 使用心得

在本地开发一个独立的包, 可以通过 `yarn link` 进行链接开发。

> yarn link 的包同时会注入到 node_modules 中

#### Hooks 踩坑

There are three common reasons you might be seeing it:

```js
1. You might have mismatching versions of React and React DOM.
2. You might be breaking the Rules of Hooks.
3. You might have more than one copy of React in the same app.
```

在 demo 项目中使用 yarn link "@msfe/beast-mobile" 会遇到上述报错, 解决方法是执行(貌似有问题)

```bash
npm link ../beast-mobile-demo/node_modules/react from @msfe/beast-mobile
```

另一种方法是在业务项目中配置 [resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)

### 区分几个 package.json 字段

* dependencies: 业务依赖
* devDependencies: 开发依赖
* pureDependencies: 在 dependencies 的基础上加上 warning, @桃夭表示使用 pureDependencies 业务只会打出一份包。而使用 dependencies 业务中如果有不同版本的依赖, 会打出多份包。

### 配置 yarn 全局路径

* 1. `yarn global dir` 得到 /Users/mac/.config/yarn/global
* 2. vim .zshrc
  * 2.1 加上 export NODE_PATH=/Users/mac/.config/yarn/global/node_modules/
* yarn add puppeteer -g
```