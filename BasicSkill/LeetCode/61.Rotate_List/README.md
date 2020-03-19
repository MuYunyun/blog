### 61.Rotate List

Given a linked list, rotate the list to the right by k places, where `k is non-negative`.

Example 1:

```js
Input: 1->2->3->4->5->NULL, k = 2
Output: 4->5->1->2->3->NULL

Explanation:
rotate 1 steps to the right: 5->1->2->3->4->NULL
rotate 2 steps to the right: 4->5->1->2->3->NULL
```

Example 2:

```js
Input: 0->1->2->NULL, k = 4
Output: 2->0->1->NULL
Explanation:
rotate 1 steps to the right: 2->0->1->NULL
rotate 2 steps to the right: 1->2->0->NULL
rotate 3 steps to the right: 0->1->2->NULL
rotate 4 steps to the right: 2->0->1->NULL
```

### Analyze

分析: 该题可以转化为从尾部向前数到第 k 个元素, 将该元素作为头节点, 同时将初始尾节点的下一个节点指向初始头节点。

1. 第一步: 遍历一遍链表得到初始尾结点 last;
2. 第二步: l 与 r 距离保持为 modK + 1;
3. 第三步: l 与 r 同时向右移动, 直到 r 为 null, 则 l 为要分割的元素;

> 此外如果链表长度为 0 或者链表长度与 k 相等时, 则链表实际上没有旋转交换位置。

```js
  l                r
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
                   .
                   .
                   l               r
dummy -> 1 -> 2 -> 3 -> 4 -> 5 -> NULL
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
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  const dummy = new ListNode(0)
  dummy.next = head
  let count = 0
  let last = dummy
  while (last.next) {
    last = last.next
    count++
  }

  if (count === 0 || count === k) return dummy.next
  const modK = k % count
  let diff = modK + 1

  let l = dummy
  let r = dummy
  while (diff--) {
    r = r.next
  }

  while (r) {
    r = r.next
    l = l.next
  }

  last.next = dummy.next
  dummy.next = l.next
  l.next = null

  return dummy.next
}
```

### Sister Title

19