/**
 * 1457. Pseudo-Palindromic Paths in a Binary Tree
 * Difficulty: Medium
 * Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at 
 * least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.
Example 1:
Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 2:
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).
Example 3:

Input: root = [9]
Output: 1

Constraints:
The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 9
 */

/**
 * Approach:
 * Use DFS to iterate through the tree and find the leaves. Keep adding the node to an array and mapper.
 * at the leaf find if the array is an palindrome or not. If yes then return the count 1 and then add it to the sum.
 * Logic to find the palindrome: 
 * if length is odd then only one number can be of odd length, rest have to be of even reps
 * if length is even, then none can be of odd reps.
 */

var checkPalindrome = (root, arr, map1) => {
    arr.push(root.val);
    map1[root.val] = (map1[root.val] !== undefined) ? map1[root.val]+1 : 1;

    if(!root.left && !root.right){
        let values = Object.values(map1);

        arr.pop();
        if(map1[root.val] > 1){
            map1[root.val] = map1[root.val]-1;
        } else {
            delete map1[root.val];
        }

        if(((arr.length+1)%2) === 0) {
            for(let i=0; i<values.length; i++){
                if(values[i]%2 === 1){
                    return 0;
                }
            }
            return 1;
        } else {
            let numberOfOdd = 0;
            for(let i=0; i<values.length; i++){
                if(values[i]%2 === 1){
                    numberOfOdd++;
                }
            }
            return (numberOfOdd === 1) ? 1 : 0;
        }
    }
    let sum = 0;

    if(root.left){
        sum += checkPalindrome(root.left, arr, map1);
    }
    

    if(root.right){
        sum += checkPalindrome(root.right, arr, map1);
    }
    arr.pop();
    if(map1[root.val] > 1){
        map1[root.val] = map1[root.val]-1;
    } else {
        delete map1[root.val];
    }
    return sum;
}


var pseudoPalindromicPaths  = function(root) {
    
    let number = checkPalindrome(root, [], {});
    return number;
};



/**
 * Appproach 2
The function pseudoPalindromicPaths is the main entry point. It initializes the count of pseudo-palindromic paths and starts the recursive traversal.

The recursive helper function countPseudoPalindromicPaths is called with the current node and the XOR path value.

The XOR path is used to keep track of the occurrences of each digit in the current path.

If the current node is null, return 0 as there are no paths to consider.

XOR the current path with the value of the current node using path ^= (1 << node->val).

If the current node is a leaf (both left and right are null), check if the path is pseudo-palindromic. If yes, return 1, otherwise return 0.

Recursively calculate the count for the left and right subtrees by calling countPseudoPalindromicPaths with updated path values.

Return the sum of counts from the left and right subtrees.
 */

var pseudoPalindromicPaths = function(root) {
    return countPseudoPalindromicPaths(root, 0);
};

var countPseudoPalindromicPaths = function(node, path) {
    if (!node) {
        return 0;
    }

    path ^= 1 << node.val;

    if (!node.left && !node.right) {
        return (path & (path - 1)) == 0 ? 1 : 0;
    }

    return countPseudoPalindromicPaths(node.left, path) + countPseudoPalindromicPaths(node.right, path);
};
