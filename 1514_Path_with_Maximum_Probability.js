/**
 * 1514. Path with Maximum Probability
 * Difficulty: Medium
 * 
 * You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge 
 * connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

Example 1:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.
Example 2:
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000
Example 3:
Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.

Constraints:
2 <= n <= 10^4
0 <= start, end < n
start != end
0 <= a, b < n
a != b
0 <= succProb.length == edges.length <= 2*10^4
0 <= succProb[i] <= 1
There is at most one edge between every two nodes.
 */

/**
 * Intuition ✒️
To solve this problem, we need to find the path between two nodes in an undirected graph that maximizes the product of edge probabilities. 
The Bellman-Ford algorithm, which is typically used to find the shortest paths in graphs with negative weights, can be adapted to solve this problem. 
Instead of minimizing distances, we will maximize probabilities by updating the maximum probability to reach each node iteratively.
Approach 🚀
1️⃣Initialize an array dist where dist[i] holds the maximum probability to reach node i from the start node. Set dist[start] = 1 since the probability of 
starting at the start node is 1.
2️⃣ Perform up to n-1 iterations, where n is the number of nodes. In each iteration, check each edge and update the probability of reaching the neighboring nodes.
3️⃣ For each edge (u, v), if the probability of reaching v through u (i.e., dist[u] * succProb[i]) is greater than the current known probability to reach v (dist[v]), 
update dist[v]. Similarly, update dist[u] if the probability of reaching u through v is greater.
4️⃣After completing the iterations, dist[end] will contain the maximum probability of reaching the end node from the start node. If there's no path, it will remain 0.
Time complexity:⏲️
The algorithm runs in O(n×E), where n is the number of nodes and E is the number of edges. This is because we perform n-1 iterations over all the edges.
Space complexity:🛰️
The space complexity is O(n) since we are using an array dist of size n to store the maximum probability for each node.
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} succProb
 * @param {number} start_node
 * @param {number} end_node
 * @return {number}
 */
var maxProbability = function(n, edges, succProb, start_node, end_node) {
    let maxProb = new Array(n).fill(0.0);
    maxProb[start_node] = 1.0;

    for (let i = 0; i < n - 1; i++) {
        let updated = false;
        for (let j = 0; j < edges.length; j++) {
            let u = edges[j][0];
            let v = edges[j][1];
            let prob = succProb[j];

            if (maxProb[u] * prob > maxProb[v]) {
                maxProb[v] = maxProb[u] * prob;
                updated = true;
            }
            if (maxProb[v] * prob > maxProb[u]) {
                maxProb[u] = maxProb[v] * prob;
                updated = true;
            }
        }
        if (!updated) break;
    }

    return maxProb[end_node];
};