/**
 * 104. Maximum Depth of Binary Tree
 * Difficulty : Easy
 * Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:
Input: root = [1,null,2]
Output: 2
Constraints:
The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100
 */

/**
 * Approach:
 *  Use recursion to check left and right. base condition is if the root is null then return zero. 
 * Check if the leftTree or rightTree is greater. To the greater add 1 (of the node itself) and return the value
 */

let checkDepth = (root) => {
  if(root === null) return 0;

  let leftDepth =rightDepth = 0;

  if(root.left){
    leftDepth = checkDepth(root.left);
  }
  if(root.right){
    rightDepth = checkDepth(root.right);
  }
  let maxOfTwo = Math.max(leftDepth, rightDepth) + 1;
  return maxOfTwo;

};

var maxDepth = function(root) {
    return checkDepth(root);
};


/**
 * 
Refined code. same logic but just 1 liner
 */

var maxDepth = function(root) {
    if(root === undefined || root===null){
        return 0;
    }
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
};