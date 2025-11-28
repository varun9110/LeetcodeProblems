/**
 * 965. Univalued Binary Tree
 * Difficulty: Easy
 * 
 * A binary tree is uni-valued if every node in the tree has the same value.

Given the root of a binary tree, return true if the given tree is uni-valued, or false otherwise.

 

Example 1:


Input: root = [1,1,1,1,1,null,1]
Output: true
Example 2:


Input: root = [2,2,2,5,2]
Output: false
 

Constraints:

The number of nodes in the tree is in the range [1, 100].
0 <= Node.val < 100
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
 * @return {boolean}
 */
var isUnivalTree = function(root) {
     if (!root) return true;

    let val = root.val;
    let queue = [root];

    while (queue.length > 0) {
        let node = queue.shift();

        if (node.val !== val) return false;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }

    return true;
};