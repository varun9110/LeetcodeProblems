/**
 * 1022. Sum of Root To Leaf Binary Numbers
 * Difficulty: Easy
 * 
 * You are given the root of a binary tree where each node has a value 0 or 1. Each root-to-leaf path represents a binary number starting with the most significant bit.

For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.
For all leaves in the tree, consider the numbers represented by the path from the root to that leaf. Return the sum of these numbers.

The test cases are generated so that the answer fits in a 32-bits integer.

 

Example 1:


Input: root = [1,0,1,0,1,0,1]
Output: 22
Explanation: (100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
Example 2:

Input: root = [0]
Output: 0
 

Constraints:

The number of nodes in the tree is in the range [1, 1000].
Node.val is 0 or 1.
 */

/**
 * Intuition
My first thought was that I needed to use Depth First Search, then eventually realised I also needed to keep track of the parent value while going down.

Approach
My approach is to recursively add the value of the node to the current binary number which we pass down as an argument! Then when reaching a leaf (no left child and no right child) we just add the number to the total.

Done ☑️ :)

Complexity
Time complexity: O(n)
This is because each node is visited one so time grows together with the number of nodes.
Space complexity: O(h)
This is because of the recursive stack so the higher our tree the bigger the space complexity.
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
var sumRootToLeaf = function (root) {
  let total = 0;
  const DFS = (root, current = 0) => {
    if (!root) return;
    current = (current << 1) | root.val;
    if (!root.left && !root.right) total += current
    DFS(root.left, current);
    DFS(root.right, current);
  };
  DFS(root);
  return total
};

/**
 * Refined approach
 */

var sumRootToLeaf = function (root, pathVal = 0) {
    if (root == null) return 0;
    pathVal = pathVal * 2 + root.val;
    if (root.left == null && root.right == null) return pathVal;
    return sumRootToLeaf(root.right, pathVal) + sumRootToLeaf(root.left, pathVal);
};