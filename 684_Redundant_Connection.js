/**
 * 684. Redundant Connection
 * Difficulty: Medium
 * 
 * In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. 
The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. 
The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.

Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.


Example 1:

Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
Example 2:


Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
Output: [1,4]
 

Constraints:

n == edges.length
3 <= n <= 1000
edges[i].length == 2
1 <= ai < bi <= edges.length
ai != bi
There are no repeated edges.
The given graph is connected.
 */

/**
 * Intuition
To solve this problem, we can reframe it as detecting a cycle in an undirected graph. The redundant edge is the one that completes the cycle, making it the last edge added that creates the loop.

Tips:

We can use Disjoint Set Union (DSU) to efficiently detect cycles while processing edges.
In a graph, if two nodes are already connected via other edges, they belong to the same set.
If adding a new edge connects two nodes that are already in the same set, then this edge is redundant.
To optimize space, we can track each node's parent using a single array to represent sets.
Approach
Step 1: Define a function to find the root of a node
const findRoot = (parent: number[], node: number): number => {
  if (parent[node] !== node) {
    // Path compression: Assign the parent of the current node to the root of the set
    parent[node] = findRoot(parent, parent[node]);
  }
  return parent[node];
};
Step 2: Define a function to union two sets
const unionSets = (parent: number[], node1: number, node2: number): void => {
  // Assign the root of node1 to the root of node2
  parent[findRoot(parent, node1)] = findRoot(parent, node2);
};
Step 3: Initialize the parent array
// Initialize an array of length edges.length + 1, setting each node as its own parent
const parent = new Array(edges.length + 1).fill(0).map((_, index) => index);
Step 4: Iterate through edges and detect cycles
for (const [node1, node2] of edges) {
  // If both nodes share the same root, this edge forms a cycle and is redundant
  if (findRoot(parent, node1) === findRoot(parent, node2)) {
    return [node1, node2];
  }
  // Otherwise, merge the two sets
  unionSets(parent, node1, node2);
}
Step 5: Return an empty array when no cycle is detected
Although the problem guarantees the existence of a redundant edge, adding a fallback return statement ensures robustness.

return [];
Complexity
Time Complexity:

Each findRoot and unionSets operation has a time complexity of O(α(n)), where α(n) is the inverse Ackermann function.
Since α(n) grows extremely slowly, it is considered almost constant in practice.
Iterating through all edges results in an overall complexity of O(n⋅α(n)).
Final time complexity: O(n⋅α(n))
Space Complexity:

The parent array requires O(n) space.
Additional variables require O(1) space.
Final space complexity: O(n)
 */

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
function findRedundantConnection(edges) {
  /**
   * Helper function to find the representative (root) of a node in the union-find structure.
   * Implements path compression to optimize future lookups.
   */
  const findRoot = (parent, node) => {
    if (parent[node] !== node) {
      // Path compression: Assign the parent of the current node to the root of the set
      parent[node] = findRoot(parent, parent[node]);
    }
    return parent[node];
  };

  /**
   * Helper function to merge two sets in the union-find structure.
   * It assigns the root of one node to the root of the other.
   */
  const unionSets = (parent, node1, node2) => {
    parent[findRoot(parent, node1)] = findRoot(parent, node2);
  };

  // Initialize the parent array where each node is its own parent initially
  const parent = new Array(edges.length + 1).fill(0).map((_, index) => index);

  // Iterate through each edge to check if it forms a cycle
  for (const [node1, node2] of edges) {
    // If both nodes share the same root, this edge forms a cycle and is redundant
    if (findRoot(parent, node1) === findRoot(parent, node2)) {
      return [node1, node2];
    }
    // Otherwise, merge the two sets
    unionSets(parent, node1, node2);
  }

  // No redundant edge found
  return [];
}