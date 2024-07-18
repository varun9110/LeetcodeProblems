/**
 * 1530. Number of Good Leaf Nodes Pairs
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary 
 * tree is said to be good if the length of the shortest path between them is less than or equal to distance.

Return the number of good leaf node pairs in the tree.

Example 1:
Input: root = [1,2,3,null,4], distance = 3
Output: 1
Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.
Example 2:
Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.
Example 3:
Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
Explanation: The only good pair is [2,5].
 
Constraints:
The number of nodes in the tree is in the range [1, 210].
1 <= Node.val <= 100
1 <= distance <= 10
 */

/**
 * depth-first search (DFS)
Intuition:
The problem of counting good leaf node pairs in a binary tree requires us to understand the structure of the tree and efficiently calculate distances between leaf nodes. The key insights that drive our solution are:

Depth-First Search (DFS) Traversal:
We can use a depth-first search approach to traverse the binary tree. This allows us to explore all paths from the root to the leaf nodes efficiently.

Bottom-up Calculation:
Instead of calculating distances from the top down, we can build our solution from the bottom up. This means we start calculations from the leaf nodes and propagate information upwards to their ancestors.

Distance Array:
At each node, we can maintain an array that keeps track of the number of leaf nodes at each distance from that node. This array acts as a summary of the subtree rooted at that node.

Pair Counting:
When we reach a non-leaf node, we have information about leaf nodes in its left and right subtrees. We can use this information to count good pairs without needing to re-traverse the subtrees.

Constant-size Array:
By using a constant-size array (based on the maximum possible distance), we can optimize memory usage and potentially improve cache performance.

Approach:
Define a recursive DFS function that returns an array representing the count of leaf nodes at each distance for the subtree rooted at the current node.

Base cases:

If the node is null, return an empty array.
If the node is a leaf (both left and right children are null), return an array with 1 at index 1 (representing distance 1 from its parent).
Recursive step:

Recursively call the function on the left and right children.
Use the returned arrays to count good pairs:
For each possible pair of distances (i, j) where i is from the left subtree and j is from the right subtree, if i + j + 2 <= distance, count this as a good pair.
Combine the distance information from left and right subtrees:
Shift all distances by 1 (as we're moving one level up in the tree) and sum the counts.
Return the combined distance array for the current subtree.

The main function initiates the recursive call and returns the final count of good pairs.

Time Complexity:
The time complexity of this solution is O(n * d^2), where n is the number of nodes in the tree and d is the given distance.

We visit each node once during the DFS traversal: O(n)
At each non-leaf node, we perform two nested loops, each running up to d times: O(d^2)
The operations inside the loops (array access and arithmetic) are O(1)
Therefore, the overall time complexity is O(n * d^2).
 */

/**
 * @param {TreeNode} root
 * @param {number} distance
 * @return {number}
 */
var countPairs = function(root, distance) {
    let count = 0;
    const MAX_DISTANCE = 10;

    function dfs(node) {
        if (!node) return new Array(MAX_DISTANCE + 1).fill(0);
        
        if (!node.left && !node.right) {
            const res = new Array(MAX_DISTANCE + 1).fill(0);
            res[1] = 1;
            return res;
        }
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        for (let i = 1; i <= distance; i++) {
            for (let j = 1; j <= distance - i; j++) {
                count += left[i] * right[j];
            }
        }
        
        const res = new Array(MAX_DISTANCE + 1).fill(0);
        for (let i = 1; i < MAX_DISTANCE; i++) {
            res[i + 1] = left[i] + right[i];
        }
        
        return res;
    }

    dfs(root);
    return count;
};


/**
 * Graph Conversion + BFS
Intuition:
Imagine you're trying to find the shortest path between two houses in a neighborhood. In a tree, it's like all the roads are one-way streets going down. That makes it hard to go back up! So, we're going to turn our tree into a map where we can go in both directions between connected numbers. Then, we'll use a special way of exploring this map to find the shortest paths between our leaf numbers.

Approach:
First, we're going to make a list of all the leaf numbers in our tree.
Then, we'll turn our tree into a map where we can easily see which numbers are connected to each other, regardless of whether they're above or below in the original tree.
For each leaf number, we're going to explore the map, keeping track of how far we've gone. We'll stop exploring when we've gone farther than our "distance" limit.
Whenever we find another leaf number within our "distance" limit, we count it as a "good" pair.
Finally, we'll divide our total count by 2 (because we counted each pair twice - once from each direction).

 */

/**
 * @param {TreeNode} root
 * @param {number} distance
 * @return {number}
 */
var countPairs = function(root, distance) {
    const graph = new Map();
    const leafNodes = new Set();

    const traverseTree = (currNode, prevNode) => {
        if (!currNode) return;
        if (!currNode.left && !currNode.right) {
            leafNodes.add(currNode);
        }
        if (prevNode) {
            if (!graph.has(prevNode)) graph.set(prevNode, []);
            if (!graph.has(currNode)) graph.set(currNode, []);
            graph.get(prevNode).push(currNode);
            graph.get(currNode).push(prevNode);
        }
        traverseTree(currNode.left, currNode);
        traverseTree(currNode.right, currNode);
    };

    traverseTree(root, null);

    let ans = 0;
    for (const leaf of leafNodes) {
        const bfsQueue = [leaf];
        const seen = new Set([leaf]);
        for (let i = 0; i <= distance; i++) {
            const size = bfsQueue.length;
            for (let j = 0; j < size; j++) {
                const currNode = bfsQueue.shift();
                if (leafNodes.has(currNode) && currNode !== leaf) {
                    ans++;
                }
                if (graph.has(currNode)) {
                    for (const neighbor of graph.get(currNode)) {
                        if (!seen.has(neighbor)) {
                            bfsQueue.push(neighbor);
                            seen.add(neighbor);
                        }
                    }
                }
            }
        }
    }
    return Math.floor(ans / 2);
};