/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
  return Promise.resolve(a + b);
}
// 初级实现: 串行方式;
function sum(arr) {
  if (arr.length === 1) return arr[0];
  return arr.reduce((x, y) => Promise.resolve(x).then((x) => add(x, y)));
}

async function sum(arr) {
  let s = arr[0];
  for (let i = 1; i < arr.length; i++) {
    s = await add(s, arr[i]);
  }
  return s;
}

// 中级实现方式:并行方式

function chunk(list, size) {
  let l = [];
  for (let i = 0; i < list.length; i++) {
    const index = (i / size) | 0;
    l[index] ??= [];
    l[index].push(list[i]);
  }
  return l;
}
async function sum(arr) {
  if (arr.length === 0) return arr[0];
  const promise = chunk(arr, 2).map(([x, y]) =>
    y === undefined ? x : add(x, y)
  );
  return Promise.all(promise).then((list) => sum(list));
}

// 控制并发数
function Pmap(list, maper, concurrency = Infinity) {
  return new Promise((resolve, reject) => {
    let result = [];
    let currentIndex = 0;
    let resolveIndex = 0;
    let len = list.length;
    function next() {
      const index = currentIndex++;
      Promise.resolve(list[index])
        .then((item) => maper(item, index))
        .then((o) => {
          result[index] = o;
          if (++resolveIndex === len) {
            resolve(result);
          }
          if (currentIndex < len) {
            next();
          }
        });
    }

    for (let i = 0; i < len && i < concurrency; i++) {
      next();
    }
  });
}

async function sum(arr, concurrency) {
  if (arr.length === 1) return arr[0];
  let list = await Pmap(
    chunk(arr, 2),
    ([x, y]) => {
      return y === undefined ? x : add(x, y);
    },
    concurrency
  );
  return sum(list, concurrency);
}
