/**
 * 2133. Check if Every Row and Column Contains All Numbers
 * An n x n matrix is valid if every row and every column contains all the integers from 1 to n (inclusive).
Given an n x n integer matrix matrix, return true if the matrix is valid. Otherwise, return false.

Example 1:
Input: matrix = [[1,2,3],[3,1,2],[2,3,1]]
Output: true
Explanation: In this case, n = 3, and every row and column contains the numbers 1, 2, and 3.
Hence, we return true.
Example 2:
Input: matrix = [[1,1,1],[1,2,3],[1,2,3]]
Output: false
Explanation: In this case, n = 3, but the first row and the first column do not contain the numbers 2 or 3.
Hence, we return false.
Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 100
1 <= matrix[i][j] <= n
 */

/**
 * Approach:
 * The question is to check in both rows and columns for all the numbers
 * so we can create sets in this case and check for the size of the set.
 * first store all the rows and check if the size of the set is equal to the length. if not then return false
 * next check for all columns if the size is equal to the length, if not then return false
 */

var checkValid = function(matrix) {
    let R = matrix.length;                                               // row & column count
    let C = matrix[0].length;
    for (let i = 0; i < R; i++) {
        let set = new Set();
        for (let j = 0; j < C; j++) set.add(matrix[i][j]);               // add all the integers to a set
        if (set.size !== C) return false;                             // C integers this row?
    }

    for (let j = 0; j < C; j++) {
        let set = new Set();
        for (let i = 0; i < R; i++) set.add(matrix[i][j]);               // add all the integers to a set
        if (set.size !== R) return false;                             // R integers this column?
    }

    return true;
};

/**
 * Little refined code but same approach, in this we check in the same iteration for both row and column
 */

var checkValid = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let rnums = new Set();
  let cnums = new Set();
  for (let i = 0; i < m; i++) {
    rnums.clear();
    cnums.clear();
    for (let j = 0; j < n; j++) {
      cnums.add(mat[i][j]);
      rnums.add(mat[j][i]);
    }
    if (rnums.size !== m) return false;
    if (cnums.size !== n) return false;
  }

  return true;
};