/**
 * 783. Minimum Distance Between BST Nodes
 * Difficulty: Easy
 * 
 * Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 100].
0 <= Node.val <= 105
 

Note: This question is the same as 530: https://leetcode.com/problems/minimum-absolute-difference-in-bst/
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
var minDiffInBST = function(root) {

    if(!root) return root;
    let minDiff = 10**5;
    let prev = -Infinity;

    const minFunc = (node) =>{

        if(!node) return;

        minFunc(node.left);
        if(prev === - Infinity) {
            prev = node.val;
        }
        else{
            minDiff = Math.min( minDiff, node.val - prev);
            prev = node.val;
        }
        minFunc(node.right);
    }
    minFunc( root);
    return minDiff;
};
    