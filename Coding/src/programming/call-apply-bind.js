// Function.prototype.call = function (context, ...args) {
//   let ctx = context || window;
//   let func = Symbol();
//   ctx[func] = this;
//   let result = ctx[func](...args);
//   delete ctx[func];
//   return result;
// };
Function.prototype.call = function call(context, ...args) {
  let targetFn = this;
  let ctx = context || window;
  let func = Symbol();
  ctx[func] = targetFn;
  let result = ctx[func](...args);
  delete ctx[func];
  return result;
};
Function.prototype.apply = function (context, args) {
  let ctx = context || window;
  let func = Symbol();
  ctx[func] = this;
  let result = ctx[func](...args);
  delete ctx[func];
  return result;
};

Function.prototype.bind = function (context, ...args) {
  let fn = this;

  return function newFn(...newFnArgs) {
    // 检测 New
    // 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs);
    }
    return fn.apply(context, [...args, ...newFnArgs]);
  };
};

let obj = { name: "name" };
let objA = { name: "ObjA" };

function fn(num, num2, num3) {
  console.log(this.name, num, num2, num3);
}
fn.call(objA, 1, 2, 3);
fn.call(obj, 1, 2, 3);

// let newF = fn.bind(obj, 1);
// // newF();
// let o = new newF(22, 33);
// // let newfA = newF.bind(objA, 22);
// // newfA();
