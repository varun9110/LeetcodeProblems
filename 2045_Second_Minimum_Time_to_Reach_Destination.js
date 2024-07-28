/**
 * 2045. Second Minimum Time to Reach Destination
 * Difficulty: Hard
 * 
 * A city is represented as a bi-directional connected graph with n vertices where each vertex is labeled from 1 to n (inclusive). 
 * The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. 
 * Every vertex pair is connected by at most one edge, and no vertex has an edge to itself. The time taken to traverse any edge is time minutes.

Each vertex has a traffic signal which changes its color from green to red and vice versa every change minutes. All signals change at the same time. 
You can enter a vertex at any time, but can leave a vertex only when the signal is green. You cannot wait at a vertex if the signal is green.

The second minimum value is defined as the smallest value strictly larger than the minimum value.

For example the second minimum value of [2, 3, 4] is 3, and the second minimum value of [2, 2, 4] is 4.
Given n, edges, time, and change, return the second minimum time it will take to go from vertex 1 to vertex n.

Notes:

You can go through any vertex any number of times, including 1 and n.
You can assume that when the journey starts, all signals have just turned green.
 

Example 1:

       
Input: n = 5, edges = [[1,2],[1,3],[1,4],[3,4],[4,5]], time = 3, change = 5
Output: 13
Explanation:
The figure on the left shows the given graph.
The blue path in the figure on the right is the minimum time path.
The time taken is:
- Start at 1, time elapsed=0
- 1 -> 4: 3 minutes, time elapsed=3
- 4 -> 5: 3 minutes, time elapsed=6
Hence the minimum time needed is 6 minutes.

The red path shows the path to get the second minimum time.
- Start at 1, time elapsed=0
- 1 -> 3: 3 minutes, time elapsed=3
- 3 -> 4: 3 minutes, time elapsed=6
- Wait at 4 for 4 minutes, time elapsed=10
- 4 -> 5: 3 minutes, time elapsed=13
Hence the second minimum time is 13 minutes.      
Example 2:


Input: n = 2, edges = [[1,2]], time = 3, change = 2
Output: 11
Explanation:
The minimum time path is 1 -> 2 with time = 3 minutes.
The second minimum time path is 1 -> 2 -> 1 -> 2 with time = 11 minutes.
 

Constraints:

2 <= n <= 104
n - 1 <= edges.length <= min(2 * 104, n * (n - 1) / 2)
edges[i].length == 2
1 <= ui, vi <= n
ui != vi
There are no duplicate edges.
Each vertex can be reached directly or indirectly from every other vertex.
1 <= time, change <= 103
 */


/**
 * Intuition
The problem is to find the second minimum time to travel from vertex 1 to vertex n in a graph where each vertex has traffic signals that change 
from green to red at regular intervals. Here is the intuition and approach for the solution:

Approach
Graph Representation: We represent the graph using an adjacency list. Each edge connects two vertices and has a uniform travel time.

BFS with Time Tracking: We use a BFS approach to explore the shortest paths from the starting vertex (1) to the destination vertex (n). 
\However, instead of just keeping track of the shortest path, we maintain two shortest paths for each vertex:

dist[i][0]: The shortest time to reach vertex i.
dist[i][1]: The second shortest time to reach vertex i.
Traffic Signal Handling: When moving from one vertex to another, we need to consider the traffic signals:

If the current time currTime results in the signal being red, we must wait until it turns green.
We calculate the waitingTime required if the signal is red.
Queue Management: We use a queue to process each node and its current travel time. For each node, we compute the new time to reach its neighbors 
and update the shortest and second shortest times accordingly.

Result: The result is the second shortest time to reach vertex n-1.

Complexity
Time Complexity: The BFS traversal ensures each node is processed. The complexity depends on the number of edges and vertices, leading to O(E + V), 
where E is the number of edges and V is the number of vertices.
Space Complexity: The space complexity is O(V) due to the storage of distances and the queue.
 */


var secondMinimum = function(n, edges, time, change) {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u - 1].push(v - 1);
        adj[v - 1].push(u - 1);
    }
    
    const dist = Array.from({ length: n }, () => [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
    dist[0][0] = 0;
    
    const q = [[0, 0]];
    
    while (q.length > 0) {
        const [currTime, node] = q.shift();
        
        for (const adjNode of adj[node]) {
            let waitingTime = 0;
            if (Math.floor(currTime / change) % 2 === 1) {
                waitingTime = change - (currTime % change);
            }
            
            const newTime = time + currTime + waitingTime;
            
            if (dist[adjNode][0] > newTime) {
                dist[adjNode][1] = dist[adjNode][0];
                dist[adjNode][0] = newTime;
                q.push([newTime, adjNode]);
            } else if (dist[adjNode][1] > newTime && dist[adjNode][0] < newTime) {
                dist[adjNode][1] = newTime;
                q.push([newTime, adjNode]);
            }
        }
    }
    
    return dist[n-1][1];
};