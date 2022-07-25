class TwoStackImplementQueue {
  constructor() {
    this.pushStack = [];
    this.popStack = [];
  }

  pushToPop() {
    if (!this.popStack.length) {
      while (this.pushStack.length) {
        this.popStack.push(this.pushStack.pop());
      }
    }
  }

  add(value) {
    this.pushStack.push(value);
    this.pushToPop();
  }
  poll() {
    if (!this.popStack.length && !this.pushStack.length) return -1;
    this.pushToPop();
    return this.popStack.pop();
  }
  peek() {
    if (!this.popStack.length && !this.pushStack.length) return -1;
    this.pushToPop();
    return this.popStack[this.popStack.length - 1];
  }
}
