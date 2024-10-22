/**
 * 2583. Kth Largest Sum in a Binary Tree
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree and a positive integer k.

The level sum in the tree is the sum of the values of the nodes that are on the same level.
Return the kth largest level sum in the tree (not necessarily distinct). If there are fewer than k levels in the tree, return -1.
Note that two nodes are on the same level if they have the same distance from the root.

Example 1:
Input: root = [5,8,9,2,1,3,7,4,6], k = 2
Output: 13
Explanation: The level sums are the following:
- Level 1: 5.
- Level 2: 8 + 9 = 17.
- Level 3: 2 + 1 + 3 + 7 = 13.
- Level 4: 4 + 6 = 10.
The 2nd largest level sum is 13.
Example 2:
Input: root = [1,2,null,3], k = 1
Output: 3
Explanation: The largest level sum is 3.
 Constraints:
The number of nodes in the tree is n.
2 <= n <= 105
1 <= Node.val <= 106
1 <= k <= n
 */

/**
 * Intuition
The problem involves calculating the sum of node values at each level of a binary tree, then finding the k-th largest sum. Given that the binary tree can be processed level by level using breadth-first search (BFS), the key idea is to traverse the tree while keeping track of the sums for each level. Sorting these sums allows us to extract the k-th largest value.

Approach
Perform a level-order traversal (BFS) of the binary tree. Use a queue to process each node level by level.
For each level, compute the sum of the node values.
Store the sums in a list. Once the entire tree is traversed, this list will contain the sum for each level.
Sort the list in descending order to get the sums from largest to smallest.
Return the k-th largest sum (considering that k is 1-based, so retrieve res[k-1]).
If k is larger than the number of levels, return -1 as the tree doesn’t have enough levels.
Complexity
Time complexity:
The BFS traversal takes O(N), where N is the number of nodes in the tree. Sorting the level sums takes O(LlogL), where L is the number of levels in the tree. Therefore, the overall time complexity is O(N+LlogL).

Space complexity:
The space complexity is O(N) because of the queue used for BFS and the list storing level sums.

Code Breakdown:
TreeNode Definition: The TreeNode structure is used to represent each node in the binary tree. Each node contains an integer value, a pointer to the left child, and a pointer to the right child.

Solution Class and kthLargestLevelSum Function:

The function starts by initializing a queue for BFS traversal and a result vector res to store the sum of node values at each level.
Using a while-loop, the queue processes all nodes level by level. For each level, it calculates the sum of the node values and appends this sum to the res vector.
After the tree is processed, the vector res contains the sums of all levels. The function then checks if k is valid (i.e., smaller than or equal to the number of levels).
Finally, the function sorts the sums in descending order and returns the k-th largest value from the sorted list. If k is greater than the number of levels, it returns -1.
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthLargestLevelSum = function(root, k) {
    if (!root) return -1;  // Edge case: if root is null, return -1

    let res = [];  // To store sum of each level
    let q = [root];  // Queue for level-order traversal (BFS)

    while (q.length > 0) {
        let n = q.length;  // Number of nodes at the current level
        let sum = 0;  // Sum of node values at the current level

        for (let i = 0; i < n; i++) {
            let node = q.shift();  // Get the front node from the queue
            sum += node.val;  // Add node's value to the level sum

            // Push left and right children of the node to the queue (if they exist)
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        res.push(sum);  // Store the sum of the current level
    }

    if (k > res.length) return -1;  // If k is greater than number of levels, return -1

    res.sort((a, b) => b - a);  // Sort the level sums in descending order

    return res[k - 1];  // Return the k-th largest level sum (k-1 due to 0-based indexing)
};