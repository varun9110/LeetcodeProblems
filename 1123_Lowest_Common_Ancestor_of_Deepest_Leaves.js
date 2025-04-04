/**
 * 1123. Lowest Common Ancestor of Deepest Leaves
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, return the lowest common ancestor of its deepest leaves.

Recall that:

The node of a binary tree is a leaf if and only if it has no children
The depth of the root of the tree is 0. if the depth of a node is d, the depth of each of its children is d + 1.
The lowest common ancestor of a set S of nodes, is the node A with the largest depth such that every node in S is in the subtree with root A.
 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest leaf-nodes of the tree.
Note that nodes 6, 0, and 8 are also leaf nodes, but the depth of them is 2, but the depth of nodes 7 and 4 is 3.
Example 2:

Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree, and it's the lca of itself.
Example 3:

Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest leaf node in the tree is 2, the lca of one node is itself.
 

Constraints:

The number of nodes in the tree will be in the range [1, 1000].
0 <= Node.val <= 1000
The values of the nodes in the tree are unique.
 

Note: This question is the same as 865: https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/
 */


/**
 * Intuition
Approach: Depth-First Search (DFS)
The goal is to find the Lowest Common Ancestor (LCA) of the deepest leaves in the given binary tree.
Key Observations
Find the deepest leaves:
The leaves with the maximum depth should be identified.
Find the LCA of those leaves:
The LCA of the deepest leaves is the node deepest in the tree that contains all deepest leaves in its subtree.
Approach
We use a recursive DFS function to traverse the tree and return:
The depth of the subtree.
The LCA of the deepest leaves found in that subtree.
Steps

If the node is null, return depth = 0 and LCA = null.
Recursively find (depthLeft, lcaLeft) and (depthRight, lcaRight).
Compare depths:
If depthLeft == depthRight: Current node is LCA.
If depthLeft > depthRight: LCA is in the left subtree.
If depthRight > depthLeft: LCA is in the right subtree.
Return the deepest depth and the corresponding LCA.
Complexity
Time complexity:

O(N) (each node visited once)
Space complexity:

O(H) (recursive stack depth, where H = tree height)
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
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function (root) {
    function dfs(node) {
        if (!node) return [0, null]; // Base case: null node returns depth 0 and LCA null

        let [leftDepth, leftLCA] = dfs(node.left);
        let [rightDepth, rightLCA] = dfs(node.right);

        if (leftDepth === rightDepth) {
            return [leftDepth + 1, node]; // Both subtrees are at the same depth, so current node is LCA
        } else if (leftDepth > rightDepth) {
            return [leftDepth + 1, leftLCA]; // Left subtree is deeper, so LCA is in left subtree
        } else {
            return [rightDepth + 1, rightLCA]; // Right subtree is deeper, so LCA is in right subtree
        }
    }

    return dfs(root)[1]; // Extract only the LCA from the return value
};
