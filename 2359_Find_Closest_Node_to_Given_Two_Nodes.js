/**
 * 2359. Find Closest Node to Given Two Nodes
 * Difficulty: Medium
 * 
 * You are given a directed graph of n nodes numbered from 0 to n - 1, where each node has at most one outgoing edge.

The graph is represented with a given 0-indexed array edges of size n, indicating that there is a directed edge from node i to node edges[i]. If there is no outgoing edge from i, then edges[i] == -1.

You are also given two integers node1 and node2.

Return the index of the node that can be reached from both node1 and node2, such that the maximum between the distance from node1 to that node, and from node2 to that node is minimized. If there are multiple answers, return the node with the smallest index, and if no possible answer exists, return -1.

Note that edges may contain cycles.

 

Example 1:


Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
Output: 2
Explanation: The distance from node 0 to node 2 is 1, and the distance from node 1 to node 2 is 1.
The maximum of those two distances is 1. It can be proven that we cannot get a node with a smaller maximum distance than 1, so we return node 2.
Example 2:


Input: edges = [1,2,-1], node1 = 0, node2 = 2
Output: 2
Explanation: The distance from node 0 to node 2 is 2, and the distance from node 2 to itself is 0.
The maximum of those two distances is 2. It can be proven that we cannot get a node with a smaller maximum distance than 2, so we return node 2.
 

Constraints:

n == edges.length
2 <= n <= 105
-1 <= edges[i] < n
edges[i] != i
0 <= node1, node2 < n
 */

/**
 * Intuition
Smallest distance in graph -> almost always bfs

Approach
Get smallest distances from node1 and node2 to every possible node.
Iterate through all nodes and find max distance if route from node1 and node2 exists
Complexity
Time complexity: O(n)

Space complexity: O(n)
 */

/**
 * @param {number[]} edges
 * @param {number} node1
 * @param {number} node2
 * @return {number}
 */
function closestMeetingNode (edges, node1, node2) {
    let map1 = {}
    let map2 = {}
    let count = 0;

    while(map1[node1] == undefined && node1 != -1){
        map1[node1] = count;
        count++
        node1 = edges[node1];
    }
    count = 0;
    while(map2[node2] == undefined && node2 != -1){
        map2[node2] = count;
        count++
        node2 = edges[node2]
    }
    let max = Infinity;
    let res = -1;

    for(let i =0; i<edges.length;i++){
        if(map1[i] == undefined || map2[i] == undefined) continue;
        let localMax = Math.max(map1[i],map2[i])
        if(localMax<max){
            max = localMax;
            res = i;
        }
    }

    return res;
}
