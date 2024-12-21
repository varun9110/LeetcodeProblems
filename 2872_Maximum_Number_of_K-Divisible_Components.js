/**
 * 2872. Maximum Number of K-Divisible Components
 * Difficulty: Hard
 * 
 * There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, 
 * where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

You are also given a 0-indexed integer array values of length n, where values[i] is the value associated with the ith node, and an integer k.

A valid split of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by k, 
where the value of a connected component is the sum of the values of its nodes.

Return the maximum number of components in any valid split.

Example 1:
Input: n = 5, edges = [[0,2],[1,2],[1,3],[2,4]], values = [1,8,1,4,4], k = 6
Output: 2
Explanation: We remove the edge connecting node 1 with 2. The resulting split is valid because:
- The value of the component containing nodes 1 and 3 is values[1] + values[3] = 12.
- The value of the component containing nodes 0, 2, and 4 is values[0] + values[2] + values[4] = 6.
It can be shown that no other valid split has more than 2 connected components.
Example 2:
Input: n = 7, edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], values = [3,0,6,1,5,2,1], k = 3
Output: 3
Explanation: We remove the edge connecting node 0 with 2, and the edge connecting node 0 with 1. The resulting split is valid because:
- The value of the component containing node 0 is values[0] = 3.
- The value of the component containing nodes 2, 5, and 6 is values[2] + values[5] + values[6] = 9.
- The value of the component containing nodes 1, 3, and 4 is values[1] + values[3] + values[4] = 6.
It can be shown that no other valid split has more than 3 connected components.
 

Constraints:

1 <= n <= 3 * 104
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
values.length == n
0 <= values[i] <= 109
1 <= k <= 109
Sum of values is divisible by k.
The input is generated such that edges represents a valid tree.
 */

/**
 * Intuition
The sum of the whole tree is divisible by k
Therefore if you find a component divisible by k and remove it from the tree, the rest of the tree is divisible by k too.
We have to break the tree up into components, we can't leave off / not count stray nodes
So if we do a postorder traversal, summing up the nodes of each subtree, we have a decision to make for each subtree about whether we break it off from the larger tree and create a component
if its sum is not divisible by k, by the rules we can't disconnect it
if it is divisible by k
we know if we remove it from the tree the rest of the nodes summed up will be divisible by k
its remainder when divided by k is 0 - there's no way it can help some larger subtree reach a remainder of 0, so there's no point in not disconnecting it since it's at the smallest size it can be before disconnecting
Approach
create an adjacency list
DFS postorder traversal
sum up the current node + all of its children's values and modulo k
if the remainder of the current subtree is 0, you've found a divisible component count it and return the remainder
Complexity
Time complexity: O(n)
Space complexity: O(n)
 */

var maxKDivisibleComponents = function(n, edges, values, k) {
  const adjList = edges.reduce((adjList, [a, b]) => {
    adjList[a].push(b);
    adjList[b].push(a);
    return adjList;
  }, values.map(() => []));

  let total = 0;
  const countComponents = (node, parent) => {
    const remainder = (
      values[node] + adjList[node]
        .reduce((sum, child) => sum + (child === parent ? 0 : countComponents(child, node)), 0)
    ) % k;

    if (remainder === 0) total += 1;
    return remainder;
  }

  countComponents(0, -1);
  return total;
};