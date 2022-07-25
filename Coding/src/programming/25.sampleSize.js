//随机取N个元素
const shuffle = (list) => list.sort((x, y) => Math.random() - 0.5);
const sampleSize = (list, n) => shuffle(list).splice(0, n);
