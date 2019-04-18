### 核心原则

以简为美，简约至上。

> 可以当成一门新语言来学

### String

* `SCSS` 的属性应该使用单引号;
* 但有一些特殊的属性 (比如 `sans-serif/initial`) 无须使用引号, 例子如下:

```SCSS
$font-type: sans-serif
```

### Number

* `0` 作为长度时后面不应该带有单位;
* 给数字添加单位应该使用乘法, 例子如下:

```SCSS
$value: 42

// yep
$length: $value * 1px

// nope
$length: $value + 1px
```

* 数字间计算需要带上括号, 例子如下:

```SCSS
// yep
.foo {
  width: (100% / 3);
}
```

### 嵌套选择器

```SCSS
.foo {
  .bar {
    &:hover {
      color: red
    }
  }
}
```

生成 `css` 为:

```css
.foo .bar:hover {
  color: red;
}
```

```SCSS
.foo {
  &-bar {
    color: red;
  }
}
```

生成 `css` 为:

```css
.foo-bar {
  color: red;
}
```

### 混合宏

在 `SCSS` 中提供函数的支持

```SCSS
@mixin dummy($a, $b, $c) {
  // ...
}

@include dummy(true, 1, 'pdd')
```

### 条件语句

```scss
@if ($support-legacy) {
  // ..
} @else {
  // ..
}
```

### 循环

一般使用 `each`

```scss
@each $key, $value in $map {
  // ...
}
```

结合伪类可以使用 `for`

```scss
@for $i from 0 through 10 {
  .foo:nth-of-type(#{$i}) {
    // ...
  }
}
```

### 继承

```scss
.demo1 {}

.demo {
  @extend .demo1
}
```

### 参考文献

* [sassguidelines](https://sass-guidelin.es/)
* [sassguidelines 中文文档](https://sass-guidelin.es/zh)


