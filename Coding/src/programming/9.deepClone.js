function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== "object") return obj;
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let constr = new obj.constructor();
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }
  let symbolObj = Object.getOwnPropertySymbols(obj);
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      constr[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash);
    }
  }
  return constr;
}

function deepClone(obj, hash = new WeekMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== "object") return obj;

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let constr = new obj.constructor();
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }
  let symbolObj = Object.getOwnPropertySymbols(obj);

  for (let i = 0; i < symbolObj.length; i++) {
    const key = symbolObj[i];
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }
  return constr;
}

function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== "object") return obj;

  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let constr = new obj.constructor();
  hash.set(obj, constr);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }

  let symbolKeys = Object.getOwnPropertySymbols(obj);

  for (let i = 0; i < symbolKeys.length; i++) {
    const key = symbolKeys[i];
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  }

  return constr;
}
