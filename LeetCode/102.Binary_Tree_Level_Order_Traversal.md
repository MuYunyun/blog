### 102.Binary Tree Level Order Traversal

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],

```js
    3
   / \
  9  20
    /  \
   15   7
```

return its level order traversal as:

```js
[
  [3],
  [9,20],
  [15,7]
]
```

### Analyze

解析: 该题考察的是`树的广度遍历(BFS)`, 运用到了`队列`相关知识;

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const printArr = []
  if (!root) return printArr
  const list = []
  list.push({ node: root, level: 0 })
  while (list.length > 0) {
    const { node, level } = list.shift()
    if (!printArr[level]) {
      printArr[level] = []
    }
    printArr[level].push(node.val)
    node.left && list.push({ node: node.left, level: level + 1 })
    node.right && list.push({ node: node.right, level: level + 1 })
  }
  return printArr
}
```

![](http://with.muyunyun.cn/d668eecd2648eeb7345ed85e3f4d5316.jpg)

### Similar Title

107(Sister Title)、103、199