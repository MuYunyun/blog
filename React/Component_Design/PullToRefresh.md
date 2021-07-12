## PullToRefresh

### 与位置相关的 api

```js
<div id="position">
  <div>这是可滚动元素</div>
</div>
```

 以下都在 id 为 position 上取值:

* scrollTop: 滚动距离
* scrollHeight: 滚动元素的高度
* clientHeight: 视图高度

![](http://with.muyunyun.cn/b1d611e0509807308f79f5e50fb32de6.jpg)

### 踩坑记录: 需要在 window 上挂载相关事件不适合使用 hooks, 否则需要花很多精力去额外处理。

期间将 PullToRefresh 组件进行重构为 hooks, 伪代码如下:

```js
function PullToRefresh(props: PullToRefreshProps) {
  ...
  useEffect(() => {
    addEventListener()
    return () => {
      removeEventListener()
    }
  }, [useBodyScroll])

  const addEventListener = () => {
    if (useBodyScroll) {
      window.addEventListener('scroll', scroll)
    } else {
      scrollViewRef.current?.addEventListener('scroll', scroll)
    }
  }

  const removeEventListener = () => {
    if (useBodyScroll) {
      window.removeEventListener('scroll', scroll)
    } else {
      scrollViewRef.current?.removeEventListener('scroll', scroll)
    }
  }

  ...
  return (
    <div className={classStr} ref={scrollViewRef} style={containStyle} id={id}>
      {useBodyScroll ? (
        children
      ) : (
        <div className={`${prefixCls}-content`} style={{ minWidth: '100%', ...contentStyle }}>
          {children}
        </div>
      )}
      {refreshing ? <div className={`${prefixCls}-loading`}>{loadingInfo}</div> : null}
    </div>
  )
}

export default PullToRefresh
```

踩的坑点是, 当使用方进行如下使用时, setList(newArr) 没有生效。目前归因是由于 hooks 的闭包原因, 在 window 上订阅的事件中使用的值每次执行没法获取最新的值。目前推荐还是使用 class 来构造此类组件。

```js
export default function PullToRefreshDemo() {
  const getMockData = () => {
    let mockList: React.ReactNode[] = []
    for (let i = 0; i < 40; i++) {
      mockList.push(<p key={i}>这是标签这是标签</p>)
    }
    return mockList
  }
  const [list, setList] = useState(getMockData())
  const [refreshing, setRefreshing] = useState(true)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setRefreshing(false)
  }, [])

  useEffect(() => {
    setList(getMockData())
  }, [checked])

  const onLoad = (_direction: string, done: () => void) => {
    console.log('请求接口')
    setRefreshing(true)
    const newArr = list.slice()
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        newArr.push(
          <p key={Math.floor(100000000 * Math.random())} style={{ color: 'red' }}>
            这是新的标签
          </p>
        )
      }
      setList(newArr)
      setRefreshing(false)
      done()
    }, 1000)
  }

  const partlyScrollStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'auto'
  }

  return (
    <div style={checked ? {} : partlyScrollStyle}>
      <div>
        <label>是否开启全局滚动</label>: <Switch checked={checked} onChange={() => setChecked(!checked)} />
      </div>
      <Head title={checked ? '全局滚动' : '局部滚动'} />
      <PullToRefresh onLoad={onLoad} refreshing={refreshing} useBodyScroll={checked}>
        {list}
      </PullToRefresh>
    </div>
  )
}
```

### 组件测试

见 JEST 测试一节。

### 上拉刷新结合虚拟列表

* 到临界点
  * 等数据加载