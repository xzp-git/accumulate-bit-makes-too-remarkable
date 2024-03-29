/**
 * 查找两个链表的第一个相交的节点
 */

/**
 * 找到链表的第一个入环节点，如果没有返回null
 * getLoopNode
 */
function getLoopNode(head) {
  if (!head || !head.next || !head.next.next) return;

  let fast = head.next.next,
    slow = head.nextg;
  while (fast !== slow) {
    if (!fast.next || !fast.next.next) return null;
    fast = fast.next.next;
    slow = slow.next;
  }

  fast = head;
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}
//如果两个链表都无环，返回第一个相交节点，如果不想交，返回null
function nLoop(head1, head2) {
  if (!head1 || !head2) {
    return null;
  }
  let n = 0,
    cur1 = head1,
    cur2 = head2;

  while (cur1.next) {
    n++;
    cur1 = cur1.next;
  }
  while (cur2.next) {
    n--;
    cur2 = cur.next;
  }
  if (cur2 !== cur1) {
    return null;
  }

  cur1 = n > 0 ? head1 : head2;
  cur2 = cur1 === head1 ? head2 : head1;

  n = Math.abs(n);
  while (n) {
    n--;
    cur1 = cur1.next;
  }

  while (cur1 !== cur2) {
    cur1 = cur1.next;
    cur2 = cur2.next;
  }
  return cur1;
}

// 两个有环链表，返回第一个相交节点，如果不想交返回null
// 两个 环状链表 相交有两种情况，
// 一种是 相交的节点 在环之外即两个入环节点相同的时候loop1 === loop2
// 另一种是 相交的节点 在 环上 即两个 入环节点 不相同的时候 loop1 !== loop2
// 要么就是不相交
function bothLoop(head1, loop1, head2, loop2) {
  let cur1 = null,
    cur2 = null;

  if (loop1 === loop2) {
    cur1 = head1;
    cur2 = head2;
    let n = 0;

    while (cur1 != loop1) {
      n++;
      cur1 = cur1.next;
    }
    while (cur2 != loop2) {
      n--;
      cur2 = cur2.next;
    }

    cur1 = n > 0 ? head1 : head2;
    cur2 = cur1 === head1 ? head2 : head1;
    n = Math.abs(n);

    while (n) {
      n--;
      cur1 = cur1.next;
    }

    while (cur1 !== cur2) {
      cur1 = cur1.next;
      cur2 = cur2.next;
    }
    return cur1;
  } else {
    cur1 = loop1.next;
    while (cur1 !== loop1) {
      if (cur1 === loop2) {
        return loop1;
      }
      cur1 = cur1.next;
    }
    return null;
  }
}

function getIntersectNode(head1, head2) {
  if (!head1 || !head2) return null;

  let loop1 = getLoopNode(head1);
  let loop2 = getLoopNode(head2);

  if (!loop1 && !loop2) {
    return nLoop(head1, head2);
  }

  if (loop1 && loop2) {
    return bothLoop(head1, loop1, head2, loop2);
  }

  return null;
}
