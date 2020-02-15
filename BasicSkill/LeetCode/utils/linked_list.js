// the function to create linked list
function createLinkedList() {
  function ListNode(val) {
    this.val = val;
    this.next = null;
  }
  const list1 = new ListNode(1);
  const list2 = new ListNode(2);
  const list3 = new ListNode(3);
  const list4 = new ListNode(4);
  const list5 = new ListNode(5);
  list4.next = list5;
  list3.next = list4;
  list2.next = list3;
  list1.next = list2;

  return list1
}
