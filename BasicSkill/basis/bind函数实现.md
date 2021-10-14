<!--
abbrlink: 9mpxxj5w
-->

## bind 函数实现

### 第一版: 借助 call/apply

```js
Function.prototype.bind1 = function (context) {
  const self = this
  return function () {
    return self.call(context)
  }
}

// 测试:
const obj = {
  value: 'muyy',
}
function testBind() {
  console.log(this.value)
}
const resultBind = testBind.bind1(obj)
resultBind() // muyy
```

### 第二版: 借助 arguments

```js
Function.prototype.bind2 = function (context) {
  const arr = Array.prototype.slice.call(arguments, 1)
  const self = this
  return function () {
    const restArr = Array.prototype.slice.call(arguments)
    return self.apply(context, arr.concat(restArr))
  }
}
```

> 这种方式的实现其实是函数柯里化的变版

比如在监听事件时可以这样子用:

```js
dom.addEventListener('click', fn.bind(this))
```

进行如下测试:

```js
const obj2 = {
  value: 'muyy',
}
function testBind2(age, gender) {
  console.log(this.value) // muyy
  console.log(age)        // 23
  console.log(gender)     // male
}
const resultBind2 = testBind2.bind2(obj2, 23)
resultBind2('male')
```

### 第三版: 区分环境, 是普通调用还是 new 调用

```js
Function.prototype.bind3 = function (context) {
  const arr = Array.prototype.slice.call(arguments, 1)
  const self = this
  return function () {
    const restArr = Array.prototype.slice.call(arguments)
    return self.apply(this !== windows ? this : context, arr.concat(restArr))
  }
}

// 测试: 使用 new 以后 this 会指向 newObj
const obj3 = {
  value: 'muyy',
}
function testBind3(age, gender) {
  console.log(this.value)
  console.log(age)
  console.log(gender)
}
const resultBind3 = testBind3.bind3(obj3, 23, 'male')
const newObj = new resultBind3()
```