### Hooks 设计模式

### 为什么 useState 返回一个数组而非一个对象?

因为数组比对象更加方便, 可以观察如下

数组:

```js
[name, setName] = useState('鸣人')
[age, setAge] = useState(13)
```

对象:

```js
{value: name, setValue: setName} = useState('鸣人')
{value: name, setValue: setName} = useState(13)
```

### 关于 hooks 的传递

为什么要从全局引入, 而非如下通过函数传递

```js
const SomeContext = require('./SomeContext)

function Example({ someProp }, hooks) {
  const contextValue = hooks.useContext(SomeContext)
  return <div>{someProp}{contextValue}</div>
}
```

使用传递的劣势是在有时会出现冗余的传递。

### 相关资料

* [RFCS](https://github.com/reactjs/rfcs/pull/68#issuecomment-439314884): hooks 设计的一些理念
