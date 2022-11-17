/**
 *
 * 判断二叉树是否是 完全二叉树
 *
 * 一般方法：需要验证两点
 *          1. 如果一个节点 Y 它有右子树 没有左子树 返回 false
 *          2. 遇到不双全节点后，剩下的节点都是叶子节点 否则 返回 false
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function (root) {
  if (!root) return true;

  const queue = [root];
  let l = null;
  let r = null;
  //是否遇到过左右两个孩子不双全的节点
  let incomplete = false;
  while (queue.length) {
    root = queue.shift();
    l = root.left;
    r = root.right;

    if ((incomplete && (l || r)) || (!l && r)) {
      return false;
    }

    if (l) {
      queue.push(l);
    }
    if (r) {
      queue.push(r);
    }
    if (!l || !r) {
      incomplete = true;
    }
  }
  return true;
};
