/**
 * 2684. Maximum Number of Moves in a Grid
 * Difficulty: Medium
 * 
 * You are given a 0-indexed m x n matrix grid consisting of positive integers.

You can start at any cell in the first column of the matrix, and traverse the grid in the following way:

From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, 
should be strictly bigger than the value of the current cell.
Return the maximum number of moves that you can perform.


Example 1:

Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: We can start at the cell (0, 0) and make the following moves:
- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.
Example 2:

Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: Starting from any cell in the first column we cannot perform any moves.

Constraints:
m == grid.length
n == grid[i].length
2 <= m, n <= 1000
4 <= m * n <= 105
1 <= grid[i][j] <= 106
 */

/**
 * 1. Understanding
We have a grid where we can start from any cell in the first column
From each cell, we can move diagonally up-right, right, or diagonally down-right
We can only move to cells with strictly larger values
Goal: Find maximum possible moves
2. Approach
Use dynamic programming to track reachable cells
Process the grid column by column
For each cell, check if we can reach it from previous column
3. Algorithm:
For each column j (starting from 1):
For each row i:
Check three possible moves: a. From top-left (i-1, j-1) b. From left (i, j-1) c. From bottom-left (i+1, j-1)
Update dp[i] with maximum possible moves
4. Details
Use leftTop variable to track previous diagonal value
Use found flag to check if current column is reachable
Break if no cell in current column is reachable
5. Optimalization
Only store one column of dp values at a time
Early termination when no cells are reachable
Efficient tracking of diagonal values
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function(grid) {
    // Get dimensions of the grid
    const m = grid.length;    // number of rows
    const n = grid[0].length; // number of columns
    
    // res will store the rightmost column we can reach
    let res = 0;
    
    // dp array stores the maximum number of moves possible to reach each cell
    // in the current column we're processing
    let dp = new Array(m).fill(0);
    
    // Iterate through each column from left to right (starting from column 1)
    for (let j = 1; j < n; j++) {
        // leftTop keeps track of the dp value from the cell above-left
        let leftTop = 0;
        // found indicates if we can reach any cell in current column
        let found = false;
        
        // Iterate through each row in current column
        for (let i = 0; i < m; i++) {
            // cur will store the maximum moves to reach current cell
            let cur = -1;
            // Store dp[i] for next iteration's leftTop
            let nxtLeftTop = dp[i];
            
            // Check move from top-left cell (if valid)
            if (i - 1 >= 0 && leftTop !== -1 && grid[i][j] > grid[i - 1][j - 1]) {
                cur = Math.max(cur, leftTop + 1);
            }
            
            // Check move from direct left cell (if valid)
            if (dp[i] !== -1 && grid[i][j] > grid[i][j - 1]) {
                cur = Math.max(cur, dp[i] + 1);
            }
            
            // Check move from bottom-left cell (if valid)
            if (i + 1 < m && dp[i + 1] !== -1 && grid[i][j] > grid[i + 1][j - 1]) {
                cur = Math.max(cur, dp[i + 1] + 1);
            }
            
            // Update dp array for current cell
            dp[i] = cur;
            // Update found flag if we can reach current cell
            found = found || (dp[i] !== -1);
            // Update leftTop for next row's iteration
            leftTop = nxtLeftTop;
        }
        
        // If we can't reach any cell in current column, break
        if (!found) break;
        // Update result to current column if we can reach it
        res = j;
    }
    
    // Return the maximum number of moves possible
    return res;
};
