<!--
abbrlink: v9b53vi6
-->

- [css 是什么](#css-是什么)
- [盒模型](#盒模型)
- [超过行内容显示省略号](#超过行内容显示省略号)
- [verticle-align](#verticle-align)
- [样式表](#样式表)
- [input 的宽度 —— 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值。](#input-的宽度--并不是给元素设置-displayblock-就会自动填充父元素宽度input-就是个例外其默认宽度取决于-size-特性的值)
- [object-fit](#object-fit)
- [style 里的样式过长该怎么办](#style-里的样式过长该怎么办)
- [如何覆盖伪元素的样式(可作面试题)](#如何覆盖伪元素的样式可作面试题)
- [CSS 中哪些元素可以创建层叠上下文(stacking context)?](#css-中哪些元素可以创建层叠上下文stacking-context)
- [如何使用 CSS 判断横竖屏](#如何使用-css-判断横竖屏)
- [CSS 权重值计算规则](#css-权重值计算规则)

### css 是什么

`css(cascading style sheet)` 层叠样式表。

### 盒模型

* 标准模型(默认)
* IE 模型

由 `box-sizing` 属性来控制

* content-box(默认)
* border-box

> 它们的核心区别是是否将 border 以及 padding 算入 content 的 width 中(在设置了 width 的前提下)。

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

### input 的宽度 —— 并不是给元素设置 display:block 就会自动填充父元素宽度。input 就是个例外，其默认宽度取决于 size 特性的值。

![](https://user-gold-cdn.xitu.io/2019/7/29/16c3d4f6fef0a871?imageslim)

### object-fit

It's a css property that can be eaqual to the background-size, it has five types:

* `fill`: default
* `contain`
* `cover`: used in imagePicker
* `none`
* `scale-down`: if the image's size is imaller than box, it'll keep the image's size, otherwise it'll equal to contain. You can look for it [here](https://codepen.io/chrisnager/pen/XJgJqN)

### style 里的样式过长该怎么办

* 第一步: `$0.innerText`;
* 第二步: 点击 `Show more(221 kB)`;

### 如何覆盖伪元素的样式(可作面试题)

结论：经实践，需要通过 className 定位到伪元素，来书写相关样式以达到覆盖伪元素的目的。

> 无法使用 style 的方式来实现。

### CSS 中哪些元素可以创建层叠上下文(stacking context)?

- z-index + position
- opacity，[案例](https://codepen.io/devui-design/pen/qRLxEd)
- transform

### 如何使用 CSS 判断横竖屏

```css
@media (orientation: portrait) { } 竖屏
@media (orientation: landscape) { } 横屏
```

### CSS 权重值计算规则

【待进一步完善】

* 内联样式，如: style="..."，权值为1000。
* ID选择器，如：#content，权值为0100。
* 类，伪类、属性选择器，如.content，权值为0010。
* 类型选择器、伪元素选择器，如div p，权值为0001。
* 通配符、子选择器、相邻选择器等。如* > +，权值为0000。
* 继承的样式没有权值
