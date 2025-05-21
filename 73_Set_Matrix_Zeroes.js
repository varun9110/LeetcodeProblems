/**
 * 73. Set Matrix Zeroes
 * Difficulty: Medium
 * 
 * Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

Example 1:
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
Example 2:
Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]


Constraints:
m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-231 <= matrix[i][j] <= 231 - 1

Follow up:
A straightforward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?
 */

/**
 * Intuition
The problem asks us to set entire rows and columns to 0 if any element in them is 0. Our first thought is that setting elements to 0 immediately as we find them would incorrectly affect other elements. 
So, we need to first record the positions of zeros and then do the zeroing operation.

Approach
Traverse the matrix once and collect all the row indices and column indices where zeros are located.
Traverse the matrix again, and if the current cell is in a row or column that had a zero, set it to 0.
Return the modified matrix.
Complexity
Time complexity: O(m×n) — where (m) is the number of rows and (n) is the number of columns.
Space complexity: O(m+n) — space used by the two sets to store row and column indices.
 */

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const R = new Set();
   const C = new Set();

   for (let i = 0; i < matrix.length; i++) {
       for (let j = 0; j < matrix[0].length; j++) {
           if (matrix[i][j] === 0) {
               R.add(i);
               C.add(j);
           }
       }
   }

   for (let i = 0; i < matrix.length; i++) {
       for (let j = 0; j < matrix[0].length; j++) {
           if (R.has(i) || C.has(j)) {
               matrix[i][j] = 0;
           }
       }
   }

   return matrix;
};