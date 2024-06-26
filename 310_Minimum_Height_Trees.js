/**
 * 310. Minimum Height Trees
 * Difficulty: Medium
 * 
 * A tree is an undirected graph in which any two vertices are connected by exactly one path. 
 * In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates 
that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. 
When you select a node x as the root, the result tree has height h. Among all possible rooted trees, 
those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
Return a list of all MHTs' root labels. You can return the answer in any order.
The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

Example 1:

Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.
Example 2:


Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]
 

Constraints:

1 <= n <= 2 * 104
edges.length == n - 1
0 <= ai, bi < n
ai != bi
All the pairs (ai, bi) are distinct.
The given input is guaranteed to be a tree and there will be no repeated edges.
 */

/**
 * 🛠️ Approach
Initialize arrays counts and links to store the counts of edges and the adjacent nodes for each node.
Traverse through the edges array and update counts and links accordingly.
Add leaf nodes (nodes with only one edge) to a queue.
While the queue is not empty, remove nodes layer by layer and update their neighbors' counts and links.
Keep track of the distances from the initial leaf nodes to the current nodes.
Find the maximum distance among all nodes.
Add nodes with the maximum distance to the result list.

 */

var findMinHeightTrees = function(n, edges) {
    const counts = new Array(n).fill(0);
        const links = new Array(n).fill(0);
        
        for (const edge of edges) {
            links[edge[0]] ^= edge[1];
            counts[edge[0]]++;
            links[edge[1]] ^= edge[0];
            counts[edge[1]]++;
        }
        
        const Qu = [];
        const dists = new Array(n).fill(0);
        
        for (let i = 0; i < n; i++) {
            if (counts[i] === 1)
                Qu.push(i);
        }
        
        let stp = 1;
        while (Qu.length > 0) {
            const size = Qu.length;
            for (let j = 0; j < size; j++) {
                const tmp = Qu.shift();
                links[links[tmp]] ^= tmp;
                counts[links[tmp]]--;
                if (counts[links[tmp]] === 1) {
                    dists[links[tmp]] = Math.max(stp, dists[links[tmp]]);
                    Qu.push(links[tmp]);
                }
            }
            stp++;
        }
        
        const maxDist = Math.max(...dists);
        const res = [];
        for (let i = 0; i < n; i++) {
            if (dists[i] === maxDist)
                res.push(i);
        }
        
        return res;
};