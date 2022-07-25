const sleep = (sceonds) =>
  new Promise((resolve) => setTimeout(resolve, sceonds));

const delay = (func, sceonds, ...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Promise.resolve(func(...args))
        .then(resolve)
        .catch(reject);
    }, sceonds);
  });
};
