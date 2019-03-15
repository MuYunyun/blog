### 盒模型

* 标准模型(默认)
* IE 模型

由 `box-sizing` 属性来控制

* content-box(默认)
* border-box

> 它们的核心区别是是否将 border 以及 padding 算入 content 的 width 中

### 超过行内容显示省略号

```css
.demo {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### display: block/inline-block/inline 的区别

* block: 有宽高, 不在同一行;
* inline-block: 有宽高，在同一行;
* inline: 无宽高, 在同一行;

### position

* relative: 相对于其自身位置进行定位;
* absolute: 相对其最近的非 `static` 的祖先元素进行定位;

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
  * `rem`: 相对 html 中的 font-size 进行转换(如果根元素的 font-size 小于 12px 则以 12px 来计算);
  * `em`: 相对父元素(或者自己层级)的 font-size 进行转换;