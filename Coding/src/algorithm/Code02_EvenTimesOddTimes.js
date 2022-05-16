function main() {
  let arr1 = [3, 3, 2, 3, 1, 1, 1, 3, 1, 1, 1];
  printOddTimesNum1(arr1);

  let arr2 = [4, 3, 4, 2, 2, 2, 4, 1, 1, 1, 3, 3, 1, 1, 1, 4, 2, 2];
  printOddTimesNum2(arr2);
  console.log(bit1counts(8)); //1000  1
  console.log(bit1counts(6)); //0110   2
  console.log(bit1counts(15)); //1111  4
  console.log(bit1counts(14)); // 1110  3
}

main();
/**
 * 有一个数字出现了奇数次，打印出来
 */
function printOddTimesNum1(arr) {
  let eor = null;
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i];
  }
  console.log(eor);
}
/**
 * 有两个数字出现了奇数次，分别打印出来
 */
function printOddTimesNum2(arr) {
  let eor = null;
  for (let i = 0; i < arr.length; i++) {
    eor ^= arr[i];
  }
  let onlyOne = null;
  let rightOne = eor & -eor;
  for (let i = 0; i < arr.length; i++) {
    if (rightOne & arr[i]) {
      onlyOne ^= arr[i];
    }
  }
  console.log(onlyOne + "  " + (eor ^ onlyOne));
}

/**
 * 给定一个数 统计出这个数对应的二进制数中 1出现的次数
 * @param {*} num
 */
function bit1counts(num) {
  let count = 0;

  while (num !== 0) {
    let rightOne = num & -num;
    count++;
    num ^= rightOne;
  }

  return count;
}
