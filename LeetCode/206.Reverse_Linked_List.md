### title

Reverse a singly linked list.

Example:

```js
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?

### Analyze

```js
      prev  cur  next
        1 -> 2 -> 3 -> 4 -> 5 -> null
null <- 1 -> 2 -> 3 -> 4 -> 5
```

step:

1. 定义三个变量 prev, cur, next 表示上一个值, 当前值, 下一个值;
2. 如果存在 cur.next 则将 cur.next 指向 prev;
3. 将 cur 移动到 next 位置, prev 移动到 cur 位置, 重复步骤 2;

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
var reverseList = function(head) {
  let prev = null
  let cur = head
  if (head) {
    let next = head.next
    while (cur.next) {
      cur.next = prev
      prev = cur
      cur = next
      next = next.next
    }
    cur.next = prev
  }
  return cur
};
```

这样写存在一些冗余的代码, 比如需要判断 head 是否为空, 同时因为 while 中的条件是 cur.next, 因为末尾的 cur.next 需要单独处理一遍, 比较麻烦, 因此进而优化。

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  let cur = head
  while (cur !== null) {
    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
};
```

根据题目的建议, 接着用递归的方式实现一遍(值得注意的是, 迭代与递归的写法都是能互相转换的。)

```js
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  let cur = head

  const recursiveFn = () => {
    if (cur === null) return

    let next = cur.next
    cur.next = prev
    prev = cur
    cur = next

    recursiveFn()
  }
  recursiveFn()
  return prev
};
```

### Sister Title

92