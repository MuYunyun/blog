### 复合组件(Compound Component)

#### 使用 static 来复合组件

优点如下:

* 结构更加清晰

```jsx
class Toggle extends React.Component {
  static On = ({on, children}) => on ? children : null
  static Off = ({on, children}) => on ? null : children
  static Button = ({on, toggle}) => <Switch on={on} onClick={toggle} />

  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    return React.Children.map(this.props.children, reactElement => {
      return React.cloneElement(reactElement, {
        on: this.state.on,
        toggle: this.toggle,
      })
    })
  }
}

// 使用这种设计模式来复合组件, 可以看到组件的使用十分清晰
<Toggle onToggle={() => console.log('onToggle')}>
  <Toggle.On>The button is on</Toggle.On>
  <Toggle.Off>The button is off</Toggle.Off>
  <Toggle.Button />
</Toggle>
```

### 资料

* [advanced-react-patterns-v2](https://github.com/demos-platform/advanced-react-patterns-v2/blob/master/src/exercises/02.js)

