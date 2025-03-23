/**
 * 1976. Number of Ways to Arrive at Destination
 * Difficulty: Medium
 * 
 * You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. 
 * The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui 
and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.

Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.

Example 1:
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
The four ways to get there in 7 minutes are:
- 0 ➝ 6
- 0 ➝ 4 ➝ 6
- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
Example 2:
Input: n = 2, roads = [[1,0,10]]
Output: 1
Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.

Constraints:
1 <= n <= 200
n - 1 <= roads.length <= n * (n - 1) / 2
roads[i].length == 3
0 <= ui, vi <= n - 1
1 <= timei <= 109
ui != vi
There is at most one road connecting any two intersections.
You can reach any intersection from any other intersection.
 */

/**
 * Intuition
This problem combines the shortest path algorithm with counting the number of ways to reach a destination using the shortest path. 
We use Dijkstra's algorithm to find the shortest paths and simultaneously count how many different ways we can reach each node with the current shortest distance.

Approach
Build the Graph: Create an adjacency list representation of the graph where for each node, we store its neighbors and the time to reach them.
Initialize:
Create a dist array to store the shortest distance to each node (initially infinity, except dist[0] = 0)
Create a ways array to count the number of ways to reach each node via the shortest path (initially ways[0] = 1, others = 0)
Dijkstra's Algorithm with DP:
Use a priority queue to explore nodes in order of increasing distance
For each node, look at all its neighbors
If we find a shorter path to a neighbor, update its distance and reset its count of ways
If we find a path of equal length, add the current node's count to the neighbor's count
Result: After the algorithm completes, ways[n-1] contains the number of shortest paths from node 0 to node n-1.
The dynamic programming aspect comes from how we update the ways array. For each node, the number of ways to reach it is the sum of the ways to reach all its predecessors in the shortest path.

Complexity
Time Complexity: O(E log V), where E is the number of edges (roads) and V is the number of vertices (intersections).

Space complexity: O(V + E).
 */

var countPaths = function(n, roads) {
    const graph = Array.from({ length: n }, () => []);
    
    for (const [u, v, time] of roads) {
        graph[u].push([v, time]);
        graph[v].push([u, time]);
    }

    const dist = Array(n).fill(Infinity);
    const ways = Array(n).fill(0);
    
    dist[0] = 0;
    ways[0] = 1;
    
    const pq = new MinHeap();
    pq.push([0, 0]);

    const MOD = 1e9 + 7;

    while (!pq.isEmpty()) {
        const [d, node] = pq.pop();

        if (d > dist[node]) continue;

        for (const [neighbor, time] of graph[node]) {
            if (dist[node] + time < dist[neighbor]) {
                dist[neighbor] = dist[node] + time;
                ways[neighbor] = ways[node];
                pq.push([dist[neighbor], neighbor]);
            } else if (dist[node] + time === dist[neighbor]) {
                ways[neighbor] = (ways[neighbor] + ways[node]) % MOD;
            }
        }
    }

    return ways[n - 1];
};

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown();
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx][0] <= this.heap[idx][0]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (2 * idx + 1 < this.heap.length) {
            let leftIdx = 2 * idx + 1, rightIdx = 2 * idx + 2;
            let smallest = leftIdx;
            if (rightIdx < this.heap.length && this.heap[rightIdx][0] < this.heap[leftIdx][0]) {
                smallest = rightIdx;
            }
            if (this.heap[idx][0] <= this.heap[smallest][0]) break;
            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}