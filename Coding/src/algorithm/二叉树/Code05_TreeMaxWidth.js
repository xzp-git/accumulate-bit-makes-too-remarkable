/**
 * 找到二叉树宽度最大的那一层的节点数
 */


function TreeMaxWidth(head) {
    if(!head) return 0

    let arrNode = [head]

    //当前层的结束节点
    let curEnd = head,
    //下一层的结束节点 
        nextEnd = null,
        //最大的节点数 
        max = 0, 
        //每一层的节点数
        curLeveNodes = 0
    while (arrNode.length) {
        let cur = arrNode.unshift()
        //如果当前节点的左节点存在 要更新当前层的结束节点
        //为下一层做准备
        if (cur.left) {
            arrNode.push(cur.left)
            nextEnd = cur.left
        }
        //如果当前节点的右节点存在 要更新当前层的结束节点
        if (cur.right) {
            arrNode.push(cur.right)
            nextEnd = cur.right
        }
        //每次有节点弹出都需要将该层的节点数 增加
        curLeveNodes++
        //当前节点和当前层的结束节点 是否相同，相同的话需要更新max
        //清空当前层节点统计的数量
        //并且将之前准备好的 nextEnd 更新到 curEnd 因为新的一层的遍历要开始了
        if (cur === curEnd) {
            max = Math.max(max, curLeveNodes)
            curLeveNodes = 0
            curEnd = nextEnd            
        }

    }
    return max

}