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

递归法:

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

迭代法, 模拟系统栈

### 扩展 —— 递归和栈的关系

```js
     4
    / \
   2   5
  / \
 1   3
```

使用`颜色标记法`剖析树在中序遍历下的递归操作, 模拟系统栈图解其执行过程如下:

它的思路如下:

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

-------------------------------

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

}
```

### Sister Title

144、94、145