/**
 * 653. Two Sum IV - Input is a BST
 * Difficulty: Easy
 * 
 * Given the root of a binary search tree and an integer k, return true if there exist two elements in the BST such that their sum is equal to k, or false otherwise.

 

Example 1:


Input: root = [5,3,6,2,4,null,7], k = 9
Output: true
Example 2:


Input: root = [5,3,6,2,4,null,7], k = 28
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-104 <= Node.val <= 104
root is guaranteed to be a valid binary search tree.
-105 <= k <= 105
 */

/**
 * Intuition
We want to find two nodes in a BST that add up to k. The classic trick is to use a set to track values we’ve seen. At each step, check if the complement (k - current) is already in the set.

Approach
image.png

Do a DFS traversal of the tree.
Keep a set seen of all node values visited so far.
At each node:
If k - node.val is in seen, return true.
Otherwise, add node.val to seen.
If traversal completes, return false.
This is just like the classic 2Sum problem — but on a tree.

Complexity
Time Complexity: O(n)
Space Complexity: O(n)
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
    const seen = new Set();

    const dfs = (node) => {
        if (!node) return false;
        if (seen.has(k - node.val)) return true;
        seen.add(node.val);
        return dfs(node.left) || dfs(node.right);
    };

    return dfs(root);
};