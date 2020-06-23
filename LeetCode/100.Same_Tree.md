虽然是一道 easy 难度的题目, 但是可能状态不太好, 下次再重新 A 下。

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null && q === null) {
    return true
  } else if (p === null || q === null) {
    return false
  }

  if (p.val === q.val) {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  } else {
    return false
  }
};

```