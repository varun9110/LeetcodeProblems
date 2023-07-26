/**
 * 100. Same Tree
 * Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
Example 1:
Input: p = [1,2,3], q = [1,2,3]
Output: true
Example 2:
Input: p = [1,2], q = [1,null,2]
Output: false
Example 3:
Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraints:
The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104
 */

/**
 * Approach:
 * Check if any of them is not null then return false.
 * if both are null then return true
 * check for left and right, if any is false then return false
 * 
 * else return true
 */

var isSameTree = function(p, q) {
     
     if((p === null && q !== null) || (q === null && p !== null)) {
       return false;
     }

     if(p === null && q=== null) {
       return true
     }

     if(p.val !== q.val){
       return false;
     }

     let left =  isSameTree(p.left, q.left);
     let right = isSameTree(p.right, q.right);

     if(!left || !right) {
       return false;
     }

     return true;

};


/**
 * same logic
 */

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}