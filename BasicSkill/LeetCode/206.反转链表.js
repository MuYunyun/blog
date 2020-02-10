/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  let cur = head
  let next = head.next

  while (cur.next) {
    if (prev === null) {
      cur.next = null
    } else {
      cur.next = prev
    }
    prev = cur
    cur = next
    next = next.next
  }

  return head
};
// @lc code=end

