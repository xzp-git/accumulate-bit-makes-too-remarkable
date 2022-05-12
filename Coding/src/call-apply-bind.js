Function.prototype.call = function (context, ...args) {
  let ctx = context || window;
  let func = Symbol();
  ctx[func] = this;
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

// Function.prototype.bind = function (context, ...args) {
//   let self = this;

//   return function newFn(...newArgs) {
//     if (this instanceof newFn) {
//       return newFn(...args, ...newArgs);
//     }
//     // console.log(this);
//     return self.apply(context, args.concat(newArgs));
//   };
// };

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  args = args ? args : [];
  return function newFn(...newFnArgs) {
    if (this instanceof newFn) {
      return new fn(...args, ...newFnArgs);
    }
    return fn.apply(context, [...args, ...newFnArgs]);
  };
};

let obj = { name: "name" };
let objA = { name: "ObjA" };

function fn(num, num2) {
  console.log(this.name, num, num2);
}
// fn();
let newF = fn.bind(obj, 1);
let o = new newF();
o.a = newF;
o.a(666);
// let newfA = newF.bind(objA, 22);
// newfA();
