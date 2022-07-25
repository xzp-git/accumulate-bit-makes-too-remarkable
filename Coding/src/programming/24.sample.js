//从 数组中随机取一个元素
const sample = (arr) => {
  const i = (Math.random() * arr.length) | 0;
  return arr[i];
};
