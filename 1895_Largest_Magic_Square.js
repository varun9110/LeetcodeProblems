/**
 * 1895. Largest Magic Square
 * Difficulty: Medium
 * 
 * A k x k magic square is a k x k grid filled with integers such that every row sum, every column sum, and both diagonal sums are all equal. The integers in the magic square do not have to be distinct. Every 1 x 1 grid is trivially a magic square.

Given an m x n integer grid, return the size (i.e., the side length k) of the largest magic square that can be found within this grid.

 

Example 1:


Input: grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
Output: 3
Explanation: The largest magic square has a size of 3.
Every row sum, column sum, and diagonal sum of this magic square is equal to 12.
- Row sums: 5+1+6 = 5+4+3 = 2+7+3 = 12
- Column sums: 5+5+2 = 1+4+7 = 6+3+3 = 12
- Diagonal sums: 5+4+3 = 6+4+2 = 12
Example 2:


Input: grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
Output: 2
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 50
1 <= grid[i][j] <= 106
 */

/**
 * Approach
I calculate row prefix sums and column prefix sums

This helps me get any row or column sum in O(1)
I try all possible square sizes k

From min(m, n) down to 2
Bigger square first because I want the largest answer
For every top-left position of a k × k square:

I calculate the target sum using the first row

I check:

All rows
All columns
Main diagonal
Anti-diagonal
If all sums match, I immediately return k

If nothing works, I return 1
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestMagicSquare = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const row = Array.from({ length: m }, () => Array(n + 1).fill(0));
    const col = Array.from({ length: m + 1 }, () => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            row[i][j + 1] = row[i][j] + grid[i][j];
            col[i + 1][j] = col[i][j] + grid[i][j];
        }
    }

    for (let k = Math.min(m, n); k >= 2; k--) {
        for (let i = 0; i + k <= m; i++) {
            for (let j = 0; j + k <= n; j++) {

                let target = row[i][j + k] - row[i][j];
                let ok = true;

                for (let r = i; r < i + k && ok; r++)
                    if (row[r][j + k] - row[r][j] !== target)
                        ok = false;

                for (let c = j; c < j + k && ok; c++)
                    if (col[i + k][c] - col[i][c] !== target)
                        ok = false;

                let d1 = 0, d2 = 0;
                for (let x = 0; x < k; x++) {
                    d1 += grid[i + x][j + x];
                    d2 += grid[i + x][j + k - 1 - x];
                }

                if (ok && d1 === target && d2 === target)
                    return k;
            }
        }
    }
    return 1;
};