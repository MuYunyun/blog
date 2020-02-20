### title

Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.

Example 1:

```js
Input: 1->2->3->4->5->NULL
Output: 1->3->5->2->4->NULL
```

Example 2:

```js
Input: 2->1->3->5->6->4->7->NULL
Output: 2->3->6->7->1->5->4->NULL
```

Note:

* The relative order inside both the even and odd groups should remain as it was in the input;
* The first node is considered odd, the second node even and so on;

### Analyze

```js
       cur    next
Input:  1  ->  2  ->  3  ->  4  ->  5  ->  NULL
       prev   cur    next
        1  ->  2  ->  3  ->  4  ->  5  ->  NULL
                      .
                      .
                            prev   cur    next  遍历完成后, 如果此时是奇数位则将 cur 的指针指向偶数列表。
        1  ->  2  ->  3  ->  4  ->  5  ->  NULL


Output: 1  ->  3  ->  5  ->  2  ->  4  ->  NULL
```

* 将 prev 的 next 指向 next;
* 如何将奇数链表与偶数链表进行链接(末尾的链表可能为奇数位也可能为偶数位)?

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
 * @return {ListNode}
 */
var oddEvenList = function(head) {
  if (!head) return head
  const list = new ListNode(0)
  list.next = head
  const odd = list.next
  const even = odd.next

  let prev = null
  let cur = list.next
  let next = cur.next
  let count = 1

  while (next) {
    prev && (prev.next = next)
    prev = cur
    cur = next
    next = cur.next
    count++
  }

  if (count % 2 === 1) {
    prev && (prev.next = null)
    cur.next = even
  } else {
    prev.next = even
  }

  return odd
}
```