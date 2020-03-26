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

* 步骤一: 将 1 和左右子节点 2, 5 推入栈中; 打印 1 后, 从栈中移除 1;
* 步骤二: 将 2 的左右子节点 3, 4 推入栈中; 打印 2 后, 从栈中移除 2;
* 步骤三: 因为 3、4 都无左右子节点, 打印 3、4 后从栈中移除 3、4;
* 步骤四: 打印 5 后从栈中移除 5;

模拟系统栈实现图解:

```js
1    步骤一、二      3   步骤三、四
2  -------------->  4 -------------> []
5                   5
```

代码实现:

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
  const stack = []
  if (!root) return []
  stack.push(root.val)
  while (stack.length > 0) {

  }
}
```

### Sister Title

144、94、145