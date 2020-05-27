### 二叉树

![](http://with.muyunyun.cn/c3bc86f87907fedaeba86b0f5b96a71a.jpg-300)

这棵树中最多有两个分支, 因此是`二叉树`。

* `根节点`: 一棵树最顶部的节点
* `内部节点`: 在它上面还有其它内部节点或者叶节点的节点
* `叶节点`: 处于一棵树根部的节点
* `子树`: 由树中的内部节点和叶节点组成

### 概念延伸

* `完全二叉树`(compelete binary tree):
  * 除了最后一行都满;
  * 在最后一行不满的情况下不能只存有右子树而没有左子树;

```js
          1
       ↙     ↘
     2         3
  ↙
4
```

* `满二叉树`(full binary tree):
  * 每一行都满;

```js
           1
        ↙     ↘
     2          3
  ↙     ↘    ↙    ↘
4        5  6       7
```

* `二叉搜索树`(Binary Search Tree)
  * 左侧子节点的数字小于父节点, 右侧子节点的数字大于父节点

```js
           11
        ↙     ↘
     7          15
  ↙    ↘      ↙    ↘
8        9   13     20
```

* `平衡二叉树`

二叉收缩树最好的情况下查找效率是比较高, 比如上图中时间复杂度为 `O(logn)`, 其访问性能近似于二分查找, 但最差时时间复杂度为 `O(n)`, 如下示意:

```js
7
  ↘
    8
      ↘
        9
          ↘
            11
              ↘
                13
                  ↘
                    15
                      ↘
                        20
```

基于此需要在二叉搜索树基础上做一下平衡,

```js
7                                    8
  ↘              平衡后            ↙    ↘
    8           ------->         7        9
      ↘
        9
```

### 二叉搜索树的实现

```js
function BinarySearchTree() {
  function Node(key) {
    this.key = key
    this.left = null
    this.right = null
  }

  let root = null

  // 插入元素
  // 实现思路: 至顶向下插入, 先判断顶点是否为空；顶点为空则直接在该处插入, 若不为空, 则通过比较顶点的 key 和插入元素的 key 判断该插入到顶点的左侧还是右侧, 后面进行如上递归
  this.insert = function(key) {
    const node = new Node(key)
    if (root === null) {
      root = node
    } else {
      insertNode(root, node)
    }
    function insertNode(parent, node) {
      if (parent.key > node.key) {
        if (parent.left === null) {
          parent.left = node
        } else {
          insertNode(parent.left, node)
        }
      } else if (parent.key < node.key) {
        if (parent.right === null) {
          parent.right = node
        } else {
          insertNode(parent.right, node)
        }
      }
    }
  }

  // 中序遍历
  this.inOrderTraverse = function(cb) {
    inOrderTraverse(root, cb)
    function inOrderTraverse(node, cb) {
      if (node) {
        inOrderTraverse(node.left, cb)
        cb(node.key)
        inOrderTraverse(node.right, cb)
      }
    }
  }

  // 先序遍历
  this.preOrderTraverse = function(cb) {
    preOrderTraverse(root, cb)
    function preOrderTraverse(node, cb) {
      if (node) {
        cb(node.key)
        preOrderTraverse(node.left, cb)
        preOrderTraverse(node.right, cb)
      }
    }
  }

  // 后序遍历
  this.postOrderTraverse = function(cb) {
    postOrderTraverse(root, cb)
    function postOrderTraverse(node, cb) {
      if (node) {
        postOrderTraverse(node.left, cb)
        postOrderTraverse(node.right, cb)
        cb(node.key)
      }
    }
  }

  // 最大值: 思路最右边
  this.max = function() {
    let maxResult = {}
    function getMax(node) {
      if (node && node.right) {
        maxResult = node.right
        getMax(node.right)
      }
    }
    getMax(root)
    return maxResult.key
  }

  // 最小值: 思路最左边
  this.min = function() {
    let minResult = {}
    function getMin(node) {
      if (node && node.left) {
        minResult = node.left
        getMin(node.left)
      }
    }
    getMin(root)
    return minResult.key
  }

  // 查找指定元素
  this.search = function(key) {
    const searchKey = function(node) {
      if (!node) {
        return false
      }
      if (key > node.key) {
        return searchKey(node.right)
      } else if (key < node.key) {
        return searchKey(node.left)
      } else {
        return true
      }
    }

    return searchKey(root)
  }

  // 移除指定 key 值
  this.remove = function(key) {
    const removeKey = function(node, key) {
      if (key < node.key) {         // ① 如果 key 值在传入节点的左边
        node.left = removeKey(node.left, key)
        return node
      } else if (key > node.key) {  // ② 如果 key 值在传入节点的右边
        node.right = removeKey(node.right, key)
        return node
      } else {                      // ③ 如果找到了 key 值
        if (node.left === null && node.right === null) { // 删除的节点为根节点
          node = null
          return node
        }
        if (node.left === null) {                        // 删除的节点下有一个分支
          node = node.right
          return node
        } else if (node.right === null) {
          node = node.left
          return node
        }
        const minNode = findMinNode(node.right)          // 删除的节点下有两个分支
        node.key = minNode.key
        node.right = removeKey(node.right, minNode.key)
        return node
      }
    }

    // 查找最小的节点
    const findMinNode = function(node) {
      if (node.left) {
        return findMinNode(node.left)
      } else {
        return node
      }
    }

    removeKey(root, key)
  }
}

var tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
```

### 三种遍历方式的不同

* 中序遍历: 可用于`二叉搜索树的排序`

![](http://with.muyunyun.cn/ceeb68f801304f9910073708dd35ae64.jpg-300)

* 先序遍历: 可用于`打印结构化的文档`

![](http://with.muyunyun.cn/65df3e9414f594107d95127f8ab5a9a1.jpg-300)

* 后序遍历: 可用于查看文件夹目录

![](http://with.muyunyun.cn/212607e3b24b52c0df959902ed8e4b1f.jpg-300)

三种遍历的实现方式大同小异, 可在上面代码中观察到实现的差异。如下是 Leetcode 中对应三种不同遍历方式的题目:

* [Binary Tree Preorder Traversal](https://github.com/MuYunyun/blog/blob/master/LeetCode/144.Binary_Tree_Preorder_Traversal/README.md)
* [Binary Tree Inorder Traversal](https://github.com/MuYunyun/blog/blob/master/LeetCode/94.Binary_Tree_Inorder_Traversal/README.md)
* [Binary Tree Postorder Traversal](https://github.com/MuYunyun/blog/blob/master/LeetCode/145.Binary_Tree_Postorder_Traversal/README.md)

### remove 的几种情况

remove 方法是二叉查找树中相对复杂的实现。思路仍然是递归。

如果要删除的 key 在传入节点的左侧, 则递归调用 removeKey(node.left, key)；

如果要删除的 key 在传入节点的右侧, 则递归调用 removeKey(node.right, key)；

如果要删除的 key 与传入节点相等, 有如下三种情况:

①: 删除的节点为根节点

![](http://with.muyunyun.cn/65bd1b2b99db8a342423733d0480a7b6.jpg-300)

②: 删除的节点下有一个分支

![](http://with.muyunyun.cn/78707683d0498daa0115d445df11f83e.jpg-300)

③: 删除的节点下有两个分支

这里的思路是找到当前节点的右分支中最小的节点, 然后将该节点代替当前节点, 同时移除当前节点的右分支中最小的节点

![](http://with.muyunyun.cn/4107c561ed1134093333e1b16c7350f4.jpg-300)

### 测试用例

```js
var tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)

var cb = (key) => console.log(key)

tree.inOrderTraverse(cb)   // 中序遍历: 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
tree.preOrderTraverse(cb)  // 先序遍历: 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
tree.postOrderTraverse(cb) // 后序遍历: 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

tree.max() // 25
tree.max() // 3

tree.search(6) // true
tree.search(1) // false
```