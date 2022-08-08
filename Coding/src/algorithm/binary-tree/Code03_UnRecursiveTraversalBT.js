class Node {
  constructor(v) {
    this.left = null;
    this.right = null;
    this.value = v;
  }
}

function pre(head) {
  if (!head) return;
  let stack = [];
  stack.push(head);
  while (stack.length) {
    head = stack.pop();
    console.log("pre", head.value);
    if (head.right) {
      stack.push(head.right);
    }
    if (head.left) {
      stack.push(head.left);
    }
  }
}
function ins(head) {
  if (!head) return;
  const stack = [];
  while (stack.length || head) {
    if (head) {
      stack.push(head);
      head = head.left;
    } else {
      head = stack.pop();
      console.log("ins", head.value);
      head = head.right;
    }
  }
}

function pos(head) {
  if (!head) return;
  const stack = [];
  const ans = [];
  stack.push(head);
  while (stack.length) {
    head = stack.pop();
    ans.push(head.value);
    if (head.left) {
      stack.push(head.left);
    }
    if (head.right) {
      stack.push(head.right);
    }
  }

  while (ans.length) {
    console.log(ans.pop());
  }
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
