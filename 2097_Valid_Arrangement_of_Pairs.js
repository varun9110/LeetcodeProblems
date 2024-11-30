/**
 * 2097. Valid Arrangement of Pairs
 * Difficulty: Hard
 * 
 * You are given a 0-indexed 2D integer array pairs where pairs[i] = [starti, endi]. An arrangement of pairs is valid if for every index i where 1 <= i < pairs.length, 
 * we have endi-1 == starti.

Return any valid arrangement of pairs.
Note: The inputs will be generated such that there exists a valid arrangement of pairs.
Example 1:
Input: pairs = [[5,1],[4,5],[11,9],[9,4]]
Output: [[11,9],[9,4],[4,5],[5,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 9 == 9 = start1 
end1 = 4 == 4 = start2
end2 = 5 == 5 = start3
Example 2:
Input: pairs = [[1,3],[3,2],[2,1]]
Output: [[1,3],[3,2],[2,1]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 3 == 3 = start1
end1 = 2 == 2 = start2
The arrangements [[2,1],[1,3],[3,2]] and [[3,2],[2,1],[1,3]] are also valid.
Example 3:

Input: pairs = [[1,2],[1,3],[2,1]]
Output: [[1,2],[2,1],[1,3]]
Explanation:
This is a valid arrangement since endi-1 always equals starti.
end0 = 2 == 2 = start1
end1 = 1 == 1 = start2

Constraints:
1 <= pairs.length <= 105
pairs[i].length == 2
0 <= starti, endi <= 109
starti != endi
No two pairs are exactly the same.
There exists a valid arrangement of pairs.
 */


/**
 * Intuition
The problem is about finding a valid Eulerian path in a directed graph formed by the input pairs. An Eulerian path is a trail in a graph that visits 
every edge exactly once. If we can construct such a path, the result is guaranteed to be valid.

Key observations:

Each pair [ 𝑢 , 𝑣 ] [u,v] represents a directed edge 𝑢 → 𝑣 u→v.
For an Eulerian path to exist, at most one node should have an out-degree exceeding its in-degree by 1, and at most one node should have an 
in-degree exceeding its out-degree by 1. All other nodes should have equal in-degrees and out-degrees.
Approach
Graph Construction:
Use a dictionary to represent the adjacency list of the directed graph.
Track the in-degree and out-degree differences for each node.
Identify the Start Node:
If a node exists with an out-degree exceeding its in-degree by 1, this will be the starting node for the Eulerian path.
If no such node exists, any node from the input pairs can be used as the starting point.
Hierholzer’s Algorithm:
Implement a depth-first search (DFS) to construct the Eulerian path. As we traverse, we remove edges from the graph to avoid revisiting them.
Maintain a stack to ensure we construct the path correctly in reverse order (post-order traversal).
Reverse the Path:
Since the path is constructed in reverse, reverse it at the end to get the correct order.
Complexity
Time complexity:O(N)
Space complexity:O(N)
 */

/**
 * @param {number[][]} pairs
 * @return {number[][]}
 */
var validArrangement = function(pairs) {
    // Graph adjacency list and degree tracker
    const graph = new Map();
    const inOutDeg = new Map();

    // Build graph and track in/out degrees
    for (const [start, end] of pairs) {
        if (!graph.has(start)) graph.set(start, []);
        graph.get(start).push(end);

        inOutDeg.set(start, (inOutDeg.get(start) || 0) + 1); // Out-degree
        inOutDeg.set(end, (inOutDeg.get(end) || 0) - 1);    // In-degree
    }

    // Find the start node
    let startNode = pairs[0][0];
    for (const [node, degree] of inOutDeg) {
        if (degree === 1) {
            startNode = node;
            break;
        }
    }

    const path = [];

    // Hierholzer's algorithm for Eulerian path
    const dfs = (curr) => {
        const neighbors = graph.get(curr) || [];
        while (neighbors.length) {
            const next = neighbors.pop();
            dfs(next);
            path.push([curr, next]); // Add edge to path in reverse order
        }
    };

    dfs(startNode);

    // Return the path in correct order
    return path.reverse();
};