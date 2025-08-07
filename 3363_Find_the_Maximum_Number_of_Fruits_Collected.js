/**
 * 3363. Find the Maximum Number of Fruits Collected
 * Difficulty: Hard
 * 
 * There is a game dungeon comprised of n x n rooms arranged in a grid.

You are given a 2D array fruits of size n x n, where fruits[i][j] represents the number of fruits in the room (i, j). Three children will play in the game dungeon, with initial positions at the corner rooms (0, 0), (0, n - 1), and (n - 1, 0).

The children will make exactly n - 1 moves according to the following rules to reach the room (n - 1, n - 1):

The child starting from (0, 0) must move from their current room (i, j) to one of the rooms (i + 1, j + 1), (i + 1, j), and (i, j + 1) if the target room exists.
The child starting from (0, n - 1) must move from their current room (i, j) to one of the rooms (i + 1, j - 1), (i + 1, j), and (i + 1, j + 1) if the target room exists.
The child starting from (n - 1, 0) must move from their current room (i, j) to one of the rooms (i - 1, j + 1), (i, j + 1), and (i + 1, j + 1) if the target room exists.
When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.

Return the maximum number of fruits the children can collect from the dungeon.

Example 1:

Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]

Output: 100
Explanation:
In this example:

The 1st child (green) moves on the path (0,0) -> (1,1) -> (2,2) -> (3, 3).
The 2nd child (red) moves on the path (0,3) -> (1,2) -> (2,3) -> (3, 3).
The 3rd child (blue) moves on the path (3,0) -> (3,1) -> (3,2) -> (3, 3).
In total they collect 1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100 fruits.

Example 2:

Input: fruits = [[1,1],[1,1]]

Output: 4
Explanation:\
In this example:
The 1st child moves on the path (0,0) -> (1,1).
The 2nd child moves on the path (0,1) -> (1,1).
The 3rd child moves on the path (1,0) -> (1,1).
In total they collect 1 + 1 + 1 + 1 = 4 fruits.
 

Constraints:

2 <= n == fruits.length == fruits[i].length <= 1000
0 <= fruits[i][j] <= 1000
 */

/**
 * 💡 Intuition
Imagine three children starting from different corners of the grid:

One goes diagonally from top-left to bottom-right.
One goes right to bottom from the top-right corner.
One goes upward from the bottom-left corner.
They collect fruits on their paths without crossing or sharing paths. The goal is to maximize the total fruits collected.

We can split the problem into 3 parts and solve them independently:

Directly collect the diagonal fruits.
Use dynamic programming to find the optimal path for the top-right to bottom-right child.
Use dynamic programming again for the bottom-left to bottom-right child.
We combine all their fruits to get the final result.

🧠 Approach
Collect Main Diagonal Fruits
These are always part of the answer and don’t overlap with the other two paths.

Track Top-Right and Bottom-Left Paths
We simulate each child’s path step-by-step using a 1D DP array (rightPath, bottomPath).
At every step, we consider moving left, straight, or right (like a triangle-shaped DP).
We keep a sliding window that grows and shrinks based on the grid size to keep memory optimized.

Merge Final Results
After all steps, the result is:
total = diagonal + best right path + best bottom path.

📊 Time & Space Complexity
Complexity	Value	Reason
⏱️ Time	O(n²)	One loop for diagonal + nested DP loops
🧠 Space	O(n)	Sliding DP window only stores current state
🔢 Example
Let’s take this grid as input:
fruits = [
[1, 2, 3],
[4, 5, 6],
[7, 8, 9]
]

Diagonal child collects: 1 + 5 + 9 = 15
Top-right to bottom-right path may collect: 3 → 6 → 9 = 18
Bottom-left to bottom-right path may collect: 7 → 8 → 9 = 24
Final max fruits = 15 + 18 + 24 = 57 (actual overlapping is auto-managed in logic)
 */

/**
 * @param {number[][]} fruits
 * @return {number}
 */
var maxCollectedFruits = function(fruits) {
    const n = fruits.length;
    let total = 0;

    for (let i = 0; i < n; i++) {
        total += fruits[i][i];
    }

    let rightPath = Array(3).fill(0);
    rightPath[0] = fruits[0][n - 1];

    let bottomPath = Array(3).fill(0);
    bottomPath[0] = fruits[n - 1][0];

    let window = 2;

    for (let step = 1; step < n - 1; step++) {
        const newRight = Array(window + 2).fill(0);
        const newBottom = Array(window + 2).fill(0);

        for (let dist = 0; dist < window; dist++) {
            let left = dist - 1 >= 0 ? rightPath[dist - 1] : 0;
            let mid = rightPath[dist];
            let right = dist + 1 < rightPath.length ? rightPath[dist + 1] : 0;
            newRight[dist] = Math.max(left, mid, right) + fruits[step][n - 1 - dist];

            left = dist - 1 >= 0 ? bottomPath[dist - 1] : 0;
            mid = bottomPath[dist];
            right = dist + 1 < bottomPath.length ? bottomPath[dist + 1] : 0;
            newBottom[dist] = Math.max(left, mid, right) + fruits[n - 1 - dist][step];
        }

        rightPath = newRight;
        bottomPath = newBottom;

        if (window - n + 4 + step <= 1) {
            window++;
        } else if (window - n + 3 + step > 1) {
            window--;
        }
    }

    return total + rightPath[0] + bottomPath[0];
};