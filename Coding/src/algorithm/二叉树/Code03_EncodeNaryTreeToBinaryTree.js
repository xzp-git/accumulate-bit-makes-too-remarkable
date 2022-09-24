class Node {
    constructor (val, children = null) {
        this.val = val
        this.children = children
    }
}

class TreeNode {
    constructor (val) {
        this.val = val
        this.left = null
        this.right = null
    }
}

class Codec {
    /**
     * 将多叉树使用二叉树按照统一的编码规则存放
     * 
     * 规则 所有多叉树的节点的儿子放在左子树的有边界
     *  类似与下面 1 节点有多个儿子 把它们放在 左子树的有边界
     * 有这个规则去编码多叉树
     *  1 -> [2, 3, 4]
     *     1
     *    / \
     *   2
     *    \
     *     3
     *      \
     *       4                
     * @param {多叉树的根节点 } root 
     * @returns 
     */
    encode (root) {
        if (!root) return null
        const head = new TreeNode(root.val)
        head.left = en(root.children)
        return head
    }
    /**
     * 给我一个孩子节点 构造出 右边界
     * @param {孩子列表} children 
     */
    en (children) {
        let head = null, cur = null

        for (let child of children){
            let tNode = new TreeNode(child.val)
            // 如果头节点不存在，保存头节点
            if (!head) {
                head = tNode
            }else{
                //将后面的孩子挂在前一个孩子的右节点
                cur.right = tNode
            }
            //每次都更新为新的当前节点
            cur = tNode
            //递归处理每个节点的左树的右边界
            cur.left = this.en(child.children)
        }

        return head
    }

    /**
     * 根据编码后的二叉树的根节点 构造出多叉树
     * @param {编码后的二叉树的根节点} root 
     * @returns 
     */
    decode(root){
        if (!root) {
            return null
        }

        return new Node(root.val, this.de(root.left))
    }

    de(root){
        let children = []
        while (root) {
            let cur = new Node(root.val, this.de(root.children))
            children.push(cur)
            root = root.right
        }
        return children
    }
}