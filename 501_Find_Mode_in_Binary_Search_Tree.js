/**
 * 501. Find Mode in Binary Search Tree
 * Difficulty: Easy
 * Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., 
 * the most frequently occurred element) in it.
If the tree has more than one mode, return them in any order.
Assume a BST is defined as follows:
The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [1,null,2,2]
Output: [2]
Example 2:
Input: root = [0]
Output: [0]
Constraints:
The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105
Follow up: Could you do that without using any extra space? (Assume that the implicit stack 
space incurred due to recursion does not count).
 */

/**
 * Approach
In-order Traversal Generator: We'll use an in-order traversal to traverse through the BST. 
Instead of doing the counting inside the recursive traversal, we use a generator to yield the values in-order.
Counting and Finding Modes: As we iterate through the values returned from the in-order traversal, 
we keep track of the current number and its count. We compare it with the previous value:
If it's the same, we increment the count.
If it's different, we reset the count to 1 and update the current number.
As we iterate, we keep track of the maximum count. If the count of a number equals the maximum count, 
we add it to the modes list. If it's greater than the maximum count, we reset the modes list and add the current number.
 */

var findMode = function(root) {
    let currentVal = null;
    let currentCount = 0;
    let maxCount = 0;
    let modes = [];

    function inOrderTraversal(node) {
        if (!node) return;

        inOrderTraversal(node.left);

        currentCount = (node.val === currentVal) ? currentCount + 1 : 1;
        if (currentCount === maxCount) {
            modes.push(node.val);
        } else if (currentCount > maxCount) {
            maxCount = currentCount;
            modes = [node.val];
        }
        currentVal = node.val;

        inOrderTraversal(node.right);
    }

    inOrderTraversal(root);
    return modes;
};