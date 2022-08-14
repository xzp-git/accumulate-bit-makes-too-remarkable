Function.prototype.call = function (context, ...args) {
  const fn = this;
  const ctx = context || window;
  const fnKey = Symbol();
  ctx[fnKey] = fn;
  const res = ctx[fnKey](...args);
  delete ctx[fnKey];
  return res;
};

Function.prototype.apply = function (context, args) {
  const fn = this;
  const ctx = context || window;
  const fnKey = Symbol();
  ctx[fnKey] = fn;
  const res = ctx[fnKey](...args);
  delete ctx[fnKey];
  return res;
};

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  const newFn = function newFn(...newFnArgs) {
    console.log("zhixing");
    const params = [...args, ...newFnArgs];
    if (this instanceof newFn) {
      return new fn(...params);
    }
    return fn.apply(context, params);
  };
  newFn.prototype = Object.cereate(fn.prototype);
  return newFn;
};

Function.prototype.softBind = function (context, ...args) {
  const fn = this;
  const newFn = function (...newFnArgs) {
    const params = [...args, ...newFnArgs];
    if (!this || this === window) {
      return fn.apply(context, params);
    }
    return fn.apply(this, params);
  };
  newFn.prototype = Object.create(fn.prototype);
  return newFn;
};

let obj = { name: "name" };
let objA = { name: "ObjA" };

function fn(num, num2, num3) {
  console.log(this.name, num, num2, num3);
}
fn.call(objA, 1, 2, 3);
fn.call(obj, 1, 2, 3);

let newF = fn.bind(obj, 1);
newF();
let o = new newF(22, 33);
console.log(o, "ssss");
let newfA = newF.bind(objA, 22);
newfA();

Function.prototype.call = function (context, ...args) {
  const fn = this;
  const ctx = context || window;
  const key = Symbol();
  ctx[key] = fn;
  let res = ctx[key](...args);
  delete ctx[key];
  return res;
};

Function.prototype.bind = function (context, ...args) {
  const fn = this;
  function newFn(...newArgs) {
    if (this instanceof newFn) {
      return new newFn(...[...args, ...newArgs]);
    }
    return fn.call(context, ...[...args, ...newArgs]);
  }
  newFn.prototype = Object.create(fn.prototype);
  return newFn;
};
