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

// 输入：1 2   1 3
// 输出：1->1->2
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
};