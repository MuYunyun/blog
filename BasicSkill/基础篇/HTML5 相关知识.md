本篇文章整理和 HTML5 相关的点

### DOM 相关

1. getElementsByClassName
2. 遍历相关，如下左侧属性

> 只涉及元素节点的操作(不涉及其它节点)，建议使用左侧的属性替代右侧的属性：

| 属性名 | 被替代的属性 |
| :-: | :-: |
| children | childNodes |
| childElementCount | childNodes.length |
| previousElementSibling | previousSibling |
| nextElementSibling | nextSibling |
| firstElementChild | firstChild |
| lastElementChild | lastChild |

3. ele.scrollIntoView()

默认为 true，ele 移到屏幕中央; 若为 false, ele 移到屏幕底部;

### HTML 5 事件

1. contextmenu

<details>
  <summary>contextmenu 使用 demo</summary>

```html
<ul id="myMenu" style="position: absolute;visibility: hidden;background-color: silver">
  <li>111</li>
  <li>222</li>
  <li>333</li>
</ul>
<script>
  var menu = document.getElementById('myMenu')
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    menu.style.left = event.clientX + 'px'
    menu.style.top = event.clientY + 'px'
    menu.style.visibility = 'visible'
  }, false)
  document.addEventListener('click', (event) => {
    menu.style.visibility = 'hidden'
  }, false)
</script>
```
</details>

2. DOMContentLoaded

优于 window.load 执行

3. readystatechange

可用来判断动态载入的 script、link 标签是否加载完成。demo 如下:

```js
const script = document.createElement('script')
script.addEventListener('readystatechange', function eventListener(event) {
  if (event.readyState === 'loaded' || event.readyState === 'complete') { // hack 的手段，浏览器自身的问题
    script.removeEventListener('readystatechange', eventListener)
  }
})

script.src = 'example.js'
document.body.appendChild(script)
```

4. hashchange