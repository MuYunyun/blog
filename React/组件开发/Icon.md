### Icon 组件

### Icon Fonts 的用法

```css
@font-face {
  font-family: 'demoFont';
  src: ...
}

.demo {
  font-family: 'demoFont';
  ...
}
```

### Icon 组件的两种实现方式

1. @font-face
2. svg

`SVG` 相较于优于 `Icon Fonts` 的点。

* 在低分辨率下更加清晰;
* 维护更容易;
* css 控制更加全面(比如允许渐变色)
* 避免 @font-face 受到较多外界 css 属性的干扰(如 line-height、padding 等);

### links

* [https://css-tricks.com/icon-fonts-vs-svg/](https://css-tricks.com/icon-fonts-vs-svg/)
