### 103.Binary_Tree_Zigzag_Level_Order_Traversal

Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:

```js
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
```

return its zigzag level order traversal as:

```js
[
  [3],
  [20,9],
  [15,7]
]
```

### analyze

解析: 该题考察的是`树的广度遍历(BFS)`, 运用到了`队列`相关知识; 层级为奇数时顺序推入, 层级为偶数时逆序推入;

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
var zigzagLevelOrder = function(root) {
  const printArr = []
  if (!root) return printArr
  const list = []
  list.push({ level: 0, node: root })
  while(list.length > 0) {
    const { level, node } = list.shift()
    if (!printArr[level]) {
      printArr[level] = []
    }

    if (level % 2 === 0) {
      printArr[level].unshift(node.val)
    } else {
      printArr[level].push(node.val)
    }

    list.push({ level: level + 1, node })
  }

  return printArr
}
```

### Similar Title

102、107、103、199