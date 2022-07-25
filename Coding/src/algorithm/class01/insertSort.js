function main() {
  let arr = [3, 2, 38, 97, 44, 6];
  insertSort(arr);
  console.log(arr);
}

main();

function insertSort(arr) {
  if (!arr || arr.length < 2) return;

  let N = arr.length;
  for (let i = 1; i < N; i++) {
    for (let j = i - 1; j >= 0 && arr[j] > arr[j + 1]; j--) {
      swap(arr, j, j + 1);
    }
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
