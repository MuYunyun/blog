### tip

感想: 递归的思路还是精妙

### Analyze

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
 * @return {number}
 */
var maxDepth = function (root) {
  return root === null ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```