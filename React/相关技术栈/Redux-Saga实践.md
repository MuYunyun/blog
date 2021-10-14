<!--
abbrlink: iyizcnh2
-->

来看为什么有如下 api:

### call/put

本质目的是让测试用例不必再发起多一次函数调用, 取而代之转为比较对象是否相同。

* 使用 `call` 替代使用 `fetch`
* 使用 `put` 替代使用 `dispatch{action}`

### fork

* 使用 `fork`: 模拟多个线程

### redux-saga 相较于 redux-thunk 的一些优点

* 对测试用例较为友好(比较函数和传入参数)
* 对异步操作流程的操作颗粒度更加细