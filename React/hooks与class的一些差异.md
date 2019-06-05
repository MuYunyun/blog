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
