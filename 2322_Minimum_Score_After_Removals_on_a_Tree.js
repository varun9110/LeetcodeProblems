/**
 * 2322. Minimum Score After Removals on a Tree
 * Difficulty: Hard
 * 
 * There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.

You are given a 0-indexed integer array nums of length n where nums[i] represents the value of the ith node. You are also given a 2D integer array edges of length n - 1 where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.

Remove two distinct edges of the tree to form three connected components. For a pair of removed edges, the following steps are defined:

Get the XOR of all the values of the nodes for each of the three components respectively.
The difference between the largest XOR value and the smallest XOR value is the score of the pair.
For example, say the three components have the node values: [4,5,7], [1,9], and [3,3,3]. The three XOR values are 4 ^ 5 ^ 7 = 6, 1 ^ 9 = 8, and 3 ^ 3 ^ 3 = 3. The largest XOR value is 8 and the smallest XOR value is 3. The score is then 8 - 3 = 5.
Return the minimum score of any possible pair of edge removals on the given tree.

 

Example 1:


Input: nums = [1,5,5,4,11], edges = [[0,1],[1,2],[1,3],[3,4]]
Output: 9
Explanation: The diagram above shows a way to make a pair of removals.
- The 1st component has nodes [1,3,4] with values [5,4,11]. Its XOR value is 5 ^ 4 ^ 11 = 10.
- The 2nd component has node [0] with value [1]. Its XOR value is 1 = 1.
- The 3rd component has node [2] with value [5]. Its XOR value is 5 = 5.
The score is the difference between the largest and smallest XOR value which is 10 - 1 = 9.
It can be shown that no other pair of removals will obtain a smaller score than 9.
Example 2:


Input: nums = [5,5,2,4,4,2], edges = [[0,1],[1,2],[5,2],[4,3],[1,3]]
Output: 0
Explanation: The diagram above shows a way to make a pair of removals.
- The 1st component has nodes [3,4] with values [4,4]. Its XOR value is 4 ^ 4 = 0.
- The 2nd component has nodes [1,0] with values [5,5]. Its XOR value is 5 ^ 5 = 0.
- The 3rd component has nodes [2,5] with values [2,2]. Its XOR value is 2 ^ 2 = 0.
The score is the difference between the largest and smallest XOR value which is 0 - 0 = 0.
We cannot obtain a smaller score than 0.
 

Constraints:

n == nums.length
3 <= n <= 1000
1 <= nums[i] <= 108
edges.length == n - 1
edges[i].length == 2
0 <= ai, bi < n
ai != bi
edges represents a valid tree.
 */

/**
 * XOR Value in Tree Subtrees

For each node i, we store the XOR value of the subtree rooted at i. Let's call this value v 
i
​
 .

For a leaf node, the XOR value is just the node itself, since it has no other descendants.
image.png

For Example:

Node 3 has two children: nodes 1 and 2. Therefore, the XOR value for node 3 is calculated as:

v3=n1⊕n2⊕n3
​
 
We can iterate over all nodes and compute these XOR values for the entire tree.

image.png

Splitting the Tree into Three Parts

We need to split the tree into three parts using two cuts.

Assume:

First cut is between nodes a and b
Second cut is between nodes c and d
Let a and c be the lower nodes, and b, d their respective parents.

Three Possible Cases:

a and c are in independent subtrees
Node c is a descendant of node a
**Node a is a descendant of node c
(The values of the three parts are shown under the tree)

image.png

Scoring and Complexity

We need to iterate over all edge pairs and calculate the minimum score among all possible combinations.

Time Complexity: O(n 
2
 )
Space Complexity: O(n 
2
 )
 */


 /**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number}
 */
const minimumScore = (nums, edges) => {
    const n = nums.length;
    const m = edges.length;

    const graph = Array.from({ length: n }, () => []);
    const children = Array.from({ length: n }, () => new Set());
    const xor = [...nums];
    const degree = Array(n).fill(0);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
        degree[u]++;
        degree[v]++;
    }

    let total = 0;
    const seen = new Set();
    const queue = [];

    for (let i = 0; i < n; i++) {
        total ^= nums[i];
        if (degree[i] === 1) {
            queue.push(i);
            seen.add(i);
        }
    }

    while (queue.length > 0) {
        const curr = queue.shift();
        for (const next of graph[curr]) {
            if (!seen.has(next)) {
                children[next].add(curr);
                for (const child of children[curr]) children[next].add(child);
                xor[next] ^= xor[curr];
            }
            degree[next]--;
            if (degree[next] === 1) {
                seen.add(next);
                queue.push(next);
            }
        }
    }

    let minScore = Infinity;

    for (let i = 0; i < m - 1; i++) {
        for (let j = i + 1; j < m; j++) {
            let [a, b] = edges[i];
            if (children[a].has(b)) [a, b] = [b, a];

            let [c, d] = edges[j];
            if (children[c].has(d)) [c, d] = [d, c];

            let parts;
            if (children[a].has(c)) {
                parts = [xor[c], xor[a] ^ xor[c], total ^ xor[a]];
            } else if (children[c].has(a)) {
                parts = [xor[a], xor[c] ^ xor[a], total ^ xor[c]];
            } else {
                parts = [xor[a], xor[c], total ^ xor[a] ^ xor[c]];
            }
            minScore = Math.min(minScore, Math.max(...parts) - Math.min(...parts));
        }
    }

    return minScore;
};