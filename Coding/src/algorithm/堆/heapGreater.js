/**
 * 加强堆 具有反向索引表
 * comparator - 接收一个比较器
 */
// class Node {
//   constructor(val) {
//     this.value = val;
//   }
// }
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
      this.indexMap.set(replace, index);
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
