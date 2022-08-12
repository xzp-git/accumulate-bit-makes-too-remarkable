/**
 * 荷兰国旗问题
 * 给定 一个数组 arr 一个范围  L R   以arr[R]为标准  小于 的arr[R]放左边 等于 arr[R]的放中间  大于arr[R]的放右边
 */
function netherlandsFlag(arr, L, R) {
  if (L > R) return [-1, -1];
  if (L === R) return [L, R];

  let less = L - 1; //小于区边界
  let more = R; // 大于区边界
  let index = L; //指针

  while (index < more) {
    //当前位置不能和 大于区的左边界撞上
    if (arr[index] === arr[R]) {
      index++; //如果当前数和标准数相等  指针前移
    } else if (arr[index] < arr[R]) {
      // 如果当前数小于标准数  当前数 和 小于区前一个做交换  小于区 右括
      swap(arr, index++, ++less);
    } else {
      swap(arr, index, --more);
    }
  }
  swap(arr, more, R);
  return [less + 1, more];
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  // arr[i] = arr[i] ^ arr[j];
  // arr[j] = arr[i] ^ arr[j];
  // arr[i] = arr[i] ^ arr[j];
}

function partition(arr, L, R) {
  if (L > R) return -1;
  if (L === R) return L;

  let less = L - 1;
  let index = L;

  while (index < R) {
    if (arr[index] <= arr[R]) {
      swap(arr, index, ++less);
    }
    index++;
  }
  swap(arr, ++less, R);
  return less;
}

// 快排1.0

function quickSort1(arr) {
  if (!arr || arr.length < 2) return;
  process1(arr, 0, arr.length - 1);
}
function process1(arr, L, R) {
  if (L >= R) return;
  let M = partition(arr, L, R);
  process1(arr, L, M - 1);
  process1(arr, M + 1, R);
}

// 快排2.0
function quickSort2(arr) {
  if (!arr || arr.length < 2) return;
  process2(arr, 0, arr.length - 1);
}
function process2(arr, L, R) {
  if (L >= R) return;
  let M = netherlandsFlag(arr, L, R);
  process1(arr, L, M[0] - 1);
  process1(arr, M[1] + 1, R);
}

// 快排 3.0
function quickSort3(arr) {
  if (!arr || arr.length < 2) return;
  process3(arr, 0, arr.length - 1);
}
function process3(arr, L, R) {
  if (L >= R) return;
  swap(arr, R, L + ((Math.random() * (R - L + 1)) | 0));
  let M = netherlandsFlag(arr, L, R);
  process3(arr, L, M[0] - 1);
  process3(arr, M[1] + 1, R);
}

// 快排3.0 非递归版本 栈实现 需要用到辅助类
class Info {
  constructor(left, right) {
    this.l = left;
    this.r = right;
  }
}

function quickSortUnRecursive(arr) {
  if (!arr || arr.length < 2) return;
  let N = arr.length;
  swap(arr, (Math.random() * N) | 0, N - 1);
  let M = netherlandsFlag(arr, 0, N - 1);
  const stack = [new Info(0, M[0] - 1), new Info(M[1] + 1, N - 1)];

  while (stack.length) {
    const info = stack.pop();
    if (info.l < info.r) {
      swap(arr, info.l + ((Math.random() * (info.r - info.l + 1)) | 0), info.r);
      M = netherlandsFlag(arr, info.l, info.r);
      stack.push(new Info(info.l, M[0] - 1));
      stack.push(new Info(M[0] + 1, info.r));
    }
  }
}

function main() {
  let arr = [
    2, 36, 0, 12, 0, 4, 65, 78, 9, 65, 4, 53, 65, 7, 255, 56, 996, 18, 5, 1, 2,
    65,
  ];
  // console.log(partition(arr, 0, arr.length - 1));
  // console.log(arr);
  quickSortUnRecursive(arr);
  console.log(arr);
}
main();
