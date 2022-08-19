/**[3,4,1,2,5]  --->  [1,2,3,4,5] 排序后每一个元素移动的距离小于2
 *
 * 已知一个几乎有序的数组。几乎有序是指，如果把数组排好顺序的话，每个元素移动的距离一定不超过k k相对于数组长度来说是比较小的。请选择一个合适的排序策略，对这个数组进行排序。
 */

const Heap = require("./Code02_Heap");

/***
 *
 * [    ] 0--n 无序数组  k = 5   前五个元素中的最小值 一定是位于 0位置的
 * 思路 1. 先把前K+1个元素放入小根堆 弹出堆顶  后续  往小根堆加一个弹一个 小根堆中维持 K+1 个元素
 * 2. 最后 把小根堆剩余的数弹出即可
 *
 * 注意 距离是K
 *      则 元素 应该是 K + 1   1--2--3 列如距离是2 元素是三个
 * 所以堆中  元素应该保持K+1个
 */

function sortArrDistanceLessK(arr, K) {
  if (!arr || arr.length < 2) return;

  let heap = new Heap();

  let index = 0;
  for (; index <= Math.min(arr.length - 1, K); index++) {
    heap.push(arr[index]);
  }
  let i = 0;
  for (; index < arr.length; i++, index++) {
    arr[i] = heap.pop();
    heap.push(arr[index]);
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
