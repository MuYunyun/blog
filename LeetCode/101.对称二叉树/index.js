/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root === null) {
    return true
  }
  return isMirror(root.left, root.right)
};

function isMirror(leftNode, rightNode) {
  if (leftNode === null && rightNode === null) {
    return true
  }

  if (leftNode === null || rightNode === null) {
    return false
  }

  if (leftNode.val === rightNode.val) {
    return isMirror(leftNode.left, rightNode.right) && isMirror(leftNode.right, rightNode.left)
  } else {
    return false
  }
}