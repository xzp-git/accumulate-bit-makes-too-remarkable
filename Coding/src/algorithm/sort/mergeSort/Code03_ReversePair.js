function main() {
  let arr = [7, 5, 6, 4];
  console.log(reversePairs(arr));
  console.log(arr);
}

main();

/**
 * @param {number[]} nums
 * @return {number}
 */
function reversePairs(nums) {
  if (!nums || nums.length < 2) return 0;

  return process(nums, 0, nums.length - 1);
}

function process(arr, L, R) {
  if (L === R) return 0;

  let M = L + ((R - L) >> 1);

  return process(arr, L, M) + process(arr, M + 1, R) + merge(arr, L, M, R);
}

function merge(arr, L, M, R) {
  let p1 = M,
    p2 = R,
    res = 0,
    i = R - L,
    help = [];

  while (p1 >= L && p2 > M) {
    res += arr[p1] > arr[p2] ? p2 - M : 0;
    help[i--] = arr[p1] > arr[p2] ? arr[p1--] : arr[p2--];
  }
  while (p1 >= L) {
    help[i--] = arr[p1--];
  }

  while (p2 > M) {
    help[i--] = arr[p2--];
  }

  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }

  return res;
}
