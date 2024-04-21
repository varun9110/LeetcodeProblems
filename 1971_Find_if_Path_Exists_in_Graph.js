/**
 * 1971. Find if Path Exists in Graph
 * Difficulty: Easy
 * 
 * There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). 
 * The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes 
 * a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.
Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2
Example 2:
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.
 
Constraints:
1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.
 */

/**
 * Approach:
Initialize: Create a boolean array visited of size n to keep track of visited vertices. Mark the source vertex as visited initially.
Traversal Loop: Use a while loop that continues until there are no more changes in the visited vertices (flag remains false).
Check Edges: Within each iteration of the loop, iterate through the edges array. For each edge, if one vertex is 
visited and the other is not, mark both vertices as visited and set flag to true.
Destination Check: After updating the visited array, check if the destination vertex is marked as visited. If so, return true as a valid path exists.
Return: If the while loop completes without finding a valid path to the destination, return false.

 */

var validPath = function(n, edges, source, destination) {
    if (n === 1) return true; // Special case where there is only one vertex
    let visited = new Array(n).fill(false);
    visited[source] = true;
    let flag = true;
    while (flag) {
        flag = false;
        for (const edge of edges) {
            if (visited[edge[0]] !== visited[edge[1]]) {
                visited[edge[0]] = true;
                visited[edge[1]] = true;
                flag = true;
            }
            if (visited[destination]) return true;
        }
    }
    return false;
};