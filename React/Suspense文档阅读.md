### Suspense 设计模式

* `fetch on render`: 目前一般数据获取写在 componentDidMount 阶段, 其获取数据的过程中, 执行顺序如下所示:

1. start fetchA
2. ...`wait Time1`...
3. finish fetchA
4. start fetchB
5. ...`wait Time2`...
6. finish fetchB

这么做存在的问题: 在 B 组件中开始请求数据时至少要等上 `Time1` 时间, 是一种 `network waterfall` 而非`并发请求`;

* `fetch then render`: `调用 setState 之前先获取数据`, 比如在 A 组件的 componentDidMount 中使用 `Promise.all()` 同时执行 `fetchA, fetchB`

1. start fetchA
2. start fetchB
3. finish fetchA
4. finish fetchB
5. `render`

这么做存在的问题: A 组件和 B 组件上的数据显示时间取决于请求时间更长的接口, 所以`页面上渲染数据必然会存在延时`;

* `render as fetch`: 使用 Suspense 后的效果呢?

1. start fetchA
2. start fetchB
3. `render`
4. finish fetchA
5. finish fetchB

它很好地规避了上述遇到的两个问题:

1. 解决接口根据 render 走导致`不能并发请求接口`的痛点;
2. 解决使用 Promise.all 带来的`页面数据内容存在延时`的问题;

to read: When we click the “Next” button to switch the active profile,

