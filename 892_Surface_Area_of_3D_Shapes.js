/**
 * 892. Surface Area of 3D Shapes
 * Difficulty: Easy
 * 
 * You are given an n x n grid where you have placed some 1 x 1 x 1 cubes. Each value v = grid[i][j] represents a tower of v cubes placed on top of cell (i, j).
After placing these cubes, you have decided to glue any directly adjacent cubes to each other, forming several irregular 3D shapes.
Return the total surface area of the resulting shapes.
Note: The bottom face of each shape counts toward its surface area.
Example 1:
Input: grid = [[1,2],[3,4]]
Output: 34
Example 2:
Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
Output: 32
Example 3:
Input: grid = [[2,2,2],[2,1,2],[2,2,2]]
Output: 46

Constraints:
n == grid.length == grid[i].length
1 <= n <= 50
0 <= grid[i][j] <= 50
*/

/**
 * Appraoch 1:
 * calculate the top and botton surface area first.
 * then calculate the outer walls area.
 *
 * then the overlapping height area.
 */

var surfaceArea = function (grid) {
  let rows = grid.length;
  let columns = grid[0].length;

  //calculating the top and bottom
  let result = 2 * rows * columns;

  //calculating the outer sides
  let i = 0;
  let k = columns - 1;
  for (let j = 0; j < columns; j++) {
    result += grid[i][j];
    result += grid[j][i];
    result += grid[k][j];
    result += grid[j][k];
  }

  for (let m = 0; m < rows; m++) {
    for (let n = 0; n < columns; n++) {
      if (n + 1 < columns) {
        result += Math.abs(grid[m][n] - grid[m][n + 1]);
      }
      if (n + 1 < rows) {
        result += Math.abs(grid[n][m] - grid[n + 1][m]);
      }

      if (grid[m][n] === 0) {
        result -= 2;
      }
    }
  }
  return result;
};

/**
 * Approach 2:
 * Consider each item as a wall. calculate the surface area of the wall. then subtract the overlapping surface area.
 *
 */

var surfaceArea = function (grid) {
  let area = 0;
  for (let i in grid) {
    for (let j in grid) {
      if (grid[i][j]) {
        area += grid[i][j] * 4 + 2;
        if (i > 0) area -= 2 * Math.min(grid[i][j], grid[i - 1][j]);
        if (j > 0) area -= 2 * Math.min(grid[i][j], grid[i][j - 1]);
      }
    }
  }
  return area;
};
