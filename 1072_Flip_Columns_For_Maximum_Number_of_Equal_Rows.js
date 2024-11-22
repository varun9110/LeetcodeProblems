/**
 * 1072. Flip Columns For Maximum Number of Equal Rows
 * Difficulty: Medium
 * 
 * You are given an m x n binary matrix matrix.
You can choose any number of columns in the matrix and flip every cell in that column (i.e., Change the value of the cell from 0 to 1 or vice versa).
Return the maximum number of rows that have all values equal after some number of flips.


Example 1:

Input: matrix = [[0,1],[1,1]]
Output: 1
Explanation: After flipping no values, 1 row has all values equal.
Example 2:

Input: matrix = [[0,1],[1,0]]
Output: 2
Explanation: After flipping values in the first column, both rows have equal values.
Example 3:

Input: matrix = [[0,0,0],[0,0,1],[1,1,0]]
Output: 2
Explanation: After flipping values in the first two columns, the last two rows have equal values.
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 300
matrix[i][j] is either 0 or 1.
 */

/**
 * Intuition
When we can flip any column, two rows can become equal if they are either:
Identical
Complete opposites (0s and 1s swapped)
Key to recogize pattern

For example:

1 0 1 0
0 1 0 1
1 1 0 0
0 0 1 1
Before you write instructions for a program...

what would you do?
Grouping Similar Patterns
Group 1 (same pattern):
1 0 1 0 > > convert > > 0 1 0 1
0 1 0 1 > > convert > > 0 1 0 1

Group 2 (different pattern):
1 1 0 0 > > convert > > 0 0 1 1
0 0 1 1 > > convert > > 0 0 1 1
Group 1: These rows are flipped versions of each other and can become equal by flipping certain columns
Pattern Matching
Type A: 1 0 1 0 ↔ 0 1 0 1 (complementary pairs)
Type B: 1 1 0 0 ↔ 0 0 1 1 (complementary pairs)
Time to...

Converting
Group 1:
1 0 1 0    →    1 1 1 0    →    1 1 1 1
0 1 0 1    →    0 1 0 1    →    0 1 0 1
           flip col 2        flip col 4
Last step...

Counting
Normalized Patterns → Count
(0,1,0,1) → 2 rows
(0,0,1,1) → 2 rows

Maximum = 2 (result)

 */

var maxEqualRowsAfterFlips = function(matrix) {
    const patFreq = new Map();
    
    for (const row of matrix) {
        const pattern = row[0] === 0 
            ? row.join('')
            : row.map(bit => bit ^ 1).join('');
            
        patFreq.set(pattern, (patFreq.get(pattern) || 0) + 1);
    }
    
    return Math.max(...patFreq.values());
};