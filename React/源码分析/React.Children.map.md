### React.Children.map

```js
function Parent(props) {
  // React.Children.map 会对第二个函数输出的值进行铺平操作
  console.log(React.Children.map(props.children, r => [[r], r]));
  return React.Children.map(props.children, r => [[r], r]);
}

function App() {
  return (
    <Parent>
      <div>React.Children.map</div>
    </Parent>
  );
}
```

> [React.Children.map](https://codesandbox.io/s/4r08jvpk9w)

### React.Children.map 源码流程图

![](https://github.com/MuYunyun/blog/blob/master/React/源码解析/roadmap.png)