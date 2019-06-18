### why move to hooks?

mixin、HOC、Render Props 有什么缺陷?

* 数据源不明。导致不易快速定位 bug。(mixin、hoc、render props)
* 命名重复性问题。在一个组件中同时使用多个 hoc, 不排除这些 hoc 里的方法存在命名冲突的问题。(mixin、hoc)
* 性能问题。需要额外的组件实例存在额外的开销。(mixin、hoc、render Props)

反过来说, 这些也是 hooks 的优势所在。

另外使用 clsaa API 与 TypeScript 结合使用时, 需要进行两次声明(一次 interface, 一次 defaultProps)

> [尤雨溪：Vue Function-based API RFC](https://mp.weixin.qq.com/s/k37eVdlH-_Hder8yN3na5g)

### Hooks 与 class 的一些差异

Hooks tip: something.current (a ref value) is just like this.something in a class (an instance field).

/* in a function */
const X = useRef()
X.current // can read or write

/* in a class */
this.X // can read or write

> [twitter](https://twitter.com/dan_abramov/status/1125223181701263360)


### Hooks vs Class in setState

| | Class | Hooks |
|:---:|:---:|:---:|
| setState(async) | 多次输出 | 多次输出, 但是输出次数会小于等于 class 的 |
| setState(sync) | 多次输出 | 单次输出 |

![](http://with.muyunyun.cn/314d5035e996809ab463e33e5029777f.jpg)

- [ ] [一些异步](https://codesandbox.io/s/funny-mclean-6lru4)
