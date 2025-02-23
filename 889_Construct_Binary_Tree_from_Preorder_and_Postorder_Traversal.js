/**
 * 889. Construct Binary Tree from Preorder and Postorder Traversal
 * 
 * Difficulty: Medium
 * 
 * Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of 
 * distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.

If there exist multiple answers, you can return any of them.

Example 1:
Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]
Example 2:
Input: preorder = [1], postorder = [1]
Output: [1]
Constraints:
1 <= preorder.length <= 30
1 <= preorder[i] <= preorder.length
All the values of preorder are unique.
postorder.length == preorder.length
1 <= postorder[i] <= postorder.length
All the values of postorder are unique.
It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.
 */

/**
 * Can be done using the two pointers.
 * One for the preorder and for the postorder.
 * Create a node with the preoder and check if the current val is equal to the value at the post order
 * if yes then that means its the node and the postOrder index needs to be incremented
 No to this newNode call the function recursively to create the left and right node and at the end increase the post index
 signifying that the post needs to be updated

 https://www.youtube.com/watch?v=B0aJLoblfHk&ab_channel=Techdose
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
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function(preorder, postorder) {
    let preIndex = 0;
    let postIndex = 0;

    let createTree = () => {
        let newNode = new TreeNode(preorder[preIndex]);
        preIndex++;
        if(newNode.val !== postorder[postIndex]){
            newNode.left = createTree();
        }
        if(newNode.val !== postorder[postIndex]){
            newNode.right = createTree();
        }
        postIndex++;

        return newNode;
    }
    return createTree();
};