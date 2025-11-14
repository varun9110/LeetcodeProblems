/**
 * 2536. Increment Submatrices by One
 * Difficulty: Medium
 * 
 * You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.

You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:

Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for all row1i <= x <= row2i and col1i <= y <= col2i.
Return the matrix mat after performing every query.

 

Example 1:


Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).
Example 2:


Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
- In the first query we add 1 to every element in the matrix.
 

Constraints:
1 <= n <= 500
1 <= queries.length <= 104
0 <= row1i <= row2i < n
0 <= col1i <= col2i < n
 */

/**
 * Intuition
We can use a technique called 2D Difference Array (2D inverse Prefix Sum)

Which allows us to:
Mark the boundaries of each update in O(1) time per query
image.png

image.png

Reconstruct the final matrix in O(n 
2
 ) time using a single pass
anigif.gif

This reduces the overall complexity to O(q+n 
2
 ).

The 2D Difference Array Concept
The key insight is similar to 1D difference arrays, but extended to 2D:

In 1D, to add a value to range [l,r]:

Add the value at position l
Subtract the value at position r+1
Then compute prefix sums to get the final array
In 2D, to add a value to rectangle [row1,col1] to [row2,col2]:

Add +1 at (row1,col1) (top-left corner)
Add −1 at (row2+1,col1) (below bottom-left)
Add −1 at (row1,col2+1) (right of top-right)
Add +1 at (row2+1,col2+1) (diagonal from bottom-right)
This marks the boundaries using the inclusion-exclusion principle.

For a query updating rectangle from (row1,col1) to (row2,col2):

diff[row1][col1]
diff[row2+1][col1]
diff[row1][col2+1]
diff[row2+1][col2+1]
​
  
+=1
−=1
−=1
+=1
​
 
To reconstruct the final matrix, we compute 2D prefix sums:

mat[i][j]=diff[i][j]+mat[i−1][j]+mat[i][j−1]−mat[i−1][j−1]
​
 
The inclusion-exclusion principle ensures we don't double-count the diagonal cell.

Algorithm
Create a (n+1)×(n+1) diffarray
For each query [row1,col1,row2,col2]:
Mark rectangle boundaries:
diff[row1][col1]
diff[row2+1][col1]
diff[row1][col2+1]
diff[row2+1][col2+1]
​
  
+=1
−=1
−=1
+=1
​
 
These four updates encode the rectangle boundaries using inclusion-exclusion.

Reconstruct result:
For each cell (i,j):
mat[i][j]=diff[i][j]+ 
ABOVE
mat[i−1][j]
​
 
​
 + 
LEFT
mat[i][j−1]
​
 
​
 − 
TOPLEFT-DIAG
mat[i−1][j−1]
​
 
​
 
​
 
Where we treat out-of-bounds indices as 0.

This accumulates all updates affecting cell (i,j).

Finally, return the matrix mat with all queries applied.

Time Complexity: O(q+n 
2
 )
Space Complexity: O(n 
2
 )
 */

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function(n, queries) {
    let diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    
    for (let [r1, c1, r2, c2] of queries) {
        diff[r1][c1]++;
        diff[r2 + 1][c1]--;
        diff[r1][c2 + 1]--;
        diff[r2 + 1][c2 + 1]++;
    }
    
    let mat = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const above = mat[i - 1]?.[j] ?? 0;
            const left = mat[i]?.[j - 1] ?? 0;
            const diag = mat[i - 1]?.[j - 1] ?? 0;
            mat[i][j] = diff[i][j] + above + left - diag;
        }
    }
    
    return mat;
};