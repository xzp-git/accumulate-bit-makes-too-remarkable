/**
 *
 * @param {*} func 要节流的目标函数
 * @param {*} wait 多久频频触发一次
 * @param {*} options // leading 第一次是否要触发    trailing 最后一次是否要执行  callback 执行完成后要执行的回调
 * @returns
 */

// const throttle = (
//   func,
//   wait,
//   options = { leading: true, trailing: true, callback: () => {} }
// ) => {
//   //上次执行func的时间
//   let lastExecTime = 0;
//   //记录定时器
//   let timer = null;

//   const { leading, trailing, callback } = options;
//   const throttled = (...args) => {
//     return new Promise((resolve, reject) => {
//       const currentTime = Date.now();
//       // 如果上次执行时间时0 并且第一次不需要执行
//       if (lastExecTime === 0 && !leading) {
//         lastExecTime = currentTime;
//       }
//       //下次执行func的时间
//       let nextExecTime = lastExecTime + wait;

//       //如果此时的时间大于等于下次执行时间，则要执行func
//       if (currentTime >= nextExecTime) {
//         if (timer) {
//           clearTimeout(timer);
//           timer = null;
//         }
//         try {
//           let result = func.apply(this, args);
//           callback(null, result);
//           resolve(result);
//         } catch (error) {
//           callback(error);
//           reject(error);
//         }
//         lastExecTime = currentTime;
//       } else {
//         if (trailing) {
//           if (timer) {
//             clearTimeout(timer);
//             timer = null;
//           }
//           timer = setTimeout(() => {
//             try {
//               let result = func.apply(this, args);
//               callback(null, result);
//               resolve(result);
//             } catch (error) {
//               callback(error);
//               reject(error);
//             }
//             lastExecTime = Date.now();
//           }, nextExecTime - currentTime);
//         }
//       }
//     });
//   };

//   throttled.cancel = () => {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//   };

//   return throttled;
// };
// const throttle = (
//   func,
//   wait,
//   options = { leading: true, trailing: true, callback: () => {} }
// ) => {
//   const { leading, trailing, callback } = options;
//   let lastExecTime = 0;
//   let timer = null;
//   const throttled = (...args) => {
//     return new Promise((resolve, reject) => {
//       const currentTime = Date.now();
//       if (lastExecTime === 0 && !leading) {
//         lastExecTime = currentTime;
//       }
//       let nextExecTime = lastExecTime + wait;
//       if (currentTime >= nextExecTime) {
//         if (timer) {
//           clearTimeout(timer);
//           timer = null;
//         }
//         try {
//           let result = func.apply(this, args);
//           callback(null, result);
//           resolve(result);
//         } catch (error) {
//           callback(error);
//           reject(error);
//         }
//         lastExecTime = currentTime;
//       } else {
//         if (trailing) {
//           if (timer) {
//             clearTimeout(timer);
//             timer = null;
//           }
//           timer = setTimeout(() => {
//             try {
//               let result = func.apply(this, args);
//               callback(null, result);
//               resolve(result);
//             } catch (error) {
//               callback(error);
//               reject(error);
//             }
//             lastExecTime = Date.now();
//           }, nextExecTime - currentTime);
//         }
//       }
//     });
//   };
//   throttled.cancel = () => {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//   };
//   return throttled;
// };

function throttle(
  func,
  wait,
  options = { leading: true, trailing: true, callback: () => {} }
) {
  const { leading, trailing, callback } = options;
  let lastExecTime = 0;
  let timer = null;
  const cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  const throttled = (...args) => {
    return new Promise((resolve, reject) => {
      let currentTime = Date.now();
      if (lastExecTime === 0 && !leading) {
        lastExecTime = currentTime;
      }
      let nextExecTime = lastExecTime + wait;
      if (currentTime >= nextExecTime) {
        cancel();
        try {
          let res = func.apply(this, args);
          resolve(res);
          callback(null, res);
        } catch (error) {
          reject(error);
          callback(error);
        }
        lastExecTime = currentTime;
      } else {
        if (trailing) {
          cancel();
          timer = setTimeout(() => {
            try {
              let res = func.apply(this, args);
              resolve(res);
              callback(null, res);
            } catch (error) {
              reject(error);
              callback(error);
            }
            lastExecTime = Date.now();
          }, nextExecTime - currentTime);
        }
      }
    });
  };
  throttled.cancel = cancel;
  return throttled;
}

module.exports = throttle;
