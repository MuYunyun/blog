### 199.Binary Tree Right Side View

Given a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered `from top to bottom`.

Example:

```js
Input: [1, 2, 3, null, 5, null, 4]
Output: [1, 3, 4]
```

Explanation:

   1            <---
 /   \
2     3         <---
 \     \
  5     4       <---

### Analyze

将题目表述转化下为: 展示当前行的最右侧元素即可; 该题考察的是`树的广度遍历(BFS)`, 运用到了`队列`相关知识。

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
 * @return {number[]}
 */
var rightSideView = function(root) {
  const printList = []
  if (!root) { return [] }
  const list = []
  list.push({ level: 0, node: root })

  while(list.length > 0) {
    const { level, node } = list.shift()
    if (!printList[level]) {
      printList[level] = []
    }
    printList[level].push(node.val)

    node.left && list.push({ level: level + 1, node: node.left })
    node.right && list.push({ level: level + 1, node: node.right })
  }

  const result = []
  printList.map(printListArr => {
    result.push(printListArr[printListArr.length - 1])
  })
  return result
}
```

### Similar Title

102(Sister Title)、107、103