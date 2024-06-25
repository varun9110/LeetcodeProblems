/**
 * 1038. Binary Search Tree to Greater Sum Tree
 * Difficulty: Medium
 * 
 * Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original 
 * BST is changed to the original key plus the sum of all keys greater than the original key in BST.

As a reminder, a binary search tree is a tree that satisfies these constraints:
The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
Example 2:
Input: root = [0,null,1]
Output: [1,null,1]

Constraints:
The number of nodes in the tree is in the range [1, 100].
0 <= Node.val <= 100
All the values in the tree are unique.

Note: This question is the same as 538: https://leetcode.com/problems/convert-bst-to-greater-tree/
 */

/**
 * Approach: 
 * check the right most node first and calculate the sum and then find the max of the sum given by parent and the right sum. Add that to the current value
 * Post this compute the left sum.
 * return the max of the left sum or current node value
 */

const convertToGST = (root, addParentValue) => {
    if(!root){
        return 0;
    }
    const rightSum = convertToGST(root.right, addParentValue);
    const valueToAdd = Math.max(rightSum,addParentValue);
    root.val = root.val + valueToAdd;
    const leftSum = convertToGST(root.left, root.val);
    return Math.max(leftSum, root.val);
}


var bstToGst = function(root) {
    convertToGST(root, 0)
    return root
};



/**
 * refined approach:
 * Intuition
To convert a Binary Search Tree (BST) to a Greater Tree, we need to ensure that every node's value is updated to 
the sum of all values greater than or equal to the node's value. In a BST, an in-order traversal gives us the nodes in increasing order. 
To achieve the desired transformation, we need to traverse the tree in reverse in-order (right-root-left), 
accumulating the sum of the node values as we go.

Approach
Reverse In-Order Traversal:

We traverse the BST starting from the rightmost node (which has the largest value) to the leftmost node (which has the smallest value).
While traversing, we keep a running total (sum) of all the node values we have seen so far.
As we visit each node, we update its value by adding the current sum to the node's value and then update sum to this new value.
Recursive Function:

We use a helper function to perform the reverse in-order traversal.
This function will be called recursively first on the right subtree, then the current node, and finally on the left subtree.
 */

var bstToGst = function(root) {
    let sum = 0;

    const traverse = (node) => {
        if (node) {
            traverse(node.right);  // Traverse the right subtree
            sum += node.val;  // Update the sum
            node.val = sum;  // Update the current node's value
            traverse(node.left);  // Traverse the left subtree
        }
    };

    traverse(root);
    return root;
};