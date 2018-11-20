### 16.0 Fiber

`此处插入图片`

一次潜水 30 米，在这期间做不了其它事情(16 之前 Stack Reconciler);

痛点概括:

* 同步渲染
* 无优先级

`此处插入图片`

* 可以每次潜 10 米，分 3 个 chunk 进行。
* chunk 和 chunk 之间通过链表连接。
* 可以在 chunk 间插入优先级更高的任务, 先前的任务被抛弃

> 开启 Fiber 后，获取异步数据的方法应放到 render 后面的生命周期钩子里(phase 2 阶段)进行, 因为 render 前面的生命周期钩子(phase 1阶段)会被执行多次

> 注意: 并没有缩短原先组件的渲染时间(甚至还加长了)，但用户却能感觉操作变流畅了。

`此处可以插入 Dan 神演讲时候的那个例子`

#### render() 新增返回的类型

* React elements.
* Arrays and fragments.
* Portals.
* String and numbers.
* Booleans or null.

> [render](https://reactjs.org/docs/react-component.html#render]

#### Portals(传送门)

将 react 子节点渲染到指定的节点上

```js
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }

  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }

  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);
```

#### fragments

#### life cycle

### 16.7 Hooks

在 React 16.7 之前，React 有两种形式的组件，有状态组件(类)和无状态组件(函数)。Hooks 的意义就是赋能先前的无状态组件，让之变为有状态。这样一来更加契合了 React 所推崇的函数式编程。

接下来梳理 Hooks 中最核心的 2 个 api, `useState` 和 `useEffect`

#### useState

useState 返回状态和一个更新状态的函数

```js
const [count, setCount] = useState(initialState)
```

使用 Hooks 相比之前用 class 的写法最直观的感受是更为简洁

```js
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

#### useEffect(fn)

在每次 render 后都会执行这个钩子。可以将它当成是 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 的合集。因此使用 useEffect 比之前优越的地方在于：

1. 可以避免在 `componentDidMount、componentDidUpdate` 书写重复的代码;
2. 可以将关联逻辑写进一个 `useEffect`;(在以前得写进不同生命周期里);

### 相关资料

[](https://deploy-preview-10824--reactjs.netlify.com/blog/2017/09/26/react-v16.0.html)