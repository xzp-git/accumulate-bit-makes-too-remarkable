function groupBy(list, by) {
  return list.reduce((memo, item) => {
    if (memo[by(item)]) {
      memo[by(item)].push(item);
    } else {
      memo[by(item)] = [item];
    }
    return memo;
  }, {});
}

console.log(
  groupBy(
    [
      { id: 1, name: "山月", sex: "male" },
      { id: 2, name: "张三", sex: "female" },
      { id: 3, name: "李四", sex: "female" },
    ],
    (x) => x.sex
  )
);
