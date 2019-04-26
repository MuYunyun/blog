### css 是什么

`css(cascading style sheet)` 层叠样式表。

### 块级元素/行内元素

`html` 中, 块级元素不能继承自行内元素。配合 `css` 的 `display` 属性可以。

### 选择器

#### 子类选择器 (>)

* `p > span {}` 意为 p 元素后面直接跟着 span 的情形样式才生效

> 对比: `p span {}` 意为 p 元素后面跟着 span 的情形

#### 相邻选择器 (~)

* `p ~ span {}` 意为与 p 元素`同级别`且位于 p 元素之后`所有`的 span 标签会生效

#### 相邻选择器 (+)

* `p + span {}` 意为与 p 元素`同级别`且位于 p 元素之后`相邻`的 span 标签会生效

#### 伪类选择器和伪元素选择器

* 伪类: `:link`、`:visited`、`:hover`、`:active`(前面 4 个可以记忆成 LoVe-HA)、`:nth-child`
* 伪元素: `:before`、`:after`

`p:first-child {}` 含义: 某元素的第一个子元素为 p 情形时的样式。

> 注意: 不是 p 的第一个子元素。

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

### 移动端 1px 解决方案

window 上存在 `devicePixelRatio` 属性, 其值为物理像素和屏幕像素之比。

比较完美的方案: 伪元素 + `transform: scaleY(0.5)`