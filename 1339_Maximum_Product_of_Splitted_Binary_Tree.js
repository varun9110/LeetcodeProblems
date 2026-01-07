/**
 * 1339. Maximum Product of Splitted Binary Tree
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

Note that you need to maximize the answer before taking the mod and not after taking it.

 

Example 1:


Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)
Example 2:


Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)
 

Constraints:

The number of nodes in the tree is in the range [2, 5 * 104].
1 <= Node.val <= 104
 */

/**
 * Approach
First, I calculated the total sum of the entire tree using DFS.

Then, I ran DFS again to compute subtree sums.

At each node, I treated its subtree as one part after a cut.

I calculated the product:

subtreeSum * (totalSum - subtreeSum)
I updated the maximum product.

Finally, I returned the result modulo (10⁹ + 7).

I used DFS because:

Trees are naturally recursive
DFS gives subtree sums easily
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
var maxProduct = function(root) {
    const MOD = 1e9 + 7;
    let totalSum = 0;
    let maxProd = 0;

    function getTotalSum(node) {
        if (!node) return 0;
        return node.val + getTotalSum(node.left) + getTotalSum(node.right);
    }

    function dfs(node) {
        if (!node) return 0;

        let left = dfs(node.left);
        let right = dfs(node.right);

        let subtreeSum = node.val + left + right;
        maxProd = Math.max(maxProd, subtreeSum * (totalSum - subtreeSum));

        return subtreeSum;
    }

    totalSum = getTotalSum(root);
    dfs(root);

    return maxProd % MOD;
};