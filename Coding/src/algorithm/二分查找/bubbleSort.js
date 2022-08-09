function main() {
  let arr = [3, 2, 38, 97, 44, 6];
  bubbleSort(arr);
  console.log(arr);
}

main();

function bubbleSort(arr) {
  if (!arr || arr.length < 2) return;

  let N = arr.length;
  for (let i = N - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
