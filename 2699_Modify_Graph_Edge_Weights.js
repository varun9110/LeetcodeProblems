/**
 * 2699. Modify Graph Edge Weights
 * Difficulty : Hard
 * 
 * You are given an undirected weighted connected graph containing n nodes labeled from 0 to n - 1, and an integer array edges where edges[i] = [ai, bi, wi] 
 * indicates that there is an edge between nodes ai and bi with weight wi.

Some edges have a weight of -1 (wi = -1), while others have a positive weight (wi > 0).

Your task is to modify all edges with a weight of -1 by assigning them positive integer values in the range [1, 2 * 109] so that the shortest 
distance between the nodes source and destination becomes equal to an integer target. If there are multiple modifications that make the shortest 
distance between source and destination equal to target, any of them will be considered correct.

Return an array containing all edges (even unmodified ones) in any order if it is possible to make the shortest distance from source to destination 
equal to target, or an empty array if it's impossible.

Note: You are not allowed to modify the weights of edges with initial positive weights. 

Example 1:

Input: n = 5, edges = [[4,1,-1],[2,0,-1],[0,3,-1],[4,3,-1]], source = 0, destination = 1, target = 5
Output: [[4,1,1],[2,0,1],[0,3,3],[4,3,1]]
Explanation: The graph above shows a possible modification to the edges, making the distance from 0 to 1 equal to 5.
Example 2:

Input: n = 3, edges = [[0,1,-1],[0,2,5]], source = 0, destination = 2, target = 6
Output: []
Explanation: The graph above contains the initial edges. It is not possible to make the distance from 0 to 2 equal to 6 by modifying 
the edge with weight -1. So, an empty array is returned.
Example 3:

Input: n = 4, edges = [[1,0,4],[1,2,3],[2,3,5],[0,3,-1]], source = 0, destination = 2, target = 6
Output: [[1,0,4],[1,2,3],[2,3,5],[0,3,1]]
Explanation: The graph above shows a modified graph having the shortest distance from 0 to 2 as 6.
 
Constraints:

1 <= n <= 100
1 <= edges.length <= n * (n - 1) / 2
edges[i].length == 3
0 <= ai, bi < n
wi = -1 or 1 <= wi <= 107
ai != bi
0 <= source, destination < n
source != destination
1 <= target <= 109
The graph is connected, and there are no self-loops or repeated edges
 */


