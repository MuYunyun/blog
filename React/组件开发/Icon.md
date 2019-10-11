### Icon 组件

### Icon 组件的两种实现方式

1. @font-face
2. svg

### 为什么 Icon 组件使用 svg 替代 @font-face

Icon 组件 `用 SVG 替代了 @font-face` 来避免 @font-face 受到较多外界 css 属性的干扰(如 line-height、padding 等);