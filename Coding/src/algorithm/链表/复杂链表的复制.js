/**
 *
 * copyRandomList
 *
 * 剑指 Offer 35. 复杂链表的复制
 */

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}
/**
 * hash表
 * @param {*} head
 */
var copyRandomList = function (head) {
  let map = new WeakMap();
  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur.val));
    cur = cur.next;
  }

  cur = head;
  while (cur) {
    let next = map.get(cur.next),
      random = map.get(cur.random);
    map.get(cur).next = next ? next : null;
    map.get(cur).random = random ? random : null;
    cur = cur.next;
  }
  return map.get(head);
};
/**
 * 思路 将克隆节点放在每个节点之后
 *  // 1 -> 2 -> 3 -> null
    // 1 -> 1' -> 2 -> 2' -> 3 -> 3'
    以这种方式 代替hash表
    1. 第一个 循环 先构造这个结构
    2. 第二个 循环 连接random指针
    3. 第三个 循环 分离克隆节点
 * 
 * @param {*} head 
 * @returns 
 */
var copyRandomList1 = function (head) {
  if (!head) return head;

  let cur = head,
    next = null;
  while (cur) {
    next = cur.next;
    cur.next = new Node(cur.val, null, null);
    cur.next.next = next;
    cur = next;
  }

  let copy = null;
  cur = head;
  while (cur) {
    next = cur.next.next;
    copy = cur.next;
    copy.random = cur.random ? cur.random.next : null;
    cur = next;
  }

  let res = head.next;
  cur = head;
  while (cur) {
    next = cur.next.next;
    copy = cur.next;
    cur.next = next;
    copy.next = next ? next.next : null;
    cur = next;
  }
  return res;
};
