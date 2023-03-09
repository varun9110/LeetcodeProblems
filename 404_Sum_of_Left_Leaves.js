/**
 * 404. Sum of Left Leaves
 * Difficulty: Easy
 * 
 * Given the root of a binary tree, return the sum of all left leaves.
A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.

Example 2:
Input: root = [1]
Output: 0
 
Constraints:
The number of nodes in the tree is in the range [1, 1000].
-1000 <= Node.val <= 1000
*/

/**
 * Approach :
 * Since its a binary tree problem then its sure that there will be just 2 node.
 * use recurrsion to iteratet through the nodes, and parse true if parsing the left node else false.
 * check if the node the leaf, if yes then return its value else iterate through its children and find their sums
 * return their sum then.
 */

var helperFunction = (node, isLeft) => {
  let result = 0;
  if (!node) {
    return result;
  }

  if (node.left || node.right) {
    let leftSum = helperFunction(node.left, true);
    let rightSum = helperFunction(node.right, false);
    result = leftSum + rightSum;
  } else {
    if (isLeft) {
      return node.val;
    }
    return 0;
  }
  return result;
};

var sumOfLeftLeaves = function (root) {
  return helperFunction(root, false);
};

/**
 * Just refined code
 */
var sumOfLeftLeaves = function (root, left = false) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return left ? root.val : 0;
  return sumOfLeftLeaves(root.left, true) + sumOfLeftLeaves(root.right);
};
