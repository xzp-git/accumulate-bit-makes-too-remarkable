const maxBy = (list, keyBy) =>
  list.reduce((x, y) => (keyBy(x) > keyBy(y) ? x : y));
const maxBy1 = (list, keyBy) => {
  return list.slice(1).reduce(
    (acc, x) => {
      if (keyBy(x) > keyBy(acc[0])) {
        return [x];
      }
      if (keyBy(x) === keyBy(acc[0])) {
        return [...acc, x];
      }
    },
    [list[0]]
  );
};
