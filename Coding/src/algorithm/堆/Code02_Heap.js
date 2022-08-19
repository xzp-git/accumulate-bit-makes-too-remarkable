/**
 * 堆  小根堆
 * 用一个数组 表示堆
 *        假设父亲的 索引是 i
 *  左孩子的位置 2i+1    右孩子的位置 2i+2
 */
class Heap {
  constructor(limit = Infinity) {
    this.heap = [];
    this.limit = limit;
    this.heapSize = 0;
  }
  isEmpty() {
    return this.heapSize === 0;
  }
  isFull() {
    return this.heapSize === this.limit;
  }

  push(val) {
    if (this.isFull()) {
      throw new Error("heap is full");
    }
    this.heap[this.heapSize] = val;
    this.heapInsert(this.heap, this.heapSize++);
  }
  /**
   * 新加进来的数 停留在index位置 找比他大的父亲 并且替换
   * @param {*} arr
   * @param {*} index
   */
  heapInsert(arr, index) {
    while (arr[index] < arr[((index - 1) / 2) | 0]) {
      const pIndex = ((index - 1) / 2) | 0;
      this.swap(arr, index, pIndex);
      index = pIndex;
    }
  }

  /**
   *
   * @returns
   */
  pop() {
    let ans = this.heap[0];
    this.swap(this.heap, 0, --this.heapSize);
    this.heapIfy(this.heap, 0, this.heapSize);
    return ans;
  }
  /**
   * 将index位置的数不断的下沉，把比他大的数替换上来
   * @param {*} arr
   * @param {*} index
   * @param {*} heapSize
   */
  heapIfy(arr, index, heapSize) {
    let left = index * 2 + 1;

    while (left < heapSize) {
      // 把较大孩子的下标 拿到
      //拿到左孩子 右孩子中值较大的孩子的索引
      let large =
        left + 1 < heapSize && arr[left + 1] < arr[left] ? left + 1 : left;
      //父亲 与 孩子中 大的 进行Pk
      large = arr[large] < arr[index] ? large : index;
      // 如果父亲已经是最大的就停止
      if (large === index) {
        break;
      }
      this.swap(arr, large, index);
      index = large;
      left = index * 2 + 1;
    }
  }
  swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

// function main() {
//   let heap = new Heap();

//   let arr = [
//     543, 4, 2, 46, 873, 5, 31, 24, 6, 5, 40, 21, 5, 87, 62, 19, 6, 4, 3, 1,
//   ];
//   arr.forEach((item) => {
//     heap.push(item);
//   });
//   console.log(heap.heap, heap.heapSize, arr.length);
//   while (heap.heapSize) {
//     console.log(heap.pop());
//   }
// }

// main();

function sortArrDistanceLessK(arr, K) {
  if (!arr || arr.length < 2) return;

  let heap = new Heap();

  let index = 0;
  for (; index <= Math.min(arr.length - 1, K - 1); index++) {
    heap.push(arr[index]);
  }
  let i = 0;
  for (; index < arr.length; i++, index++) {
    heap.push(arr[index]);
    arr[i] = heap.pop();
  }
  while (!heap.isEmpty()) {
    arr[i++] = heap.pop();
  }
}

function main() {
  let arr = [3, 4, 1, 2, 5];
  sortArrDistanceLessK(arr, 2);
  console.log(arr);
}

main();
module.exports = Heap;
