### 144.Binary Tree Preorder Traversal

Given a binary tree, return the `preorder traversal` of its nodes' values.

Example:

```js
Input: [1,null,2,3]
   1
  / \
null 2
    / \
   3 null

Output: [1,2,3]
```

Follow up: Recursive solution is trivial, could you do it `iteratively`?

### Analyze

构建 tree

```js
var tree1 = new TreeNode(1)
var tree2 = new TreeNode(2)
var tree3 = new TreeNode(3)
tree2.left = tree3
tree1.left = null
tree1.right = tree2
```

首先给出递归解法, 代码很短。

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
var preorderTraversal = function(root) {
  if (root) {
    return [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)]
  } else {
		return []
	}
}
```

### 扩展 —— 递归和栈的关系

```js
       1
      / \
     2   3
```

针对树 `[1, 2, 3]`, 观察下系统栈的执行过程。
