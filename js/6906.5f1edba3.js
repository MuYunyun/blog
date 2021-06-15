(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6906],{16906:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>p});var r=t(59713),o=t.n(r),l=t(6479),s=t.n(l),c=(t(67294),t(3905));function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function u(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){o()(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var i={};function p(n){var e=n.components,t=s()(n,["components"]);return(0,c.kt)("wrapper",u(u(u({},i),t),{},{components:e,mdxType:"MDXLayout"}),(0,c.kt)("h2",null,"bind 函数实现"),(0,c.kt)("h3",null,"第一版: 借助 call/apply"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"Function.prototype.bind1 = function (context) {\n  const self = this\n  return function () {\n    return self.call(context)\n  }\n}\n\n// 测试:\nconst obj = {\n  value: 'muyy',\n}\nfunction testBind() {\n  console.log(this.value)\n}\nconst resultBind = testBind.bind1(obj)\nresultBind() // muyy\n")),(0,c.kt)("h3",null,"第二版: 借助 arguments"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"Function.prototype.bind2 = function (context) {\n  const arr = Array.prototype.slice.call(arguments, 1)\n  const self = this\n  return function () {\n    const restArr = Array.prototype.slice.call(arguments)\n    return self.apply(context, arr.concat(restArr))\n  }\n}\n")),(0,c.kt)("blockquote",null,(0,c.kt)("p",{parentName:"blockquote"},"这种方式的实现其实是函数柯里化的变版")),(0,c.kt)("p",null,"比如在监听事件时可以这样子用:"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"dom.addEventListener('click', fn.bind(this))\n")),(0,c.kt)("p",null,"进行如下测试:"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"const obj2 = {\n  value: 'muyy',\n}\nfunction testBind2(age, gender) {\n  console.log(this.value) // muyy\n  console.log(age)        // 23\n  console.log(gender)     // male\n}\nconst resultBind2 = testBind2.bind2(obj2, 23)\nresultBind2('male')\n")),(0,c.kt)("h3",null,"第三版: 区分环境, 是普通调用还是 new 调用"),(0,c.kt)("pre",null,(0,c.kt)("code",u({parentName:"pre"},{className:"language-js"}),"Function.prototype.bind3 = function (context) {\n  const arr = Array.prototype.slice.call(arguments, 1)\n  const self = this\n  return function () {\n    const restArr = Array.prototype.slice.call(arguments)\n    return self.apply(this !== windows ? this : context, arr.concat(restArr))\n  }\n}\n\n// 测试: 使用 new 以后 this 会指向 newObj\nconst obj3 = {\n  value: 'muyy',\n}\nfunction testBind3(age, gender) {\n  console.log(this.value)\n  console.log(age)\n  console.log(gender)\n}\nconst resultBind3 = testBind3.bind3(obj3, 23, 'male')\nconst newObj = new resultBind3()\n")))}p.isMDXComponent=!0}}]);