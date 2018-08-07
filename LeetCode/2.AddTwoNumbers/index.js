// Keyword: single linked list

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
var addTwoNumbers = function(l1, l2) {
  let flag = 0
  let head = null,
      temp = null
  while (l1 || l2) {
    let sum = flag
    if (l1) {
      sum += l1.val
      l1 = l1.next
    }

    if (l2) {
      sum += l2.val
      l2 = l2.next
    }

    const obj = new ListNode(sum % 10)
    if (head === null) {
      head = obj
      temp = obj
    } else {
      temp.next = obj
      temp = obj
    }

    // 处理进位
    flag = 0
    if (sum >= 10) {
      flag = 1
    }
  }

  if (flag === 1) {
    const result = new ListNode(1)
    temp.next = result
    temp = result
  }
  return head
}