/**
 * 938. Range Sum of BST
 * Difficulty: Easy
 * 
 * Given the root node of a binary search tree and two integers low and high, 
 * return the sum of values of all nodes with a value in the inclusive range [low, high].

Example 1:

Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.
Example 2:
Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.
 
Constraints:

The number of nodes in the tree is in the range [1, 2 * 104].
1 <= Node.val <= 105
1 <= low <= high <= 105
All Node.val are unique.
 */

/**
 * Approach
To solve this problem, we can perform a depth-first search (DFS) traversal of the BST. At each node, we check whether 
its value falls within the specified range [low, high]. If the current node's value is within the range, we include it in the sum. We then recursively traverse the left and right subtrees.
The algorithm follows these steps:
1. If the current node is null, return 0.
2. If the current node's value is within the range [low, high], include it in the sum; otherwise, exclude it.
3. Recursively calculate the sum for the left subtree and the sum for the right subtree.
4. Return the sum of the current node, left subtree sum, and right subtree sum.
 */

var rangeSumBST = function(root, low, high) {
    if (!root) {
        return 0;
    }

    const currentVal = (root.val >= low && root.val <= high) ? root.val : 0;

    const leftSum = rangeSumBST(root.left, low, high);
    const rightSum = rangeSumBST(root.right, low, high);

    return currentVal + leftSum + rightSum;
};