(self.webpackChunkblog=self.webpackChunkblog||[]).push([[3976],{93976:(t,n,e)=>{"use strict";e.r(n),e.d(n,{default:()=>f});var r=e(59713),o=e.n(r),p=e(6479),a=e.n(p),i=(e(67294),e(3905));function c(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?c(Object(e),!0).forEach((function(n){o()(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}var s={};function f(t){var n=t.components,e=a()(t,["components"]);return(0,i.kt)("wrapper",l(l(l({},s),e),{},{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h3",null,"模板方法模式"),(0,i.kt)("p",null,"定义: 在继承的基础上, 在父类中定义好执行的算法。"),(0,i.kt)("h3",null,"泡茶和泡咖啡"),(0,i.kt)("p",null,"来对比下泡茶和泡咖啡过程中的异同"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",l({parentName:"tr"},{align:"center"}),"步骤"),(0,i.kt)("th",l({parentName:"tr"},{align:"center"}),"泡茶"),(0,i.kt)("th",l({parentName:"tr"},{align:"center"}),"泡咖啡"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"1"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"烧开水"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"烧开水")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"2"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"浸泡茶叶"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"冲泡咖啡")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"3"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"倒入杯子"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"倒入杯子")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"4"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"加柠檬"),(0,i.kt)("td",l({parentName:"tr"},{align:"center"}),"加糖")))),(0,i.kt)("p",null,"可以清晰地看出仅仅在步骤 2 和 4 上有细微的差别, 下面着手实现:"),(0,i.kt)("pre",null,(0,i.kt)("code",l({parentName:"pre"},{className:"language-js"}),"const Drinks = function() {}\n\nDrinks.prototype.firstStep = function() {\n  console.log('烧开水')\n}\n\nDrinks.prototype.secondStep = function() {}\n\nDrinks.prototype.thirdStep = function() {\n  console.log('倒入杯子')\n}\n\nDrinks.prototype.fourthStep = function() {}\n\nDrinks.prototype.init = function() { // 模板方法模式核心: 在父类上定义好执行算法\n  this.firstStep()\n  this.secondStep()\n  this.thirdStep()\n  this.fourthStep()\n}\n\nconst Tea = function() {}\n\nTea.prototype = new Drinks\n\nTea.prototype.secondStep = function() {\n  console.log('浸泡茶叶')\n}\n\nTea.prototype.fourthStep = function() {\n  console.log('加柠檬')\n}\n\nconst Coffee = function() {}\n\nCoffee.prototype = new Drinks\n\nCoffee.prototype.secondStep = function() {\n  console.log('冲泡咖啡')\n}\n\nCoffee.prototype.fourthStep = function() {\n  console.log('加糖')\n}\n\nconst tea = new Tea()\ntea.init()\n\n// 烧开水\n// 浸泡茶叶\n// 倒入杯子\n// 加柠檬\n\nconst coffee = new Coffee()\ncoffee.init()\n\n// 烧开水\n// 冲泡咖啡\n// 倒入杯子\n// 加糖\n")),(0,i.kt)("h3",null,"钩子"),(0,i.kt)("p",null,"假如客人不想加佐料(糖、柠檬)怎么办, 这时可以引人钩子来实现之, 实现逻辑如下:"),(0,i.kt)("pre",null,(0,i.kt)("code",l({parentName:"pre"},{className:"language-js"}),"\n// ...\n\nDrinks.prototype.ifNeedFlavour = function() { // 加上钩子\n  return true\n}\n\nDrinks.prototype.init = function() { // 模板方法模式核心: 在父类上定义好执行算法\n  this.firstStep()\n  this.secondStep()\n  this.thirdStep()\n  if (this.ifNeedFlavour()) { // 默认是 true, 也就是要加调料\n    this.fourthStep()\n  }\n}\n\n// ...\nconst Coffee = function() {}\n\nCoffee.prototype = new Drinks()\n// ...\n\nCoffee.prototype.ifNeedFlavour = function() {\n  return window.confirm('是否需要佐料吗？') // 弹框选择是否佐料\n}\n")))}f.isMDXComponent=!0}}]);