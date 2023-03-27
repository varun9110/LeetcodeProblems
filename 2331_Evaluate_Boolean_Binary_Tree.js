/**
 * 2331. Evaluate Boolean Binary Tree
 * Difficulty: Easy
 * 
 * You are given the root of a full binary tree with the following properties:
Leaf nodes have either the value 0 or 1, where 0 represents False and 1 represents True.
Non-leaf nodes have either the value 2 or 3, where 2 represents the boolean OR and 3 represents the boolean AND.
The evaluation of a node is as follows:
If the node is a leaf node, the evaluation is the value of the node, i.e. True or False.
Otherwise, evaluate the node's two children and apply the boolean operation of its value with the children's evaluations.
Return the boolean result of evaluating the root node.
A full binary tree is a binary tree where each node has either 0 or 2 children.
A leaf node is a node that has zero children.

Example 1:
Input: root = [2,1,3,null,null,0,1]
Output: true
Explanation: The above diagram illustrates the evaluation process.
The AND node evaluates to False AND True = False.
The OR node evaluates to True OR False = True.
The root node evaluates to True, so we return true.
Example 2:
Input: root = [0]
Output: false
Explanation: The root node is a leaf node and it evaluates to false, so we return false.
Constraints:
The number of nodes in the tree is in the range [1, 1000].
0 <= Node.val <= 3
Every node has either 0 or 2 children.
Leaf nodes have a value of 0 or 1.
Non-leaf nodes have a value of 2 or 3.
 */

/**
 * Approach: Use DFS to iterate though all the nodes and check their children vlaue and mark their value accordingly.
 * Finally return the value of the root
 */
var evaluateTree = function (root) {
  if (root === null) {
    return;
  }
  if (root.left) {
    evaluateTree(root.left);
    evaluateTree(root.right);
  }

  if (root.val === 2) {
    if (root.left.val === 1 || root.right.val === 1) {
      root.val = 1;
    } else {
      root.val = 0;
    }
  }

  if (root.val === 3) {
    if (root.left.val === 1 && root.right.val === 1) {
      root.val = 1;
    } else {
      root.val = 0;
    }
  }

  if (root.val === 1) {
    return true;
  }
  return false;
};

/**
 * A little refined code.
 */

/**
0 -> False
1 -> True
2 -> OR
3 -> AND
*/

// Depth First Search
var evaluateTree = function (root) {
  const dfs = (node) => {
    if (!node) return;
    if (node.val === 0) return false;
    if (node.val === 1) return true;

    if (node.val === 2) {
      return dfs(node.left) || dfs(node.right);
    } else if (node.val === 3) {
      return dfs(node.left) && dfs(node.right);
    }
  };

  return dfs(root);
};
