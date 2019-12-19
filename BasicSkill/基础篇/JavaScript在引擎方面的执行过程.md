### 引子

```js
(0, function (arg) { ... })(this)
```

> [comma operator](The comma operator evaluates each of its operands (from left to right) and returns the value of the last operand.)

```js
(0, fn)() === fn()
```

### why (0, fn)()

### link

* [1](https://stackoverflow.com/questions/40967162/what-is-the-meaning-of-this-code-0-function-in-javascript)
* [2](https://stackoverflow.com/questions/9107240/1-evalthis-vs-evalthis-in-javascript)