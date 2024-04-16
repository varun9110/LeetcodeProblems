/**
 * 623. Add One Row to Tree
 * Difficulty: Medium
 * 
 * Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.

Note that the root node is at depth 1.

The adding rule is:

Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value 
val as cur's left subtree root and right subtree root.
cur's original left subtree should be the left subtree of the new left subtree root.
cur's original right subtree should be the right subtree of the new right subtree root.
If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the 
new root of the whole original tree, and the original tree is the new root's left subtree.
 

Example 1:


Input: root = [4,2,6,3,1,5], val = 1, depth = 2
Output: [4,1,1,2,null,null,6,3,1,5]
Example 2:


Input: root = [4,2,null,3,1], val = 1, depth = 3
Output: [4,2,null,1,1,3,null,null,1]
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
The depth of the tree is in the range [1, 104].
-100 <= Node.val <= 100
-105 <= val <= 105
1 <= depth <= the depth of tree + 1
 */

/**
 * Idea:
We could definitely solve this a number of ways, but I'm always partial to recursion when possible, 
especially when you can simply recurse the main function rather than having to define a separate recursive helper function. 
The recursive route is a depth-first search (DFS) solution.
We can use the depth variable (d) as a countdown of sorts, decrementing it as we traverse downward through the 
tree until we get to our destination row. Since we're going to need to attach the new nodes at d to their parents, 
we should actually perform our operations when d = 2, rather than d = 1, so that we have access to the parent node.
This also allows us to deal with the sticky edge case of when the original value of d is 1. Since no parent exists 
for the original root, we'll have to just create our new node and attach the root to it before returning. 
This can only ever happen on the initial function call, as otherwise we will never reach d = 1 in any later recursion.
The function will return the node each recursion, but since we're not doing anything with the return value when the 
function is called internally, it will only really be meaningful on the original function call.
This works because we're passing node references through the recursion, so the tree object is being modified regardless of return values.
 */

var addOneRow = function(root, val, depth) {
    if (depth === 1) return new TreeNode(val, root, null)
    if (depth === 2) {
        root.left = new TreeNode(val, root.left, null)
        root.right = new TreeNode(val, null, root.right)
    } else {
        if (root.left) addOneRow(root.left, val, depth-1)
        if (root.right) addOneRow(root.right, val, depth-1)
    }
    return root
};