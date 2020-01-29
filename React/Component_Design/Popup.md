### iphone X/XS/XR 适配方案

Popup/ActionSheet 组件在 iphone x/xr/xs 底部存在小黑条会把显示在内容区上面, 适配方案如下:

1. html 上新增 `viewport-fit=cover` 属性，使得页面内容完全覆盖整个窗口(了解设置了这个属性, 才能在后面使用 env 属性):

```html
<meta name="viewport" content="width=device-width, viewport-fit=cover">
```

2. 在 fix 元素上面设置:

```css
{
  margin-bottom: calc(5px + constant(safe-area-inset-bottom));
  margin-bottom: calc(5px + env(safe-area-inset-bottom));
}
```

3. 空的颜色块进行补位:

```css
{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: constant(5px +  safe-area-inset-bottom);
  height: env(5px + safe-area-inset-bottom);
  background-color: #fff;
}
```

个人觉得这是比较自由的方式。

> [参考链接](https://aotu.io/notes/2017/11/27/iphonex/index.html)