### SearchBar

在使用 css 的动画属性 `transition` 时, 如果变化前后以下属性改变会使动画失效。`display/text-align`; 所以要维持动画的生效, 保留了 `text-align: center` 属性, 让搜索字样居中。如下图是动画前后的效果。

![](http://with.muyunyun.cn/cb02d781a8437bb43eea1581d41e6c87.jpg)

![](http://with.muyunyun.cn/004c6594536786fb1bb57e3df5524831.jpg)

受 `text-align: center` 影响, 为了不让 🔍 icon 居中, 这个时候使用 `visibility: hidden` 来占位;

![](http://with.muyunyun.cn/9366ca8f6e6f6d7c85d34ca893af131a.jpg)

### 几个事件钩子的调用先后顺序

* `onBlur`: 失焦
* `onClear`: 点击清除图标触发清除
* `onFocus`: 聚焦

![](http://with.muyunyun.cn/d188c846ffbd8c79646a940c352686d5.jpg)

点击叉号的时候, 因为叉号不在 `input` 输入框内, 所以首先执行的是 `onBlur`, 此时失去焦点, 后续执行不了叉号上的 `handleClear` 逻辑。解决方法如下:

```js
handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  const { onBlur } = this.props
  onBlur(e)

  setTimeout(() => {
    // 如果点击叉号, 执行到这里时候 document.activeElement === this.inputRef
    if (document.activeElement !== this.inputRef) {
      this.setState({ focus: false })
    }
  }, 20)
}

/* 清空输入并重新聚焦 */
handleClear = () => {
  const { onClear, onChange } = this.props
  onChange && onChange('')
  onClear('')
  this.focus()
}

focus = () => {
  if (this.inputRef) {
    this.inputRef.focus()
  }
}
```

### 解决点击 🔍 不 blur 仍然保持聚焦的效果

![](http://with.muyunyun.cn/afa95e394ae7ff8b1b180b0407acf424.jpg)

当点击搜索 `icon` 的时候, 为了仍保留 `input` 的聚焦的效果, 使用 `z-index` 对 `input` 元素做如下操作。

```css
.demo {
  position: absolute;
  z-index: 2;
  background-color: transparent;
}
```
