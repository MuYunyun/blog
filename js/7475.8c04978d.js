(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7475],{37475:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>c});var r=t(59713),l=t.n(r),a=t(6479),o=t.n(a),u=(t(67294),t(3905));function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){l()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var p={};function c(e){var n=e.components,t=o()(e,["components"]);return(0,u.kt)("wrapper",s(s(s({},p),t),{},{components:n,mdxType:"MDXLayout"}),(0,u.kt)("h3",null,"Generator 使用规律"),(0,u.kt)("p",null,"从一道题目开始:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function* gen() {\n  const a = yield 1\n  console.log(a)\n}\n")),(0,u.kt)("p",null,"为了让其能成功打印出 1, 设计如下函数:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function step(gen) {\n  const it = gen()\n  let result\n  return function() {\n    result = it.next(result).value\n  }\n}\n")),(0,u.kt)("p",null,"进行如下调用:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"var a = step(gen)\na()\na() // 1\n")),(0,u.kt)("p",null,"从这个题目总结出规律:"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"next")," 的调用数比 ",(0,u.kt)("inlineCode",{parentName:"li"},"yield")," 的调用数多 1;"),(0,u.kt)("li",{parentName:"ul"},"第一个 ",(0,u.kt)("inlineCode",{parentName:"li"},"next")," 传参无效, 从第二个 ",(0,u.kt)("inlineCode",{parentName:"li"},"next")," 开始传参有效并会作为 ",(0,u.kt)("inlineCode",{parentName:"li"},"yield")," 的结果返回;")),(0,u.kt)("p",null,"生成器中的 ",(0,u.kt)("inlineCode",{parentName:"p"},"yield/next")," 除了控制能力外还有双向的消息通知能力:"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"yield")," 后面跟的值能通过 ",(0,u.kt)("inlineCode",{parentName:"li"},"it.next().value")," 取到"),(0,u.kt)("li",{parentName:"ul"},(0,u.kt)("inlineCode",{parentName:"li"},"it.next()")," 括号中的值又能作为 ",(0,u.kt)("inlineCode",{parentName:"li"},"yield")," 的结果返回")),(0,u.kt)("h3",null,"yield 暂停的位置"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function* foo(url) {\n  try {\n    const value = yield request(url)\n    console.log(value)\n  } catch (err) {\n    ...\n  }\n}\n\nconst it = foo('http://some.url.1')\n")),(0,u.kt)("p",null,(0,u.kt)("inlineCode",{parentName:"p"},"yield")," 后面跟着的语句执行完再进入暂停状态的, 在如上代码中, 当执行 ",(0,u.kt)("inlineCode",{parentName:"p"},"it.next()")," 时, 可以稍加转换为如下形式:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function* foo(url) {\n  try {\n    const promise = request(url) // 当执行 it.next() 时, 这里是被执行的\n    const value = yield promise  // 这里被暂停\n    console.log(value)\n  } catch (err) {\n    ...\n  }\n}\n")),(0,u.kt)("h3",null,"遇到 return/throw"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"遇到 ",(0,u.kt)("inlineCode",{parentName:"li"},"return"))),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function* gen() {\n  yield 1\n  return 2\n  console.log('是否执行')\n}\n\nconst it = gen()\nit.next() // {value: 1, done: false}\nit.next() // {value: 2, done: true}\nit.next() // {value: undefined, done: true}\n")),(0,u.kt)("p",null,"总结: 遇到 ",(0,u.kt)("inlineCode",{parentName:"p"},"return"),", ",(0,u.kt)("inlineCode",{parentName:"p"},"generator")," 函数结束中断, ",(0,u.kt)("inlineCode",{parentName:"p"},"done")," 变为 ",(0,u.kt)("inlineCode",{parentName:"p"},"true"),";"),(0,u.kt)("ul",null,(0,u.kt)("li",{parentName:"ul"},"遇到 ",(0,u.kt)("inlineCode",{parentName:"li"},"iterator")," 的 ",(0,u.kt)("inlineCode",{parentName:"li"},"throw"))),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function* gen() {\n  yield 1\n  console.log('是否执行')\n}\n\nvar it = gen()\nit.throw(new Error('boom')) // Error: boom\nit.next()                   // {value: undefined, done: true}\n")),(0,u.kt)("p",null,"总结: 遇到 ",(0,u.kt)("inlineCode",{parentName:"p"},"iterator")," 的 ",(0,u.kt)("inlineCode",{parentName:"p"},"throw"),", ",(0,u.kt)("inlineCode",{parentName:"p"},"generator")," 函数运行中断, ",(0,u.kt)("inlineCode",{parentName:"p"},"done")," 变为 ",(0,u.kt)("inlineCode",{parentName:"p"},"true"),";"),(0,u.kt)("h3",null,"Generator 的简单实现"),(0,u.kt)("p",null,(0,u.kt)("inlineCode",{parentName:"p"},"Generator")," 是一个返回迭代器的函数, 下面是其简版实现:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function foo(url) {\n  var state\n  var val\n  function process(v) {\n    switch (state) {\n      case 1:\n        console.log('requesting:', url)\n        return request(url)\n      case 2:\n        val = v\n        console.log(val)\n        return\n      case 3:\n        var err = val\n        console.log('Oops:', err)\n        return false\n    }\n  }\n  return {\n    next: function(v) {\n      if (!state) {\n        state = 1\n        return {\n          done: false,\n          value: process()\n        }\n      } else if (state === 1) {\n        state = 2\n        return {\n          done: true,\n          value: process(v)\n        }\n      } else {\n        return {\n          done: true,\n          value: undefined\n        }\n      }\n    },\n    throw: function() {\n      if (state === 1) {\n        state = 3\n        return {\n          done: true,\n          value: process(e)\n        }\n      } else {\n        throw e\n      }\n    }\n  }\n}\n\nvar it = foo('http://some.url.1')\n")),(0,u.kt)("h3",null,"Generator 函数的异步应用"),(0,u.kt)("p",null,"以 ",(0,u.kt)("inlineCode",{parentName:"p"},"co")," 库来说, 现在已经统一为 ",(0,u.kt)("inlineCode",{parentName:"p"},"Generator + Promise")," 的调用方式, 下面进行简单的模拟:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"co(function* () {\n  const result = yield Promise.resolve(true)\n  console.log(result) // true\n})\n")),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"// 简版 promise\nfunction co(gen) {\n  const it = gen()\n  const step = function(data) {\n    const result = it.next(data)\n    if (result.done) {\n      return result.value\n    }\n    result.value.then((data) => {\n      step(data)\n    })\n  }\n  step()\n}\n")),(0,u.kt)("p",null,"观察 ",(0,u.kt)("inlineCode",{parentName:"p"},"co")," 库发现, ",(0,u.kt)("inlineCode",{parentName:"p"},"co")," 函数后返回的是 ",(0,u.kt)("inlineCode",{parentName:"p"},"promise"),", 使用如下:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"co(function* () {\n  const result = yield Promise.resolve(true)\n  return result // 这里有个语法, it.next() 碰到 return 后, 其值会变为 { value: result, done: true } 的形式\n}).then((data) => {\n  console.log(data) // true\n})\n")),(0,u.kt)("p",null,"我们再对其稍加改造, 使之更加添近 ",(0,u.kt)("inlineCode",{parentName:"p"},"co")," 库:"),(0,u.kt)("pre",null,(0,u.kt)("code",s({parentName:"pre"},{className:"language-js"}),"function co(gen) {\n  return new Promise((resolve, reject) => {\n    const it = gen()\n    let result\n    const step = function(fn) {\n      try {\n        result = fn()\n      } catch(e) {\n        return reject(e)\n      }\n      if (result.done) { return resolve(result.value) }\n      result.value.then((data) => {\n        step(() => it.next(data))\n      }, (err) => {\n        step(() => it.throw(err)) // 这里为了让抛错直接在 generator 消化, 所以 step 内改传函数\n      })\n    }\n    step(() => it.next())\n  })\n}\n")))}c.isMDXComponent=!0}}]);