// 递归算法
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
var inorderTraversal = function (root) {
  const arr = []

  if (root) {
    helper(root, arr)
  }

  return arr
};

var helper = function(root, arr) {
  if (root.left) {
    helper(root.left, arr)
  }

  arr.push(root.val)

  if (root.right) {
    helper(root.right, arr)
  }
}