/**
 * 加强堆 具有反向索引表
 * comparator - 接收一个比较器
 */
// class Node {
//   constructor(val) {
//     this.value = val;
//   }
// }

/**
 *  关于比较函数 
 *  - 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
    - 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
    - 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
    compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
 */
class HeapGreater {
  constructor(comparator) {
    this.heap = [];
    this.heapSize = 0;
    this.cmp = comparator;
    this.indexMap = new Map();
  }

  isEmpty() {
    return this.heapSize === 0;
  }
  size() {
    return this.heapSize;
  }
  contains(obj) {
    return this.indexMap.has(obj);
  }
  peek() {
    return this.heap[0];
  }
  push(obj) {
    this.heap.push(obj);
    this.indexMap.set(obj, this.heapSize);
    this.heapInsert(this.heapSize++);
  }
  heapInsert(index) {
    while (this.cmp(this.heap[index], this.heap[((index - 1) / 2) | 0]) < 0) {
      const pIndex = ((index - 1) / 2) | 0;
      this.swap(index, pIndex);
      index = pIndex;
    }
  }
  pop() {
    let ans = this.heap[0];
    this.swap(0, --this.heapSize);
    this.indexMap.delete(ans);
    this.heap.splice(this.heapSize, 1);
    this.heapIfy(0);
    return ans;
  }
  remove(obj) {
    let replace = this.heap[this.heapSize - 1];
    let index = this.indexMap.get(obj);
    this.indexMap.delete(obj);
    this.heap.slice(index, 1);
    if (replace !== obj) {
      this.heap[index] = replace;
      //将索引 设置对
      this.indexMap.set(replace, index);
      //调整堆结构
      this.resign(replace);
    }
  }
  resign(obj) {
    this.heapInsert(this.indexMap.get(obj));
    this.heapIfy(this.indexMap.get(obj));
  }
  heapIfy(index) {
    let left = index * 2 + 1;
    while (left < this.heapSize) {
      let best =
        left + 1 < this.heapSize &&
        this.cmp(this.heap[left], this.heap[left + 1]) > 0
          ? left + 1
          : left;
      best = this.cmp(this.heap[index], this.heap[best]) < 0 ? index : best;
      if (best === index) {
        break;
      }
      this.swap(best, index);
      index = best;
      left = index * 2 + 1;
    }
  }
  swap(i, j) {
    let o1 = this.heap[i];
    let o2 = this.heap[j];
    this.heap[j] = o1;
    this.heap[i] = o2;
    this.indexMap.set(o1, j);
    this.indexMap.set(o2, i);
  }
}

function main() {
  let heap = new HeapGreater((a, b) => a.id - b.id);

  let arr = [543, 4, 2, 46, 873, 5, 31, 24, 6, 40, 21, 87, 62, 19, 3, 1].map(
    (item) => ({ name: "aa", id: item })
  );
  arr.forEach((item) => {
    heap.push(item);
  });
  arr[5].id = -3000;
  console.log(heap.heap);
  heap.resign(arr[5]);
  console.log(heap.heap);
  heap.remove(arr[5]);
  console.log(heap.heap);

  // while (heap.heapSize) {
  //   console.log(heap.pop());
  // }
}

main();

// export default HeapGreater;
