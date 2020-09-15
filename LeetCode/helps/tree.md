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
  const cacheObj = {}
  for (let i = 0; i < treeArr.length; i++) {
    cacheObj[`tree${i}`] = typeof treeArr[i] === 'number' && new TreeNode(treeArr[i])
  }

  for (let i = 0; i < treeArr.length; i++) {
    cacheObj[`tree${2 * i + 1}`] && (cacheObj[`tree${i}`].left = cacheObj[`tree${2 * i + 1}`])
    cacheObj[`tree${2 * i + 2}`] && (cacheObj[`tree${i}`].right = cacheObj[`tree${2 * i + 2}`])
  }

  return cacheObj['tree0']
}
```
