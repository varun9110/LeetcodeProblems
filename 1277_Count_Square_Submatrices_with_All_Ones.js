/**
 * 1277. Count Square Submatrices with All Ones
 * Difficulty: Medium
 * 
 * Given a m * n matrix of ones and zeros, return how many square submatrices have all ones.

 

Example 1:

Input: matrix =
[
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
Output: 15
Explanation: 
There are 10 squares of side 1.
There are 4 squares of side 2.
There is  1 square of side 3.
Total number of squares = 10 + 4 + 1 = 15.
Example 2:

Input: matrix = 
[
  [1,0,1],
  [1,1,0],
  [1,1,0]
]
Output: 7
Explanation: 
There are 6 squares of side 1.  
There is 1 square of side 2. 
Total number of squares = 6 + 1 = 7.
 

Constraints:

1 <= arr.length <= 300
1 <= arr[0].length <= 300
0 <= arr[i][j] <= 1
 */


/**
 * Complexity
Time complexity: O(n * m)

Space complexity: O(n * m)

Explanation Step by Step
Purpose of the Algorithm
This code counts the total number of square submatrices that contain only 1's in a given binary matrix.
Initialization Steps
// Matrix dimensions
int n = matrix.size();    // rows
int m = matrix[0].size(); // columns
// Create DP table
vector<vector<int>> dp(n, vector<int>(m, 0));
int ans = 0;
Base Cases Setup
First column initialization:
for (int i = 0; i < n; i++) {
    dp[i][0] = matrix[i][0];
    ans += dp[i][0];
}
First row initialization:
for (int j = 1; j < m; j++) {
    dp[0][j] = matrix[0][j];
    ans += dp[0][j];
}
Main DP Logic
For each cell (i,j), if matrix[i][j] = 1:
Look at three adjacent cells: left, top, and diagonal top-left
Take minimum of these three values and add 1
This gives the size of the largest square possible at current position
dp[i][j] = 1 + min({dp[i][j-1], dp[i-1][j], dp[i-1][j-1]});
Why This Works
dp[i][j] represents the size of the largest square submatrix ending at position (i,j)
If any of the three adjacent positions has a smaller value, we can't form a larger square
Adding 1 accounts for the current cell itself
Example For matrix:
1 1 1
1 1 1
1 1 1
The DP table becomes:

1 1 1
1 2 2
1 2 3
Where each number represents the size of the largest square possible at that position.

Final Answer
The sum of all values in the DP table gives the total count of all possible squares
Each value in dp[i][j] contributes to that many squares ending at position (i,j)
 */



/**
 * @param {number[][]} matrix
 * @return {number}
 */
function countSquares(matrix) {
    // Get dimensions of the matrix
    const n = matrix.length;    // number of rows
    const m = matrix[0].length; // number of columns
    
    // Create a DP table with same dimensions as matrix
    const dp = Array(n).fill().map(() => Array(m).fill(0));
    
    // Variable to store total count of squares
    let ans = 0;
    
    // Initialize first column of DP table
    for (let i = 0; i < n; i++) {
        dp[i][0] = matrix[i][0];
        ans += dp[i][0];
    }
    
    // Initialize first row of DP table
    for (let j = 1; j < m; j++) {
        dp[0][j] = matrix[0][j];
        ans += dp[0][j];
    }
    
    // Fill the DP table for remaining cells
    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            if (matrix[i][j] === 1) {
                dp[i][j] = 1 + Math.min(
                    dp[i][j-1],
                    dp[i-1][j],
                    dp[i-1][j-1]
                );
            }
            ans += dp[i][j];
        }
    }
    
    return ans;
}