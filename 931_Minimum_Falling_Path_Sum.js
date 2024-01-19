/**
 * 931. Minimum Falling Path Sum
 * Difficulty: Medium
 * 
 * Given an n x n array of integers matrix, return the minimum sum of any falling path through matrix.
A falling path starts at any element in the first row and chooses the element in the next row that is either 
directly below or diagonally left/right. Specifically, the next element from position (row, col) will be (row + 1, col - 1), 
(row + 1, col), or (row + 1, col + 1).
Example 1:
Input: matrix = [[2,1,3],[6,5,4],[7,8,9]]
Output: 13
Explanation: There are two falling paths with a minimum sum as shown.
Example 2:
Input: matrix = [[-19,57],[-40,-5]]
Output: -59
Explanation: The falling path with a minimum sum is shown.

Constraints:
n == matrix.length == matrix[i].length
1 <= n <= 100
-100 <= matrix[i][j] <= 100
 */

/**
 * Approach:
 * recurssion. trace each path and see which value is minimun and then return that
 */

var checkBelow = function(row, column, sum, matrix){
    if(row+1 === matrix.length){
        return (sum + matrix[row][column]);
    }
    let sum1 = sum + matrix[row][column];
    let finalSum = checkBelow(row+1, column, sum1, matrix);
    if(column-1 >= 0){
        let columnMinus1 =  checkBelow(row+1, column-1, sum1, matrix);
        finalSum = Math.min(finalSum, columnMinus1);
    }
    if(column+1 < matrix.length){
        let columnPlus1 = checkBelow(row+1, column+1, sum1, matrix);
        finalSum = Math.min(finalSum, columnPlus1);
    }
    return finalSum;
};

var minFallingPathSum = function(matrix) {
    let min = checkBelow(0, 0, 0, matrix);
    for(let i=1; i<matrix.length; i++){
        min = Math.min(min, checkBelow(0, i, 0, matrix));
    }
    return min;
    
};

/**
 * Refined approach:
 * Approach
1. Dynamic Programming Table:

A 2D DP table dp of the same size as the matrix is created to store the minimum falling path sums for each cell.
2. Base Case Initialization:

The first row of dp is filled with the corresponding values from the matrix's first row, as these are the initial path sums.
3. Iterative Calculation:

The code iterates through each cell from the second row to the last row:
For each cell, it considers three possible paths from the previous row:
Directly above (up), diagonally up-left (ld), and diagonally up-right (rd).
It calculates the minimum sum for the current cell by adding the current cell's value to the minimum of these three paths.
4. Final Result:

After filling the dp table, the code finds the minimum value in the last row, representing the minimum falling path sum ending at any cell in the bottom row.
Time Complexity:

O(N * M), where N is the number of rows and M is the number of columns in the matrix.
The nested loops iterate through each cell once.
Space Complexity:

O(N * M)
The DP table dp uses additional space proportional to the size of the matrix.
 */

var minFallingPathSum = function(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;
    const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));

    for (let j = 0; j < m; j++) {
        dp[0][j] = matrix[0][j];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let ld = Infinity, rd = Infinity;
            const up = matrix[i][j] + dp[i - 1][j];

            if (j - 1 >= 0) {
                ld = matrix[i][j] + dp[i - 1][j - 1];
            }
            if (j + 1 < m) {
                rd = matrix[i][j] + dp[i - 1][j + 1];
            }

            dp[i][j] = Math.min(up, Math.min(ld, rd));
        }
    }

    let mini = dp[n - 1][0];
    for (let j = 1; j < m; j++) {
        mini = Math.min(mini, dp[n - 1][j]);
    }
    return mini;
}


/**
 * Or below approach:
 */

var minFallingPathSum = function(matrix) {
    const n = matrix.length-1;
    const dp = initDp(n);
    dp[0] = matrix[0]
    for(let i=1;i<=n;i++){
    for(let j=0;j<=n;j++){
           
                const left = matrix[i][j] + dp[i-1][j-1] || Number.POSITIVE_INFINITY;
                const right = matrix[i][j] +dp[i-1][j+1]|| Number.POSITIVE_INFINITY;
                const center = matrix[i][j] + dp[i-1][j];
               dp[i][j] =  Math.min(left,right,center);
       }
    
    }
    return Math.min(...dp[n]);
};
const initDp = (n) => {
    const dp = [];
    for(let i=0;i<=n;i++){
        dp[i] = [];
        for(let j=0;j<=n;j++){
            dp[i][j] = Number.POSITIVE_INFINITY;;
        }
    }
    return dp;
}
const minPath = (i,j,n,mat,dp)=>{
    if(j<0 || j>n || i<0 || i>n){
        return Number.POSITIVE_INFINITY;
    }else if(dp[i][j] != -1){
        return dp[i][j];
    } 
     else if(i==n){
        dp[i][j] = mat[i][j];
         return dp[i][j];
    } else {
        dp[i][j] = mat[i][j] + Math.min(minPath(i+1,j,n,mat,dp),minPath(i+1,j-1,n,mat,dp),
        minPath(i+1,j+1,n,mat,dp));
        return dp[i][j];
    }

}