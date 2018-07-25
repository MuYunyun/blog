### BFC 含义

块级作用域上下文

### BFC 特性

* 同一个 BFC 内元素外边距会发生重合
* BFC 内可以有浮动元素（清除浮动）
* BFC 内可以分离浮动元素

#### 案例一

```html
<style>
  div {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 100px;
  }
</style>

<body>
  <div></div>
  <div></div>
</body>
```

![](http://oqhtscus0.bkt.clouddn.com/4e86e658780009017a22bbb025043276.jpg-300)

可以看到此时两个 div 之间的间距并不是 200px，而是 100px

如果想要消除 BFC 的这个特性(重叠)可以加上 overflow: hidden 来触发 BFC

```html
<style>
  div {
    overflow: hidden;
  }
  p {
    width: 100px;
    height: 100px;
    background-color: red;
    margin: 100px;
  }
</style>

<body>
  <div>
    <p></p>
  </div>
  <div>
    <p></p>
  </div>
</body>
```

![](http://oqhtscus0.bkt.clouddn.com/ffa04ee49e9b4d221361929324236c05.jpg-300)

此时，可以看到两个 div 之间的距离已变为期望的 200 px；

#### 案例二

```html
<style>
  .border {
    border: 1px solid #000;
  }
  .content {
    width: 100px;
    height: 100px;
    background-color: red;
    float: left;
  }
</style>

<body>
  <div class="border">
    <p class="content"></p>
  </div>
</body>
```

加上 float: left 后，内容脱离了文档流，所以只看到一条 1px 的线条，如下：

![](http://oqhtscus0.bkt.clouddn.com/6b657c7f8d985992c97269fb61bb8678.jpg-300)

此时加上 overflow: hidden 可以触发 BFC 从而消除浮动，代码如下：

```html
<style>
  .border {
    border: 1px solid #000;
    overflow: hidden;  // 在此处加上 overflow: hidden; 可以消除浮动
  }
  .content {
    width: 100px;
    height: 100px;
    background-color: #ff0000;
    float: left;
  }
</style>

<body>
  <div class="border">
    <p class="content"></p>
  </div>
</body>
```

![](http://oqhtscus0.bkt.clouddn.com/6bde303c9e6c57a7d1ce73543d4c8dcc.jpg-300)

#### 案例三

```html
<style>
  .content1 {
    width: 100px;
    height: 100px;
    background-color: red;
    float: left;
  }

  .content2 {
    width: 200px;
    height: 200px;
    background-color: green;
  }
</style>

<body>
  <div class="content1"></div>
  <div class="content2"></div>
</body>
```

同样使用 float，使元素脱离文档流，从而两个 div 标签发生了重叠，

![](http://oqhtscus0.bkt.clouddn.com/c7ebcfce5a7c58142fc9004a7d545852.jpg-300)

使用 overflow: hidden 触发 BFC，使 BFC 元素和浮动元素分离：

```html
<style>
  .content1 {
    width: 100px;
    height: 100px;
    background-color: red;
    float: left;
  }

  .content2 {
    width: 200px;
    height: 200px;
    background-color: green;
    overflow: hidden;
  }
</style>

<body>
  <div class="content1"></div>
  <div class="content2"></div>
</body>
```

![](http://oqhtscus0.bkt.clouddn.com/cb83333e3e31f59d4946e0d3cdd2a56a.jpg-300)

### 如何触发 BFC

```
* overflow: hidden 先用好最常用的这个
* position: absolute
* float: 除了 none ?
* display: flex
```

<!-- ```
1.float 不为 none
2.position 不为 static 以及 relative
3.overflow 不为 visible
4.display 为 inline-box、table-ceil、flex
``` -->