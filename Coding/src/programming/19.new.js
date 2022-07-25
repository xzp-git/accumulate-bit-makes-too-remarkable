const _new = (Ctor, ...args) => {
  if (typeof Ctor !== "function" || !Ctor.prototype)
    throw new Error(`${Ctor} is not a constructor`);
  const newObj = Object.create(Ctor.prototype);
  let result = Ctor.apply(newObj, args);
  if (/^(object|function)$/.test(typeof result) && result !== null)
    return result;
  return newObj;
};
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log("wangwang");
};
Dog.prototype.sayName = function () {
  console.log("my name is " + this.name);
};

let sanmao = new Dog("三毛");
sanmao.sayName();
sanmao.bark();

let sanmao1 = _new(Dog, "三毛111111111");
sanmao1.sayName();
sanmao1.bark();
