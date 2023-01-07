/*

1379_Find_a_Corresponding_Node_of_a_Binary_Tree_in_a_Clone_of_That_Tree
Difficulty : Easy

Given two binary trees original and cloned and given a reference to a node target in the original tree.

The cloned tree is a copy of the original tree.

Return a reference to the same node in the cloned tree.

Note that you are not allowed to change any of the two trees or the target node and the answer must be a reference to a node in the cloned tree.

Example 1:
Input: tree = [7,4,3,null,null,6,19], target = 3
Output: 3
Explanation: In all examples the original and cloned trees are shown. The target node is a green node from the original tree. The answer is the yellow node from the cloned tree.

Example 2:
Input: tree = [7], target =  7
Output: 7

Example 3:
Input: tree = [8,null,6,null,5,null,4,null,3,null,2,null,1], target = 4
Output: 4
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
The values of the nodes of the tree are unique.
target node is a node from the original tree and is not null.
 
Follow up: Could you solve the problem if repeated values on the tree are allowed?
*/


/* 
My solution: 
Recursion and iterate through all the nodes check if the value of the node matches the value of the node currently being iterated.
If yes then return else continue checkig the nodes

*/

var iterate = (cloned, target) => {
    if(cloned.val === target.val) return cloned;
    if(cloned.left) {
        let fromLeft = iterate(cloned.left, target);
        if(fromLeft) return fromLeft;
    }
    if(cloned.right){
        let fromRight = iterate(cloned.right, target);
        if(fromRight) return fromRight;
    }
 }

var getTargetCopy = function(original, cloned, target) {
    return iterate(cloned, target);
};


/*
Optimised solution but on the same concept. 
We just not have to create a new function but we can actually use the same function
*/

var getTargetCopy = function(original, cloned, target) {
    
    if(!original) return null;
  
    if(original === target) return cloned;
    
    let left = getTargetCopy(original.left,cloned.left,target)
    if(left) return left
    
    let right =getTargetCopy(original.right,cloned.right,target)
    return right
};