var entry = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
    r: [0, 22],
  },
};

// 要求转换成如下对象
var output = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae",
};

function flatObj(obj) {
  return process(obj, "", {});
}

function process(obj, parentKey = "", res) {
  let keys = Object.keys(obj);
  keys.forEach((item) => {
    let resKeyName = Array.isArray(obj)
      ? `${parentKey}[${item}]`
      : `${parentKey ? `${parentKey}.` : ""}${item}`;
    if (typeof obj[item] === "object") {
      process(obj[item], `${resKeyName}`, res);
    } else {
      res[resKeyName] = obj[item];
    }
  });
  return res;
}
console.log(flatObj(entry));
