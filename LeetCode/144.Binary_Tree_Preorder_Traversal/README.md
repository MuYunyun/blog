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
   2   5
  / \
 3   4
```

针对如图剖析树在先序遍历下的递归操作, 其执行过程如下:

* 第一步: 打印 1;
* 第二步: 打印 2, 同时将 5 推入了系统栈;
* 第三步: 打印 3, 同时将 4 推入了系统栈;
* 第四步: 因为 3 没有左右子节点, 从系统栈中取出 4 打印;
* 第五步: 因为 2 的左右子节点都已穷举, 从系统栈中取出 5 打印;
* 第六步: 因为 5 没有左右子节点, 至此递归操作结束;

### Sister Title

144、94、145