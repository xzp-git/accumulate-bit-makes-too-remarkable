function main() {
  let arr = [2, 3, 6, 38, 44, 97];
  console.log(nearLeft(arr, 20));
}

main();
function nearLeft(arr, num) {
  if (!arr || !arr.length) return;
  let index = -1,
    L = 0,
    R = arr.length - 1,
    mid = 0;

  while (L <= R) {
    mid = ((R - L) >> 1) + L;
    if (arr[mid] <= num) {
      index = mid;
      L = mid + 1;
    } else {
      R = mid - 1;
    }
  }
  return index;
}
