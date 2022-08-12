function main() {
  let arr = [2, 4, 3, 5, 1];
  console.log(reversePairs(arr));
  console.log(arr);
}
main();

/**
 * @param {number[]} nums
 * @return {number}
 */
var reversePairs = function (nums) {
  if (!nums || nums.length < 2) return 0;

  return process(nums, 0, nums.length - 1);
};

function process(arr, L, R) {
  if (L === R) return 0;
  let M = L + ((R - L) >> 1);

  return process(arr, L, M) + process(arr, M + 1, R) + merge(arr, L, M, R);
}

function merge(arr, L, M, R) {
  let res = 0,
    windowR = M + 1;

  for (let i = L; i <= M; i++) {
    while (windowR <= R && arr[i] > arr[windowR] * 2) {
      windowR++;
    }
    res += windowR - M - 1;
  }

  let i = 0,
    p1 = L,
    p2 = M + 1,
    help = [];

  while (p1 <= M && p2 <= R) {
    help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
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
