### form 表单相关知识

* 触发焦点事件 `focusin`, 离开焦点事件 `focusout`;
* 修改表单的 `value` 值, 直接更改元素的 `value` 值, 不要使用 `setAttribute('value', xxx)` 这种形式, 后者在某些情况并不会生效;

### 操作剪切板

以下为复制他人的文章片段下面带上作者的实现方式。

```html
<form>
  <input type="url" />
</form>
<script>
  var input = document.getElementsByTagName('form')[0].elements[0]
  input.addEventListener('copy', (e) => {
    e.clipboardData.setData('text/plain', 'Hello, world!')
    e.preventDefault()
  })
  input.addEventListener('paste', (e) => {
    console.log(e.clipboardData.getData('text')) // Hello, world
  })
</script>
```

### 富文本编辑

1. 给元素上加上 `contenteditable` 属性
2. 给选中元素执行 `document.execCommand()`

> 另外一种方法是内嵌 iframe, 并将其 designmode 属性设置为 true。(有跨域问题，日后填坑)