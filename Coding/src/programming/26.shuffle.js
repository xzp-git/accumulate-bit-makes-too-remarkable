// 数组洗牌
const shuffle = (list) => list.sort(() => Math.random() - 0.5);

const shuffle1 = (list) => {
  let len = list.length;
  let result = [...list];

  for (let i = len - 1; i > 0; i--) {
    let swapIndex = (Math.random() * (i + 1)) | 0;
    [result[i], result[swapIndex]] = [result[swapIndex], result[i]];
  }

  return result;
};
