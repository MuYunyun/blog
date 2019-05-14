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
  // 指定测试覆盖率需要需要达到的阈值
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      lines: 80,
      functions: 80,
    }
  }
  // 增强 watch 模式体验: $ npm install --save-dev jest-watch-typeahead
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ]
}
```

[jest-emotion](https://github.com/emotion-js/emotion): 如果 css 中具体样式发生改变也要重新跑 snapshot

### jest-dom

jest-dom 封装了测试 dom 的方法。报错的信息可以更加准确。

```
import 'jest-dom/extend-expect'
```

这样子就可以使用如下方法

```
expect(input).toHavaAttribute('type', 'number'): 是否有某个属性
expect(..).toHaveTextContent(): 是否有某个内容
```

### dom-test-library

dom-test-library 的优势。

* 增加了更多的操作, 比如根据 label 找对应的节点;
* 支持正则匹配;

```
import { queries } from 'dom-testing-library'
```

### react-test-library 的使用

react-test-library 在 dom-test-library 的基础上查找 React 组件。

```
import 'react-testing-library/clieanup-after-each' // 自动完成每次的回收
```

读到第 6 章。