<!--
abbrlink: bpp6dk6t
-->

### Usage

```js
yarn add xx -D
```

在本地开发一个独立的包, 可以通过 `yarn link` 进行链接开发。

> yarn link 的包同时会注入到 node_modules 中

### 配置 yarn 全局路径

* 1. `yarn global dir` 得到 `/Users/mac/.config/yarn/global`
  * 这个路径也是 yarn 全局包安装的文件目录
* 2. vim .zshrc
  * 2.1 加上 export NODE_PATH=/Users/mac/.config/yarn/global/node_modules/
* yarn add puppeteer -g

### bin

```js
yarn global bin // find yarn global bin path
npm bin -g      // find npm global bin path
```

yarn link xx, 就是将 bin 的命令挂载到 global 上。

```js
yarn link xx
```

### remove

```js
yarn remove xx
```

### yarn 和 npm5 的区别

#### 同

* `npm` 通过 `package-lock.json` 推断出 `node_modules` 目录
* `yarn` 也能通过 `yarn.lock` 文件推断出 `node_modules` 顶层目录的。就是要通过稍微计算, 比如下方:

```js
// yarn 的 yarn.lock 类似如下
- a
- b
- c
  - xxx@1.0.1
- xxx@1.0.1
- xxx@1.0.0
```

这个例子中, 我们能得出顶层目录如下:

```js
// node_modules
- a
- b
- c
- xxx@1.0.0
```

#### 异

* 依赖于 `yarn` 的缓存机制(类似 `cnpm` 的引用机制？), `yarn` 的安装速度更快, 甚至能离线加载;

也就是说 `yarn` 结合了 `npm` 和 `cnpm` 的优点。

### Hooks 踩坑

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

try [yalc](https://github.com/whitecolor/yalc)