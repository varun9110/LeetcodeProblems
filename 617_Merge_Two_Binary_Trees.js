/**
 * 617. Merge Two Binary Trees
 * Difficulty : Easy
 * 
 * You are given two binary trees root1 and root2.
Imagine that when you put one of them to cover the other, some nodes of the two trees are overlapped while the others are not. 
You need to merge the two trees into a new binary tree. The merge rule is that if two nodes overlap, then sum node values up as the 
new value of the merged node. Otherwise, the NOT null node will be used as the node of the new tree.
Return the merged tree.
Note: The merging process must start from the root nodes of both trees.

Example 1:
Input: root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
Output: [3,4,5,5,4,null,7]
Example 2:
Input: root1 = [1], root2 = [1,2]
Output: [2,2]

Constraints:
The number of nodes in both trees is in the range [0, 2000].
-104 <= Node.val <= 104
 */

/**
 * Approach:
 * check if both the nodes are there, if yes then add the values and store them in the root1,
 * if just 1 node is there then return that itself
 * at the end return the updated root
 */

var mergeTrees = function(root1, root2) {
    
    if(root1 && root2){
        root1.val = root1.val + root2.val;
        root1.left = mergeTrees(root1.left, root2.left);
        root1.right = mergeTrees(root1.right, root2.right);
    } else if(root2){
        return root2
    }
    return root1;
};


//same thing

var mergeTrees = function(t1, t2) {
    // goal is to merge t2 to t1
    
    // if one of the node missing, return the other
    if (t1 === null) {
        return t2;
    }
    if (t2 === null) {
        return t1;
    }
    // if both nodes exist, sum the values
    t1.val += t2.val;
    
    // do the same thing for left and right branch
    t1.left = mergeTrees(t1.left, t2.left);
    t1.right = mergeTrees(t1.right, t2.right);
    
    // return the merged t1
    return t1;
};