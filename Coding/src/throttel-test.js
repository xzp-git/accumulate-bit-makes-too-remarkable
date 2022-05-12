const throttle = require("./throttle");
const start = Date.now();
function logger() {
  console.log(Math.floor((Date.now() - start) / 1000) + "s");
  return Date.now();
}
const throttled = throttle(logger, 3000, {
  leading: false,
  trailing: true,
  callback: (err, data) => {
    console.log("callback,data", data);
  },
});
setTimeout(() => {
  throttled();
}, 1000);
setTimeout(() => {
  throttled();
}, 2000);
setTimeout(() => {
  throttled();
}, 3000);
setTimeout(() => {
  throttled();
}, 4000);
setTimeout(() => {
  throttled();
}, 5000);
setTimeout(() => {
  throttled().then((data) => {
    console.log("promise", data);
  });
}, 6000);

setTimeout(() => {
  throttled().then((data) => {
    console.log("promise", data);
  });
}, 7000);

setTimeout(() => {
  throttled().then((data) => {
    console.log("promise", data);
  });
}, 8000);

setTimeout(() => {
  throttled().then((data) => {
    console.log("promise", data);
  });
}, 9000);
