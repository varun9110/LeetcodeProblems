/**
 * 979. Distribute Coins in Binary Tree
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree with n nodes where each node in the tree has node.val coins. 
 * There are n coins in total throughout the whole tree.

In one move, we may choose two adjacent nodes and move one coin from one node to another. A move may be from parent to child, or from child to parent.
Return the minimum number of moves required to make every node have exactly one coin.

Example 1:
Input: root = [3,0,0]
Output: 2
Explanation: From the root of the tree, we move one coin to its left child, and one coin to its right child.
Example 2:
Input: root = [0,3,0]
Output: 3
Explanation: From the left child of the root, we move two coins to the root [taking two moves]. Then, we move one coin from the root of the tree to the right child.

Constraints:
The number of nodes in the tree is n.
1 <= n <= 100
0 <= Node.val <= n
The sum of all Node.val is n.
 */

/**
 * Approach
After understanding the intuition the recursive solution is quite easy.

We want to use postorder traversal as described above so we will write dfs function (but it will have auxiliary parameter parent to keep track of parent ot his node (to transfer coins)).
For every node the number of moves we want to return is calculated as moves for left subtree + moves for right subtreee + moves from this node to parent.
Number of coins to transfer is number of coins there after evaluating children - 1 but the number of moves it takes is absolute value of this number because as you remember child can have not enough coins and so number of coins will be < 0.
After evaluating the whole tree, roots value is 1. To keep code simple I pass to function dummy parent for root and this won't impact on result since number of moves added will be 1 - 1 = 0.
Example
So this is it for recursive solution, if this still not clear to you look at the following example:

        0 
       / \
      4   0
         / \
        0   1
moves = 0
(we are also visiting None nodes and return 0 from them, let's just forget about that for simplicity)

Step 1: Check left node.
4 coins is too many, we will transfer to parent 4 - 1 = 3 coins
moves += abs(3) -> moves = 3

Step 2: Check right-left node.
0 coins isn't enough, we will transfer to parent 0 - 1 = - 1 coins
moves += abs(-1) -> moves = 4

Step 3: Check right-right node.
1 coin there, we will transfer to parent 1 - 1 = 0 coins
moves += abs(0) -> moves = 4

Step 4: Check right node.
-1 coins there (check step 2) so we will transfer to parent (root) -1 - 1 = -2 coins
moves += abs(-2) -> moves = 6

Step 5: Check root node.
3 coins from left there, -2 coins from right, so we will transfer to dummy node (3 - 2) - 1 = 0 coins
moves += abs(0) -> moves = 6

So return result moves = 6
 */

var distributeCoins = function(root) {
        const dfs = (curNode, parent) => {
            if (curNode === null) {
                return 0;
            }
            let moves = dfs(curNode.left, curNode) + dfs(curNode.right, curNode);
            let fromThis = curNode.val - 1;
            parent.val += fromThis;
            moves += Math.abs(fromThis);
            return moves;
        };

        return dfs(root, new TreeNode()); 
};