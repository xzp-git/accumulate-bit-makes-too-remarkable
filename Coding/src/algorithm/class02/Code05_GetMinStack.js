class MinStack {
  constructor() {
    this.stackData = [];
    this.stackMin = [];
  }

  push(val) {
    if (!this.stackMin.length || val <= this.min()) {
      this.stackMin.push(val);
    }
    this.stackData.push(val);
  }

  pop() {
    if (!this.stackData.length) {
      throw new Error("stack is empty");
    }

    let value = this.stackData.pop();

    if (value === this.min()) {
      this.stackMin.pop();
    }
    return value;
  }

  min() {
    if (!this.stackMin.length) {
      throw new Error("stack is empty");
    }
    return this.stackMin[this.stackMin.length - 1];
  }

  top() {
    if (!this.stackData.length) {
      throw new Error("stack is empty");
    }
    return this.stackData[0];
  }
}
