### code-spiliting

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

此时调成慢速, 会发生什么呢? 可以看到获取的数据在不同时刻进行展现, 我们想要同时刻进行展现的话引入下个话题 —— data fetching

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

> 为什么只能在并发模式下做到?

回答: concurrent mode 给 `<Spin />` 的插入时机提供了更多的空间

> 演讲的顺序 data fetching 与 concurrent mode 与其正式发版的顺序会有不同

### 相关文章

* [Releasing Suspense](https://github.com/facebook/react/issues/13206)