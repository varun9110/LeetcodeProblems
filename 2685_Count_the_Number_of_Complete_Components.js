/**
 * 2685. Count the Number of Complete Components
 * Difficulty: Medium
 * 
 * You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer 
 * array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.

Return the number of complete connected components of the graph.

A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a 
vertex outside of the subgraph.

A connected component is said to be complete if there exists an edge between every pair of its vertices.

 

Example 1:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.
Example 2:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component 
containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.
 

Constraints:

1 <= n <= 50
0 <= edges.length <= n * (n - 1) / 2
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no repeated edges.
 */

/**
 * Intuition
To solve the problem of counting the number of complete components in a graph, where each complete component is a subgraph where every vertex is connected to every other vertex, we can approach it using Depth-First Search (DFS) to explore each connected component. Here's how you can implement the solution:

Approach:
Graph Representation:
Use an adjacency list to represent the graph. Initialize graph as an array of arrays, where each index represents a vertex and contains an array of its adjacent vertices.
DFS Traversal:
Implement a DFS function (dfs) that starts from a given vertex, marks all reachable vertices as visited, and counts the number of vertices (vertCount) and edges (edgeCount) in that component.
Use an array visited to keep track of visited vertices.
Complete Component Check:
After performing DFS for an unvisited vertex, check if the component is complete:
A component is complete if the number of vertices (vertCount) times ((vertCount - 1)) equals the number of edges (edgeCount). This checks if every vertex in the component is connected to every other vertex.
Main Function:
Initialize res to count the number of complete components.
Iterate through all vertices. For each vertex that hasn't been visited, initiate a DFS to explore its component.
If the component is complete, increment res.
Return:
Return res, which will be the total count of complete components in the graph.
Complexity:
Time Complexity: O(n+e) where n is the number of vertices and e is the number of edges. This is because we perform a DFS for each vertex and iterate through its adjacent edges.
Space Complexity: O(n+e) due to the adjacency list (graph), visited array, and recursive stack space used by DFS.
 */


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var countCompleteComponents = function (n, edges) {
    let graph = new Array(n).fill(null).map(() => []);
    let res = 0;

    for (let [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let visited = new Array(n).fill(false);
    function dfs(u) {
        visited[u] = true;
        ++vertCount;

        for (let v of graph[u]) {
            ++edgeCount;
            if (!visited[v]) {
                dfs(v);
            }
        }
    }

    for (let i = 0; i < n; ++i) {
        if (!visited[i]) {
            vertCount = 0;
            edgeCount = 0;
            dfs(i);
            if (vertCount * (vertCount - 1) === edgeCount) {
                ++res;
            }
        }
    }



    return res;
};