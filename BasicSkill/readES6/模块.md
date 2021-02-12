### CommonJS 模块与 ES6 模块间的差异

#### 写法上的差异

CommonJS 中常见导出和引人写法如下:

```js
// 导出
module.exports = a

// 引人
const a = require('./xxx')
```

ES6 中常见导出和引人写法如下:

```js
// 导出
export default a          // 编译成 CommonJS: exports.default = a (ES 编译成的 CommonJS 形式)

// 引人
import a from './xxx'     // 编译成 CommonJS: require('./xxx').default

// 导出
export { a }              // 编译成 CommonJS: exports.a = a

// 引人
import { a } from './xxx' // 编译成 CommonJS: require('./xxx').a
```

#### 加载机制的差异

在 CommonJS 的模块中, require 是动态(运行时)加载的；在 ES6 的模块中, import 是静态(编译时)加载的。

> ES6 [import() 动态加载的提案](https://github.com/tc39/proposal-dynamic-import) 目前已到第 3 阶段。

> 另外如果是使用 TypeScript 的话, 编译成 JavaScript 的代码后再用上述结论。

#### 获取模块的差异

在 CommonJS 中, 获取的是一个`值/模块的拷贝`, 见如下例子:

```js
// test.js
let a = 1

function add() {
  a = 2
}

module.exports = { a, add }

// test2.js
const { a, add } = require('./test')

console.log(a)
add()
console.log(a)

// 执行 node test2.js, 输出结果为 1 1
```

在 ES6 中, 获取的是一个`值/模块的引用`, 见如下例子:

```js
// test.js
let a = 1

function add() {
  a = 2
}

export { a, add }

// index.html
import { a, add } from './index.js'

console.log(a)

add()

console.log(a)

// 在浏览器中输出结果为 1 2
```

### 同时支持 CJS 与 ESM 包的最佳实践

1. 提供一个 CJS 版本

这样可以确保你的库在旧版本 Node 下跑的更好。(如果你写的是 TypeScript 或者其他需要编译到 JavaScript 的语言，那么编译到 CJS。)

2. 基于 CJS 封装到 ESM 版本 (将 CJS 封装到 ESM 很容易，但是 ESM 库是没法封装到 CJS 库的)。

```js
import cjsModule from '../index.js';
export const foo = cjsModule.foo;
```

Todo: 调研为什么 CJS 封装为 ESM 容易, 但是反过来不行。