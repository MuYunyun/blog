### 234.Palindrome Linked List

Given a singly linked list, determine if it is a palindrome.

Example 1:

```js
Input: 1->2
Output: false
```

Example 2:

```js
Input: 1->2->2->1
Output: true
```

Follow up:
Could you do it in O(n) time and O(1) space?

### Analyze

思路比较清晰直观, 步骤如下:

1. 第一步: 使用快慢指针找到链表中点, 链表分割为左右两部分;
2. 第二步: 翻转右边的链表节点;
3. 第三步: 比较左右两边的节点;

> 该题与题目 [143.Reorder_List](https://github.com/MuYunyun/blog/blob/master/LeetCode/143.Reorder_List/README.md) 十分类似。

步骤图解:

```js
第一步: 找中点, 分割链表;
                        q
              s
dummy -> 1 -> 2 -> 2 -> 1 -> NULL
              .
              .
                        q
              s
dummy -> 1 -> 2 -> 2 -> 1 -> NULL

left 链表:
1 -> 2 -> null

right 链表:
2 -> 1 -> null

第二步: 翻转右边的链表节点;

left 链表:
1 -> 2 -> null

right 链表:
1 -> 2 -> null

第三步: 判断 left 链表与 right 链表;
```

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  const dummy = new ListNode(0)
  dummy.next = head

  let slow = dummy, quick = dummy
  while (quick && quick.next) {
    slow = slow.next
    quick = quick.next.next
  }

  let right = slow.next
  slow.next = null
  let left = dummy.next

  right = reverseLink(right)

  while (left && right) {
    if (left.val !== right.val) {
      return false
    }
    left = left.next
    right = right.next
  }
  return true
}

function reverseLink(list) {
  const dummy = new ListNode(0)
  dummy.next = list

  let prev = null
  let cur = dummy.next

  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  return prev
}
```

![](http://with.muyunyun.cn/f1d261951e75505802e0b5b8ea8848bc.jpg)


### Sister Title

* [143.Reorder_List]((https://github.com/MuYunyun/blog/blob/master/LeetCode/143.Reorder_List/README.md))