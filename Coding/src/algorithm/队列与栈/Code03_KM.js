function main() {
  let arr = [1, 2, 2, 1, 1, 2, 99, 66, 66, 66];
  onlyKTimes(arr, 1, 3);
}

main();

function onlyKTimes(arr, k, m) {
  let map = new Map();
  let value = 1;
  for (let i = 0; i < 32; i++) {
    map.set(value, i);
    // console.log(map.get(value));
    value <<= 1;
  }
}
