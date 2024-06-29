/**
 * 2192. All Ancestors of a Node in a Directed Acyclic Graph
 * Difficulty: Medium
 * 
 * You are given a positive integer n representing the number of nodes of a Directed Acyclic Graph (DAG). 
 * The nodes are numbered from 0 to n - 1 (inclusive).

You are also given a 2D integer array edges, where edges[i] = [fromi, toi] denotes that there is a unidirectional edge from fromi to toi in the graph.
Return a list answer, where answer[i] is the list of ancestors of the ith node, sorted in ascending order.

A node u is an ancestor of another node v if u can reach v via a set of edges.

Example 1:
Input: n = 8, edgeList = [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]
Output: [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
Explanation:
The above diagram represents the input graph.
- Nodes 0, 1, and 2 do not have any ancestors.
- Node 3 has two ancestors 0 and 1.
- Node 4 has two ancestors 0 and 2.
- Node 5 has three ancestors 0, 1, and 3.
- Node 6 has five ancestors 0, 1, 2, 3, and 4.
- Node 7 has four ancestors 0, 1, 2, and 3.
Example 2:
Input: n = 5, edgeList = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Output: [[],[0],[0,1],[0,1,2],[0,1,2,3]]
Explanation:
The above diagram represents the input graph.
- Node 0 does not have any ancestor.
- Node 1 has one ancestor 0.
- Node 2 has two ancestors 0 and 1.
- Node 3 has three ancestors 0, 1, and 2.
- Node 4 has four ancestors 0, 1, 2, and 3.
Constraints:

1 <= n <= 1000
0 <= edges.length <= min(2000, n * (n - 1) / 2)
edges[i].length == 2
0 <= fromi, toi <= n - 1
fromi != toi
There are no duplicate edges.
The graph is directed and acyclic.
 */

/**
 * Intuition
In a Directed Acyclic Graph (DAG), determining the ancestors of each node involves identifying all nodes from which there is a 
directed path to the given node. The ancestors of a node ( v ) are those nodes ( u ) such that there exists a path from ( u ) to ( v ). Since the graph is acyclic, this problem can be efficiently solved using Depth-First Search (DFS).

Approach
Graph Representation:

Use an adjacency list to represent the graph. This allows efficient traversal of the graph.
DFS for Ancestor Tracking:

Perform a DFS from each node to identify all nodes that can reach the current node. During this traversal, 
mark nodes as visited to avoid cycles and repeated work.
While performing the DFS, if we reach a node, we add the starting node (ancestor) to the list of ancestors for the reached node.
Result Collection:

Initialize a list of lists to store the ancestors for each node. Each index corresponds to a node and contains a list of its ancestors.
Sorting:

After collecting all ancestors using DFS, sort the ancestor lists to meet the requirement of ascending order.
Complexity
Time Complexity:

Building the graph: ( O(m) ), where ( m ) is the number of edges.
DFS from each node: ( O(n ⋅ (n + m)) ) in the worst case, where ( n ) is the number of nodes and ( m ) is the number of edges. 
Each DFS can traverse up to all nodes and edges.
Sorting the ancestors: ( O(n ⋅ k log k) ), where ( k ) is the average number of ancestors per node.
The overall time complexity is ( O(n ⋅ (n + m)) ) considering the nested DFS traversal.

Space Complexity:

Storing the graph: ( O(n + m) ).
Storing the ancestors: ( O(n ⋅ n) ) in the worst case if every node is an ancestor of every other node.
Additional space for recursion stack in DFS: ( O(n) ).
 */


var getAncestors = function(n, edges) {
    let res = Array.from({ length: n }, () => []);
    let graph = Array.from({ length: n }, () => []);
    
    for (let edge of edges) {
        graph[edge[0]].push(edge[1]);
    }
    
    for (let i = 0; i < n; i++) {
        dfs(graph, i, i, res, Array(n).fill(false));
    }
    
    for (let i = 0; i < n; i++) {
        res[i].sort((a, b) => a - b);
    }
    
    return res;
};

function dfs(graph, parent, curr, res, visit) {
    visit[curr] = true;
    for (let dest of graph[curr]) {
        if (!visit[dest]) {
            res[dest].push(parent);
            dfs(graph, parent, dest, res, visit);
        }
    }
}