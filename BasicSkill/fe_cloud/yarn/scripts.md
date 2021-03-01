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