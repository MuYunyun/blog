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

### Analyze

递归

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

迭代, 模拟系统栈

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
  if (!root) return []
  const stack = []
  stack.push(root)
  while(stack.length > 0) {
    const pickValue = stack.pop()
    printArr.push(pickValue.val)
    root.right && stack.push(root.right)
    root.left && stack.push(root.left)
  }
  return printArr
}
```

### Sister Title

144、94、145