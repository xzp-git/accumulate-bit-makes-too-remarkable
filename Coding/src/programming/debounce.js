/**
 *
 * @param {*} func 要执行的函数
 * @param {*} wait 多久一次算是频繁出发
 * @param {*} immediate 是否要立即执行
 * @param {*} callback  执行完成的回调函数
 * @returns
 */

// const debounce = (func, wait, immediate = false, callback) => {
//   let timer = null; //定时器
//   let immediateInvoked = false; //第一次是否已经执行过

//   const debounced = (...args) => {
//     return new Promise((resolve, reject) => {
//       if (timer) {
//         clearTimeout(timer);
//         timer = null;
//       }
//       if (immediate && !immediateInvoked) {
//         try {
//           const result = func.apply(this, args);
//           callback(null, result);
//           resolve(result);
//         } catch (error) {
//           callback(error);
//           reject(error);
//         }
//         immediateInvoked = true;
//       }
//       timer = setTimeout(() => {
//         try {
//           const result = func.apply(this, args);
//           callback(null, result);
//           resolve(result);
//         } catch (error) {
//           callback(error);
//           reject(error);
//         }
//         immediateInvoked = false;
//       }, wait);
//     });
//   };

//   debounced.cancel = () => {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//   };

//   return debounced;
// };

const debounce = (func, wait, immediate = false, callback = () => {}) => {
  let timer = null; //定时器
  let immediateInvoked = false; //是否已经被立即调用
  const debounced = (...args) => {
    return new Promise((resolve, reject) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (immediate && !immediateInvoked) {
        try {
          let result = func.apply(this, args);
          callback(null, result);
          resolve(result);
        } catch (error) {
          callback(error);
          reject(error);
        }
        immediateInvoked = true;
      }
      timer = setTimeout(() => {
        try {
          let result = func.apply(this, args);
          callback(null, result);
          resolve(result);
        } catch (error) {
          callback(error);
          reject(error);
        }
        immediateInvoked = false;
      }, wait);
    });
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
};

module.exports = debounce;
