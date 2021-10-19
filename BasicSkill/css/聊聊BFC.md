<!--
abbrlink: 5wjknen4
-->

### BFC 含义

块级格式化上下文(Block Formatting Context)

### BFC 特性

* 同一个 BFC 内元素外边距会发生重合(见案例一)
* BFC 内可以有浮动元素(见案例二)
* BFC 内可以分离浮动元素(见案例三)

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

![](http://with.muyunyun.cn/4e86e658780009017a22bbb025043276.jpg-300)

可以看到此时两个 div 之间的间距并不是 200px, 而是 100px

此时可以在父节点加上 `overflow: hidden` 使其变为 BFC 元素, 从而避免重叠。

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

![](http://with.muyunyun.cn/ffa04ee49e9b4d221361929324236c05.jpg-300)

此时, 可以看到两个 div 之间的距离已变为期望的 200 px；

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

子节点加上 `float: left` 后, 其脱离了文档流, 所以只看到一条 1px 的线条, 如下:

![](http://with.muyunyun.cn/6b657c7f8d985992c97269fb61bb8678.jpg-300)

此时在父节点中加上 `overflow: hidden` 使其变为 BFC 元素从而消除浮动, 代码如下:

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

![](http://with.muyunyun.cn/6bde303c9e6c57a7d1ce73543d4c8dcc.jpg-300)

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

相邻节点中的一个节点使用 `float: left`, 其脱离文档流, 从而两个 div 标签发生了重叠,

![](http://with.muyunyun.cn/c7ebcfce5a7c58142fc9004a7d545852.jpg-300)

此时在普通流节点上使用 `overflow: hidden` 使其变为 BFC 元素从而使 BFC 元素和浮动元素分离:

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

![](http://with.muyunyun.cn/cb83333e3e31f59d4946e0d3cdd2a56a.jpg-300)

### 如何触发 BFC

```
* overflow: 不为 visible;
* position: 不为 static 以及 relative;
* float: 不为 none;
* display: 为 inline-box、table-ceil、flex;
```
