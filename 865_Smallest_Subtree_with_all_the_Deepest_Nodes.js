/**
 * 865. Smallest Subtree with all the Deepest Nodes
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, the depth of each node is the shortest distance to the root.

Return the smallest subtree such that it contains all the deepest nodes in the original tree.

A node is called the deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is a tree consisting of that node, plus the set of all descendants of that node.

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]
Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest nodes of the tree.
Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 is the smallest subtree among them, so we return it.
Example 2:

Input: root = [1]
Output: [1]
Explanation: The root is the deepest node in the tree.
Example 3:

Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of nodes 2, 1 and 0 but the subtree of node 2 is the smallest.
 

Constraints:

The number of nodes in the tree will be in the range [1, 500].
0 <= Node.val <= 500
The values of the nodes in the tree are unique.
 */


/**
 * Intuition
This problem asks for the smallest subtree that contains all the deepest nodes. This is effectively finding the Lowest Common Ancestor (LCA) of all nodes at maximum depth.

The core insight is to look at the height of the left and right subtrees for any given node:

If the left subtree is deeper, the answer must lie somewhere inside the left subtree.

If the right subtree is deeper, the answer must lie inside the right subtree.

If both subtrees have the same depth, it means the deepest nodes are split between the left and right sides. Therefore, the current node is the lowest node that connects them all (the root of the smallest subtree).

Approach
We can solve this using a single-pass Depth First Search (DFS). We use a bottom-up approach (post-order traversal) where every node returns two values to its parent:

Height: The maximum height (depth from bottom) of the tree rooted at that node.

LCA Node: The root of the smallest subtree containing all deepest nodes found so far in that branch.

Algorithm:
Base Case: If the node is None, return (0, None).

Recursive Step: Call DFS on left and right children.

Compare:

If left_height > right_height: The deepest nodes are on the left. We propagate the left_height + 1 and the left_node (the answer found deeper in the left branch).

If right_height > left_height: The deepest nodes are on the right. We propagate right_height + 1 and the right_node.

If left_height == right_height: The deepest nodes are balanced on both sides. The current node is the new LCA. We return left_height + 1 and current_node.
Complexity
Time complexity: O(N)
We traverse every node in the tree exactly once.

Space complexity: O(H)
This is required for the recursion stack, where His the height of the tree. In the worst case (skewed tree), this isO(N)

Visual Trace
Let's trace this code on a simple tree:

  1
 / \
2   3
/\
4 5
Goal: Find the subtree with all deepest nodes (4 and 5).

Step 1: Leaves (4 and 5)

Node 4 calls DFS on null children. Both return (0, None).

4 sees a Tie (0 == 0). It returns (1, Node 4).
Node 5 calls DFS on null children. Both return (0, None).

5 sees a Tie (0 == 0). It returns (1, Node 5).
Step 2: Node 2 (The Parent of 4 and 5)

Receives from Left (4): (1, Node 4)

Receives from Right (5): (1, Node 5)

Comparison: Left Height (1) == Right Height (1).

Logic: It's a Tie! This means Node 2 connects the deepest nodes on the left and right.

Returns: (2, Node 2) (Height increments to 2, Node 2 becomes the LCA).

Step 3: Node 3 (Leaf on the right)

Calls DFS on null children.

Returns (1, Node 3).

Step 4: Root Node 1

Receives from Left (2): (2, Node 2) <-- Deeper!

Receives from Right (3): (1, Node 3)

Comparison: Left Height (2) > Right Height (1).

Logic: The left side wins. The deepest nodes are strictly on the left side. The specific answer found down there was Node 2.

Action: Don't change the node. Pass Node 2 up.

Returns: (3, Node 2).

Final Answer: Node 2.
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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
    function dfs(node) {
        if (!node) return { height: 0, node: null };
        
        const left = dfs(node.left);
        const right = dfs(node.right);
        
        if (left.height > right.height) {
            return { height: left.height + 1, node: left.node };
        } else if (right.height > left.height) {
            return { height: right.height + 1, node: right.node };
        } else {
            return { height: left.height + 1, node: node };
        }
    }
    
    return dfs(root).node;
};