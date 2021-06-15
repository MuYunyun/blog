(self.webpackChunkblog=self.webpackChunkblog||[]).push([[9069],{29069:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>d});var l=t(59713),r=t.n(l),o=t(6479),s=t.n(o),c=(t(67294),t(3905));function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u={};function d(e){var n=e.components,t=s()(e,["components"]);return(0,c.kt)("wrapper",a(a(a({},u),t),{},{components:n,mdxType:"MDXLayout"}),(0,c.kt)("h3",null,"与位置相关的 api"),(0,c.kt)("pre",null,(0,c.kt)("code",a({parentName:"pre"},{className:"language-js"}),'<div id="position">\n  <div>这是可滚动元素</div>\n</div>\n')),(0,c.kt)("p",null," 以下都在 id 为 position 上取值:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"scrollTop: 滚动距离"),(0,c.kt)("li",{parentName:"ul"},"scrollHeight: 滚动元素的高度"),(0,c.kt)("li",{parentName:"ul"},"clientHeight: 视图高度")),(0,c.kt)("p",null,(0,c.kt)("img",a({parentName:"p"},{src:"http://with.muyunyun.cn/b1d611e0509807308f79f5e50fb32de6.jpg",alt:null}))),(0,c.kt)("h3",null,"踩坑记录: 需要在 window 上挂载相关事件不适合使用 hooks, 否则需要花很多精力去额外处理。"),(0,c.kt)("p",null,"期间将 PullToRefresh 组件进行重构为 hooks, 伪代码如下:"),(0,c.kt)("pre",null,(0,c.kt)("code",a({parentName:"pre"},{className:"language-js"}),"function PullToRefresh(props: PullToRefreshProps) {\n  ...\n  useEffect(() => {\n    addEventListener()\n    return () => {\n      removeEventListener()\n    }\n  }, [useBodyScroll])\n\n  const addEventListener = () => {\n    if (useBodyScroll) {\n      window.addEventListener('scroll', scroll)\n    } else {\n      scrollViewRef.current?.addEventListener('scroll', scroll)\n    }\n  }\n\n  const removeEventListener = () => {\n    if (useBodyScroll) {\n      window.removeEventListener('scroll', scroll)\n    } else {\n      scrollViewRef.current?.removeEventListener('scroll', scroll)\n    }\n  }\n\n  ...\n  return (\n    <div className={classStr} ref={scrollViewRef} style={containStyle} id={id}>\n      {useBodyScroll ? (\n        children\n      ) : (\n        <div className={`${prefixCls}-content`} style={{ minWidth: '100%', ...contentStyle }}>\n          {children}\n        </div>\n      )}\n      {refreshing ? <div className={`${prefixCls}-loading`}>{loadingInfo}</div> : null}\n    </div>\n  )\n}\n\nexport default PullToRefresh\n")),(0,c.kt)("p",null,"踩的坑点是, 当使用方进行如下使用时, setList(newArr) 没有生效。目前归因是由于 hooks 的闭包原因, 在 window 上订阅的事件中使用的值每次执行没法获取最新的值。目前推荐还是使用 class 来构造此类组件。"),(0,c.kt)("pre",null,(0,c.kt)("code",a({parentName:"pre"},{className:"language-js"}),"export default function PullToRefreshDemo() {\n  const getMockData = () => {\n    let mockList: React.ReactNode[] = []\n    for (let i = 0; i < 40; i++) {\n      mockList.push(<p key={i}>这是标签这是标签</p>)\n    }\n    return mockList\n  }\n  const [list, setList] = useState(getMockData())\n  const [refreshing, setRefreshing] = useState(true)\n  const [checked, setChecked] = useState(false)\n\n  useEffect(() => {\n    setRefreshing(false)\n  }, [])\n\n  useEffect(() => {\n    setList(getMockData())\n  }, [checked])\n\n  const onLoad = (_direction: string, done: () => void) => {\n    console.log('请求接口')\n    setRefreshing(true)\n    const newArr = list.slice()\n    setTimeout(() => {\n      for (let i = 0; i < 5; i++) {\n        newArr.push(\n          <p key={Math.floor(100000000 * Math.random())} style={{ color: 'red' }}>\n            这是新的标签\n          </p>\n        )\n      }\n      setList(newArr)\n      setRefreshing(false)\n      done()\n    }, 1000)\n  }\n\n  const partlyScrollStyle: React.CSSProperties = {\n    display: 'flex',\n    flexDirection: 'column',\n    height: '100%',\n    overflow: 'auto'\n  }\n\n  return (\n    <div style={checked ? {} : partlyScrollStyle}>\n      <div>\n        <label>是否开启全局滚动</label>: <Switch checked={checked} onChange={() => setChecked(!checked)} />\n      </div>\n      <Head title={checked ? '全局滚动' : '局部滚动'} />\n      <PullToRefresh onLoad={onLoad} refreshing={refreshing} useBodyScroll={checked}>\n        {list}\n      </PullToRefresh>\n    </div>\n  )\n}\n\n")),(0,c.kt)("h3",null,"组件测试"),(0,c.kt)("p",null,"见 JEST 测试一节。"))}d.isMDXComponent=!0}}]);