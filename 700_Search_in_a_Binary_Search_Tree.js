/**
 * 700. Search in a Binary Search Tree
 * Difficulty: Easy
 * You are given the root of a binary search tree (BST) and an integer val.
Find the node in the BST that the node's value equals val and return the subtree rooted with that node. If such a node does not exist, return null.
Example 1:
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]
Example 2:
Input: root = [4,2,7,1,3], val = 5
Output: []
 
Constraints:
The number of nodes in the tree is in the range [1, 5000].
1 <= Node.val <= 107
root is a binary search tree.
1 <= val <= 107
 */

/**
 * Approach: 
 * Recursion the best approach for this. keep checking for the node value.
 * if it matches then return that node, else if its null then reutn null. if lesser then call function with right tree else call with left tree
 */

const findNode = (element, search) => {
  if(!element) return null;

  if(element.val === search) return element;

  if(element.val > search){
    return findNode(element.left, search);
  } else {
    return findNode(element.right, search);
  }
};

var searchBST = function(root, val) {
    
    let nodeFound = findNode(root, val);
    if(nodeFound){
      return nodeFound;
    }
    return null;
};


/**
 * Slight code refined but same approach
 */

var searchBST = function(root, val) {
    if(!root) return null;
    if(root.val === val) return root;
    if(val < root.val) return searchBST(root.left, val);
    if(val > root.val) return searchBST(root.right, val);
}