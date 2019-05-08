### 一些配置

`jest.config.js` 的一些常见配置属性如下:

```js
module.exports = {
  // 可以指定测试环境
  testEnviroment: 'jest-environment-node' | 'jest-enviroment-jsdom',
  // 指定模块加载目录
  moduleDirectories: ['node_modules', path.join(__dirname, 'src'), 'shared']
  // identity-obj-proxy 支持在 jest 中引入 css, 同时支持 css 的模块化
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  // before jest is loaded(不依赖 jest)
  setupFiles: []
  // after jest is loaded(依赖 jest)
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js')
  // 测试覆盖率收集目录
  collectCoverageFrom: ['src/**/*.js']
}
```

[jest-emotion](https://github.com/emotion-js/emotion): 如果 css 中具体样式发生改变也要重新跑 snapshot

视频阅读到第 15 章。