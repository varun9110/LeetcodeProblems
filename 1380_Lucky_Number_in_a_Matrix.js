/**
 * 1380. Lucky Numbers in a Matrix
 * Difficulty: Easy
 * 
 * Given an m x n matrix of distinct numbers, return all lucky numbers in the matrix in any order.
A lucky number is an element of the matrix such that it is the minimum element in its row and maximum in its column.

Example 1:
Input: matrix = [[3,7,8],[9,11,13],[15,16,17]]
Output: [15]
Explanation: 15 is the only lucky number since it is the minimum in its row and the maximum in its column.
Example 2:

Input: matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
Output: [12]
Explanation: 12 is the only lucky number since it is the minimum in its row and the maximum in its column.
Example 3:

Input: matrix = [[7,8],[1,2]]
Output: [7]
Explanation: 7 is the only lucky number since it is the minimum in its row and the maximum in its column.
 

Constraints:

m == mat.length
n == mat[i].length
1 <= n, m <= 50
1 <= matrix[i][j] <= 105.
All elements in the matrix are distinct.
 */

var luckyNumbers = function(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    
    let row_minimums = new Array(rows).fill(Infinity);
    let col_maximums = new Array(cols).fill(0);
    
    for (let row_ind = 0; row_ind < rows; ++row_ind) {
        for (let col_ind = 0; col_ind < cols; ++col_ind) {
            let el = matrix[row_ind][col_ind];
            row_minimums[row_ind] = Math.min(row_minimums[row_ind], el);
            col_maximums[col_ind] = Math.max(col_maximums[col_ind], el);
        }
    }
    
    for (let row_ind = 0; row_ind < rows; ++row_ind) {
        for (let col_ind = 0; col_ind < cols; ++col_ind) {
            let el = matrix[row_ind][col_ind];
            if (el == row_minimums[row_ind] && el == col_maximums[col_ind]) {
                return [el];
            }
        }
    }
    
    return [];
};