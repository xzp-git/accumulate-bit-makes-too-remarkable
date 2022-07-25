//驼峰转短横线
function toKebabCase(str) {
  let res = str.replace(/([A-Z])/g, (all, i) => {
    return "-" + i.toLowerCase();
  });
  if (res.slice(0, 1) === "-") {
    res = res.slice(1); //去除开头的-
  }
  return res;
}
//短横线转驼峰
function toCamelCase(str) {
  return str.replace(/-([a-zA-Z])/g, function (all, i) {
    return i.toUpperCase();
  });
}

console.log(toCamelCase("get-element-by-id"));
console.log(toKebabCase("GetElementById"));
