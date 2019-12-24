### ES5 之继承

#### 基于构造函数的继承

```js
function Parent1() {
  this.parent1 = 'parent1'
  this.arr = [1, 2, 3]
}

Parent1.prototype.walk = 'I can walk'

function Child1() {
  Parent1.call(this)
  this.child1 = 'child1'
}

const child11 = new Child1()
const child12 = new Child1()

// 测试
child11.parent1 // parent1
child11.walk    // undefined

child11.arr.push(4)
child11.arr // [1, 2, 3, 4]
child12.arr // [1, 2, 3]
```

* 优点: 构造函数的 属性具有唯一性(child11.arr 与 child12.arr), 可参考[红皮书里的细节](https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E5%9F%BA%E7%A1%80%E7%AF%87/%E4%BA%8C%E5%88%B7%E9%AB%98%E7%A8%8B.md#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F)
* 缺点: 只能继承父类函数的方法和属性, 而不能继承原型对象的方法和属性

#### 基于原型链的继承

```js
function Parent2() {
  this.parent2 = 'parent2'
  this.arr = [1, 2, 3]
}

Parent2.prototype.walk = 'I can walk'

function Child2() {
  this.child2 = 'child2'
}

Child2.prototype = new Parent2()

const child21 = new Child2()
const child22 = new Child2()

// 测试
child21.parent2 // parent2
child21.walk    // I can walk

child21.arr.push(4)
child21.arr // [1, 2, 3, 4]
child22.arr // [1, 2, 3, 4]
```

* 优点: 继承父类函数的方法和属性同时继承了原型对象的方法和属性
* 缺点: 当在一个子类的实例上修改父类的属性和方法时, 其它的子类也会受到影响(相当于改变了子类原型链上的属性, 可以参考[二刷高程](https://github.com/MuYunyun/blog/blob/master/BasicSkill/%E5%9F%BA%E7%A1%80%E7%AF%87/%E4%BA%8C%E5%88%B7%E9%AB%98%E7%A8%8B.md#%E5%8E%9F%E5%9E%8B%E9%93%BE%E6%A8%A1%E5%BC%8F)

------ 补充 ------

补充下 Object.create() 这个 api, 也将它归类到基于原型链的继承。当继承的对象属性没变化时, 可以使用它。

* 优点: 可以少写一个构造函数
* 缺点: 同上述基于原型链继承的缺点

#### 组合继承

```js
function Parent3() {
  this.parent3 = 'parent3'
  this.arr = [1, 2, 3]
}

Parent3.prototype.walk = 'I can walk'

function Child3() {
  Parent3.call(this)  // 这里执行第一次父类
  this.child3 = 'child3'
}

Child3.prototype = new Parent3() // 这里执行第二次父类, 原型继承发现只要把父子的原型对象绑定起来就好, 可以写成 Child3.prototype = new Parent3()>__proto__ 也正常
const child31 = new Child3()
const child32 = new Child3()

// 测试
child31.parent3 // parent3
child31.walk    // I can walk

child31.arr.push(4)
child31.arr // [1, 2, 3, 4]
child32.arr // [1, 2, 3]
```

* 优点: 结合了构造函数继承和原型链继承的优点
* 缺点: 父类方法调用了两次, 而且不能判断实例的构造函数是子类还是父类

#### 组合继承优化一

```js
function Parent4() {
  this.parent4 = 'parent4'
  this.arr = [1, 2, 3]
}

Parent4.prototype.walk = 'I can walk'

function Child4() {
  Parent4.call(this)
  this.child4 = 'child4'
}

Child4.prototype = Parent4.prototype
const child41 = new Child4()
const child42 = new Child4()

// 测试
child41.parent4 // parent4
child41.walk    // I can walk

child41.arr.push(4)
child41.arr // [1, 2, 3, 4]
child42.arr // [1, 2, 3]

child41.constructor // Parent4
```

* 优点: 解决了调用两次的问题
* 缺点: 不能判断实例的构造函数是子类还是父类(此时 child41、child42 的构造函数指向 Parent4)

#### 组合继承优化二

```js
function Parent5() {
  this.parent5 = 'parent5'
  this.arr = [1, 2, 3]
}

Parent5.prototype.walk = 'I can walk'

function Child5() {
  Parent5.call(this)
  this.child5 = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype) // Object.create() 创建了一个中间对象, 起到隔离子类和父类的作用。
Child5.prototype.constructor = Child5
const child51 = new Child5()
const child52 = new Child5()

// 测试
child51.parent5 // parent5
child51.walk    // I can walk

child51.arr.push(4)
child51.arr // [1, 2, 3, 4]
child52.arr // [1, 2, 3]

child51.constructor // Child5
```

> Object.create() 的作用: Object.create(Parent5.prototype) 相当于一个空对象 {}, 这个空对象的 __proto__ 等于 Parent5.prototype, 所以这时候我们修改 Child5.prototype.constructor 实际上是在空对象上加上 constructor 属性。

优点: 解决了不能判断实例的构造函数是子类还是父类的问题

### 揭秘 ES6 继承之 super

#### constructor 中的 super

```js
function Parent(props) {
  this.props = props
}

class Child extends Parent {
  constructor() {
    super() // 这里
  }
}

var child = new Child({a: 1})

console.log(child.props) // undefined
```

为什么这里 child.props 会输出 undefined 呢, 让我们接着看以下两个例子。

```js
function Parent(props) {
  this.props = props
}

class Child extends Parent {
  constructor(props) {
    super(props)
  }
}

var child = new Child({a: 1})

console.log(child.props) // {a: 1}
```

```js
function Parent(props) {
  this.props = props
}

class Child extends Parent {

}

var child = new Child({a: 1})

console.log(child.props) // {a: 1}
```

可以看到第二种情况和第三种情况是相等的。继承中, 当子类没有写 constructor 时, 它会自动加上如下代码:

```js
constructor(props) {
  super(props)
}
```

简单作个结论: 当 ES6 的类函数中有 constructor 和 super 时, 它们后面必须得跟个参数 props(名字随意), 否则原型链上的对象无法获取到相应属性。

将之翻译成 ES5, 代码如下:

```js
function Parent(props) {
  this.props = props
}

function Child(props) {
  Parent.call(this, props) // 这里等价于 ES6 中 super(props)
}

Child.prototype = new Parent()
var child = new Child({a: 1})
```

#### 作为对象调用的 super

在下面的案例中, super 作为对象调用, 那么它指向什么呢？

```js
class Parent {
  parentFn() {
    console.log('I am parentFn')
  }
}

class Child extends Parent {
  childFn() {
    console.log(super.constructor)
    super.parentFn()
  }
}

var child = new Child()
child.childFn()

// Class Parent { ... }
// I am parentFn
```

打印结果已经作出了回答。super 在作为对象调用时, 它指向了父类对象的实例。