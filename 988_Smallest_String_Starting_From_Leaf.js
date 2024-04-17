/**
 * 988. Smallest String Starting From Leaf
 * Difficulty: Medium
 * 
 * You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.
Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.
As a reminder, any shorter prefix of a string is lexicographically smaller.
For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

Example 1:
Input: root = [0,1,2,3,4,3,4]
Output: "dba"
Example 2:
Input: root = [25,1,3,1,3,0,2]
Output: "adz"
Example 3:
Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"
 
Constraints:
The number of nodes in the tree is in the range [1, 8500].
0 <= Node.val <= 25
 */

/**
 * Approach 🚀
Implement a DFS traversal of the tree, appending the characters corresponding to each node's value to a StringBuilder sb.
When reaching a leaf node, reverse the StringBuilder to get the path from the leaf to the root and compare it with the current smallest path found so far (ans).
If the current path is lexicographically smaller than ans, update ans to the current path.
Continue the DFS traversal for both left and right subtrees.
After processing a node, remove the last character appended to sb.
 */

var smallestFromLeaf = function(root) {
    
  let ans = "";

    const dfs = (node, path) => {
        if (!node) return;

        const char = String.fromCharCode(node.val + 97);
        path = char + path;

        if (!node.left && !node.right) {
            if (!ans || path < ans) {
                ans = path;
            }
        }

        dfs(node.left, path);
        dfs(node.right, path);
    };

    dfs(root, "");
    return ans;
};