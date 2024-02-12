/**
 * 872. Leaf-Similar Trees
 * Difficulty: Easy
 * 
 * Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.

For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).
Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

Example 1:
Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true
Example 2:
Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false

Constraints:
The number of nodes in each tree will be in the range [1, 200].
Both of the given trees will have values in the range [0, 200].
 */

/**
 * Approach : 
 * 
 * use reccursion to find the leaves and keep pushing them into an array. Do this for both the leaves and store the leaves into different arrays
 * 
 * Compare the two arrays and check if they are different. If yes, then return false else true
 */

const findLeaves = (root) => {
    if(!root.left && !root.right){
        return [root.val];
    }

    let a=[];
    let b = [];
    if(root.left){
        a = [...findLeaves(root.left)];
    }
    if(root.right){
        b = [...findLeaves(root.right)];
    }
    return [...a, ...b];
    
};

var leafSimilar = function(root1, root2) {
    let arr1 = [...findLeaves(root1)];
    let arr2 = [...findLeaves(root2)];

    if(arr1.length !== arr2.length){
        return false;
    }

    for(let i=0; i<arr1.length; i++){
        if(arr1[i] !== arr2[i]){
            return false;
        }
    }

    return true;
};


/**
 * Refined code but same approach
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


var leafSimilar = function(root1, root2) {
    const fn = (root, leafs) => {
        if (root.left)
            fn(root.left, leafs)
        if (!root.left && !root.right)
            leafs.push(root.val)
        if (root.right)
            fn(root.right, leafs)
    }
    let l1 = new Array(), l2 = new Array()
    fn(root1, l1)
    fn(root2, l2)
    if (l1.length != l2.length)
        return false
    for (let i = 0, n = l1.length; i < n; i++)
        if (l1[i] != l2[i])
            return false
    return true
};