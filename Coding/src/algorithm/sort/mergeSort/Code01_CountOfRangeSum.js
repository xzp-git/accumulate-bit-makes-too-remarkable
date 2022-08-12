// 327 题

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
var countRangeSum = function (nums, lower, upper) {
  if (!nums || !nums.length) {
    return 0;
  }
  const sum = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    sum[i] = sum[i - 1] + nums[i];
  }

  return process(sum, 0, sum.length - 1, lower, upper);
};

function process(sum, L, R, lower, upper) {
  if (L === R) {
    return sum[L] >= lower && sum[L] <= upper ? 1 : 0;
  }

  const M = L + ((R - L) >> 1);

  return (
    process(sum, L, M, lower, upper) +
    process(sum, M + 1, R, lower, upper) +
    merge(sum, L, M, R, lower, upper)
  );
}

function merge(sum, L, M, R, lower, upper) {
  let windowL = L,
    windowR = L,
    ans = 0;
  for (let i = M + 1; i <= R; i++) {
    const min = sum[i] - upper;
    const max = sum[i] - lower;
    while (windowR <= M && sum[windowR] <= max) {
      windowR++;
    }
    while (windowL <= M && sum[windowL] < min) {
      windowL++;
    }
    ans += windowR - windowL;
  }

  const help = [];
  let index = 0,
    p1 = L,
    p2 = M + 1;

  while (p1 <= M && p2 <= R) {
    help[index++] = sum[p1] < sum[p2] ? sum[p1++] : sum[p2++];
  }

  while (p1 <= M) {
    help[index++] = sum[p1++];
  }
  while (p2 <= R) {
    help[index++] = sum[p2++];
  }

  for (let i = 0; i < help.length; i++) {
    sum[L + i] = help[i];
  }

  return ans;
}