/**
 * Intuition
So we have an undirected weighted graph which have n nodes where some edges have positive weights and others have a weight of -1. Our job is to change the -1 weight edges by giving them the positive integer values, we need to make the shortest path between two specific nodes (source and destination) equal to the given target distance. At first, you may think that this problem is a variation of the shortest path problem, but we're not just finding the shortest path we're actually manipulating the graph to get a specific shortest path length. You might think to use Dijkstra's algorithm However just think for a min, because of the presence of -1 weights and the need to modify them. We can't simply run Dijkstra's algorithm for once and be done with it. We need to find a way to assign weights to the -1 edges to meet our target distance.

Now lets take a look at the constraints We can only modify edges with -1 weights, and we must assign them positive integer values between 1 and 2∗10 
9
 . This gives us a wide range to work with, but it also means we need to be careful not to overflow our integer values.

lets take an example and try to Imagine that you're a city planner and your job is redesigning a road network. You have a map of existing roads (edges) connecting various locations (nodes). Some of the roads have fixed lengths while others are still in there planning phase (represented by -1 weights). Your job is to find out the lengths of these planned roads so that the shortest route between two specific locations matches a target distance. now we can't alter the existing roads, but we have the freedom to set the lengths of the planned ones. This constraint adds a layer of complexity which makes it different from standard shortest path problems.
I was also thinking of the basic Dijkstra's algorithm. It's the first solution that comes to mind for finding shortest paths in weighted graphs I considered a naive approach to try all possible combinations of weights for the -1 edges But this wasnt practical I mean it would have worked but with potentially many -1 edges and a large range of possible weights, the number of combinations would be vary large So instead of trying all possibilities what if we could iteratively adjust the weights based on the current shortest path, we might need to run Dijkstra's algorithm multiple times. Because each time we modify an edge weight, it could potentially change the shortest path in the graph. By running it first with only the fixed-weight edges, we could get a baseline shortest path this info would then guide us in assigning weights to the -1 edges in a second pass, try to think about a two-phase approach:

First, we run Dijkstra's algorithm with all -1 weights which are set to 1 (the minimum possible weight). This will gives us the shortest possible path in the graph and If this shortest path is already longer than our target distance, we know it's impossible to solve the problem, and we will simply return an empty array If the shortest path is shorter than our target, we need to increase some of the -1 weights. But how do we know which ones to increase and by how much for that we can run Dijkstra's algorithm again, but this time, whenever we encounter a -1 edge, we can try to increase its weight just enough to make the path to that node equal to the target distance minus the remaining distance to the destination.

But what if increasing one edge makes another path shorter for that we need to be careful to always maintain the invariant that no path becomes shorter than our target distance. Use two distance arrays where one is for the minimum possible distances (with all -1 weights set to 1) and another is for the distances as we're modifying the weights. By comparing these two arrays we can make sure that we're always increasing the total path length and never decreasing it.

The use of a priority queue in Dijkstra's algorithm is also helpful although we require additional memory for the priority queue but still It would allow us to always process the node with the shortest current distance while making our weight assignments more efficient. I was thinking if one would need to keep track of not just the nodes, but also the edges so We can use an adjacency list representation of the graph, where each entry in the list contains both the neighboring node and the index of the edge in the original edge list, now think how to handle cases where multiple modifications could lead to the target distance. The problem statement allows for any valid solution, which gives us some flexibility. We can simply stop once we've found a valid configuration, rather than trying to enumerate all possible solutions.

What if the initial shortest path is already too long we address this by immediately returning an empty array, saying that no solution is possible.
How do we make sure that we don't assign weights greater than the allowed maximum (2 * 10^9) we can do this By starting with minimum weights (1) and only increasing them as necessary, we minimize this risk. In practice, it's highly unlikely we'd ever approach the maximum allowed weight.
What if multiple solutions exist, Our approach will find one valid solution, which is sufficient according to the problem statement. However, note that there could be many ways to assign weights that satisfy the target distance. And to handle disconnected graphs The problem statement guarantees a connected graph

Mathematical Insights:

The core mathematical insight here is the relationship between edge weights and path lengths, try to understand that the total path length is simply the sum of its edge weights, we can treat our problem as a type of equation:

(Sum of fixed-weight edges) + (Sum of adjustable-weight edges) = Target Distance

so we're essentially solving for the "Sum of adjustable-weight edges" term.

Approach
To solve this problem, we'll use a two-phase approach:

Graph Representation:
Create an adjacency list representation of the graph.
Each entry in the adjacency list will contain two pieces of information: the neighboring node and the index of the edge in the original edge list.
This allows us to quickly look up and modify edge weights as needed.
function createAdjacencyList(n, edges):
    adjacencyList = array of n empty lists
    for each edge in edges:
        nodeA, nodeB, weight = edge
        add (nodeB, edgeIndex) to adjacencyList[nodeA]
        add (nodeA, edgeIndex) to adjacencyList[nodeB]
    return adjacencyList
Distance Arrays:
Create two 2D distance arrays, both of size n x 2.
The first dimension represents the node, and the second dimension represents the two phases of our algorithm.
Initialize all distances to infinity, except for the source node which starts at 0.
function initializeDistances(n, source):
    distances = 2D array of size n x 2, filled with infinity
    distances[source][0] = distances[source][1] = 0
    return distances
First Dijkstra Run:

Run Dijkstra's algorithm with all -1 weights treated as 1.
This gives us the shortest possible path in the graph.
Store these distances in the first column of our distances array.
Check Feasibility:

If the shortest path to the destination is longer than the target, return an empty array (impossible to solve).
If the shortest path equals the target, we're done - set all -1 weights to a large value and return.
Second Dijkstra Run:

Run a modified version of Dijkstra's algorithm again.
This time, when we encounter a -1 edge, we try to increase its weight to make the path to that node equal to the target minus the remaining distance to the destination.
Store these new distances in the second column of our distances array.
pseudocode

function modifiedDijkstra(adjacencyList, edges, distances, source, difference, run):
    priorityQueue = new PriorityQueue()
    priorityQueue.add((source, 0))
    
    while priorityQueue is not empty:
        currentNode, currentDistance = priorityQueue.poll()
        
        if currentDistance > distances[currentNode][run]:
            continue
        
        for each (nextNode, edgeIndex) in adjacencyList[currentNode]:
            weight = edges[edgeIndex][2]
            
            if weight == -1:
                weight = 1
            
            if run == 1 and edges[edgeIndex][2] == -1:
                newWeight = difference + distances[nextNode][0] - distances[currentNode][1]
                if newWeight > weight:
                    edges[edgeIndex][2] = weight = newWeight
            
            if distances[nextNode][run] > distances[currentNode][run] + weight:
                distances[nextNode][run] = distances[currentNode][run] + weight
                priorityQueue.add((nextNode, distances[nextNode][run]))
Final Check:

After the second Dijkstra run, check if the new shortest path to the destination equals the target.
If it doesn't, return an empty array (impossible to solve).
Update Edges:

Go through all edges one last time.
Set any remaining -1 weights to 1.
Return the modified edge list.
function updateEdges(edges):
    for each edge in edges:
        if edge[2] == -1:
            edge[2] = 1
    return edges
The main function that ties all these steps together would look like this:

function modifiedGraphEdges(n, edges, source, destination, target):
    adjacencyList = createAdjacencyList(n, edges)
    distances = initializeDistances(n, source)
    
    modifiedDijkstra(adjacencyList, edges, distances, source, 0, 0)
    
    difference = target - distances[destination][0]
    if difference < 0:
        return empty array
    
    modifiedDijkstra(adjacencyList, edges, distances, source, difference, 1)
    
    if distances[destination][1] < target:
        return empty array
    
    return updateEdges(edges)
Complexity
Time complexity: The time complexity of this solution is O((E+V)logV), where E is the number of edges and V is the number of vertices (nodes) in the graph. This is because we run Dijkstra's algorithm twice, and each run of Dijkstra's algorithm using a priority queue has a time complexity of O((E+V)logV). The additional operations (creating the adjacency list, initializing distances, and updating edges) are all linear in terms of E or V, so they don't affect the overall time complexity.

Space complexity: The space complexity is O(E+V). This comes from:

The adjacency list, which stores all edges and thus takes O(E) space.
The distances array, which stores two distances for each vertex, taking O(V) space.
The priority queue used in Dijkstra's algorithm, which in the worst case could contain all vertices, taking O(V) space.
The original edges array, which takes O(E) space.
Therefore, the total space complexity is O(E+V).

 */


