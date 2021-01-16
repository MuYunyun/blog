### 107.Binary Tree Level Order Traversal II

Given a binary tree, return the `bottom-up` level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree [3,9,20,null,null,15,7],

```js
    3
   / \
  9  20
    /  \
   15   7
```

return its bottom-up level order traversal as:

```js
[
  [15,7],
  [9,20],
  [3]
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
var levelOrderBottom = function(root) {
  const printArr = []
  if (!root) return printArr
  const list = []
  list.push({ node: root, level: 0 })
  while (list.length > 0) {
    const { node, level } = list.shift()
    if (!printArr[level]) {
      printArr.unshift([])
    }
    printArr[0].push(node.val)
    node.left && (list.push({ node: node.left, level: level + 1 }))
    node.right && (list.push({ node: node.right, level: level + 1 }))
  }
  return printArr
}
```

### Similar Title

102(Sister Title)、103、199