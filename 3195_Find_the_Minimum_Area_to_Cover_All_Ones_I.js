/**
 * 3195. Find the Minimum Area to Cover All Ones I
 * Difficulty: Medium
 * 
 * You are given a 2D binary array grid. Find a rectangle with horizontal and vertical sides with the smallest area, such that all the 1's in grid lie inside this rectangle.

Return the minimum possible area of the rectangle.

Example 1:
Input: grid = [[0,1,0],[1,0,1]]
Output: 6
Explanation:
The smallest rectangle has a height of 2 and a width of 3, so it has an area of 2 * 3 = 6.

Example 2:
Input: grid = [[1,0],[0,0]]
Output: 1
Explanation:
The smallest rectangle has both height and width 1, so its area is 1 * 1 = 1.

Constraints:
1 <= grid.length, grid[i].length <= 1000
grid[i][j] is either 0 or 1.
The input is generated such that there is at least one 1 in grid.
 */


/**
 * Intuition
The goal is to find the smallest rectangle that covers all the 1’s in the grid.

When we think about it, such a rectangle is completely determined by:

The topmost row that contains a 1.
The bottommost row that contains a 1.
The leftmost column that contains a 1.
The rightmost column that contains a 1.
Once we know these boundaries, the rectangle is fixed, and its area is simply:

height × width = (maxRow - minRow + 1) × (maxCol - minCol + 1)
Approach
Initialize boundaries
Set minRow to the maximum possible row index (start with grid.length).
Set maxRow to -1.
Set minCol to the maximum possible column index (start with grid[0].length).
Set maxCol to -1.
Traverse the grid
For every cell (i, j) in the grid:
If grid[i][j] == 1:
Update minRow = min(minRow, i)
Update maxRow = max(maxRow, i)
Update minCol = min(minCol, j)
Update maxCol = max(maxCol, j)
Compute dimensions
Height = (maxRow - minRow + 1)
Width = (maxCol - minCol + 1)
Return area
Area = height × width
Complexity
Time complexity: O (rows*column)
Space complexity: O (1)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumArea = function(grid) {
    let m = grid.length, n = grid[0].length;
    let minRow = m, maxRow = -1;
    let minCol = n, maxCol = -1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                minRow = Math.min(minRow, i);
                maxRow = Math.max(maxRow, i);
                minCol = Math.min(minCol, j);
                maxCol = Math.max(maxCol, j);
            }
        }
    }
    return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};