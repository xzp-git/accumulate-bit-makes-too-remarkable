// const fs = require("fs");
// Promise.resolve().then(() => {
//   console.log("promise1");
// });
// fs.readFile("./index.html", () => {
//   console.log("io");
// });
// setImmediate(() => {
//   Promise.resolve().then(() => {
//     console.log("promise2");
//   });
//   console.log("setImmediate");
// });

const compose =
  (...funcs) =>
  (...args) =>
    funcs.reduceRight((f, g) => g(f(...args)));
const compose1 = (...funcs) =>
  funcs.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
const curry = function (fn) {
  return function curried(...args) {
    if (fn.length > args.length) {
      return function () {
        return curried(...args, ...arguments);
      };
    }
    return fn.apply(this, args);
  };
};
