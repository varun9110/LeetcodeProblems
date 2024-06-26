/**
 * 1382. Balance a Binary Search Tree
 * Difficluty: Medium
 * 
 * Given the root of a binary search tree, return a balanced binary search tree with the same node values. 
 * If there is more than one answer, return any of them.

A binary search tree is balanced if the depth of the two subtrees of every node never differs by more than 1.

Example 1:
Input: root = [1,null,2,null,3,null,4,null,null]
Output: [2,1,3,null,null,null,4]
Explanation: This is not the only correct answer, [3,1,4,null,2] is also correct.
Example 2:
Input: root = [2,1,3]
Output: [2,1,3]
 
Constraints:
The number of nodes in the tree is in the range [1, 104].
1 <= Node.val <= 105
 */

/**
 * Approach:
 * 
 * Use inorder traversal to create a sorted array
Construct a balance tree using the sorted array
 */

var balanceBST = function(root) {
    function inOrder(myRoot) {
        if(!myRoot) return [];
        return [...inOrder(myRoot.left), myRoot.val, ...inOrder(myRoot.right)]
    }
    const sortedArr = inOrder(root)
    
    function constructTree(arr) {
        if(!arr.length) return null;
        
        const mid = Math.floor(arr.length / 2);
        const node = new TreeNode(arr[mid])
        node.left = constructTree(arr.slice(0, mid));
        node.right = constructTree(arr.slice(mid+1));
        
        return node;
    }
    return constructTree(sortedArr);
};