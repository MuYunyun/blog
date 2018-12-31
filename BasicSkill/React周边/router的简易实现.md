### router 的简易实现

#### 基于 hash 的实现

以下为 `hashChange` 的简版实现

```js
class Router {
	constructor() {
		this.router = {}
		window.addEventListener('hashchange', (e) => {
			const tag = location.hash.slice(1)
			this.router[tag] && this.router[tag]()
		})
	}

	route(path, fn) {
		this.router[path] = fn
	}
}

const router = new Router()
const changeColor = (color) => {
	document.body.style.background = color
}
router.route('red', () => { changeColor('red') })
router.route('yellow', () => { changeColor('yellow') })
router.route('blue', () => { changeColor('blue') })
```

```html
<ul>
	<a href="#red">red</a>
	<a href="#yellow">yellow</a>
	<a href="#blue">blue</a>
</ul>
```

#### 基于 history 的实现

> 以下代码需要运行在 http 端口。

```js
class Router {
  constructor() {
    this.router = {}
    window.addEventListener('popstate', (e) => {
      const path = e.state.path
      this.router[path] && this.router[path]()
    })
  }

  route(path, fn) {
    this.router[path] = fn
  }

  go(path) {
    history.pushState({ path: path }, null, path) // 核心思路, pushState 进去的第一个对象会在点击回退/前进按钮时触发 popstate
    this.router[path] && this.router[path]()
  }
}

const router = new Router()
const changeColor = (color) => {
  document.body.style.background = color
}
router.route('red', () => { changeColor('red') })
router.route('yellow', () => { changeColor('yellow') })
router.route('blue', () => { changeColor('blue') })
document.getElementsByTagName('ul')[0].addEventListener('click', (e) => {
  router.go(e.target.innerText)
})
```

```html
<ul>
  <li href="red">red</li>
  <li href="yellow">yellow</li>
  <li href="blue">blue</li>
</ul>
```

### 参考

[面试官: 你了解前端路由吗?](https://juejin.im/post/5ac61da66fb9a028c71eae1b)