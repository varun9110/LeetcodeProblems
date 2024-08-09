/**
 * 840. Magic Squares In Grid
 * Difficulty: Medium
 * 
 * A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, 
 * and both diagonals all have the same sum.

Given a row x col grid of integers, how many 3 x 3 contiguous magic square subgrids are there?
Note: while a magic square can only contain numbers from 1 to 9, grid may contain numbers up to 15.

Example 1:
Input: grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
Output: 1
Explanation: 
The following subgrid is a 3 x 3 magic square:
while this one is not:
In total, there is only one magic square inside the given grid.
Example 2:

Input: grid = [[8]]
Output: 0

Constraints:
row == grid.length
col == grid[i].length
1 <= row, col <= 10
0 <= grid[i][j] <= 15
 */

/**
 * Approach 1
Intuition
The key to solving this problem lies in understanding the definition of a magic square and then devising an efficient algorithm to identify such squares within the given grid.

The intuition is to manually scan through the grid, examining each possible 3x3 subarray and checking if it satisfies the criteria of a magic square. This approach is straightforward and easy to understand, as it involves iterating through the grid, performing the necessary checks, and keeping track of the count of valid magic squares.

The main idea is to use the properties of a magic square, such as the requirement for distinct integers from 1 to 9, and the equality of the sums of rows, columns, and diagonals, to determine if a given 3x3 subarray is a valid magic square.

Approach
The approach taken in this solution can be divided into the following steps:

Grid Traversal:

The outer loop iterates through the rows of the input grid, starting from the first row (index 0) and ending at the third-to-last row (index rows - 3).
The inner loop iterates through the columns of the input grid, starting from the first column (index 0) and ending at the third-to-last column (index cols - 3).
This ensures that for each iteration, the code can consider a 3x3 subarray of the grid, starting from the current row and column.
Magic Square Validation:

For each 3x3 subarray, the code calls the isValidMagicSquare helper function to determine if the subarray is a valid magic square.

The isValidMagicSquare function performs the following steps:

a. Presence Tracking:

It creates a boolean array numPresence of size 10 (from index 1 to 9) to keep track of the presence of each number from 1 to 9 within the 3x3 subarray.
This array is initialized with false values, indicating that no numbers have been seen yet.
b. Element Checks:

The function then iterates through the 3x3 subarray, accessing each element num at the corresponding row and column indices.
For each num, it checks if the value is within the valid range of 1 to 9. If the value is outside this range, the function immediately returns false, 
as a magic square can only contain integers from 1 to 9.
Next, it checks if the numPresence array already has true at the index corresponding to num. If so, it means that the number has been seen before, 
and the 3x3 subarray cannot be a valid magic square, so the function returns false.
If the number is within the valid range and has not been seen before, the function sets the corresponding index in the numPresence array to true.
c. Row and Column Sums:

After checking the individual elements, the function calculates the sums of the three rows, three columns, and the two diagonals of the 3x3 subarray.
It starts by calculating the sum of the first row, which will be used as the target sum for the rest of the checks.
Then, it calculates the sums of the other two rows and checks if they are equal to the target sum. If any of the row sums are different, the function returns false.
Next, it calculates the sums of the three columns and checks if they are all equal to the target sum. If any of the column sums are different, 
the function returns false.
d. Diagonal Sums:

Finally, the function calculates the sums of the two diagonals of the 3x3 subarray and checks if they are both equal to the target sum.
If the diagonal sums are not equal to the target sum, the function returns false.
e. Return Value:

If all the checks pass (i.e., the elements are distinct, within the valid range, and the row, column, and diagonal sums are all equal), 
the function returns true, indicating that the 3x3 subarray is a valid magic square.
Result Accumulation:

After calling the isValidMagicSquare function for a 3x3 subarray, the outer loop checks the return value.
If the function returns true, it means that the 3x3 subarray is a valid magic square, so the count variable is incremented.
Final Result:

After the entire grid has been traversed and all the 3x3 subarrays have been checked, the final value of the count variable is returned as the output, 
representing the total number of valid 3x3 contiguous magic square subgrids within the given grid.
Complexity
Time Complexity: O(rows * cols)
The time complexity of this solution is O(rows * cols), where rows and cols are the dimensions of the input grid. 
This is because the code iterates through each possible 3x3 subarray, which involves a nested loop over the rows and columns of the grid.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function (grid) {
    let count = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    for (let i = 0; i <= rows - 3; i++) {
        for (let j = 0; j <= cols - 3; j++) {
            if (isValidMagicSquare(grid, i, j)) {
                count++;
            }
        }
    }

    return count;
};

/**
 * @param {number[][]} grid
 * @param {number} startRow
 * @param {number} startCol
 * @return {boolean}
 */
function isValidMagicSquare(grid, startRow, startCol) {
    // Create a boolean array to track the presence of each number (1-9)
    const numPresence = new Array(10).fill(false);

    // Check each element in the 3x3 subgrid
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            const num = grid[i][j];
            if (num < 1 || num > 9 || numPresence[num]) {
                return false;
            }
            numPresence[num] = true;
        }
    }

    // Check if the sums of rows, columns, and diagonals are equal
    const targetSum = grid[startRow][startCol] + grid[startRow][startCol + 1] + grid[startRow][startCol + 2];
    for (let i = 0; i < 3; i++) {
        if (getRowSum(grid, startRow + i, startCol) !== targetSum ||
            getColSum(grid, startRow, startCol + i) !== targetSum) {
            return false;
        }
    }

    const diagonalSum1 = grid[startRow][startCol] + grid[startRow + 1][startCol + 1] + grid[startRow + 2][startCol + 2];
    const diagonalSum2 = grid[startRow + 2][startCol] + grid[startRow + 1][startCol + 1] + grid[startRow][startCol + 2];
    return diagonalSum1 === targetSum && diagonalSum2 === targetSum;
}

/**
 * @param {number[][]} grid
 * @param {number} row
 * @param {number} startCol
 * @return {number}
 */
function getRowSum(grid, row, startCol) {
    return grid[row][startCol] + grid[row][startCol + 1] + grid[row][startCol + 2];
}

/**
 * @param {number[][]} grid
 * @param {number} startRow
 * @param {number} col
 * @return {number}
 */
function getColSum(grid, startRow, col) {
    return grid[startRow][col] + grid[startRow + 1][col] + grid[startRow + 2][col];
}