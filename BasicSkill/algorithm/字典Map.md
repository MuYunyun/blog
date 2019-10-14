### 字典

类似于集合, 字典也是一种`无重复元素`, `无顺序`的数据结构。

区别在于在集合中, 我们以 `[值,  值]` 的形式存储; 在字典中, 我们以 `[键, 值]` 的形式存储; 集合的知识点可以阅读 [集合](https://github.com/MuYunyun/blog/blob/master/BasicSkill/algorithm/集合.md)

ES6 引入的 Map 就是字典的数据类型。

#### 简易版 Map 实现

我们来动手实现一个简易版的 Map, 它拥有的 api 如下:

```js
function Map() {
  this.items = {}
  this.size = 0
}

Map.prototype.has = function(key) {
  for (let i in this.items) {
    if (this.items.hasOwnProperty(i)) {
      return true
    }
  }
  return false
}

Map.prototype.delete = function(key) {
  if (this.has(key)) {
    delete(this.items[key])
    this.size--
    return true
  }
  return false
}

Map.prototype.set = function(key, value) {
  this.items[key] = value // 这里是不严谨的实现
  this.size++
}

Map.prototype.get = function(key) {
  return this.items[key]
}

Map.prototype.clear = function() {
  this.items = {}
  this.size = 0
}

Map.prototype.values = function() {
  const arr = []
  Object.keys(this.items).forEach(r => {
    arr.push(this.items[r])
  })
  return arr
}
```

### 创建一个 Map 对象

```js
// 方式一
const map1 = new Map()
map.set('a', 1)

// 方式二
const map2 = new Map([['a', 1]])
```

### Map 和 WeakMap 的区别

Map 和 WeakMap 相差 Weak 这个单词, 本质知识点是对对象的直接引用(WeakMap)。它这个点造成的差异整理如下:

* Map 的 key 范围更广, WeakMap 的 key 只能为对象;
* Map 的 key 可以枚举, WeakMap 的 key 不能枚举;
* 垃圾回收相关, 见如下例子;

```js
var map = new Map();
var weakmap = new WeakMap();

(function(){
  var a = {x: 12}
  var b = {y: 12}

  map.set(a, 1)
  weakmap.set(b, 2)
})()
```

解析: 在这个例子中, IIFE 执行完后, 垃圾回收机制会回收常量 a, b。WeakMap 可以类比成直接对 b 的引用, Map 里可以类比成在其内部对 a 作了层拷贝。所以 map 依然保持着相应的 key 值的对象, 而 weakmap 的 key 值的对象以被回收(这步认为是垃圾回收机制做的)。它们的差异如下图所示:

```
// map
Map(1) {{…} => 1}
  size: (...)
  __proto__: Map
  [[Entries]]: Array(1)
    0: {Object => 1}
      key: {x: 12}
      value: 1

// weakmap
WeakMap {}
  __proto__: WeakMap
  [[Entries]]: Array(0)
    length: 0
```