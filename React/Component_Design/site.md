### 点击按钮实现复制文字

本质是 `document.execCommand()` api 的使用, 见如下 demo:

```html
<body>
  <input />
  <button>click</button>
  <script>
    const input = document.getElementsByTagName('input')[0]
    const button = document.getElementsByTagName('button')[0]
    button.addEventListener('click', () => {
      input.focus()
      input.select()
      document.execCommand('copy')
    })
  </script>
</body>
```

### 操作剪切板

以下为复制他人的文章片段下面带上作者的实现方式。todo: 后续合并下这两种方式。

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