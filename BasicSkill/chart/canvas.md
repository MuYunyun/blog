### Canvas

市面上 Web 端图表库基本都是基于 Canvas 进行绘制的, 究其原因: Canvas 相对更加底层, 在处理图像交互上更具优势。

### API

* `线性渐变`
  * createLinearGradient(x0: number, y0: number, x1: number, y1: number)
  * addColorStop(offset: number, color: string): void
* `径向渐变`
  * createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)
* `路径`
  * 开始一段新路径: ctx.beginPath()
  * 开始: ctx.moveTo(x, y)
  * 经过: ctx.lineTo(x, y)
  * 路径为线: ctx.stroke()
  * 设置线的颜色: ctx.strokeStyle = gradient
  * `曲线`: ctx.bezierCurveTo(cplx, cp1y, cp2x, cp2y, x, y)
* `圆`
  * ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise])
* `画布的变换`
  * 注意: 画布变换的操作需要前置。
  * `画布平移`: ctx.translate(x, y)
  * `画布旋转`: ctx.rotate(Math.PI / 180 * 10): 旋转 10°
  * `画布缩放`: ctx.scale(x, y)
    * 沿原点镜像: ctx.scale(-1, -1)
    * 沿 x 轴镜像: ctx.scale(1, -1)
    * 沿 y 轴镜像: ctx.scale(-1, 1)
* `状态`
  * ctx.save()
  * ctx.restore()
* `文字`
  * 在 (x, y) 位置绘制文字: ctx.fillText('文字', x, y)
  * 测量文字: ctx.measureText('文字')
