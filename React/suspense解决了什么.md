### 初版

场景: 发送 `ajax` 请求, 数据未返回显示 `loading`, 数据返回显示数据。

* 请求接口实现 `loading` 组件，需手动控制显示/隐藏

### eagar-loading -> lazy-loading

`Suspense` 首先提供了 `code-spiliting` 的功能

> 在这之前，code-spliting 通常是由第三方库来完成的，比如 [react-loadble](https://github.com/jamiebuilds/react-loadable)。目前阶段, 服务端渲染还是得使用 react-loadable。[React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy)

```js
import React, { Suspense, lazy } from 'react';
import { Router } from "@reach/router";
import Spinner from './Spinner'

const Albums = lazy(() => import('./Albums'))
const Voting = lazy(() => import('./Voting'))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Profile path="/" />
        <Albums path="albums" />
        <Voting path="voting" />
      </Router>
    </Suspense>
  );
}

export default App;
```

此时调成慢速, 会发生什么呢? 可以看到获取的数据在不同时刻进行展现, 我们想要同时刻进行展现的话引入下个话题 —— `data fetching`

### data fetching

`unstable_createResource` 这个 `api` 目前还不稳定。持续跟进中。

```js
import React from 'react';
import { unstable_createResource } from 'react-cache';

import fetchAPI from './fetchAPI';

const profileResource = unstable_createResource((item) => {
  return fetchAPI(`/profile/${item}`);
});

function Profile() {
  const profilePicture = profileResource.read('photo');
  const intro = profileResource.read('intro');

  return (
    <>
      <div className="profile-picture">
        <img src={profilePicture} alt="IloveColdplay" />
      </div>
      <div className="profile-intro">
        {intro.split('\n').map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </>
  );
}

export default Profile;
```

演示完 `data fetching` 后，刷新页面看到一直有个刷新的 `<Spin />` 组件, 为了更好的交互, 我们可以做什么

### concurrent mode

在并发模式下, 如果资源加载的时间小于设定的阈值, 则可以控制 `<Spin />` 不显示, 否则显示 `<Spin />`

使用方法: 在 `Suspense` 后加上属性 `maxDuration`

```js
<Suspense maxDuration={500} fallback={<Spinner />}>
  // ...
</Suspense>
```

同时开启 `concurrent mode` 模式

```js
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

> 为什么只能在并发模式下做到? 这个地方还要继续探究下

回答: concurrent mode 给 `<Spin />` 的插入时机提供了更多的空间

> 演讲的顺序 data fetching 与 concurrent mode 与其正式发版的顺序会有不同

### Suspense —— data fetching 实现

* 使用方式

```js
<Suspense fallback={<div>loading...</div>}>
  <ThrowComponent />
</Suspense>
```

* 初版实现: `componentDidCatch`

```jsx
class Suspense extends React.Component {
  state = {
    loading: false
  }

  componentDidCatch() {
    this.setState({
      loading: true
    })
  }

  render() {
    const { fallback, children } = this.props
    const { loading } = this.state
    return <>
      { loading ? fallback : children }
    </>
  }
}
```

`ThrowComponent` 里的逻辑通常是 `Promise`, 再次进行封装。

> 阅读到 It’s important to note here that the original children attempted to render before the fallback occurred.

### 相关文章

* [Releasing Suspense](https://github.com/facebook/react/issues/13206)

- [ ] [the suspense is killing redux](https://medium.com/@ryanflorence/the-suspense-is-killing-redux-e888f9692430)
- [ ] [React Suspense with the Fetch API](https://medium.com/swlh/react-suspense-with-the-fetch-api-cc655aced759)