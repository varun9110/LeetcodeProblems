/**
 * 3372. Maximize the Number of Target Nodes After Connecting Trees I
 * Difficulty: Medium
 * 
 * There exist two undirected trees with n and m nodes, with distinct labels in ranges [0, n - 1] and [0, m - 1], respectively.

You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree. You are also given an integer k.

Node u is target to node v if the number of edges on the path from u to v is less than or equal to k. Note that a node is always target to itself.

Return an array of n integers answer, where answer[i] is the maximum possible number of nodes target to node i of the first tree if you have to connect one node from the first tree to another node in the second tree.

Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

 

Example 1:

Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]], k = 2

Output: [9,7,9,8,8]

Explanation:

For i = 0, connect node 0 from the first tree to node 0 from the second tree.
For i = 1, connect node 1 from the first tree to node 0 from the second tree.
For i = 2, connect node 2 from the first tree to node 4 from the second tree.
For i = 3, connect node 3 from the first tree to node 4 from the second tree.
For i = 4, connect node 4 from the first tree to node 4 from the second tree.

Example 2:

Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]], k = 1

Output: [6,3,3,3,3]

Explanation:

For every i, connect node i of the first tree with any node of the second tree.


 

Constraints:

2 <= n, m <= 1000
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.
0 <= k <= 1000
 */


/**
 * BFS approach
 */

/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k
 * @return {number[]}
 */
var maxTargetNodes = function(edges1, edges2, k) {
    const n = edges1.length + 1;
    const m = edges2.length + 1;

    const adj1 = Array.from({ length: n }, () => []);
    const adj2 = Array.from({ length: m }, () => []);

    for (const [u, v] of edges1) {
      adj1[u].push(v);
      adj1[v].push(u);
    }
    for (const [u, v] of edges2) {
      adj2[u].push(v);
      adj2[v].push(u);
    } 
    const good1 = new Array(n).fill(0);
    const good2 = new Array(m).fill(0);

    const dfs = (node, parent, distance, root, k, good, adj) => {
      if (distance >= k) return;
      good[root]++;
      for (const neighbor of adj[node]) {
        if (neighbor !== parent) {
          dfs(neighbor, node, distance + 1, root, k, good, adj);
        }
      }
    };
    for (let i = 0; i < n; i++) {
      dfs(i, -1, 0, i, k + 1, good1, adj1);
    }

    for (let i = 0; i < m; i++) {
      dfs(i, -1, 0, i, k, good2, adj2);
    }

    const mx = Math.max(...good2);

    return good1.map(value => value + mx);

};