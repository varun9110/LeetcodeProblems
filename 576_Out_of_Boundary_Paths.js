/**
 * 576. Out of Boundary Paths
 * Difficulty: Medium
 * 
 * There is an m x n grid with a ball. The ball is initially at the position [startRow, startColumn]. 
 * You are allowed to move the ball to one of the four adjacent cells in the grid (possibly out of the grid crossing the grid boundary). 
 * You can apply at most maxMove moves to the ball.

Given the five integers m, n, maxMove, startRow, startColumn, return the number of paths to move the 
ball out of the grid boundary. Since the answer can be very large, return it modulo 109 + 7.

Example 1:
Input: m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
Output: 6
Example 2:
Input: m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
Output: 12
 
Constraints:
1 <= m, n <= 50
0 <= maxMove <= 50
0 <= startRow < m
0 <= startColumn < n
 */

/**
 * Approaches
(Also explained in the code)

Initialization:

Initialize a 2D vector dp of size m x n to represent the number of ways to reach each cell.
Set the starting cell (x, y) to 1, as there is one way to reach it initially.
Counting Paths:

Use a nested loop to iterate over the number of moves from 1 to N.
For each cell (i, j) in the grid:
If (i, j) is on the boundary, increment the count by the value of dp[i][j]. This accounts for paths going out of the grid.
Update temp[i][j] based on the sum of the ways to reach the adjacent cells in the previous state (dp).
Use modulo M to avoid integer overflow.
Updating State:

Update the dp vector with the values from the temp vector for the next iteration.
Return Result:

Return the final count, representing the total number of paths that lead out of the grid after N moves.
 */

var findPaths = function(m, n, maxMove, startRow, startColumn) {
    const M = 1000000000 + 7;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    dp[startRow][startColumn] = 1;
    let count = 0;

    for (let moves = 1; moves <= maxMove; moves++) {
        let temp = new Array(m).fill(0).map(() => new Array(n).fill(0));

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (i === m - 1) count = (count + dp[i][j]) % M;
                if (j === n - 1) count = (count + dp[i][j]) % M;
                if (i === 0) count = (count + dp[i][j]) % M;
                if (j === 0) count = (count + dp[i][j]) % M;
                temp[i][j] = (
                    ((i > 0 ? dp[i - 1][j] : 0) + (i < m - 1 ? dp[i + 1][j] : 0)) % M +
                    ((j > 0 ? dp[i][j - 1] : 0) + (j < n - 1 ? dp[i][j + 1] : 0)) % M
                ) % M;
            }
        }
        dp = temp;
    }

    return count;
};