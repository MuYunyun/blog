### 队列

队列的核心是 FIFO, 下面实现一个简单的队列:

```js
function Queue() {
  this.items = []
}

Queue.prototype.push = function(item) {
  this.items.push(item)
}

Queue.prototype.shift = function() {
  return this.items.shift()
}

Queue.prototype.isEmpty = function() {
  return this.items.length === 0
}

Queue.prototype.size = function() {
  return this.items.length
}

Queue.prototype.clear = function() {
  this.items = []
}
```

### 队列知识延伸

使用队列的一个典型场景是`树的广度遍历(BFS)`, 以下从 leetcode 中摘录了一些题目:

* [Binary Tree Level Order Traversal](https://github.com/MuYunyun/blog/blob/master/LeetCode/102.Binary_Tree_Level_Order_Traversal/README.md)

### 两种特殊队列

#### 最小优先队列

最小优先队列在生活中的例子: 比如普通用户上医院需要排队挂号, 但是具有 VIP 的用户能'插队'办理业务。用代码实现如下:

```js
// 继承 Queue 类
const PriorityQueue = function () {
  Queue.apply(this)
}

PriorityQueue.prototype = Object.create(Queue.prototype)

PriorityQueue.prototype.constructor = PriorityQueue

// 修改 push 方法
PriorityQueue.prototype.push = function(item, level) {
  if (this.isEmpty()) {
    this.items.push({ item, level })
  } else {
    let add = true
    for (let i = 0; i < this.size(); i++) {
      if (level < this.items[i].level) {
        add = false
        this.items.splice(i, 0, { item, level })
        return
      }
    }
    add && this.items.push({ item, level })
  }
}

PriorityQueue.prototype.print = function() {
  for (let obj of this.items) {
    console.log(obj.item)
  }
}
```

```js
// 调用
const queue = new PriorityQueue()
queue.push('张三', 2)
queue.push('李四', 1)
queue.push('赵五', 1)
queue.print() // 李四 赵五 张三
```

可以看到具有相同权限的李四和赵五依旧遵守队列的先进先出原则, 同时排在了张三的前面。

#### 循环队列

循环队列以击鼓传花为例, 代码实现如下:

```js
const drumGame = function(names, number) {
  const queue = new Queue()
  for (let i = 0; i < names.length; i++) {
    queue.push(names[i])
  }

  while (queue.size() > 1) {
    for (let i = 0; i < number; i++) {
      queue.push(queue.shift())  // 这句是循环队列的核心
    }
    const loser = queue.shift()
    console.log(loser + ' 出局')
  }
  return queue.shift()           // 留下的最后一个就是胜利者
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
const winner = drumGame(names, 7) // 假设每轮传花 7 次
console.log('胜利者是: ' + winner)

// Camila 出局
// Jack 出局
// Carl 出局
// Ingrid 出局
// 胜利者是: John
```
