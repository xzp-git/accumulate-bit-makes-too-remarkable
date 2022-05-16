function Person1(name, age) {
  this.name = name;
  this.age = age;
}

Person1.prototype.play = function play() {
  console.log("play");
};
let p1 = new Person1("zhangsan", 18);

function Person2(name, age, sex) {
  Person1.call(this, name, age);
  this.sex = sex;
}
Person2.prototype = Object.create(Person1.prototype);
Person2.prototype.constructor = Person2;

Person2.prototype.eat = function eat() {
  console.log("eat");
};

let p2 = new Person2("lisi", 18, "男");
