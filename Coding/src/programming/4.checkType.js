const checkType = (obj) => {
  if (obj == null) return obj + "";
  let reg = /^\[object ([a-zA-Z0-9]+)\]$/i,
    type = typeof obj,
    isObjOrFn = /^(object|function)$/.test(type);
  type = isObjOrFn
    ? reg.exec(Object.prototype.toString.call(obj))[1].toLowerCase()
    : type;

  return type;
};
