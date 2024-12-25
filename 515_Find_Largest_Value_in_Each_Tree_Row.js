/**
 * 515. Find Largest Value in Each Tree Row
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).

Example 1:
Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:
Input: root = [1,2,3]
Output: [1,3]

Constraints:
The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
 */


/**
 * Intuition
The goal is to find the largest value in each level of a binary tree. A level-order traversal (BFS) ensures we process each level independently.

🚀 Approach
Use a queue for BFS traversal to visit all nodes level by level.
For each level, iterate through the nodes, track the maximum value, and add their children to the queue for the next level.
Append the maximum value of the current level to the result vector.
📊 Complexity
Time complexity: O(n)
Traverse all nodes once, where n is the total number of nodes in the tree.
Space complexity: O(w)
The maximum number of nodes in the queue at any time equals the tree's width w.
 */

var largestValues = function(root) {
    if (!root) return [];
    
    let arr = [];
    let queue = [root];
    
    while (queue.length > 0) {
        let levelSize = queue.length;
        let maxVal = -Infinity;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            maxVal = Math.max(maxVal, node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        arr.push(maxVal);
    }
    
    return arr;
};