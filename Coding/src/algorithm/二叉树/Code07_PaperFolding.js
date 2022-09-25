/**
 * 折纸条 一次对折 有个 凹 折痕
 *       二次对折 有个 在 凹折痕的上方 是凹  下方是凸 
 *    凹
 *      \
 *        凹
 *      /
 *    凸
 * 
 * 要求 从上到下 一次打印 折痕是凹还是凸
 * 
 * 可以看成是 二叉树的中序遍历
 */

/**
 * 打印所有的折痕
 * @param {折叠的次数} N 
 * 凹 down = true 凸 down = false
 */

function printAllFolds(N) {
    process(1, N, true)
}

function process(i, N, down) {
    
    if(i > N) return
    process(i+1, N, true)
    console.log(down?"凹":"凸");
    process(i+1, N, false)
}

function main() {
    let N = 2
    printAllFolds(N)
}
main()