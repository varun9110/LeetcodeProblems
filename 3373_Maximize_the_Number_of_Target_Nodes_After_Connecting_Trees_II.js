/**
 * 3373. Maximize the Number of Target Nodes After Connecting Trees II
 * Difficulty: Hard
 * 
 * There exist two undirected trees with n and m nodes, labeled from [0, n - 1] and [0, m - 1], respectively.

You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] 
indicates that there is an edge between nodes ui and vi in the second tree.

Node u is target to node v if the number of edges on the path from u to v is even. Note that a node is always target to itself.

Return an array of n integers answer, where answer[i] is the maximum possible number of nodes that are target to node i of the first tree if you had to connect one node from the first tree to another node in the second tree.

Note that queries are independent from each other. That is, for every query you will remove the added edge before proceeding to the next query.

Example 1:

Input: edges1 = [[0,1],[0,2],[2,3],[2,4]], edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]
Output: [8,7,7,8,8]
Explanation

For i = 0, connect node 0 from the first tree to node 0 from the second tree.
For i = 1, connect node 1 from the first tree to node 4 from the second tree.
For i = 2, connect node 2 from the first tree to node 7 from the second tree.
For i = 3, connect node 3 from the first tree to node 0 from the second tree.
For i = 4, connect node 4 from the first tree to node 4 from the second tree.

Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[0,4]], edges2 = [[0,1],[1,2],[2,3]]
Output: [3,6,6,6,6]
Explanation:
For every i, connect node i of the first tree with any node of the second tree.

Constraints:

2 <= n, m <= 105
edges1.length == n - 1
edges2.length == m - 1
edges1[i].length == edges2[i].length == 2
edges1[i] = [ai, bi]
0 <= ai, bi < n
edges2[i] = [ui, vi]
0 <= ui, vi < m
The input is generated such that edges1 and edges2 represent valid trees.
 */

/**
 * Intuition
We can mark all nodes in either tree in 2 colors, such as no 2 adjacent nodes are of the same color.

Then number of target nodes for any node is a total number of nodes of same color within the tree.

We can always attach second tree to any node, such that target nodes in a second tree are the larger of 2 node clusters.

Approach
Paint nodes in the second tree in 2 colors, count nodes of each color and take larger of 2 values. This value will be added to every element in the answer.

Paint nodes in the first tree in 2 colors and count nodes of each color.

For every black node, return number of black nodes + size of larger cluster from second tree
For every white node, return number of white nodes + size of larger cluster from second tree
 */

/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function(edges1, edges2) {
    function dfs(v, u, adj, parity, even){
        let res = even;
        parity[v] = even;
        for(let w of adj[v]){
            if(w == u) continue;
            res += dfs(w, v, adj, parity, !even);
        }
        return res
    }
    function adj(edges, n){
        var adj_list = Array.from({length:n}, ()=>[]);
        for(let i = 0; i < n-1; i++){
            let [u,v] = edges[i];
            adj_list[u].push(v);
            adj_list[v].push(u);
        }
        return adj_list;
    }
    let n1 = edges1.length+1, n2 = edges2.length+1;
    console.log(n1, n2);
    let parity1 = Array.from({length:n1}, () => false);
    let parity2 = Array.from({length:n2}, () => false);
    let even1 = dfs(0, -1, adj(edges1, n1), parity1, true), odd1 = n1 - even1;
    let even2 = dfs(0, -1, adj(edges2, n2), parity2, true), odd2 = n2 - even2;
    let res = [];
    for(let i = 0; i < n1; ++i){
        res.push((parity1[i]?even1:odd1) + Math.max(even2,odd2));
    }
    return res;
};