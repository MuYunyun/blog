### Canvas

市面上 Web 端图表库基本都是基于 Canvas 进行绘制的原因是: Canvas 相对更加底层, 针对图像上的处理效果会更加友好。

### API

* `线性渐变`
  * createLinearGradient(x0: number, y0: number, x1: number, y1: number)
  * addColorStop(offset: number, color: string): void
* `径向渐变`
  * createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number)
* `路径`
  * context.beginPath(): 开始一段新路径
  * context.moveTo(x, y): 开始
  * context.lineTo(x, y): 经过
  * context.stroke(): 路径为线
  * context.strokeStyle = gradient: 设置线的颜色
* `画布的变换`
  * `画布平移`: context.translate(x, y)
  * `画布旋转`: context.rotate(Math.PI / 180 * 10): 旋转 10°
  * `画布缩放`: context.scale(x, y)
    * 沿原点镜像: context.scale(-1, -1)
    * 沿 x 轴镜像: context.scale(1, -1)
    * 沿 y 轴镜像: context.scale(-1, 1)

### 图表案例

#### 折线图

* 绘制坐标轴
* 绘制平行 X 轴的线条
* 绘制刻度
* 绘制折线与圆


### link

> read: https://juejin.cn/post/6950684708443258894#heading-19