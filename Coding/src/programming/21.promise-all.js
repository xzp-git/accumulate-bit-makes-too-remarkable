function all(promises) {
  return new Promise((resolve, reject) => {
    let resArr = [];
    let count = 0;

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then((value) => {
        resArr[i] = value;
        if (++count === promises.length) {
          resolve(resArr);
        }
      }, reject);
    }
  });
}
