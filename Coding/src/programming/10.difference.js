// 实现 intersection，取数组交集

const intersection = (...list) => {
  const result = list.reduce((x, y) => x.filter((i) => y.includes(i)));
  return [...new Set(result)];
};

//=> [2]
console.log(intersection([2, 1], [2, 3]));

//=> [1, 2]
console.log(intersection([1, 2, 2], [1, 2, 2]));

//=> [1, 2]
console.log(intersection([1, 2, 2], [1, 2, 2], [1, 2]));
