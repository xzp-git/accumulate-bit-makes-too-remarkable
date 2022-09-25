//给你一个节点，找出该节点的后继节点

//后继节点 -> 中序遍历中 某个节点的后继节点就是该节点的下一个节点这就是后继节点的定义

//该二叉树的节点 存在一个父亲指针 指向自己的父节点
class Node  {
    constructor (data) {
        this.value = data
        this.left = null
        this.right = null
        this.parent = null
    }
}

// 常规方法, 如果给你树的头节点,你可以把树进行中序遍历, 然后再找出后继节点

/**
 * 该题 是只给你某个节点, 但是该节点有个额外的 父指针
 * 
 * 根据中序遍历的结果可以找到两个规律
 * - 如果该节点存在右子树, 那该节点的后继节点就是 右子树的最左节点
 * - 如果该节点不存在右子树, 那该节点的后继节点就是一直向上找
 *   找到某个节点a是一个节点c的左子树,
 *   那节点c就是该节点的后继节点,如果找不到证明该节点的后继节点就是null
 */


function getSuccessorNode(node) {
    if (!node) {
        return null
    }

    if (node.right) {
        return getLeftMost(node.right)
    }else{
        let parent = node.parent
        // 如果node是父节点的右节点 就继续往上找
        while (parent && parent.right === node) {
            node = parent
            parent = node.parent
        }
        return parent
    }
}

function getLeftMost(node) {
    if (!node) {
        return node
    }
    while (node.left) {
        node = node.left
    }
    return node
}