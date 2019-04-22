### 盒模型

* 标准模型(默认)
* IE 模型

由 `box-sizing` 属性来控制

* content-box(默认)
* border-box

> 它们的核心区别是是否将 border 以及 padding 算入 content 的 width 中(前提是设置了 width 下)。

### 超过行内容显示省略号

```css
.demo {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### display: block/inline-block/inline 的区别

* `block`: 有宽高, 不在同一行;
* `inline-block`: 有宽高，在同一行;
* `inline`: 无宽高, 在同一行;

### position

* relative: 元素根据正常的文档流相进行定位;
* absolute: 脱离当前文档流, 相对其最近的 `position` 属性值为非 `static` 祖先元素进行定位, 直到 body。

> position 是位置相关, display 是布局相关;

### verticle-align

* verticle-align: top

> [行高与基线](https://blog.csdn.net/lulujiajiawenwen/article/details/8245201)

### background

#### 图片自适应

```css
.demo {
  width: 200px;
  height: 100px;
  background-size: cover;
}
```

### margin

`margin` 的百分比值是以父元素的宽度作为解析基准的。

### 字体单位

* 相对视窗
  * `1vw`: 视窗宽度的 1/100, 100 vw 等于整个视窗宽度;
  * `1vh`: 视窗高度的 1/100, 100 vh 等于整个视窗高度;
  * `1vmin`: 取视窗宽度和视窗高度最小值的 1/100;
  * `1vmax`: 取视窗宽度和视窗高度最大值的 1/100;
* 相对 `font-size`
  * `rem`: 相对 html 中的 `font-size` 进行转换(如果根元素的 font-size 小于 12px 则以 12px 来计算);
  * `em`: 相对父元素(或者自己层级)的 `font-size` 进行转换;

### css 选择器

* 属性选择器
* 结构性伪类选择器: `:not()`、`:empty`、`:first-child`、`:last-child`、`:nth-child(n)`、`:nth-last-child(n)`
* `:first-of-type`、`:nth-of-type(n)`、`:last-of-type`、`:nth-last-of-type(n)`、`only-child`、`only-of-type`

> 括号中的 n 可以是 `2n+1`、`-n+5`、`even`、`odd` 等

此外还有

* `:enabled`、`:disabled`
* `:checked`(选择框加点变化示例)、`::selection`(改变用鼠标选择网页文本的样式)
* `:read-only`(与 html 中 readonly='readonly' 配合使用)、`:read-write`(与 :read-only 选择器相反, 主要用来指定当元素处于非只读状态时的样式。)
* `::before` && `::after`
