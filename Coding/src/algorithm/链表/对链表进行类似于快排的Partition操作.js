/**
 *
 * 给定一个单链表的头节点head，给定一个整数n，将链表按n划分成左边<n、中间==n、右边>n
 */

function listPartition(head, v) {
  //   if (!head || !v || !head.next) return head;

  let sH = null,
    sT = null,
    eH = null,
    eT = null,
    mH = null,
    mT = null,
    next = null;

  while (head) {
    /**
     * 处理每个节点的时候要把节点next清空
     *  */
    next = head.next;
    head.next = null;
    if (head.value < v) {
      if (!sH) {
        sH = head;
        sT = head;
      } else {
        sT.next = head;
        sT = head;
      }
    } else if (head.value === v) {
      if (!eH) {
        eH = head;
        eT = head;
      } else {
        eT.next = head;
        eT = head;
      }
    } else {
      if (!mH) {
        mH = head;
        mT = head;
      } else {
        mT.next = head;
        mT = head;
      }
    }
    head = next;
  }
  if (sT) {
    sT.next = eH;
    eT = eT ? eT : sT;
  }
  if (eT) {
    eT.next = mH;
  }
  return sH ? sH : eH ? eH : mH;
}
