<!--
abbrlink: ccqvbb9c
-->

```js
module.exports = {
  get body() {
    return this._body
  },

  set body(content) {
    this._body = content // 创造一个名为 _body 的变量并给之赋值
  },

  get statusCode() {
    return this.res.statusCode  // 返还状态码
  },

  set statusCode(code) {
    this.res.statusCode = code
  }
}
```