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

分析: 从尾部向前数第 k 个元素, 该元素作为头元素, 原来的头放在原来的尾后面。

```js
              l
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
  let tmp = dummy.next
  while (tmp) {
    tmp = tmp.next
    count++
  }

  const modK = k % count


}
```

### Sister Title

19