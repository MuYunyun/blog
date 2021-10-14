<!--
abbrlink: tvglcw3s
-->

### setState 回调替代方案

在脚手架中发现 setState 禁用了回调的使用。因为目前发现使用 setState 第二个参数的场景是想用 setState 更新状态后的值。

```js
class App extenes React.Component {
  countName = () => {
    if (this.state.name === "xxx") {
      this.setState({
        count: this.state.count + 1
      })
    }
  }

  handle = name => {
    this.setState(
      {
        name
      },
      this.countName
    )
  }
}
```

回调的方式会造成多余一次渲染, 可改为`传参`的方式代替回调的方式。

```js
class App extenes React.Component {
  countName = (name) => {
    if (name === "xxx") {
      this.setState({ // 2
        count: this.state.count + 1
      })
    }
  }

  handle = name => {
    this.countName(name)
    this.setState({
      name
    })
  }
}
```