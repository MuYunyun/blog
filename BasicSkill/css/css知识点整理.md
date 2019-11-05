### css 是什么

`css(cascading style sheet)` 层叠样式表。

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

### verticle-align

* verticle-align: top

> [行高与基线](https://blog.csdn.net/lulujiajiawenwen/article/details/8245201)

### 块级元素/行内元素

`html` 中, 块级元素不能继承自行内元素。配合 `css` 的 `display` 属性可以。

### 结构和层叠

#### 优先级

Id 选择器 > 类选择器 | 属性选择器 > 元素 > 通配选择器

### 样式表

* 内联样式表

```css
.font {
  color: red
}

<div class="font">hello, cpreact</div>
```

* 外联样式表

```css
<link rel="stylesheet" href="">
```

### 边框

* 圆角效果 `border-radius`

```css
.demo {
  border-radios:100px/10px  (水平100，垂直10)
}
```

* 阴影 `box-shadow`: X 轴偏移量 Y 轴偏移量 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式];（阴影模糊半径：只能是正值；阴影扩展半径：可以是正负值）（自带边框）

> 外阴影 x 和 y(正值)出现在右下；内阴影 x 和 y(正值)出现在左上;

### input 的宽度 —— 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值。

![](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f6fef0a871?imageslim)
