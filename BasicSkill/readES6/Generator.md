### 杂

从一道简单的题目开始：

```js
function* gen() {
	const a = yield 1
	console.log(a)
}
```

为了让其能成功打印出 1，设计如下函数：

```js
function step(gen) {
	const it = gen()
	let result
	return function() {
		result = it.next(result).value
	}
}
```

可进行如下调用

```js
var a = step(gen)
a()
a() // 1
```

从这个题目总结下规律

* next 的调用数比 yield 的调用数多 1;
* 第一个 next 传值无效，从第二个 next 开始的传值有效并会覆盖掉 yield 的传值;

生成器中的 yield/next 除了控制能力外还有双向的消息通知能力：

* yield .. 后跟的值能通过 it.next().value 取到
* it.next(..) 中 next 里的值又能作为 yield .. 的值返回

```js
function run(gen) {
	it = gen()

	return Promise.resolve()
		.then(function handleNext(value) {
			var next = it.next(value)
			return (function handleResult(next) {
				if (next.done) {
					return next.value
				}
				else {
					return Promise.resolve(next.value)
						.then(
							handleNext,
							function handleErr(err) {
								return Promise.resolve(
									it.throw(err)
								)
								.then(handleResult)
							}
						)
				}
			})(next)
		})
}

function foo(x, y) {
	return request(
		'http://some.url.1/?x=' + x + '&y=' + y
	)
}

function* main() {
	try {
		var test = yield foo(11, 31)
		console.log(test)
	} catch(e) {
		console.error(error)
	}
}

run(main)
```

```js
// 改成 async 实现，即
function foo(x, y) {
	return request(
		'http://some.url.1/?x=' + x + '&y=' + y
	)
}

async function main() {
	try {
		var test = await foo(11, 31)
		console.log(test)
	} catch(e) {
		console.error(error)
	}
}

main()
```

### 翻译 yield

```js
function* foo(url) {
	try {
		console.log('requesting:', url)
		var val = yield request(url)
		console.log(val)
	} catch (err) {
		console.log('Oops', err)
		return false
	}
}

var it = foo('http://some.url.1')
```

> 关于 yield 暂停的位置：yield 后面跟着的语句执行完再进入暂停状态的

```js
var result = yield request(url)
```

首先，我们先创造一个返回迭代器的函数

```js
function foo(url) {
	var state
	var val
	function process(v) {
		switch (state) {
			case 1:
				console.log('requesting:', url)
				return request(url)
			case 2:
				val = v
				console.log(val)
				return
			case 3:
				var err = val
				console.log('Oops:', err)
				return false
		}
	}
	return {
		next: function(v) {
			if (!state) {
				state = 1
				return {
					done: false,
					value: process()
				}
			} else if (state === 1) {
				state = 2
				return {
					done: true,
					value: process(v)
				}
			} else {
				return {
					done: true,
					value: undefined
				}
			}
		},
		throw: function() {
			if (state === 1) {
				state = 3
				return {
					done: true,
					value: process(e)
				}
			} else {
				throw e
			}
		}
	}
}

var it = foo('http://some.url.1')
```

### Generator 函数的异步应用

本质：将 generator 的控制权移到 thunk 函数中

以 co 库来说，现在已经统一为 Generator + Promise 的调用方式，下面进行简单的模拟：

```js
co(function* () {
	const result = yield Promise.resolve(true)
	console.log(result) // true
})
```

```js
// 简版 promise
function co(gen) {
	const it = gen()
	const next = function(value) {
		const result = it.next(value)
		if (result.done) {
			return result.value
		}
		result.value.then((data) => {
			next(data)
		})
	}
	next()
}
```

