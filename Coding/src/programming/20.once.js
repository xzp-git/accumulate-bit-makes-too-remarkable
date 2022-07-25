const f = () => {
  console.log("call");
  return 3;
};

function once(f) {
  let res = null,
    invoked = false;

  return (...args) => {
    if (invoked) return res;
    res = f(...args);
    invoked = true;
    return res;
  };
}

const once_f = once(f);
// 第一次调用
once_f();
// 第二次调用，没有打印 call
once_f();
