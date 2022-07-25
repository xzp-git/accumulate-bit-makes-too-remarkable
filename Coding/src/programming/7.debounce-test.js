//const { debounce } = require('lodash');
const debounce = require("./src/8.debounce");
const start = Date.now();
function logger(age) {
  console.log(Math.floor((Date.now() - start) / 1000) + "s");
  console.log(age);
  return Date.now();
}
const debounced = debounce(logger, 2000, true, (err, data) => {
  console.log("callback", data);
});
const obj = {
  name: "张三",
  debounced,
};
setTimeout(() => {
  obj.debounced(1000);
}, 1000);
setTimeout(() => {
  obj.debounced(2000);
}, 2000);
setTimeout(() => {
  obj.debounced(3000);
}, 3000);
setTimeout(() => {
  obj.debounced(4000);
}, 4000);
setTimeout(() => {
  obj.debounced(5000).then((data) => {
    console.log("promise", data);
  });
  obj.debounced.cancel(); //调用cancel方法可以取消执行此回调
}, 5000);
