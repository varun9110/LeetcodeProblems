/**
 * 530. Minimum Absolute Difference in BST
 * Difficulty: Easy
 * 
 * Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 104].
0 <= Node.val <= 105
 */

/**
 * Intuition
In a Binary Search Tree, the in-order traversal gives nodes in sorted order. So, the minimum absolute difference will always be between two adjacent nodes in this sequence.

Approach
image.png

Perform in-order traversal.
At each node, calculate the difference between current and previous node.
Keep track of the smallest difference found.
Complexity
Time complexity:
O(n) — We visit each node once.

Space complexity:
O(h) — Recursion stack where h is the height of the tree.
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
 * @return {number}
 */
var getMinimumDifference = function(root) {
    let prev = null;
    let minDiff = Infinity;

    function dfs(node) {
        if (!node) return;
        dfs(node.left);
        if (prev !== null) {
            minDiff = Math.min(minDiff, node.val - prev);
        }
        prev = node.val;
        dfs(node.right);
    }

    dfs(root);
    return minDiff;
};