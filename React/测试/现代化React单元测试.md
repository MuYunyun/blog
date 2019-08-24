测试是一个风险驱动的行为。

> 每当你收到 Bug 报告, 先写一个单元测试来暴露这个 Bug。

### 测试用例

* jest: 大而全;
* mocha: 可搭配周边生态, 并且可测试布局像素等浏览器原生 DOM;

### 测试总类

* e2e 测试: 端到端测试，模拟用户在真实环境上(包括网络请求、数据库)操作行为的测试，其实 `jest`、`mocha` 都有相应 e2e 测试的 api。

### 测试风格

* BDD 风格: `foo.should.equal('bar')` 或者 `expect(foo).to.equal('bar')`;
* TDD 风格: `assert.equal(foo, 'bar', 'foo equal bar')`, diana 中的测试风格;

> 见 [Chai](https://www.chaijs.com/guide/styles/)

### Enzyme

封装了 React 相关测试 api 的一个工具库。

### 基于用户行为去测试

测试一个组件应该基于用户行为而不应基于组件的具体实现细节去测试。

测试组件的具体实现细节会带来两个问题:

1. 未来对组件进行重构时, 该测试用例可能会失败;(错误否定)
2. 即使代码中有 bug, 改测试用例也会通过;(错误肯定)

下面对这两个情形进行阐述。

- [ ] [testing-implementation-details](https://kentcdodds.com/blog/testing-implementation-details): 阅读到Let's take a look at each of these in turn
- [ ] [why-i-never-use-shallow-rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)

### 书写一个测试函数

test 函数:

```js
async function test(title, callback) {
  try {
    await callback();
    console.log(`✓ ${title}`);
  } catch (error) {
    console.error(`✕ ${title}`);
    console.error(error);
  }
}
```

expect 函数:

```js
function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`);
      }
    }
  };
}
```

应用:

```js
const sum = (a, b) => a + b;

test("sum adds numbers", async () => {
  const result = await sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});
```

### 静态测试

下面罗列一些配合静态测试的库

* eslint
* prettier

```
yarn add prettier -D
```

`prettier` 项目的全部文件

```
"scripts": {
  "format": "prettier --write \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|mdx|graphql|vue)\""
},
```

--list-diffetent: 列出需要 prettier 的列表

```js
"format": "npm run prettier -- --write",
"prettier": "prettier \"**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)\"",
"validate": "npm run lint && npm run prettier -- --list-different"
```

* `hawsky`: 内置大量可以配合 git 命令执行的钩子
* `lint-staged`: 把范围缩小为操作更改的文件

### mock 测试

#### mock 请求后端接口数据

当测试需要请求后端接口数据的 UI 组件(比如图片上传组件), 为了防止接口不稳定等影响到测试用例通过, 通常需要对请求后端接口数据进行 mock。

> 当需要测试接口返回的真实数据时可以对其进行集成测试。

```js
jest.spyOn(global, 'fetch').mockImplementation(() => {
  Promise.resolve({
    json: () => Promise.resolve(mockData)
  })
})
```

#### mock 模块/组件

如果存在对当前组件的测试影响不大的第三方模块, 可以将相关模块/组件进行 mock, 从而可以提高测试的效率。

```js
jest.mock('someComponent', () => {
  return (props) => {
    return <span>mock Component</span>
  }
})
```

#### mock 时间类 api

如果测试用例中遇到 `setTimeout(fn, 5000)` 真的等上 5s 后才执行 fn 测试效率是非常低效的, 因此可以使用 jest 提供的 `jest.useFakeTimers()` 来 mock 与时间有关的 api。

```js
jest.useFakeTimers();

// move ahead in time by 100ms
act(() => {
  jest.advanceTimersByTime(100);
});
```

### act

`act` 确保其函数里跟的单元方法(比如 rendering、用户事件、数据获取)在执行步骤 `make assertions` 之前已经全部执行完。

```js
act(() => {
  // render components
});
// make assertions
```

### 相关链接

* [Testing](https://reactjs.org/docs/testing-recipes.html)