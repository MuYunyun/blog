### lazy 为什么要在 Suspense 中使用

`Suspense` 首先提供了 `code-spiliting` 的功能

> 在这之前，code-spliting 通常是由第三方库来完成的，比如 [react-loadble](https://github.com/jamiebuilds/react-loadable)。目前阶段, 服务端渲染还是得使用 react-loadable。[React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)

### Data Fetching

下面放两段代码，可以从中直观地感受在 `Suspense` 中使用 `Data Fetching` 带来的便利。(该 [suspenseDemo](https://github.com/demos-platform/suspenseDemo) 源自 19 年 D2 上的分享)

* 一般进行数据获取的代码如下:

```js
export default class Demo extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    fetchAPI(`/api/demo/${this.props.id}`).then((data) => {
      this.setState({ data });
    });
  }

  render() {
    const { data } = this.state;

    if (data == null) {
      return <Spinner />;
    }

    const { name } = data;

    return (
      <div>{name}</div>
    );
  }
}
```

* 在 `Suspense` 中进行数据获取的代码如下:

```js
const resource = unstable_createResource((id) => {
  return fetchAPI(`/api/demo`)
})

function Demo {
  render() {
    const data = resource.read(this.props.id)

    const { name } = data;

    return (
      <div>{name}</div>
    );
  }
}
```

可以看到在 `Suspense` 中进行数据获取的代码量相比正常的进行数据获取的代码少了将近一半！少了哪些地方呢?

* 减少了 `loading` 状态的维护(在最外层的 Suspense 中统一维护子组件的 loading)
* 减少了不必要的生命周期的书写

### 总结: 如何在 Suspense 中使用 Data Fetching

当前 `Suspense` 的使用分为三个部分:

第一步: 用 `Suspens` 组件包裹子组件

```js
import { Suspense } from 'react'

<Suspense fallback={<Loading />}>
  <ChildComponent>
</Suspense>
```

第二步: 在子组件中使用 `unstable_createResource`:

```js
import { unstable_createResource } from 'react-cache'

const resource = unstable_createResource((id) => {
  return fetch(`/demo/${id}`)
})
```

第三步: 在 `Component` 中使用第一步创建的 `resource`:

```js
const data = resource.read('demo')
```

### 相关思路解读

来看下源码中 `unstable_createResource` 的部分会比较清晰:

```js
export function unstable_createResource(fetch, maybeHashInput) {
  const resource = {
    read(input) {
      ...
      const result = accessResult(resource, fetch, input, key);
      switch (result.status) {
        case Pending: {
          const suspender = result.value;
          throw suspender;
        }
        case Resolved: {
          const value = result.value;
          return value;
        }
        case Rejected: {
          const error = result.value;
          throw error;
        }
        default:
          // Should be unreachable
          return (undefined: any);
      }
    },
  };
  return resource;
}
```

结合该部分源码, 进行如下推测:

1. 第一次请求没有缓存, 子组件 `throw` 一个 `thenable` 对象, `Suspense` 组件内的 `componentDidCatch` 捕获之, 此时展示 `Loading` 组件;
2. 当 `Promise` 态的对象变为完成态后, 页面刷新此时 `resource.read()` 获取到相应完成态的值;
3. 之后如果相同参数的请求, 则走 `LRU` 缓存算法, 跳过 `Loading` 组件返回结果(缓存算法见后记);

官方作者是说法如下:

![](http://with.muyunyun.cn/22849313e0b8b19e833df9a9a59a8546.jpg-400)

所以说法大致相同, 下面实现一个简单版的 `Suspense`:

```jsx
class Suspense extends React.Component {
  state = {
    promise: null
  }

  componentDidCatch(e) {
    if (e instanceof Promise) {
      this.setState({
        promise: e
      }, () => {
        e.then(() => {
          this.setState({
            promise: null
          })
        })
      })
    }
  }

  render() {
    const { fallback, children } = this.props
    const { promise } = this.state
    return <>
      { promise ? fallback : children }
    </>
  }
}
```

进行如下调用

```jsx
<Suspense fallback={<div>loading...</div>}>
  <PromiseThrower />
</Suspense>

let cache = "";
let returnData = cache;
const fetch = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve("数据加载完毕");
    }, 2000);
  });

class PromiseThrower extends React.Component {
  getData = () => {
    const getData = fetch();

    getData.then(data => {
      returnData = data;
    });
    if (returnData === cache) {
      throw getData;
    }
    return returnData;
  };

  render() {
    return <>{this.getData()}</>;
  }
}
```

![](http://with.muyunyun.cn/90586c1edf33c7d143f2a3ec59667ab4.gif)

效果调试可以点击[这里](https://codesandbox.io/s/1zy82mm0j4), 在 `16.6` 版本之后, `componentDidCatch` 只能捕获 `commit phase` 的异常。所以在 `16.6` 版本之后实现的 `<PromiseThrower>` 又有一些差异(即将 `throw thenable` 移到 `componentDidMount` 中进行)。

### Suspense 在源码中的引用



### Suspense 与 hooks 结合

### 后记: 缓存算法

* `LRU` 算法: `Least Recently Used` 最近最少使用算法(根据时间);
* `LFU` 算法: `Least Frequently Used` 最近最少使用算法(根据次数);

> [漫画：什么是 LRU 算法](https://juejin.im/post/5c0392656fb9a049fb4366fa)

若数据的长度限定是 3, 访问顺序为 `set(2,2),set(1,1),get(2),get(1),get(2),set(3,3),set(4,4)`, 则根据 `LRU` 算法删除的是 `(3, 3)`, 根据 `LFU` 算法删除的是 `(1, 1)`。

`react-cache` 采用的是 `LRU` 算法。

### 相关文章

* [Releasing Suspense](https://github.com/facebook/react/issues/13206)
* [the suspense is killing redux](https://medium.com/@ryanflorence/the-suspense-is-killing-redux-e888f9692430):

- [ ] [React Suspense with the Fetch API](https://medium.com/swlh/react-suspense-with-the-fetch-api-cc655aced759): 这篇文章有待考量。


- [ ] [https://thoamsy.github.io/blogs/react-lazy/]