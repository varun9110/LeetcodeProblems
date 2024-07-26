/**
 * 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
 * Difficulty: Medium
 * 
 * There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted 
 * edge between cities fromi and toi, and given the integer distanceThreshold.

Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, 
If there are multiple such cities, return the city with the greatest number.

Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.

Example 1:
Input: n = 4, edges = [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], distanceThreshold = 4
Output: 3
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 4 for each city are:
City 0 -> [City 1, City 2] 
City 1 -> [City 0, City 2, City 3] 
City 2 -> [City 0, City 1, City 3] 
City 3 -> [City 1, City 2] 
Cities 0 and 3 have 2 neighboring cities at a distanceThreshold = 4, but we have to return city 3 since it has the greatest number.
Example 2:
Input: n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
Output: 0
Explanation: The figure above describes the graph. 
The neighboring cities at a distanceThreshold = 2 for each city are:
City 0 -> [City 1] 
City 1 -> [City 0, City 4] 
City 2 -> [City 3, City 4] 
City 3 -> [City 2, City 4]
City 4 -> [City 1, City 2, City 3] 
The city 0 has 1 neighboring city at a distanceThreshold = 2.

Constraints:
2 <= n <= 100
1 <= edges.length <= n * (n - 1) / 2
edges[i].length == 3
0 <= fromi < toi < n
1 <= weighti, distanceThreshold <= 10^4
All pairs (fromi, toi) are distinct.
 */

/**
 *  Approach 1: Pretty Dijkstra
🤔 Intuition
The first thought I had after looking at the problem description is "Can we actually do better than brute-force solution?". 
As it turns out - no, we do need to traverse graph starting from every node and counting number of cities we can reach for each of them
For traverse we can't use standard BFS because there might be the case where we can reach B from A with 1 edge spending distance 100 or with 
3 edges spending distance 10 in sum. Do you know some BFS-like algorithm which finds only SHORTEST path from node to node? The first algorithm 
I thought about - Dijkstra, but we actually don't need the minimum distances from node to node, all we need - counting of how many nodes we can reach, 
that would be enough.
Why we can use Djikstra here? First of all, as I said, it considers only shortest path between nodes, second, 
the constraints says that 1 <= weight <= 10^4 which means all edges have positive value (which is requirement for djikstra) and third, look at the constraints, 
number of nodes is not exceed 100 which gives us only up to 10^8 iterations even if complexity will be O(10^4) which seems pretty hard to exceed
One of the implementation of dijkstra is using adjacency list represantation and minimum heap
image.png

In general, dijkstra is a greedy graph algorithm to find shortest path distance to every node from source. Why does it works? Well, 
we always choose next to traverse node to which we have minimum distance now, exactly this node will get us to the shortest path in the next "round", 
why? Let's look at the example (here's the heap represented as we "visualize" it, in fact elements might have different order to match heap structure):
image.png

image.png

image.png

image.png

Hope this example helped you to understand why djikstra works, if not - feel free to ask any question in comments. Let's move on to the code

👩🏻‍💻 Coding
Convert the graph to an adjacency list representation:
Define the get_number_of_neighbors_in_distance function to calculate the number of reachable neighbors within the distance threshold from a given source node:
Initialize a priority queue with the source node and distance 0.
Create a set to keep track of visited nodes.
While the queue is not empty, pop the node with the smallest distance.
If the current node has not been visited, add it to the visited set.
Iterate through the neighbors of the current node, calculating the distance from the source.
If the distance is within the threshold, push the neighbor and updated distance onto the queue.
Return the number of visited nodes minus one to exclude the source node itself.
Initialize minimum_number to the number of nodes n and res to None to keep track of the result.
Iterate through each node as the source, calculate the number of reachable neighbors, and update minimum_number and res if the current node has 
fewer or equal neighbors (with preference for larger node values in case of ties).
Return the node with the smallest number of reachable neighbors.
📒 Complexity Analysis
⏰ Time complexity: O(n^3 * log n), since you use Djikstra which is O(n^2 * log n) (number of edges proportional to n^2 and n - number of nodes) for 
every node which is O(n) so overall this is O(n * n^2 * log n) = O(n^3 * log n)
🧺 Space complexity: O(n), since we use adjacency list with size up to n and queue with has maximum sizes proportional to n so O(n)
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */
var findTheCity = function(n, edges, distanceThreshold) {
    // first convert graph to adjacency list representation
    const graph = Array.from({ length: n }, () => []);
    for (const [node1, node2, distance] of edges) {
        graph[node1].push([node2, distance]);
        graph[node2].push([node1, distance]);
    }

    const get_number_of_neighbors_in_distance = (source) => {
        const minHeap = new MinPriorityQueue({ priority: (a) => a[0] });
        minHeap.enqueue([0, source]); // distance to node itself is 0
        const visited = new Set();

        while (minHeap.size()) {
            const [distance_to_this_node, cur_node] = minHeap.dequeue().element;
            if (!visited.has(cur_node)) {
                visited.add(cur_node);
                for (const [neighbor, distance] of graph[cur_node]) {
                    const distance_from_source = distance_to_this_node + distance;
                    if (distance_from_source <= distanceThreshold) { // ensure that we're allowed to go to this node
                        minHeap.enqueue([distance_from_source, neighbor]);
                    }
                }
            }
        }
        // actually you can return visited.size and with math there will be nothing wrong but actually we have visited.size - 1 neighbors since we're not neighbor of ourselves
        return visited.size - 1;
    };

    let minimum_number = n;
    let res = null;

    for (let source = 0; source < n; source++) {
        const neighbors = get_number_of_neighbors_in_distance(source);
        // we iterate source from smaller to bigger this ensures that we choose node with greater value if they have equal number of neighbors
        if (neighbors <= minimum_number) {
            minimum_number = neighbors;
            res = source;
        }
    }

    return res;
};