function main() {
  let arr = [3, 2, 38, 97, 44, 6];
  console.log(mergeSort(arr));
  console.log(arr);
}

main();

function mergeSort(arr) {
  if (!arr || arr.length < 2) return 0;

  return process(arr, 0, arr.length - 1);
}

function process(arr, L, R) {
  if (L === R) return 0;
  let M = L + ((R - L) >> 1);
  return process(arr, L, M) + process(arr, M + 1, R) + merge(arr, L, M, R);
}

function merge(arr, L, M, R) {
  let i = 0,
    help = [],
    p1 = L,
    p2 = M + 1;
  res = 0;
  while (p1 <= M && p2 <= R) {
    res += arr[p1] < arr[p2] ? (R - p2 + 1) * arr[p1] : 0;
    help[i++] = arr[p1] < arr[p2] ? arr[p1++] : arr[p2++];
  }

  while (p1 <= M) {
    help[i++] = arr[p1++];
  }

  while (p2 <= R) {
    help[i++] = arr[p2++];
  }

  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }

  return res;
}
