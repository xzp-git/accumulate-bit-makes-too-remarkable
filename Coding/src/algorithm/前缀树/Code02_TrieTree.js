/**
 * 前缀树  主要用来处理 长字符串的索引问题
 *
 * 查找字符串公共前缀问题  字符串出现次数最多的字符串
 */

/**
 * pass 有几个字符串 经过此字符
 * end 有几个字符串以该字符为结尾位置
 * nexts 该字符的子集合
 */
class Node {
  constructor() {
    this.pass = 0;
    this.end = 0;
    nexts = new Map();
  }
}

class TrieTree {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    if (!word) return;
    let str = word.split();
    let node = this.root;
    node.pass++;
    for (let i = 0; i < str.length; i++) {
      let cur = str[i];
      if (!node.nexts.has(cur)) {
        node.nexts.set(cur, new Node());
      }
      node = node.nexts.get(cur);
      node.pass++;
    }
    node.end++;
  }

  search(word) {
    if (!word) return;
    let str = word.split();
    let node = this.root;
    for (let i = 0; i < str.length; i++) {
      let cur = str[i];
      if (!node.nexts.has(cur)) {
        return 0;
      }
      node = node.nexts.get(cur);
    }
    return node.end;
  }

  delete(word) {
    if (this.search(word) != 0) {
      let str = word.split();
      let node = this.root;
      node.pass--;
      for (let i = 0; i < str.length; i++) {
        let cur = str[i];
        /**
         * 如果某个字符的pass 为0 了 代表  该字符串出现的次数为一次，不会有其他字符串和他有共享的字符  这个字符串后续的字符也不需要了 直接删除 return 即可
         */
        if (--node.nexts.get(cur).pass === 0) {
          node.nexts.delete(cur);
          return;
        }
        node = node.nexts.get(cur);
      }

      node.end--;
    }
  }
  //所有加入的字符串中，有几个是以pre这个字符串作为前缀的
  prefixNumber(pre) {
    if (!pre) return;
    let str = pre.split();
    let node = this.root;
    for (let i = 0; i < str.length; i++) {
      let cur = str[i];
      if (!node.nexts.has(cur)) {
        return 0;
      }
      node = node.nexts.get(cur);
    }
    return node.pass;
  }
}
