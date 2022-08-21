/**
 * 给定一个单链表的头节点head，请判断该链表是否为回文结构
 */

/**
 * 1. 借助栈 需要额外空间复杂度O(n)
 * Palindrome 回文的
 */

function isPalindrome(head) {
  if (!head || !head.next) {
    return true;
  }
  let stack = [];
  let cur = head;
  while (cur) {
    stack.push(cur);
    cur = cur.next;
  }
  while (head) {
    if (head.value !== stack.pop().value) return false;
    head = head.next;
  }
  return true;
}

/**
 * o(1)的额外空间复杂度
 * @param {*} head
 * @returns
 */
function isPalindrome(head) {
  if (!head || !head.next) {
    return true;
  }

  let n1 = head;
  let n2 = head;
  while (n2.next && n2.next.next) {
    n1 = n1.next;
    n2 = n2.next.next;
  }
  // n1 是找到的中点位置
  n2 = n1.next; //n2 记住 n1.next
  n1.next = null; //让中点的节点 指向null

  //   反转中点往后的链表
  let n3 = null;
  while (n2) {
    n3 = n2.next;
    n2.next = n1;
    n1 = n2;
    n2 = n3;
  }
  n3 = n1; //保存最后的节点
  //反转完成后 n1 指向的是尾节点
  n2 = head;
  let res = true;
  while (n1 && n2) {
    if (n1.value !== n2.value) {
      res = false;
      break;
    }
    n1 = n1.next;
    n2 = n2.next;
  }

  //   恢复原来链表的结构

  n1 = n3.next;
  n3.next = null;

  while (n1) {
    n2 = n1.next;
    n1.next = n3;
    n3 = n1;
    n1 = n2;
  }
  return res;
}

function reverse(head) {
  let cur = head,
    pre = null,
    next = null;
  while (cur) {
    next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
}
