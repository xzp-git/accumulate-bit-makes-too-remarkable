function heapIfy(arr, index, heapSize) {
  let left = index * 2 + 1;
  while (left < heapSize) {
    let large =
      left + 1 < heapSize && arr[left + 1] > arr[left] ? left + 1 : left;
    large = arr[large] > arr[index] ? large : index;
    if (large === index) {
      break;
    }
    swap(arr, large, index);
    index = large;
    left = index * 2 + 1;
  }
}
function heapInsert(arr, index) {
  while (arr[index] > arr[((index - 1) / 2) | 0]) {
    let pIndex = ((index - 1) / 2) | 0;
    swap(arr, pIndex, index);
    index = pIndex;
  }
}
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// function heapSort(arr) {
//   if (!arr || arr.length < 2) {
//     return;
//   }
//   let heapSize = arr.length;
//   for (let i = arr.length - 1; i > 0; i--) {
//     heapIfy(arr, i, heapSize);
//   }

//   swap(arr, 0, --heapSize);
//   while (heapSize) {
//     heapIfy(arr, 0, heapSize);
//     swap(arr, 0, --heapSize);
//   }
// }

function heapSort(arr) {
  if (!arr || arr.length < 2) return;
  let heapSize = arr.length;
  for (let i = 0; i < heapSize; i++) {
    heapInsert(arr, i);
  }
  swap(arr, 0, --heapSize);
  while (heapSize) {
    heapIfy(arr, 0, heapSize);
    swap(arr, 0, --heapSize);
  }
}

function main() {
  let arr = [
    543, 4, 2, 46, 873, 5, 31, 24, 6, 5, 40, 21, 5, 87, 62, 19, 6, 4, 3, 1,
  ];
  heapSort(arr);
  console.log(arr);
}

main();
