/**
 * 257. Binary Tree Paths
 * Difficulty : Easy
 * 
 * Given the root of a binary tree, return all root-to-leaf paths in any order.
A leaf is a node with no children.

Example 1:
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:
Input: root = [1]
Output: ["1"]

Constraints:
The number of nodes in the tree is in the range [1, 100].
-100 <= Node.val <= 100
 */

/**
 * Approach:
 * Basically 3 conditions.
 * 1. if the root is empty then return empty array
 * 2. if left and right are null then return the element
 * 3. last compute left by calling the same function and then add the -> to each element
 *      do the same for right as well
 * 
 * Later, return the destructured of both left and right, since 2 possibilities are possible
 */

var binaryTreePaths = function(root) {
    // If null return an empty array
    if (root === null) return [];
	// If no children return the nodes value itself as a string within an array
    else if (root.left === null && root.right === null) return [`${root.val}`];
    else {
		// For all child paths add the root to their head one by one.
        let left = binaryTreePaths(root.left).map(x => root.val + '->' + x);
        let right = binaryTreePaths(root.right).map(x => root.val + '->' + x);
		
		// return the array with the root value attached
        return [...left, ...right];
    }
};