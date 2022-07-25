// FizzBuzz，是否能被3或5整除
function fizzbuzz(n) {
  let str = "";
  if (n % 3 === 0) {
    str += "Fizz";
  }
  if (n % 5 === 0) {
    str += "Buzz";
  }
  console.log(str);
  return str || n;
}
//=> 'fizz'
fizzbuzz(3);

//=> 'buzz'
fizzbuzz(5);

//=> 'fizzbuzz'
fizzbuzz(15);

//=> 7
console.log(fizzbuzz(7));
