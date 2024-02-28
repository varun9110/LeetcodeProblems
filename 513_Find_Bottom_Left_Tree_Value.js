/**
 * 513. Find Bottom Left Tree Value
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, return the leftmost value in the last row of the tree.

Example 1:
Input: root = [2,1,3]
Output: 1
Example 2:
Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7

Constraints:
The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
 */

/**
 * Approach
Initialize a deque queue with the root node and a variable leftmost_value to None.
Perform a while loop while the queue is not empty:
Dequeue a node from the left of the deque.
Update leftmost_value with the value of the dequeued node.
Enqueue the right child if it exists.
Enqueue the left child if it exists.
Continue the process until all nodes at the last level are processed.
Return the leftmost_value.
 */

var findBottomLeftValue = function(root) {
    const queue = [root];
    let leftmostValue;

    while (queue.length > 0) {
        const node = queue.shift();

        leftmostValue = node.val;

        if (node.right) {
            queue.push(node.right);
        }
        if (node.left) {
            queue.push(node.left);
        }
    }

    return leftmostValue;
};