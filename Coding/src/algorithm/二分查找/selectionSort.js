function main() {
  let arr = [3, 2, 38, 97, 44, 6];
  selectionSort(arr);
  console.log(arr);
}

main();

function selectionSort(arr) {
  if (!arr || arr.length < 2) {
    return;
  }
  let N = arr.length;
  for (let i = 0; i < N - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < N; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex;
    }
    swap(arr, i, minIndex);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
