### 集合

集合是一种`无重复元素, 无顺序`的数据结构。

ES6 引入的 Set 就是集合。

### 简易版 Set 实现

我们来动手实现一个简易版的 Set, 它拥有的 api 如下:

```js
add(value)

delete(value)

has(value)

clear()

size
```

```js
// 代码如下, 仅仅用来理解, 实现得不严谨
function Set() {
  this.items = {}
  this.size = 0
}

Set.prototype.add = function(value) {
  if (!this.items[value]) {
    this.items[value] = value // 这样子不能实现存储数组、对象
    this.size = Object.keys(this.items).length
  }
}

Set.prototype.has = function(value) {
  if (this.items.hasOwnProperty(value)) {
    return true
  } else {
    return false
  }
}

Set.prototype.delete = function(value) {
  for (let i in this.items) {
    if (this.items.hasOwnProperty(i)) {
      if (i === value.toString()) {
        delete(this.items[i])
        this.size = Object.keys(this.items).length
        return true
      }
    }
  }
}

Set.prototype.clear = function() {
  this.items = {}
  this.size = 0
}
```

### 并集、交集、差集、子集

业务中可能用数组多些, 如果碰到 set 类型的可以用 Array.from 将之转为数组类型, 再使用如下方法。

```js
// 并集
function union(arr1, arr2) {
  const arr = arr1.concat(arr2)
  const result = Array.from(new Set(arr))
  return result
}

// 交集
function intersection(arr1, arr2) {
  const result = arr1.filter(r => arr2.includes(r)) // 也可以转化为 set,用 has
  return result
}

// 差集
function difference(arr1, arr2) {
  const result = arr1.filter(r => !arr2.includes(r))
  return result
}

// 子集(判断 arr1 是否为 arr2 的子集)
function isSubset(arr1, arr2) {
  let bool = true
  arr1.forEach(r => {
    if (!arr2.includes(r)) {
      bool = false
      return
    }
  })
  return bool
}
```

### 创建 Set 对象

```js
// 方法一
const set1 = new Set()
set.add(1)

// 方法二
const set2 = new Set([1])
```