/**
 * 1261. Find Elements in a Contaminated Binary Tree
 * Difficulty: Medium
 * 
 * Given a binary tree with the following rules:

root.val == 0
For any treeNode:
If treeNode.val has a value x and treeNode.left != null, then treeNode.left.val == 2 * x + 1
If treeNode.val has a value x and treeNode.right != null, then treeNode.right.val == 2 * x + 2
Now the binary tree is contaminated, which means all treeNode.val have been changed to -1.

Implement the FindElements class:

FindElements(TreeNode* root) Initializes the object with a contaminated binary tree and recovers it.
bool find(int target) Returns true if the target value exists in the recovered binary tree.
 

Example 1:


Input
["FindElements","find","find"]
[[[-1,null,-1]],[1],[2]]
Output
[null,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1]); 
findElements.find(1); // return False 
findElements.find(2); // return True 
Example 2:


Input
["FindElements","find","find","find"]
[[[-1,-1,-1,-1,-1]],[1],[3],[5]]
Output
[null,true,true,false]
Explanation
FindElements findElements = new FindElements([-1,-1,-1,-1,-1]);
findElements.find(1); // return True
findElements.find(3); // return True
findElements.find(5); // return False
Example 3:


Input
["FindElements","find","find","find","find"]
[[[-1,null,-1,-1,null,-1]],[2],[3],[4],[5]]
Output
[null,true,false,false,true]
Explanation
FindElements findElements = new FindElements([-1,null,-1,-1,null,-1]);
findElements.find(2); // return True
findElements.find(3); // return False
findElements.find(4); // return False
findElements.find(5); // return True
 

Constraints:

TreeNode.val == -1
The height of the binary tree is less than or equal to 20
The total number of nodes is between [1, 104]
Total calls of find() is between [1, 104]
0 <= target <= 106
 */

/**
 * Approach:
 * 
 * In the function where we are creating the tree create a set as well which can save the values created in the tree, this way we dont have to iterate through the tree twice.
 * But just in the function to check for the values we can check if the value is there in the set or not.
 * Use "this" keyword to assign the root and set to the scope of the program
 */


/**
 * @param {TreeNode} root
 */


var FindElements = function(root) {
    if(!root){
        return;
    }
    let mySet = new Set()
    root.val=0;
    mySet.add(0);

    const createRestOfTheTree = (node, target) => {
        if(!node){
            return;
        }

        if(node.left){
            node.left.val = (node.val*2) + 1;
            mySet.add((node.val*2) + 1);
            result = createRestOfTheTree(node.left)
        }
        if(node.right){
            node.right.val = (node.val*2) + 2;
            mySet.add((node.val*2) + 2);
            createRestOfTheTree(node.right)
        }
    };

    if(root.left || root.right){
        createRestOfTheTree(root);
    }
    this.head = root;
    this.mySet = mySet;
};

/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
    return this.mySet.has(target)
};

/** 
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */
 