/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @param {number} target
 * @return {number[][]}
 */
var modifiedGraphEdges = function(n, edges, source, destination, target) {
    class PriorityQueue {
        constructor() {
            this.elements = [];
        }

        enqueue(element, priority) {
            this.elements.push({element, priority});
            this.elements.sort((a, b) => a.priority - b.priority);
        }

        dequeue() {
            return this.elements.shift();
        }

        isEmpty() {
            return this.elements.length === 0;
        }
    }

    const adjacencyList = Array.from({ length: n }, () => []);
    for (let i = 0; i < edges.length; i++) {
        const [nodeA, nodeB] = edges[i];
        adjacencyList[nodeA].push([nodeB, i]);
        adjacencyList[nodeB].push([nodeA, i]);
    }

    const distances = Array.from({ length: n }, () => [Infinity, Infinity]);
    distances[source] = [0, 0];

    runDijkstra(adjacencyList, edges, distances, source, 0, 0);
    const difference = target - distances[destination][0];
    if (difference < 0) return [];

    runDijkstra(adjacencyList, edges, distances, source, difference, 1);
    if (distances[destination][1] < target) return [];

    for (const edge of edges) {
        if (edge[2] === -1) edge[2] = 1;
    }

    return edges;

    function runDijkstra(adjacencyList, edges, distances, source, difference, run) {
        const pq = new PriorityQueue();
        pq.enqueue(source, 0);
        distances[source][run] = 0;

        while (!pq.isEmpty()) {
            const {element: currentNode, priority: currentDistance} = pq.dequeue();

            if (currentDistance > distances[currentNode][run]) continue;

            for (const [nextNode, edgeIndex] of adjacencyList[currentNode]) {
                let weight = edges[edgeIndex][2];
                if (weight === -1) weight = 1;

                if (run === 1 && edges[edgeIndex][2] === -1) {
                    const newWeight = difference + distances[nextNode][0] - distances[currentNode][1];
                    if (newWeight > weight) {
                        edges[edgeIndex][2] = weight = newWeight;
                    }
                }

                if (distances[nextNode][run] > distances[currentNode][run] + weight) {
                    distances[nextNode][run] = distances[currentNode][run] + weight;
                    pq.enqueue(nextNode, distances[nextNode][run]);
                }
            }
        }
    }
};