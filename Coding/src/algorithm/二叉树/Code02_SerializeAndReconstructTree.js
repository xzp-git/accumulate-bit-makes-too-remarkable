/*
 * 二叉树可以通过先序、后序或者按层遍历的方式序列化和反序列化，
 * 以下代码全部实现了。
 * 但是，二叉树无法通过中序遍历的方式实现序列化和反序列化
 * 因为不同的两棵树，可能得到同样的中序序列，即便补了空位置也可能一样。
 * 比如如下两棵树
 *         __2
 *        /
 *       1
 *       和
 *       1__
 *          \
 *           2
 * 补足空位置的中序遍历结果都是{ null, 1, null, 2, null}
 *
 * */
class Node {
  constructor(v) {
    this.left = null;
    this.right = null;
    this.value = v;
  }
}

//前序遍历序列化
function preSerial(head) {
  const queue = [];
  pres(head, queue);
  return queue;
}

function pres(head, queue) {
  if (!head) {
    queue.push(null);
  } else {
    queue.push(JSON.stringify(head.value));
    pres(head.left, queue);
    pres(head.right, queue);
  }
}
// 前序遍历反序列化
function buildByPreQueue(preList) {
  if (!preList || !preList.length) {
    return null;
  }
  return preb(preList);
}
function preb(preList) {
  let value = preList.shift();
  if (value === null) {
    return null;
  }
  const head = new Node(JSON.parse(value));
  head.left = preb(preList);
  head.right = preb(preList);
  return head;
}

// 后序遍历序列化
function posSerial(head) {
  const queue = [];
  poss(head, queue);
  return queue;
}

function poss(head, queue) {
  if (!head) {
    queue.push(null);
  } else {
    poss(head.left, queue);
    poss(head.right, queue);
    queue.push(JSON.stringify(head.value));
  }
}

//后序遍历反序列化

function buildByPosQueue(posList) {
  if (!posList || !posList.length) {
    return null;
  }
  // //左右中 -> 中右左
  // posList.reverse();
  return posb(posList);
}

function posb(posList) {
  // let value = posList.shift();
  let value = posList.pop();
  if (value === null) {
    return null;
  }
  const head = new Node(JSON.parse(value));
  head.right = posb(posList);
  head.left = posb(posList);
  return head;
}

function levSerial(head) {
  const ans = [];
  if (!head) {
    ans.push(null);
  } else {
    const queue = [];
    ans.push(JSON.stringify(head.value));
    queue.push(head);
    while (queue.length) {
      let cur = queue.shift();
      if (cur.left) {
        queue.push(cur.left);
        ans.push(JSON.stringify(cur.left.value));
      } else {
        ans.push(null);
      }

      if (cur.right) {
        queue.push(cur.right);
        ans.push(JSON.stringify(cur.right.value));
      } else {
        ans.push(null);
      }
    }
  }
  return ans;
}

function buildByLevelQueue(levList) {
  if (!levList || !levList.length) {
    return null;
  }
  const head = generateNode(levList.shift());
  const queue = [];
  queue.push(head);
  while (queue.length) {
    const node = queue.shift();
    node.left = generateNode(levList.shift());
    node.right = generateNode(levList.shift());
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return head;
}

function generateNode(val) {
  if (val === null) {
    return null;
  }
  return new Node(JSON.parse(val));
}

function main() {
  let head = new Node(1);
  head.left = new Node(2);
  head.right = new Node(3);
  head.left.left = new Node(4);
  head.left.right = new Node(5);
  head.right.left = new Node(6);
  head.right.right = new Node(7);

  // let pre = preSerial(head);
  // console.log(pre);
  // console.log(buildByPreQueue(pre));
  console.log("========");
  // let pos = posSerial(head);
  // console.log(pos);
  // console.log(buildByPosQueue(pos));
  console.log("========");
  let lev = levSerial(head);
  console.log(lev);
  console.log(buildByLevelQueue(lev));
  console.log("========");
}

main();
