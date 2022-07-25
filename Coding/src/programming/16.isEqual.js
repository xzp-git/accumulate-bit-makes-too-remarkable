function isEqual(x, y) {
  if (x === y) {
    return true;
  } else if (
    typeof x === "object" &&
    typeof y === "object" &&
    x !== null &&
    y !== null
  ) {
    let xKeys = Object.keys(x);
    let yKeys = Object.keys(y);

    if (xKeys.length !== yKeys.length) {
      return false;
    }
    for (let key in x) {
      if (x[key] !== y[key]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
