/**
 * 129. Sum Root to Leaf Numbers
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree containing digits from 0 to 9 only.
Each root-to-leaf path in the tree represents a number.
For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.
Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.
A leaf node is a node with no children.

Example 1:
Input: root = [1,2,3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.
Example 2:
Input: root = [4,9,0,5,1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.

Constraints:

The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 9
The depth of the tree will not exceed 10.
 */

/**
 * Approach
Initialize a variable ans to store the sum of root-to-leaf numbers.
Implement a Depth-First Search (DFS) function to traverse the tree recursively.
In the DFS function:
If the current node is null, return.
If the current node is a leaf node (i.e., it has no children), calculate the number 
represented by the path from the root to this leaf node and add it to ans.
Recursively call the DFS function for the left child of the current node with the updated path (current path * 10 + current node's value).
Recursively call the DFS function for the right child of the current node with the updated path (current path * 10 + current node's value).
Return the final value of ans.
 */

var sumNumbers = function(root) {
    let ans = 0;
    
    const dfs = (node, path) => {
        if (!node) return;
        if (!node.left && !node.right) {
            ans += path * 10 + node.val;
            return;
        }
        dfs(node.left, path * 10 + node.val);
        dfs(node.right, path * 10 + node.val);
    };
    
    dfs(root, 0);
};