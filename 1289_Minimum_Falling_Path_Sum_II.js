/**
 * 1289. Minimum Falling Path Sum II
 * Difficulty: Hard
 * 
 * Given an n x n integer matrix grid, return the minimum sum of a falling path with non-zero shifts.

A falling path with non-zero shifts is a choice of exactly one element from each row of grid such that no two 
elements chosen in adjacent rows are in the same column.

Example 1:
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 13
Explanation: 
The possible falling paths are:
[1,5,9], [1,5,7], [1,6,7], [1,6,8],
[2,4,8], [2,4,9], [2,6,7], [2,6,8],
[3,4,8], [3,4,9], [3,5,7], [3,5,9]
The falling path with the smallest sum is [1,5,7], so the answer is 13.
Example 2:
Input: grid = [[7]]
Output: 7

Constraints:
n == grid.length == grid[i].length
1 <= n <= 200
-99 <= grid[i][j] <= 99
 */

/**
 * Approach
Let's break down the code step by step, Jiraiya-style:

Surveying the Battlefield: Jiraiya begins by assessing the battlefield, examining the grid matrix. 
He notes that it's an n x n matrix and takes note of the range of values it contains (-99 to 99).

Preparing for Battle: Armed with this knowledge, Jiraiya prepares his strategy. He decides to use dynamic 
programming to solve the problem efficiently. He creates a 2D array called dp of size n x n to store the minimum 
falling path sums. Each element of dp will represent the minimum sum of a falling path ending at that position.

Initializing the Battlefield: Before diving into battle, Jiraiya sets each element of dp to -1 to mark them as uninitialized. 
This way, he can easily identify which elements have been visited during his traversal.

Starting the Descent: Jiraiya begins his descent into the battlefield, starting from the first row of the grid matrix. 
For each cell in the first row, he sets the corresponding cell in dp to the value of that cell in the grid. 
After all, in the first row, there's only one choice of path – the cell itself.

Traversing the Terrain: Now, Jiraiya moves on to subsequent rows, carefully calculating the falling path sums for each cell. 
For each cell in the current row, he considers all possible paths from the previous row, making sure not to step on the same column twice in a row.

Choosing the Path Wisely: Jiraiya compares the falling path sums from different paths and selects the one with the minimum sum. 
He updates the corresponding cell in dp with this minimum sum.

Emerging Victorious: After reaching the last row of the battlefield, Jiraiya scans through the dp array to find the minimum sum among all the paths. 
This minimum sum represents the answer he's been seeking – the minimum sum of a falling path with non-zero shifts.

Celebrating Victory: With the mission accomplished, Jiraiya emerges victorious from the battlefield, 
having successfully navigated the treacherous terrain and outsmarted his opponents with his cunning strategy and ninja skills. Victory is sweet, indeed!

Dry-Run:
Of course, let's dry run the given example step by step:

Initialization: Initialize dp matrix to store minimum path sums.

dp matrix:
  [ 1, 2, 3]
  [-1, -1, -1]
  [-1, -1, -1]
The first row of dp is filled with the values from the first row of the grid.
Iteration:

For each subsequent row, iterate through each column and update the dp matrix with the minimum sum.
For the second row:
For each cell, consider all possible paths from the previous row except for the column of the current cell.
Update the current cell with the minimum sum obtained from the previous row and add the value from the current grid cell.
The dp matrix after the second row iteration:
 [1, 2, 3]
 [6, 6, 7]
 [-1, -1, -1]
- The third row will have similar calculations, resulting in:
 [ 1,  2,  3]
 [ 5,  6,  7]
 [13, 14, 15]
Minimum Sum: Find the minimum sum from the last row of the dp matrix.

The minimum sum is 13, which corresponds to the falling path [1, 5, 7].
Output: Return the minimum sum, which is 13.

So, the output of the dry run matches the expected output of 13 for the given input grid.
 */



var minFallingPathSum = function(grid) {
    const n = grid.length;
    let res = Infinity;
    const dp = new Array(n).fill().map(() => new Array(n).fill(-1));

    for(let j = 0; j < n; ++j) {
        dp[0][j] = grid[0][j];
    }

    for(let i = 1; i < n; ++i) {
        for(let j = 0; j < n; ++j) {
            let temp = Infinity;

            for(let k = 0; k < n; ++k) {
                if(j !== k) {
                    temp = Math.min(temp, grid[i][j] + dp[i - 1][k]);
                }
            }

            dp[i][j] = temp;
        }
    }

    for(let j = 0; j < n; ++j) {
        res = Math.min(res, dp[n - 1][j]);
    }

    return res;
};