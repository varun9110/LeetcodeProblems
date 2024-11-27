/**
 * 3243. Shortest Distance After Road Addition Queries I
 * Difficulty: Medium
 * 
 * You are given an integer n and a 2D integer array queries.

There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the 
shortest path from city 0 to city n - 1.

Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after 
processing the first i + 1 queries.

Example 1:
Input: n = 5, queries = [[2,4],[0,2],[0,4]]
Output: [3,2,1]
Explanation:

After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.
After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.
After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

Example 2:
Input: n = 4, queries = [[0,3],[0,2]]
Output: [1,1]
Explanation:
After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1
After the addition of the road from 0 to 2, the length of the shortest path remains 1.

Constraints:

3 <= n <= 500
1 <= queries.length <= 500
queries[i].length == 2
0 <= queries[i][0] < queries[i][1] < n
1 < queries[i][1] - queries[i][0]
There are no repeated roads among the queries.
 */

/**
 * #1 Approach (DFS)
1. updateDistances Update distances after adding a new edge
Takes a graph, current node, and distances array as parameters
For each neighbor of current node, if we can improve its distance (make it smaller), we update it and recursively proces that neighbor
The new distance is always current node's distance + 1
2. shortestDistanceAfterQueries: Processes queries
Initializes distances array where each node i starts with distance n-1 to node 0
Creates initial directed graph where each node i+1 connects to node i
For each query (source, target):
Adds new edge from target to source
Updates source's distance if needed based on target's distance
Recursively updates distances of nodes reachable from source
Records distance to node 0 in the answer
 */

// JavaScript

var updateDistances = function(graph, current, distances) {
    const newDist = distances[current] + 1;
    
    for (const neighbor of graph[current]) {
        if (distances[neighbor] <= newDist) {
            continue;
        }
        
        distances[neighbor] = newDist;
        updateDistances(graph, neighbor, distances);
    }
};

var shortestDistanceAfterQueries = function(n, queries) {
    const distances = Array(n).fill(0).map((_, i) => n - 1 - i);
    
    const graph = Array(n).fill(0).map(() => []);
    for (let i = 0; i < n-1; i++) {
        graph[i + 1].push(i);
    }
    
    const answer = [];
    
    for (const [source, target] of queries) {
        graph[target].push(source);
        distances[source] = Math.min(distances[source], distances[target] + 1);
        updateDistances(graph, source, distances);
        
        answer.push(distances[0]);
    }
    
    return answer;
};