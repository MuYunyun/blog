### title

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例:

输入: 1->2->4, 1->3->4
输出: 1->1->2->3->4->4

### analyze

起先自己将列表转化为数组, 排序好再将它们重新转为列表, 貌似这种方法在 leetcode 中无效的。参考了题解, 用了递归的方法。

感想: 下次可以化为更简单的形式, 这样子比较容易想, 比如: 1->2, 1->3。

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  const arr1 = convertArr(l1)
  const arr2 = convertArr(l2)

  const arr = arr1.concat(arr2).sort((r1, r2) => r1 - r2)
  let pick, mergeResult, temp
  while (pick = arr.shift()) {
    if (temp) {
      temp.next = new ListNode(pick)
      temp = temp.next
    } else {
      mergeResult = temp = new ListNode(pick)
    }
  }
  return mergeResult
};

var convertArr = function (ListNode) {
  const arr = []
  while (ListNode) {
    arr.push(ListNode.val)
    ListNode = ListNode.next
  }
  return arr
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// ------------------ leetcode 貌似不能用 ListNode 方法

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// 输入: 1 2   1 3
// 输出: 1->1->2
var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  }
}
```