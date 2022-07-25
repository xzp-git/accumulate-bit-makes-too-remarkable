function myInstaceOf(left, right) {
  if (!right || typeof right !== "function" || !right.prototype)
    throw new Error(`${right} is not a Constructor`);

  if (left === null || !/^(object|function)$/.test(typeof left)) return false;

  if (typeof right[Symbol.hasInstance] === "function")
    return right[Symbol.hasInstance](left);
  let prototype = Object.getPrototypeOf(left);

  while (prototype) {
    if (prototype === right.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

console.log(myInstaceOf({}, Array));
