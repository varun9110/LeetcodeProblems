/**
 * 951. Flip Equivalent Binary Trees
 * Difficulty: Medium
 * 
 * For a binary tree T, we can define a flip operation as follows: choose any node, and swap the left and right child subtrees.

A binary tree X is flip equivalent to a binary tree Y if and only if we can make X equal to Y after some number of flip operations.

Given the roots of two binary trees root1 and root2, return true if the two trees are flip equivalent or false otherwise.

 

Example 1:

Flipped Trees Diagram
Input: root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
Output: true
Explanation: We flipped at nodes with values 1, 3, and 5.
Example 2:

Input: root1 = [], root2 = []
Output: true
Example 3:

Input: root1 = [], root2 = [1]
Output: false
 

Constraints:

The number of nodes in each tree is in the range [0, 100].
Each tree will have unique node values in the range [0, 99].
 */

/**
 * Intuition
Flip Equivalent Binary Trees, asks you to determine if two binary trees are "flip equivalent." Two trees are considered flip equivalent if they are either:

Structurally identical.
Identical after flipping any number of nodes' children.
Flipping means swapping the left and right children of a node.

We will use recursion to solve this problem. The idea is simple: for any two nodes in the two trees (node1 in root1 and node2 in root2):

If both nodes are null, they are trivially equivalent.
If one node is null and the other is not, or their values are different, they can't be equivalent.
Otherwise, we recursively check two possibilities:
Without flipping: The left child of node1 is equivalent to the left child of node2, and the right child of node1 is equivalent to the right child of node2.
With flipping: The left child of node1 is equivalent to the right child of node2, and the right child of node1 is equivalent to the left child of node2.
If one of these two possibilities is true for every node, the trees are flip equivalent.

Approach
Consider two trees, root1 and root2:

root1:                  root2:
      1                       1
     / \                     / \
    2   3                   3   2
   / \                       / \
  4   5                     5   4
     / \                   / \
    6   7                 7   6
These two trees are flip equivalent because:

The roots (1) are the same.
We need to flip the children of root nodes:
After flipping, the left child of root1 (2) becomes comparable with the right child of root2 (2).
Similarly, the right child of root1 (3) becomes comparable with the left child of root2 (3).
This process continues recursively until all nodes are either matched directly or via flipping.
Walkthrough:
Initial Call:

checker(root1, root2) is called where both nodes have value 1. Since they are equal, we proceed to check their children.
Comparing Left and Right Children of the Roots:

Without flipping: Compare root1.left (2) with root2.left (3). They are not equal.
With flipping: Compare root1.left (2) with root2.right (2). They are equal, so we now recursively compare their children.
Recursively Comparing Children of 2 Nodes:

We now compare root1.left.left (4) with root2.right.left (4). They are equal, and both have no further children, so this check is valid.
Next, compare root1.left.right (5) with root2.right.right (5). They are equal, so we recursively check their children:
Compare 5's left child (6) with 5's left child (7). They are not equal.
Flip and compare 5's left child (6) with 5's right child (6). They are equal, so this check is valid.
Comparing the Right Subtree:

After flipping, we compare root1.right (3) with root2.left (3). They are equal, and both have no further children, so this check is valid.
Since all checks are satisfied, the trees are flip equivalent.

Complexity
Time complexity:O(N)
Space complexity:O(N)
 */


var flipEquiv = function (root1, root2) {

    let res = true

    function checker(node1, node2) {

        if (!node1 && !node2) return true

        if (!node1 || !node2 || node1.val != node2.val) return false
        
        return ((checker(node1.left, node2.left) || checker(node1.left, node2.right)) && (checker(node1.right, node2.right) || checker(node1.right, node2.left)))

    }

    return checker(root1, root2)
};