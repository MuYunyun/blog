(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8312],{78312:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>u});var a=n(59713),l=n.n(a),r=n(6479),i=n.n(r),s=(n(67294),n(3905));function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){l()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var o={};function u(e){var t=e.components,n=i()(e,["components"]);return(0,s.kt)("wrapper",c(c(c({},o),n),{},{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"TypeScript 并不是一个完全新的语言, 它是 JavaScript 的超集，为 JavaScript 的生态增加了类型机制，并最终将代码编译为纯粹的 JavaScript 代码。"),(0,s.kt)("h2",null,"TypeScript 简介"),(0,s.kt)("p",null,"TypeScript 由 Microsoft(算上 Angular 2 的话加上 Google)开发和维护的一种开源编程语言。 它支持 JavaScript 的所有语法和语义，同时通过作为 ECMAScript 的超集来提供一些额外的功能，如类型检测和更丰富的语法。下图显示了 TypeScript 与 ES5，ES2015，ES2016 之间的关系。"),(0,s.kt)("p",null,(0,s.kt)("img",c({parentName:"p"},{src:"http://with.muyunyun.cn/da62039bf146c2ebd615ef1d11a1a808.jpg",alt:null}))),(0,s.kt)("h2",null,"使用 TypeScript 的原因"),(0,s.kt)("p",null,"JavaScript 是一门弱类型语言，变量的数据类型具有动态性，只有执行时才能确定变量的类型，这种后知后觉的认错方法会让开发者成为调试大师，但无益于编程能力的提升，还会降低开发效率。TypeScript 的类型机制可以有效杜绝由变量类型引起的误用问题，而且开发者可以控制对类型的监控程度，是严格限制变量类型还是宽松限制变量类型，都取决于开发者的开发需求。添加类型机制之后，副作用主要有两个：增大了开发人员的学习曲线，增加了设定类型的开发时间。总体而言，这些付出相对于代码的健壮性和可维护性，都是值得的。"),(0,s.kt)("p",null,"此外，类型注释是 TypeScript 的内置功能之一，允许文本编辑器和 IDE 可以对我们的代码执行更好的静态分析。这意味着我们可以通过自动编译工具的帮助，在编写代码时减少错误，从而提高我们的生产力。"),(0,s.kt)("p",null,"对 TypeScript 的简介到此，接下来对其特有的知识点进行简单概括总结。"),(0,s.kt)("h2",null,"数据类型"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/MuYunyun/blog/blob/main/TypeScript/Types.md"}),"数据类型"))),(0,s.kt)("h2",null,"函数"),(0,s.kt)("h3",null,"为函数定义类型"),(0,s.kt)("p",null,"我们可以给每个参数添加类型之后再为函数本身添加返回值类型。TypeScript 能够根据返回语句自动推断出返回值类型，因此我们通常省略它。下面函数 add, add2, add3 的效果是一样的，其中是 add3 函数是函数完整类型。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'function add(x: string, y: string): string{\n  return "Hello TypeScript"\n}\n\nlet add2 = function(x: string, y: string): string{\n  return "Hello TypeScript"\n}\n\nlet add3: (x: string, y: string) => string = function(x: string, y: string): string{\n  return "Hello TypeScript"\n}\n')),(0,s.kt)("h3",null,"可选参数和默认参数"),(0,s.kt)("p",null,"JavaScript 里，每个参数都是可选的，可传可不传。没传参的时候，它的值就是 undefined。 在 TypeScript 里我们可以在参数名旁使用 ? 实现可选参数的功能。 比如，我们想让 lastname 是可选的:"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'function buildName(firstName: string, lastname?: string){\n  console.log(lastname ? firstName + "" + lastname : firstName)\n}\n\nlet res1 = buildName("鸣","人")        // 鸣人\nlet res2 = buildName("鸣")             // 鸣\nlet res3 = buildName("鸣", "人", "君") // Supplied parameters do not match any signature of call target.\n')),(0,s.kt)("p",null,"如果带默认值的参数出现在必须参数前面，用户必须明确的传入 undefined 值来获得默认值。 例如，我们重写上例子，让 firstName 是带默认值的参数："),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'function buildName2(firstName = "鸣", lastName?: string){\n  console.log(firstName + "" + lastName)\n}\n\nlet res4 = buildName2("人")            // 人\nlet res5 = buildName2(undefined, "人") // 鸣人\n')),(0,s.kt)("h2",null,"类"),(0,s.kt)("p",null,"传统的 JavaScript 程序使用函数和基于原型的继承来创建可重用的组件，但对于熟悉使用面向对象方式的程序员来讲就有些棘手，因为他们用的是基于类的继承并且对象是由类构建出来的。 从 ECMAScript 2015，也就是 ECMAScript 6 开始，JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行，而不需要等到下个 JavaScript 版本。"),(0,s.kt)("h3",null,"类"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),"class Person{\n  name:string // 这个是对后文this.name类型的定义\n  age:number\n  constructor(name:string,age:number){\n    this.name = name\n    this.age = age\n  }\n  print(){\n    return this.name + this.age\n  }\n}\n\nlet person:Person = new Person('muyy',23)\nconsole.log(person.print()) // muyy23\n")),(0,s.kt)("p",null,"我们在引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。其实这本质上还是 ES6 的知识，只是在 ES6 的基础上多上了对 this 字段和引用参数的类型声明。"),(0,s.kt)("h3",null,"继承"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'class Person{\n  public name:string  // public、private、static 是 typescript 中的类访问修饰符\n  age:number\n  constructor(name:string,age:number){\n    this.name = name\n    this.age = age\n  }\n  tell(){\n    console.log(this.name + this.age)\n  }\n}\n\nclass Student extends Person{\n  gender:string\n  constructor(gender:string){\n    super("muyy",23)\n    this.gender = gender\n  }\n  tell(){\n    console.log(this.name + this.age + this.gender)\n  }\n}\n\nvar student = new Student("male")\nstudent.tell()  // muyy23male\n')),(0,s.kt)("p",null,"这个例子展示了 TypeScript 中继承的一些特征，可以看到其实也是 ES6 的知识上加上类型声明。不过这里多了一个知识点 —— 公共，私有，以及受保护的修饰符。TypeScript 里，成员默认为 public ；当成员被标记成 private 时，它就不能在声明它的类的外部访问；protected 修饰符与 private 修饰符的行为很相似，但有一点不同，protected 成员在派生类中仍然可以访问。"),(0,s.kt)("h3",null,"存储器"),(0,s.kt)("p",null,"TypeScript 支持通过 getters/setters 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。"),(0,s.kt)("p",null,"对于存取器有下面几点需要注意的：\n首先，存取器要求你将编译器设置为输出 ECMAScript 5 或更高。 不支持降级到 ECMAScript 3。 其次，只带有 get 不带有 set 的存取器自动被推断为 readonly。 这在从代码生成 .d.ts 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'class Hello{\n  private _name: string\n  private _age: number\n  get name(): string {\n    return this._name\n  }\n  set name(value: string) {\n    this._name = value\n  }\n  get age(): number{\n    return this._age\n  }\n  set age(age: number) {\n    if(age>0 && age<100){\n      console.log("年龄在0-100之间") // 年龄在0-100之间\n      return\n    }\n    this._age = age\n  }\n}\n\nlet hello = new Hello()\nhello.name = "muyy"\nhello.age = 23\nconsole.log(hello.name) // muyy\n')),(0,s.kt)("h2",null,"接口"),(0,s.kt)("h3",null,"接口"),(0,s.kt)("p",null,"TypeScript 的核心原则之一是对值所具有的结构进行类型检查。在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'interface LabelValue{\n  label: string\n}\n\nfunction printLabel(labelObj: LabelValue){\n  console.log(labelObj.label)\n}\n\nlet myObj = {\n  "label":"hello Interface"\n}\nprintLabel(myObj)\n')),(0,s.kt)("p",null,"LabelledValue 接口就好比一个名字，它代表了有一个 label 属性且类型为 string 的对象。只要传入的对象满足上述必要条件，那么它就是被允许的。"),(0,s.kt)("p",null,"另外，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。"),(0,s.kt)("h3",null,"可选属性"),(0,s.kt)("p",null,"带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 ? 符号。可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'interface Person{\n  name?:string\n  age?:number\n}\n\nfunction printInfo(info:Person){\n  console.log(info)\n}\n\nlet info = {\n  "name":"muyy",\n  "age":23\n}\n\nprintInfo(info) // {"name": "muyy", "age": 23}\n\nlet info2 = {\n  "name":"muyy"\n}\n\nprintInfo(info2) // {"name": "muyy"}\n')),(0,s.kt)("h3",null,"函数类型"),(0,s.kt)("p",null,"接口能够描述 JavaScript 中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接口也可以描述函数类型。定义的函数类型接口就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。定义后完成后，我们可以像使用其它接口一样使用这个函数类型的接口。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'interface SearchFunc{\n  (source: string, subString: string): boolean\n}\n\nlet mySearch: SearchFunc\nmySearch = function(source: string,subString: string){\n  return source.search(subString) !== -1\n}\n\nconsole.log(mySearch("鸣人","鸣")) // true\nconsole.log(mySearch("鸣人","缨")) // false\n')),(0,s.kt)("h3",null,"可索引类型"),(0,s.kt)("p",null,"与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，比如 ",(0,s.kt)("inlineCode",{parentName:"p"},"a[10]")," 或 ",(0,s.kt)("inlineCode",{parentName:"p"},'ageMap["daniel"]'),"。 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 让我们看如下例子："),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'interface StringArray{\n  [index: number]: string\n}\n\nlet MyArray: StringArray\nMyArray = ["是","云","随","风"]\nconsole.log(MyArray[2]) // 随\n')),(0,s.kt)("h3",null,"类类型"),(0,s.kt)("p",null,"与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去符合某种契约。"),(0,s.kt)("p",null,"我们可以在接口中描述一个方法，在类里实现它，如同下面的 ",(0,s.kt)("inlineCode",{parentName:"p"},"setTime")," 方法一样："),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),"interface ClockInterface{\n  currentTime: Date\n  setTime(d: Date)\n}\n\nclass Clock implements ClockInterface{\n  currentTime: Date\n  setTime(d: Date){\n    this.currentTime = d\n  }\n  constructor(h: number, m: number) {}\n}\n")),(0,s.kt)("h3",null,"继承接口"),(0,s.kt)("p",null,"和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),'interface Shape{\n  color: string\n}\n\ninterface PenStroke{\n  penWidth: number\n}\n\ninterface Square extends Shape,PenStroke{\n  sideLength: number\n}\n\nlet s = <Square>{}\ns.color = "blue"\ns.penWidth = 100\ns.sideLength = 10\n')),(0,s.kt)("h2",null,"模块"),(0,s.kt)("p",null,"TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),"export interface StringValidator{\n  isAcceptable(s:string): boolean\n}\n\nvar strReg = /^[A-Za-z]+$/\nvar numReg = /^[0-9]+$/\n\nexport class letterValidator implements StringValidator{\n  isAcceptable(s:string): boolean{\n    return strReg.test(s)\n  }\n}\n\nexport class zipCode implements StringValidator{\n  isAcceptable(s: string): boolean{\n    return s.length == 5 && numReg.test(s)\n  }\n}\n")),(0,s.kt)("h2",null,"泛型"),(0,s.kt)("p",null,"软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。\n在像 C# 和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。"),(0,s.kt)("h3",null,"初探泛型"),(0,s.kt)("p",null,"如下代码，我们给 Hello 函数添加了类型变量 T ，T 帮助我们捕获用户传入的类型（比如：string）。我们把这个版本的 Hello 函数叫做泛型，因为它可以适用于多个类型。 代码中 ",(0,s.kt)("inlineCode",{parentName:"p"},"output")," 和 ",(0,s.kt)("inlineCode",{parentName:"p"},"output2")," 是效果是相同的，第二种方法更加普遍，利用了类型推论 —— 即编译器会根据传入的参数自动地帮助我们确定 T 的类型:"),(0,s.kt)("pre",null,(0,s.kt)("code",c({parentName:"pre"},{className:"language-ts"}),"function Hello<T>(arg:T):T{\n  return arg;\n}\n\nlet outPut = Hello<string>('Hello Generic');\nlet output2 = Hello('Hello Generic')\n\nconsole.log(outPut);\nconsole.log(outPut2);\n")),(0,s.kt)("h2",null,"参考资料"),(0,s.kt)("ul",c({},{className:"contains-task-list"}),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!0,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/basic-types.html"}),"Basic Types")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!0,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/namespaces.html"}),"Namespaces")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/type-inference.html"}),"Type Inference")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/type-compatibility.html"}),"Type Compatibility")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/advanced-types.html"}),"Advanced Types")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!0,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html"}),"Triple-Slash Directives")),(0,s.kt)("li",c({parentName:"ul"},{className:"task-list-item"}),(0,s.kt)("input",c({parentName:"li"},{type:"checkbox",checked:!1,disabled:!0}))," ",(0,s.kt)("a",c({parentName:"li"},{href:"httpas://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html"}),"Type Checking JavaScript Files"))),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/type-challenges/type-challenges"}),"type-challenges"),": typescript 体操"),(0,s.kt)("li",{parentName:"ul"},"Typescript 工具库",(0,s.kt)("ul",{parentName:"li"},(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/millsp/ts-toolbelt"}),"ts-toolbelt")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/piotrwitek/utility-types"}),"utility-types")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash"}),"DefinitelyTyped lodash types")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/hacker0limbo/ts-fp-light"}),"ts-fp-light")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://github.com/krzkaczor/ts-essentials"}),"ts-essentials")))),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("a",c({parentName:"li"},{href:"https://juejin.cn/post/6994102811218673700"}),"Ts 高手篇：22 个示例深入讲解 Ts 最晦涩难懂的高级类型工具"))),(0,s.kt)("blockquote",null,(0,s.kt)("p",{parentName:"blockquote"},"文章起笔于 2017-07-02")))}u.isMDXComponent=!0}}]);