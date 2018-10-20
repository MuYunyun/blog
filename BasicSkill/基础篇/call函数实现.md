### call 函数实现

* 将函数引用到对象里

* 调用函数

* 删除对象里的函数

```js
Function.prototype.call1 = function (context) {
  context.fn = this // this 指向实例
  context.fn()
  delete context.fn
}

// 测试：
const obj = {
  value: 'muyy',
}

function testCall() {
  console.log(this.value)
}

const resultCall = testCall.call1(obj) // muyy
```

### 传入参数的实现

```js
Function.prototype.call2 = function (context) {
  const arr = Array.prototype.slice.call(arguments, 1)

  context.fn = this // this 指向实例
  context.fn(...arr)
  delete context.fn
}

// 测试：
const obj2 = {
  value: 'muyy',
}

function testCall2(age) {
  console.log(this.value, age) // muyy 23
}

const resultCall = testCall2.call2(obj2, 23)
```