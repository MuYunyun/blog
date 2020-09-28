### yarn 使用心得

```js
yarn add xx -D
```

在本地开发一个独立的包, 可以通过 `yarn link` 进行链接开发。

> yarn link 的包同时会注入到 node_modules 中

### 配置 yarn 全局路径

* 1. `yarn global dir` 得到 /Users/mac/.config/yarn/global
* 2. vim .zshrc
  * 2.1 加上 export NODE_PATH=/Users/mac/.config/yarn/global/node_modules/
* yarn add puppeteer -g
