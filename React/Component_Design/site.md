<!--
abbrlink: jp8oqdxn
-->

### 点击按钮实现复制文字

本质是 `document.execCommand()` api 的使用, 见如下 demo:

```js
function copy(str: string) {
  return new Promise(function(resolve, reject) {
    let success = false
    function listener(e: any) {
      e.clipboardData.setData('text/plain', str)
      e.preventDefault()
      success = true
    }
    document.addEventListener('copy', listener)
    document.execCommand('copy')
    document.removeEventListener('copy', listener)
    success ? resolve() : reject()
  })
}

usage:
copy(...).then(() => {})
```