/**
 * 3203. Find Minimum Diameter After Merging Two Trees
 * Difficulty: Hard
 * 
 * There exist two undirected trees with n and m nodes, numbered from 0 to n - 1 and from 0 to m - 1, respectively. 
 * You are given two 2D integer arrays edges1 and edges2 of lengths n - 1 and m - 1, respectively, where edges1[i] = [ai, bi] indicates 
 * that there is an edge between nodes ai and bi in the first tree and edges2[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the second tree.

You must connect one node from the first tree with another node from the second tree with an edge.
Return the minimum possible diameter of the resulting tree.
The diameter of a tree is the length of the longest path between any two nodes in the tree.

Example 1:
Input: edges1 = [[0,1],[0,2],[0,3]], edges2 = [[0,1]]
Output: 3
Explanation:
We can obtain a tree of diameter 3 by connecting node 0 from the first tree with any node from the second tree.
Example 2:
Input: edges1 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]], edges2 = [[0,1],[0,2],[0,3],[2,4],[2,5],[3,6],[2,7]]
Output: 5
Explanation:

We can obtain a tree of diameter 5 by connecting node 0 from the first tree with node 0 from the second tree.

Constraints:
1 <= n, m <= 105
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
The main idea is to calculate the diameter of both trees individually using BFS (Breadth-First Search), which finds the longest path in a tree. 
Then, we compute the diameter of the new tree formed by merging a node from each tree and taking the minimum diameter possible.

Approach
For each tree, use BFS from any arbitrary node to find the farthest node.
Perform another BFS from the farthest node found to compute the tree's diameter.
Merge the two trees by adding an edge between them and calculate the new diameter.
Return the minimum possible diameter after merging.
Complexity
Time complexity: O(n + m), where n and m are the number of nodes in the two trees.
Space complexity: O(n + m) for the graph storage and BFS queues.
 */

/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
const getDiameter = (graph, nodes) => {
    const bfs = (start) => {
        const dist = Array(nodes).fill(-1);
        const q = [start];
        dist[start] = 0;
        let farNode = start;
        while (q.length) {
            const curr = q.shift();
            for (const next of graph[curr]) {
                if (dist[next] === -1) {
                    dist[next] = dist[curr] + 1;
                    q.push(next);
                    if (dist[next] > dist[farNode]) {
                        farNode = next;
                    }
                }
            }
        }
        return [farNode, dist[farNode]];
    };
    return bfs(bfs(0)[0])[1];
}

var minimumDiameterAfterMerge = function (edges1, edges2) {
    const n = edges1.length + 1;
    const m = edges2.length + 1;
    const g1 = Array(n).fill().map(() => []);
    const g2 = Array(m).fill().map(() => []);

    for (const edge of edges1) {
        g1[edge[0]].push(edge[1]);
        g1[edge[1]].push(edge[0]);
    }
    for (const edge of edges2) {
        g2[edge[0]].push(edge[1]);
        g2[edge[1]].push(edge[0]);
    }

    const d1 = getDiameter(g1, n);
    const d2 = getDiameter(g2, m);
    return Math.max(d1, d2, Math.floor((d1 + 1) / 2) + Math.floor((d2 + 1) / 2) + 1);
}