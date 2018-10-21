### 项目中的 global 对象

起先看到项目有大量用到使用 `global`，因为遗漏了 webpack 项目中是能使用 global 这个点，所以纠结了半天。

```js
(function(global) {

})(window)
```

### 浏览器竟然存在 global

开发/测试环境有 global 对象，线上环境没有 global 对象，应该是 core.js 这个库的版本不一致造成的。

在 `batman/node_modules/core-js/modules/_redefine.js` 这个包里进行了 `window.global` 的赋值操作;