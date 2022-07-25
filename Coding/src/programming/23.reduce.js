function reduce(arr, reducer, initialValue) {
  let next = initialValue ? initialValue : arr[0];
  for (let i = initialValue ? 0 : 1; i < arr.length; i++) {
    next = reducer(next, arr[i], i, arr);
  }
  return next;
}
