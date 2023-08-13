/**
 *
 * 并查集。
 *  a b c d e 这几个样本 都在 各自的集合里面
 *  {a} {b} {c} {d} {e}
 * 有两个方法
 * 1. union(a,b) void  合并 a所在的集合 b所在的集合
 * 2. isSameSet(a,b) boolean  判断 a b 是否在同一个集合里面
 *
 * 并查集的时间复杂度  O(1)
 * 如果有 N个 样本 调用 isSameSet  和 union  很频繁， 可以做到 均摊下来是O(1)的时间复杂度
 * 均摊的意思 是 例如 有 100万个样本，我调用 100亿次 isSameSet 和 union 那么每次调用的时间是常数级别的
 */
