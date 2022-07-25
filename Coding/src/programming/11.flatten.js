function flatten(arr, depth = 1) {
  if (depth === 0) return arr;
  return arr.reduce((memo, item) => {
    let next = Array.isArray(item) ? flatten(item, depth - 1) : item;
    return memo.concat(next);
  }, []);
}
