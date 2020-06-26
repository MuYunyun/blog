```js
// ---- some useful fn to do with linked_list ----

/**
 * create tree node through tree array
 * this way supports three level tree temperaryly
 * becalse most test case in leetcode is less than 3 level.
 * input: [3, 9, 20, 6, null, 15, 7]
 * output:
         3
        / \
       9  20
     /   /  \
    6   15   7
 */
function createTree(treeArr) {
  function TreeNode(val) {
    this.val = val
    this.left = this.right = null
  }
  const tree1 = treeArr[0] && new TreeNode(treeArr[0])
  const tree2 = treeArr[1] && new TreeNode(treeArr[1])
  const tree3 = treeArr[2] && new TreeNode(treeArr[2])
  const tree4 = treeArr[3] && new TreeNode(treeArr[3])
  const tree5 = treeArr[4] && new TreeNode(treeArr[4])
  const tree6 = treeArr[5] && new TreeNode(treeArr[5])
  const tree7 = treeArr[6] && new TreeNode(treeArr[6])

  tree2 && (tree1.left = tree2)
  tree3 && (tree1.right = tree3)
  tree4 && (tree2.left = tree4)
  tree5 && (tree2.right = tree5)
  tree6 && (tree3.left = tree6)
  tree7 && (tree3.right = tree7)
  return tree1
}
```