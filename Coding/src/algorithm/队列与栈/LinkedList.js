function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

//反转链表
function reverseLinkedList() {
  let pre = null;
  let next = null;
  while (head != null) {
    next = head.next;
    head.next = pre;
    pre = head;
    head = next;
  }
  return pre;
}

//给定链表的头 和 一个值 在链表中删除节点值与之相等的节点
function removeValue(head, num) {
  //找到第一个不相等的节点
  while (head !== null) {
    if (head.value === num) {
      break;
    }
    head = head.next;
  }

  let pre = head;
  let cur = head;

  while (cur !== null) {
    if (cur.value === num) {
      pre.next = cur.next;
    } else {
      pre = cur;
    }
    cur = cur.next;
  }
  return head;
}
