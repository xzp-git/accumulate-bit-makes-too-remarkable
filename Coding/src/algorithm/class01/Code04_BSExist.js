function main() {
  let arr = [2, 3, 6, 38, 44, 97];
  console.log(exist(arr, 20));
}

main();

function exist(sortedArr, num) {
  if (!sortedArr || sortedArr.length === 0) return;
  let L = 0,
    R = sortedArr.length - 1,
    mid = 0;
  while (L < R) {
    //区间上至少两个数的时候
    mid = ((R - L) >> 1) + L;
    if (sortedArr[mid] > num) {
      R = mid - 1;
    } else if (sortedArr[mid] < num) {
      L = mid + 1;
    } else {
      return true;
    }
  }
  return num === sortedArr[L];
}
