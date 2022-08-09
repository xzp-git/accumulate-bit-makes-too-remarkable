function main() {
  let arr = [3, 2, 1, 97, 6, 44];
  console.log(getLessIndex(arr));
}

main();
function getLessIndex(arr) {
  let N = arr.length;
  if (!arr || !N) return -1;
  if (N === 0 || arr[0] < arr[1]) return 0;
  if (arr[N - 1] < arr[N - 2]) return N - 1;

  let L = 1;
  let R = N - 2;
  let mid = 0;
  while (L < R) {
    mid = ((R - L) >> 1) + L;
    if (arr[mid] > arr[mid - 1]) {
      R = mid - 1;
    } else if (arr[mid] > arr[mid + 1]) {
      L = mid + 1;
    } else {
      return mid;
    }
  }
  return L;
}
