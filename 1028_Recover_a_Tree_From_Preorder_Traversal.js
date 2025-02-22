/**
 * 1028. Recover a Tree From Preorder Traversal
 * Difficulty: Hard
 * 
 * We run a preorder depth-first search (DFS) on the root of a binary tree.

At each node in this traversal, we output D dashes (where D is the depth of this node), 
then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  
The depth of the root node is 0.

If a node has only one child, that child is guaranteed to be the left child.

Given the output traversal of this traversal, recover the tree and return its root.

 

Example 1:


Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
Example 2:


Input: traversal = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
Example 3:


Input: traversal = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
 

Constraints:

The number of nodes in the original tree is in the range [1, 1000].
1 <= Node.val <= 109
 */

/**
 * Intuition
The problem is about recovering a binary tree from its preorder traversal string, where each node is preceded by dashes indicating its depth in the tree. The key insight here is that the number of dashes tells us the depth of a node, and we can use this information to place the node at the appropriate position in the tree. To solve this problem, we need to traverse the string, extract the node values and depth, and recursively construct the tree by appropriately assigning nodes as children based on their depth.

Approach
The approach involves the following steps:

Extract Node Values and Depth Information:

We need to extract the value of each node from the traversal string. This can be done by reading the characters of the string until we encounter a non-numeric character.
The number of dashes preceding each node value represents the depth of that node in the tree.
Recursive Tree Construction:

We start by constructing the root node using the first number in the traversal string.
Then, recursively assign nodes to the left or right child based on their depth. If a node’s depth is greater than the current node’s depth, it is a child; otherwise, it belongs to a parent at a previous depth.
The recursion continues until the entire traversal string has been processed.
Backtracking for Depth Validation:

If a node does not match the expected depth (number of dashes), we backtrack to the previous position in the traversal string and try to place it at a correct level.
Complexity
Time complexity:O(n)
We process each character of the string once and each node exactly once. Therefore, the time complexity is linear in the length of the input string, wherenis the length of the traversal string.

Space complexity:O(h)
The space complexity is determined by the recursion depth, which is proportional to the height of the tree (h). In the worst case, the tree could be skewed, and thus the recursion stack would be as deep ash, wherehis the height of the tree. In the worst case,h = n.
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
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function(traversal) {
    
    let pos = 0;

    // Helper function to get the node value from the traversal string
    function getVal() {
        let val = 0;
        while (pos < traversal.length && traversal[pos] >= '0' && traversal[pos] <= '9') {
            val = val * 10 + (traversal[pos] - '0');
            pos++;
        }
        return val;
    }

    // Helper function to get the number of dashes (depth) from the traversal string
    function getDashLen() {
        let dashLen = 0;
        while (pos < traversal.length && traversal[pos] === '-') {
            dashLen++;
            pos++;
        }
        return dashLen;
    }

    // Helper function to build the tree recursively
    function buildTree(curr, expectedDashLen) {
        if (pos === traversal.length) return;

        const prevPos = pos;
        const dashLen = getDashLen();

        // If the current node should not be a child of the current node, backtrack
        if (dashLen < expectedDashLen) {
            pos = prevPos;
            return;
        }

        // Create the new node
        const nodeVal = getVal();
        const newNode = new TreeNode(nodeVal);

        // Assign the node as the left or right child
        if (!curr.left) {
            curr.left = newNode;
        } else {
            curr.right = newNode;
        }

        // Recursively build the left and right children
        buildTree(newNode, expectedDashLen + 1);
        buildTree(newNode, expectedDashLen + 1);
    }

    // Start building the tree
    const rootVal = getVal();
    const root = new TreeNode(rootVal);

    // Build the tree starting from the root
    buildTree(root, 1);
    buildTree(root, 1);

    return root;
};