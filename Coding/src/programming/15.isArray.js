function isArray1(arr) {
  return arr instanceof Array;
}

function isArray2(arr) {
  return arr.constructor === Array;
}

function isArray3(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}
console.log(isArray1([]));
console.log(isArray2([]));
console.log(isArray3([]));
