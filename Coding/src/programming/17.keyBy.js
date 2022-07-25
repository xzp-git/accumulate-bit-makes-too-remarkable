// Output: {
//   "1": {
//     "id": 1,
//     "name": "山月"
//   },
//   "2": {
//     "id": 2,
//     "name": "shanyue"
//   }
// }

function keyBy(list, by) {
  return list.reduce((acc, x) => {
    acc[by(x)] = x;
    return acc;
  }, {});
}
console.log(
  keyBy(
    [
      { id: 1, name: "山月" },
      { id: 2, name: "shanyue" },
    ],
    (x) => x.id
  )
);
