### Canvas

市面上 Web 端图表库基本都是基于 Canvas 进行绘制的原因是: Canvas 相对更加底层, 针对图像上的处理效果会更加友好。

### API

* `线性渐变`
  * createLinearGradient(x0: number, y0: number, x1: number, y1: number)
  * addColorStop(offset: number, color: string): void
* `径向渐变`
  * createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)

> read: https://juejin.cn/post/6950684708443258894#heading-10