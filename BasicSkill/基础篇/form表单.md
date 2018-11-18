### form 表单相关知识

###

* 触发焦点事件 focusin, 离开焦点事件 focusout;
* 修改表单的 value 值，直接更改元素的 value 值，不要用 setAttribute('value', xxx) 这种形式;

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