/**
 * h    f1    f2
 *   s1 s2
 * 1 2  3  4  5  6
 *         s3      f3
 * 1 2  3  4  5  6 7
 * 返回中点或者上中点
 */

function midOrUpMidNode(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }

  let slow = head.next;
  let fast = head.next.next;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/***
 * 返回中点或者下中点
 */

function midOrDownNode(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  let slow = head.next;
  let fast = head.next;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/***
 * 返回中点或者上中点的前一个节点
 */

function midOrUpMidPreNode(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }
  let slow = head;
  let fast = head.next.next;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/**
 * 返回中点或者下中点的前一个节点
 */
function midOrDownMidPreNode(head) {
  if (!head || !head.next || !head.next.next) {
    return head;
  }

  let slow = head;
  let fast = head.next;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
