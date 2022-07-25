class TwoQueueImplementStack {
  constructor() {
    this.queue = [];
    this.help = [];
  }

  push(value) {
    this.queue.push(value);
  }

  poll() {
    while (this.queue.length > 1) {
      this.help.push(this.queue.shift());
    }
    let res = this.queue.shift();
    let temp = this.queue;
    this.queue = this.help;
    this.help = temp;
    return res;
  }

  peek() {
    while (this.queue.length > 1) {
      this.help.push(this.queue.shift());
    }

    let res = this.queue.shift();
    this.help.push(res);
    let temp = this.queue;
    this.queue = this.help;
    this.help = temp;
    return res;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}
