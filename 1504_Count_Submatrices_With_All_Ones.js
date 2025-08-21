/**
 * 1504. Count Submatrices With All Ones
 * Difficulty: Medium
 * 
 * Given an m x n binary matrix mat, return the number of submatrices that have all ones.

 

Example 1:


Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
Output: 13
Explanation: 
There are 6 rectangles of side 1x1.
There are 2 rectangles of side 1x2.
There are 3 rectangles of side 2x1.
There is 1 rectangle of side 2x2. 
There is 1 rectangle of side 3x1.
Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.
Example 2:


Input: mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
Output: 24
Explanation: 
There are 8 rectangles of side 1x1.
There are 5 rectangles of side 1x2.
There are 2 rectangles of side 1x3. 
There are 4 rectangles of side 2x1.
There are 2 rectangles of side 2x2. 
There are 2 rectangles of side 3x1. 
There is 1 rectangle of side 3x2. 
Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.
 

Constraints:

1 <= m, n <= 150
mat[i][j] is either 0 or 1.
 */

/**
 * Intuition
The problem asks us to count all submatrices that consist entirely of ones. A direct way would be to check every possible submatrix, but that would be too slow.
Instead, notice that each row can be treated like the base of a histogram where the height at each column represents how many consecutive ones extend upward. For example, if a column has value 3, it means there are three continuous ones stacked vertically up to this row.
Now the task reduces to:
For each row, count the number of submatrices that end at this row.
This is equivalent to counting the number of rectangles in a histogram formed by the heights.
To do this efficiently, we use a monotonic increasing stack:

It helps maintain previous smaller heights.
For each column, we calculate how many submatrices end at this position.
By accumulating these counts, we avoid repeatedly scanning backward for minimum heights.
This reduces the complexity to O(rows × cols), making it optimal for large matrices.

Approach
Build Heights (Histogram Representation):
Traverse the matrix row by row.
For each row, update an array h where h[j] represents the number of consecutive 1s ending at column j up to the current row.
If mat[i][j] == 0, reset h[j] = 0; otherwise, increment it.
Count Submatrices per Row:
For each row (after updating h), count how many submatrices end at this row.
This reduces to counting rectangles in a histogram defined by h.
Monotonic Stack Optimization:
Use a stack to keep indices of increasing heights.
For each column i:
A). Pop from the stack until it is strictly increasing.
B). If the stack is not empty, calculate submatrices using the previous smaller element’s index.
C). Otherwise, calculate directly with h[i] * (i + 1).
Maintain an auxiliary array sum[i] that stores the total number of submatrices ending exactly at column i.
Accumulate sum[i] into the result.
Final Result:
Repeat the process for all rows and add the counts.
The sum gives the total number of submatrices with all ones.
Complexity
Time complexity: O (R∗C)
Space complexity: O (N)
 */

/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function(mat) {
    let r = mat.length, c = mat[0].length, ans = 0;
    let h = Array(c).fill(0);
    for (let i = 0; i < r; i++) {
        for (let j = 0; j < c; j++) h[j] = mat[i][j] ? h[j] + 1 : 0;
        let sum = Array(c).fill(0), st = [];
        for (let j = 0; j < c; j++) {
            while (st.length && h[st[st.length-1]] >= h[j]) st.pop();
            if (st.length) {
                let p = st[st.length-1];
                sum[j] = sum[p] + h[j] * (j - p);
            } else {
                sum[j] = h[j] * (j + 1);
            }
            st.push(j);
            ans += sum[j];
        }
    }
    return ans;
};