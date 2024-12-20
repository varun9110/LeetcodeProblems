/**
 * 2415. Reverse Odd Levels of Binary Tree
 * Difficulty: Medium
 * 
 * Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.

For example, suppose the node values at level 3 are [2,1,3,4,7,11,29,18], then it should become [18,29,11,7,4,3,1,2].
Return the root of the reversed tree.
A binary tree is perfect if all parent nodes have two children and all leaves are on the same level.

The level of a node is the number of edges along the path between it and the root node.

Example 1:


Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation: 
The tree has only one odd level.
The nodes at level 1 are 3, 5 respectively, which are reversed and become 5, 3.
Example 2:


Input: root = [7,13,11]
Output: [7,11,13]
Explanation: 
The nodes at level 1 are 13, 11, which are reversed and become 11, 13.
Example 3:

Input: root = [0,1,2,0,0,0,0,1,1,1,1,2,2,2,2]
Output: [0,2,1,0,0,0,0,2,2,2,2,1,1,1,1]
Explanation: 
The odd levels have non-zero values.
The nodes at level 1 were 1, 2, and are 2, 1 after the reversal.
The nodes at level 3 were 1, 1, 1, 1, 2, 2, 2, 2, and are 2, 2, 2, 2, 1, 1, 1, 1 after the reversal.
 

Constraints:

The number of nodes in the tree is in the range [1, 214].
0 <= Node.val <= 105
root is a perfect binary tree.
 */

/**
 * Intuition
The problem requires us to reverse the values at odd levels in a perfect binary tree.

A perfect binary tree is a tree where all internal nodes have exactly two children and all leaf nodes are at the same level.
Our goal is to reverse the node values at levels 1, 3, 5, etc., while keeping the values at even levels unchanged.
🛠 Approach
To solve this, we can use a breadth-first search (BFS) approach:

Traverse the Tree Level by Level: We will traverse the tree level by level using a queue.
Reverse Odd Levels: At each level, if the level number is odd, we reverse the node values for that level.
Use a Queue for BFS: As we move down the tree, we enqueue the left and right children of each node.
Swap Node Values at Odd Levels: For odd levels, collect the nodes at that level, reverse the values, and place them back in their original positions.
We use a flag to keep track of whether we are at an odd level, which toggles as we move down the tree.

⏱ Complexity
Time complexity: O(n), where n is the number of nodes in the tree. Each node is visited once in the BFS traversal.
Space complexity: O(w), where w is the width of the tree, i.e., the maximum number of nodes at any level. This is the space required for the queue in BFS.
 */

var reverseOddLevels = function(root) {
    // Edge case: if the tree is empty, return the root (null)
    if (root === null) return root;

    // Queue for level order traversal (using an array for the queue)
    let queue = [root];

    // Flag to keep track of odd levels
    let isOddLevel = false;

    // Perform level order traversal
    while (queue.length > 0) {
        let levelSize = queue.length;  // Number of nodes at the current level
        let currentLevelNodes = [];

        // Process nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();  // Dequeue the front node

            // Add children to the queue for the next level
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);

            // Store the node at the current level
            currentLevelNodes.push(node);
        }

        // If we are at an odd level, reverse the node values
        if (isOddLevel) {
            let left = 0, right = currentLevelNodes.length - 1;
            while (left < right) {
                // Swap the values of the nodes at the two ends
                let temp = currentLevelNodes[left].val;
                currentLevelNodes[left].val = currentLevelNodes[right].val;
                currentLevelNodes[right].val = temp;
                left++;
                right--;
            }
        }

        // Toggle the flag to switch between odd and even levels
        isOddLevel = !isOddLevel;
    }

    // Return the root after modifying the tree
    return root;
};