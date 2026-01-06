/**
 * 1161. Maximum Level Sum of a Binary Tree
 * Difficulty: Medium
 * 
 * Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

 

Example 1:


Input: root = [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
Example 2:

Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
Output: 2
 

Constraints:

The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105
 */

/**
Approach
Any question that needs level by level traversal, always go for bfs
Trees are naturally explored level by level using Breadth-First Search (BFS).
BFS uses a queue, which helps us process all nodes of one level together.
This makes it very intuitive for beginners.

Step 1: Use a Queue
Start by putting the root node into a queue.
The queue will help us process nodes level by level.

Step 2: Track Levels
Maintain:
currentLevel → which level we are processing
maxSum → maximum level sum seen so far
answerLevel → level that has the maximum sum

Step 3: Process One Level at a Time
At each iteration:
Take the size of the queue → number of nodes in the current level
Remove exactly size nodes from the queue
Add their values to levelSum
Push their children back into the queue

Step 4: Update Answer
If levelSum > maxSum
Update maxSum
Update answerLevel

Step 5: After all levels are processed, return answerLevel

Complexity
Time complexity:
O(N)
Space complexity:
O(N)
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxLevelSum = function(root) {
    let queue = [root];
    let level = 1;
    let answerLevel = 1;
    let maxSum = root.val;

    while (queue.length > 0) {
        let size = queue.length;
        let levelSum = 0;

        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            levelSum += node.val;

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        if (levelSum > maxSum) {
            maxSum = levelSum;
            answerLevel = level;
        }

        level++;
    }

    return answerLevel;
};
