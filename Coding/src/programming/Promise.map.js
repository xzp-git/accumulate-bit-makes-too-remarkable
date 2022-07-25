//实现 Promise.map 用以控制并发数 如何对 Promise 限流：实现一个 Promise.map

class Limit {
  constructor(n) {
    this.limit = n;
    this.count = 0;
    this.queue = [];
  }

  build(fn) {
    if (this.count < this.limit) {
      //如果没有达到阈值 则直接执行
      return this.run(fn);
    } else {
      return this.enqueue(fn);
    }
  }

  enqueue(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push(fn, resolve, reject);
    });
  }

  async run(fn) {
    this.count++;
    const value = await fn();
    this.count--;
    this.dequeue();
    return value;
  }

  dequeue() {
    if (this.count < this.limit && this.queue.length) {
      // 等到promise计数器小于阈值时, 刚好出队执行
      const { fn, resolve, reject } = this.queue.shift();
      this.run(fn).then(resolve).catch(reject);
    }
  }
}

Promise.map = function (list, fn, { concurrency }) {
  const limit = new Limit();
  return Promise.all(list.map((...args) => limit.build(() => fn(...args))));
};
