(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6397],{56397:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>i});var a=t(59713),r=t.n(a),o=t(6479),l=t.n(o),s=(t(67294),t(3905));function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){r()(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var u={};function i(e){var n=e.components,t=l()(e,["components"]);return(0,s.kt)("wrapper",c(c(c({},u),t),{},{components:n,mdxType:"MDXLayout"}),(0,s.kt)("p",null,(0,s.kt)("a",c({parentName:"p"},{href:"https://github.com/tc39/proposals/blob/master/finished-proposals.md"}),"Async function")," 在 2017 年已到达了 stage 4。"),(0,s.kt)("h3",null,"async/await 使用注意点"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"为了不让程序挂掉, 注意捕获错误")),(0,s.kt)("p",null,"写法 1: 用 ",(0,s.kt)("inlineCode",{parentName:"p"},"try/catch")," 捕获"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"async function test1() {\n  try {\n    await Promise.reject(new Error('boom'))\n  } catch(e) {\n    console.log(e)\n  }\n  console.log('go on')\n}\n\ntest1()\n// Error: boom\n// go on\n")),(0,s.kt)("p",null,"写法 2: 直接在 ",(0,s.kt)("inlineCode",{parentName:"p"},"await")," 后面的 ",(0,s.kt)("inlineCode",{parentName:"p"},"promise")," 上进行 ",(0,s.kt)("inlineCode",{parentName:"p"},"catch")),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"async function test2() {\n  await Promise.reject(new Error('boom')).catch(e => console.log(e))\n  console.log('go on')\n}\n\ntest2()\n// Error: boom\n// go on\n")),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"使用并行提高程序的运行速度")),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"// 串行调用示范\nasync function block() {\n  const result1 = await request(url1)\n  const result2 = await request(url2)\n}\n")),(0,s.kt)("p",null,"在如上案例中, ",(0,s.kt)("inlineCode",{parentName:"p"},"request(url1)")," 请求未完成的话是不会发起 ",(0,s.kt)("inlineCode",{parentName:"p"},"request(url2)")," 请求的(类似串行调用), 若想使之变为并行调用可以作如下修改:"),(0,s.kt)("p",null,"写法 1:"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"async function block() {\n  const promise1 = request(url1)\n  const promise2 = request(url2)\n  const result1 = await promise1\n  const result2 = await promise2\n}\n")),(0,s.kt)("p",null,"写法 2:"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"async function block() {\n  const [result1, result2] = await Promise.all([request(url1), request(url2)])\n}\n")),(0,s.kt)("h3",null,"async 函数的实现原理"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"async function fn {}\n")),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"async")," 函数在低版本浏览器中其实就是转为 ",(0,s.kt)("inlineCode",{parentName:"p"},"co + Generator")),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"function fn {\n  return co(function* () {\n\n  })\n}\n")),(0,s.kt)("p",null,"关于简版 ",(0,s.kt)("inlineCode",{parentName:"p"},"co"),", 可以看在 ",(0,s.kt)("a",c({parentName:"p"},{href:"https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/Generator%E6%9C%AD%E8%AE%B0.md#generator-%E5%87%BD%E6%95%B0%E7%9A%84%E5%BC%82%E6%AD%A5%E5%BA%94%E7%94%A8"}),"Generator 函数的异步应用")," 的实现。"),(0,s.kt)("h3",null,"异步遍历器"),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},(0,s.kt)("a",c({parentName:"p"},{href:"https://github.com/tc39/proposal-async-iteration"}),"proposal-async-iteration"),", 异步遍历器也已经到了 stage 4。")),(0,s.kt)("h4",null,"异步迭代器"),(0,s.kt)("p",null,"同步场景下可以通过如下获取 ",(0,s.kt)("inlineCode",{parentName:"p"},"value"),"、 ",(0,s.kt)("inlineCode",{parentName:"p"},"done"),":"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"const { value, done } = syncIterator.next()\n")),(0,s.kt)("p",null,"异步场景下可以通过如下方式获取 ",(0,s.kt)("inlineCode",{parentName:"p"},"value"),"、 ",(0,s.kt)("inlineCode",{parentName:"p"},"done")),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"asyncIterator.next().then({ value, done } => {})\n")),(0,s.kt)("h4",null,"for await .. of"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-js"}),"for await (const line of readLines(filePath)) {\n  console.log(line)\n}\n")))}i.isMDXComponent=!0}}]);