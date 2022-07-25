const compose =
  (...funcs) =>
  (...args) =>
    funcs.reduceRight((f, g) => g(f(...args)));

const compose1 = (...funcs) =>
  funcs.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  );
