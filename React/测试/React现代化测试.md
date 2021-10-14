<!--
abbrlink: xghy9857
-->

### 测试的动机

测试用例的书写是一个风险驱动的行为, 每当收到 Bug 报告时, 先写一个单元测试来暴露这个 Bug, 在日后的代码提交中, 若该测试用例是通过的, 开发者就能更为自信地确保程序不会再次出现此 bug。

> 测试的动机是有效地提高开发者的自信心。

### 前端现代化测试模型

前端测试中有两种模型, `金字塔模型`与`奖杯模型`。

金字塔模型摘自 [Martin Fowler's blog](https://martinfowler.com/bliki/TestPyramid.html), 模型示意图如下:

![](http://with.muyunyun.cn/d97821c98ca86b161ac650198e6b44fd.jpg-300)

金字塔模型自下而上分为单元测试、集成测试、UI 测试, 之所以是金字塔结构是因为单元测试的成本最低, 与之相对, UI 测试的成本最高。所以单元测试写的数量最多, UI 测试写的数量最少。同时需注意的是越是上层的测试, 其通过率给开发者带来的信心是越大的。

奖杯模型摘自 Kent C. Dodds 提出的 [The Testing Trophy](https://twitter.com/kentcdodds/status/960723172591992832?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E960723172591992832&ref_url=https%3A%2F%2Fkentcdodds.com%2Fblog%2Fwrite-tests), 该模型是笔者比较认可的前端现代化测试模型, 模型示意图如下:

![](http://with.muyunyun.cn/0453d50194dfa1cbf7a4aeb70252c438.jpg-300)

奖杯模型中自下而上分为静态测试、单元测试、集成测试、e2e 测试, 它们的职责大致如下:

* `静态测试`: 在编写代码逻辑阶段时进行报错提示。(代表库: eslint、flow、TypeScript)
* `单元测试`: 在奖杯模型中, 单元测试的职责是对一些边界情况或者特定的算法进行测试。(代表库: [jest](https://github.com/facebook/jest)、[mocha](https://github.com/mochajs/mocha))
* `集成测试`: 模拟用户的行为进行测试, 对网络请求、获取数据库的数据等依赖第三方环境的行为进行 mock。(代表库: [jest](https://github.com/facebook/jest)、[react-testing-library](https://github.com/testing-library/react-testing-library))
* `e2e 测试`: 模拟用户在真实环境上操作行为(包括网络请求、获取数据库数据等)的测试。(代表库: [cypress](https://github.com/cypress-io/cypress))

越是上层的测试给开发者带来的自信是越大的, 与此同时, 越是下层的测试测试的效率是越高的。奖杯模型综合考虑了这两点因素, 可以看到其在集成测试中的占比是最高的。

### 基于用户行为去测试

书写测试用例是为了提高开发者对程序的自信心的, 但是很多时候书写测试用例给开发者带来了觉得在做无用功的沮丧。导致沮丧的感觉出现往往是因为开发者对组件的具体实现细节进行了测试, 如果换个角度站在用户的行为上进行测试则能极大提高测试效率。

测试组件的具体细节会带来的两个问题:

1. 测试用例对代码`错误否定`;
2. 测试用例对代码`错误肯定`;

以`轮播图组件`为例, 依次来看上述问题。轮播图组件伪代码如下:

```js
class Carousel extends React.Component {
  state = {
    index: 0
  }

  /* 跳转到指定的页数 */
  jump = (to: number) => {
    this.setState({
      index: to
    })
  }

  render() {
    const { index } = this.state
    return <>
      <Swipe currentPage={index} />
      <button onClick={() => this.jump(index + 1)}>下一页</button>
      <span>`当前位于第${index}页`</span>
    </>
  }
}
```

如下是基于 `enzyme` 的 api 写的测试用例:

```js
import { mount } from 'enzyme'

describe('Carousel Test', () => {
  it('test jump', () => {
    const wrapper = mount(<Carousel>
      <div>第一页</div>
      <div>第二页</div>
      <div>第三页</div>
    </Carousel>)

    expect(wrapper.state('index')).toBe(0)
    wrapper.instance().jump(2)
    expect((wrapper.state('index')).toBe(2)
  })
})
```

恭喜, 测试通过✅。某一天开发者觉得 `index` 的命名不妥, 对其重构将 `index` 更名为 `currentPage`, 此时代码如下:

```js
class Carousel extends React.Component {
  state = {
    currentPage: 0
  }

  /* 跳转到指定的页数 */
  jump = (to: number) => {
    this.setState({
      currentPage: to
    })
  }

  render() {
    const { currentPage } = this.state
    return <>
      <Swipe currentPage={currentPage} />
      <button onClick={() => this.jump(currentPage + 1)}>下一页</button>
      <span>`当前位于第${currentPage}页`</span>
    </>
  }
}
```

再次跑测试用例, 此时在 `expect(wrapper.state('index')).toBe(0)` 的地方抛出了错误❌, 这就是所谓的测试用例对代码进行了`错误否定`。因为这段代码对于使用方来说是不存在问题的, 但是测试用例却抛出错误, 此时开发者不得不做'无用功'来调整测试用例适配新代码。调整后的测试用例如下:

```diff
describe('Carousel Test', () => {
  it('test jump', () => {
    ...

-   expect(wrapper.state('index')).toBe(0)
+   expect(wrapper.state('currentPage')).toBe(0)
    wrapper.instance().jump(2)
-   expect((wrapper.state('index')).toBe(2)
+   expect((wrapper.state('currentPage')).toBe(2)
  })
})
```

然后在某一天粗心的小明同学对代码做了以下改动:

```diff
class Carousel extends React.Component {
  state = {
    currentPage: 0
  }

  /* 跳转到指定的页数 */
  jump = (to: number) => {
    this.setState({
      currentPage: to
    })
  }

  render() {
    const { currentPage } = this.state
    return <>
      <Swipe currentPage={currentPage} />
-     <button onClick={() => this.jump(currentPage + 1)}>下一页</button>
+     <button onClick={this.jump(currentPage + 1)}>下一页</button>
      <span>`当前位于第${index}页`</span>
    </>
  }
}
```

小明同学跑了上述单测, 测试通过✅, 于是开心地提交了代码。结果上线后线上出现了问题! 这就是所谓测试用例对代码进行了`错误肯定`。因为测试用例测试了组件内部细节(此处为 `jump` 函数), 让小明误以为已经覆盖了全部场景。

测试用例`错误否定`以及`错误肯定`都给开发者带来了挫败感与困扰, 究其原因是测试了组件内部的具体细节所至。而一个稳定可靠的测试用例应该脱离组件内部的实现细节, 越接近用户行为的测试用例能给开发者带来越充足的自信。相较于 enzyme, [react-testing-library](https://github.com/testing-library/react-testing-library) 所提供的 api 更加贴近用户的使用行为, 使用其对上述测试用例进行重构:

```js
import { render, fireEvent } from '@testing-library/react'

describe('Carousel Test', () => {
  it('test jump', () => {
    const { getByText } = render(<Carousel>
      <div>第一页</div>
      <div>第二页</div>
      <div>第三页</div>
    </Carousel>)

    expect(getByText(/当前位于第一页/)).toBeInTheDocument()
    fireEvent.click(getByText(/下一页/))
    expect(getByText(/当前位于第一页/)).not.toBeInTheDocument()
    expect(getByText(/当前位于第二页/)).toBeInTheDocument()
  })
})
```

关于 `react-testing-Library` 的用法总结将在下一章节 [Jest 与 react-testing-Library](https://github.com/MuYunyun/blog/blob/master/React/测试/Jest与ReactTestingLibrary.md) 具体介绍。如果对 React 技术栈感兴趣, 欢迎关注[个人博客](https://github.com/MuYunyun/blog)。

### 相关链接

* [write-tests](https://kentcdodds.com/blog/write-tests)
* [Testing](https://reactjs.org/docs/testing-recipes.html)
* [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
* [why-i-never-use-shallow-rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering)
* [react-testing-1-best-practices](https://blog.sapegin.me/all/react-testing-1-best-practices/)