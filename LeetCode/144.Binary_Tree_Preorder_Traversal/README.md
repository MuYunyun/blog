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

递归解法:

第一次接触 tree 的题, 需注意以下几个问题

1. 确认返回类型为数组;

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
		return [root.val, ...preorderTraversal(root.left)]
		return [root.val, ...preorderTraversal(root.right)]
  } else {
		return []
	}
}
```