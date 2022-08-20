class Node {
  constructor(v) {
    this.left = null;
    this.right = null;
    this.value = v;
  }
}

function traversal(head) {
  if (!head) return;
  // 前序
  traversal(head.left);
  // 中序
  traversal(head.right);
  // 后序
}
function pre(head) {
  if (!head) return;
  console.log(head.value, "pre");
  pre(head.left);
  pre(head.right);
}
function ins(head) {
  if (!head) return;

  ins(head.left);
  console.log(head.value, "ins");
  ins(head.right);
}

function pos(head) {
  if (!head) return;
  pos(head.left);
  pos(head.right);
  console.log(head.value, "pos");
}

function main() {
  let head = new Node(1);
  head.left = new Node(2);
  head.right = new Node(3);
  head.left.left = new Node(4);
  head.left.right = new Node(5);
  head.right.left = new Node(6);
  head.right.right = new Node(7);
  pre(head);
  console.log("========");
  ins(head);
  console.log("========");
  pos(head);
  console.log("========");
}

main();
