### 事件类型

* load: window/img/script

> img 标签上设置 src 属性, 就开始请求资源; script 设置完 src 要加载到 dom 上才开始请求资源。

### 事件委托

在 `document` 上使用事件委托, 好处如下:

* 添加时机不受限(在 dom 任何生命周期的里都可添加)
* 添加事件更快
* 内存消耗也更小
* 减少事件的垃圾回收(如果绑定在低层级的标签上, 标签内容消失时, 还需要手动执行清空事件内存)

> [事件机制优化](https://github.com/MuYunyun/cpreact/issues/13)

#### 区分 target 和 currentTarget

* `currentTarget` 可以用于确定是`具体元素`上触发的事件;
* `target` 用于事件委托;

具体差异可以看以下 `demo`, 当点击 `你好` 时, 控制台输出两个 `true`; 当点击 `muyunyun` 时, 控制台输出一个 `true` 和一个 `false`。

```html
<body>
	<p id="test">你好, <span>muyunyun</span></p>
	<script>
		const content = document.getElementById('test')
		content.addEventListener('click', function(e) {
			console.log('currentTarget', e.currentTarget, 'target', e.target)
			console.log(this === e.currentTarget) // true
			console.log(this === e.target)        // false
		})
	</script>
</body>
```

### 自定义事件

(笔者认为)自定义事件可以归类到发布订阅模式下。

```html
<input id="sec" />
<script>
  // 订阅
  document.getElementById('sec').addEventListener('custom', function (obj) {
    console.log(obj.detail) // { demo: this ia a demo }
  })

  // 发布
  var ev = new CustomEvent('custom', { detail: { demo: 'this is a demo' } })
  document.getElementById('sec').dispatchEvent(ev)
</script>
```

### stopPropagation vs stopImmediatePropagation

* stopPropagation: stop propagation `from child element to parent element`;
* stopImmediatePropagation: stop propagation `the remaining same event type in one element`;