此外可以对 class 与 Hooks 之间 `setState` 是异步还是同步的表现进行对比, 可以先对以下 4 种情形 render 输出的个数进行观察分析:

class 中的 setState:

```js
export default class App extends React.Component {
  state = {
    name: '路飞',
    old: 12,
    gender: 'boy'
  }

  // 情形 ①: class 中异步调用 setState
  componentDidMount() {
    this.setState({
      name: '娜美'
    })
    this.setState({
      old: 13
    })
    this.setState({
      gender: 'girl'
    })
  }

  // 情形 ②: class 中同步调用 setState
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: '娜美'
      })
      this.setState({
        old: 13
      })
      this.setState({
        gender: 'girl'
      })
    })
  }

  render() {
    console.log('render')
    const { name, old, gender } = this.state
    return (
      <>{name}{old}{gender}</>
    )
  }
}
```

Hooks 中的 setState

```js
export default function() {
  const [name, setName] = useState('路飞')
  const [old, setOld] = useState('12')
  const [gender, setGender] = useState('boy')

  // 情形③: Hooks 中异步调用 setState
  useEffect(() => {
    setName('娜美')
    setOld('13')
    setGender('girl')
  })

  // 情形④: Hooks 中同步调用 setState
  useEffect(() => {
    setTimeout(() => {
      setName('娜美')
      setOld('13')
      setGender('girl')
    }, 0)
  })

  console.log('render')
  return (
    <>{name}{old}{gender}</>
  )
}
```

情形①、情形②、情形③、情形④ 中 render 输出的次数分别是 2, 4, 3, 5

情形①、② 的情况好理解, 可是情形③、情形④的次数为什么会是 3 和 5 呢, 后面想明白再补充。