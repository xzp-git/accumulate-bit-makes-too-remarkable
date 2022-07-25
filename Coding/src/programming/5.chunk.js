// 实现一个chunk函数, 将数组分组
function chunk(list, size) {
  const l = [];
  for (let i = 0; i < list.length; i++) {
    const index = Math.floor(i / size);
    l[index] ??= [];
    l[index].push(list[i]);
  }
  return l;
}

function chunk(list, size) {
  const l = [];
  for (let i = 0; i < list.length; i++) {
    const index = (i / size) | 0;
    l[index] ??= [];
    l[index].push(list[i]);
  }
  return l;
}
