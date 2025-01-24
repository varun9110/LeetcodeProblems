/**
 * 802. Find Eventual Safe States
 * Difficulty: Medium
 * 
 * There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D 
 * integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to 
a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

 

Example 1:

Illustration of graph
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: The given graph is shown above.
Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
Example 2:

Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
Explanation:
Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
 

Constraints:

n == graph.length
1 <= n <= 104
0 <= graph[i].length <= n
0 <= graph[i][j] <= n - 1
graph[i] is sorted in a strictly increasing order.
The graph may contain self-loops.
The number of edges in the graph will be in the range [1, 4 * 104].
 */

/**
 * Explanation
Since, we want to explore the given graph to find the safe nodes, we can use DFS with memoization as this will help explore the graph as efficient as possible as we avoid redundant computations.

For each node, they have 3 possible states to help determine if the current node is whether a safe node or not:

1) Unvisited state (0) is denoted as a not yet visited node

2) Visiting state (1) is denoted as a unsafe node

3) Visited state (2) is denoted as a safe node
With the help of our dfs helper method, we can use this to help return a boolean value indicating whether or not the node is safe recursively.

Since our dfs helper method return boolean value, we add all the safe nodes to a new list if our helper method return True/true.

Initialize:

A result state list to be used to store the states for each node and initialize it as unvisited state (0)

dfs()
This method takes a node as input and returns a boolean value indicating whether the node is considered to be a safe node or not

If the result state for the current node is a non-zero, it means that the state for this node has already been determined. In this case, we return result[node] == 2 , which help checks if the node is determined as a safe node

If the result is still currently 0, this means that the node has not yet been visited before. Therefore, we mark it as visiting (1) denoted as result[node] = 1

Iterate through the current node using the given graph:

For each of its neighbor, if its marked as visiting denoted as result[neighbor] == 1 , this indicates the current presence of the cycle. In this case, we mark the current node as unsafe

Otherwise, we recursively call the dfs method on the neighbor. If the neighbor or any of its descendants is determines to be unsafe, we return False/false to also mark the current node as unsafe

After checking its neighbors, we mark the current node as safe by setting result[neighbor] = 2 and return True/true to indicate that the node is safe

Using our dfs helper method, we can iterate through each node in the graph:

For each node, we call the dfs helper to determine if its a safe node

If the dfs helper return True/true indicating that its a safe node, we add the nodes to a new list

Return the list that contains the safe nodes
 */

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const n = graph.length;
    const result = new Array(n).fill(0);

    const dfs = (node) => {
        if (result[node] !== 0) return result[node] === 2;
        result[node] = 1;
        for (let neighbor of graph[node]) {
            if (result[neighbor] === 1 || !dfs(neighbor)) return false;   
        }
        result[node] = 2;
        return true;
    };
    const safeNodes = [];
    for (let node = 0; node < n; node++) {
        if (dfs(node)) safeNodes.push(node);
    
    }
    return safeNodes;
};