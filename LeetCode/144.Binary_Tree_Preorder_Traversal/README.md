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

* 步骤一: 将根节点 1 推入栈;
* 步骤二: 从栈中取出顶部元素 1 并打印。
  * 由于存在右节点 5, 将其推入栈中;
  * 由于存在左节点 2, 将其推入栈中;
* 步骤三: 从栈中取出顶部元素 2 并打印。
  * 由于存在右节点 4, 将其推入栈中;
  * 由于存在左节点 3, 将其推入栈中;
* 步骤四: 从栈中取出顶部元素 3 并打印。
* 步骤五: 从栈中取出顶部元素 4 并打印。
* 步骤六: 从栈中取出顶部元素 5 并打印。

模拟系统栈实现图解:

```js
步骤一:
1

步骤二: 取出 1 并打印;
2
5

步骤三: 取出 2 并打印;
3
4
5

步骤四: 取出 3 并打印;
步骤四: 取出 4 并打印;
步骤四: 取出 5 并打印;
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
  const printArr = []
  const stack = []
  if (!root) return []
  stack.push(root)
  while (stack.length > 0) {
    const popValue = stack.pop()
    printArr.push(popValue.val)
    popValue.right && stack.push(popValue.right)
    popValue.left && stack.push(popValue.left)
  }
  return printArr
}
```

### Sister Title

144、94、145