### 94.Binary Tree Inorder Traversal

Given a binary tree, return the inorder traversal of its nodes' values.

Example:

```js
Input: [1,null,2,3]
    1
  /   \
null   2
      /
    3

Output: [1,3,2]
```

Follow up: Recursive solution is trivial, could you do it iteratively?

### 递归法

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
var inorderTraversal = function(root) {
  if (root) {
    return [...inorderTraversal(root.left), root.val, ...inorderTraversal(root.right)]
  } else {
    return []
  }
}
```

### 颜色标记法(迭代法, 模拟系统栈)

使用`颜色标记法`剖析树在中序遍历下的递归操作, 思路如下:

1. 将访问过的元素标记为灰色, 未访问过的元素标记为白色;
2. 从栈顶取出访问元素:
   1. 若为灰色元素, 则打印之;
   2. 若为白色元素, 按照`右 -> 中 -> 左`的顺序推入栈, 同时将白色元素标记为灰色元素;

```js
     4
    / \
   2   5
  / \
 1   3
```

在如上所示树中, 模拟系统栈图解其执行过程如下:

```js
white 2
gray  4
white 5

white 1
gray  2
white 3
gray  4
white 5

gray  1
gray  2
white 3
gray  4
white 5

white 3
gray  4
white 5
```

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
var inorderTraversal = function(root) {
  const printArr = []
  if (!root) return printArr
  const stack = []
  stack.push({
    color: 'white',
    node: root
  })

  while (stack.length > 0) {
    const pickValue = stack.pop()
    const { color, node } = pickValue
    if (color === 'gray') {
      printArr.push(node.val)
    } else {
      node.right && stack.push({ color: 'white', node: node.right })
      stack.push({ color: 'gray', node })
      node.left && stack.push({ color: 'white', node: node.left })
    }
  }

  return printArr
}
```

### Sister Title

144、94、145