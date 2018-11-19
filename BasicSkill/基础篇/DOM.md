### 样式相关

1. elt.style

* 优点: 能使用 api 或者直接改写 style 内的样式
* 缺点: 只能针对内嵌样式

2. window.getComputedStyle(elt[, pseudoElt])

* 优点: 支持内联样式\外联样式
* 缺点: 只能进行只读操作, 不支持 IE

3. elt.getBoundingClientRect()

* 能获得位置相关信息

### 操作已存在的 dom 元素

这个点藏得比较深，如果 appendChild/insertBefore 操作已经存在的 dom，则原来的 dom 会移除。(只有一份实例)。

```html
<form>
  <select id="select1">
    <option>1</option>
  </select>
  <select id="select2">
    <option>2</option>
  </select>
</form>
<script>
  var select2 = document.getElementById('select2')
  select2.appendChild(select1.options[0])
</script>
```

如上 demo 中，`select1` 的 option 就会被转移到 `select2` 下