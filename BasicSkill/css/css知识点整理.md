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
