/**
 * 883. Projection Area of 3D Shapes
 * Difficulty: Easy,
 * 
 * You are given an n x n grid where we place some 1 x 1 x 1 cubes that are axis-aligned with the x, y, and z axes.

Each value v = grid[i][j] represents a tower of v cubes placed on top of the cell (i, j).

We view the projection of these cubes onto the xy, yz, and zx planes.
A projection is like a shadow, that maps our 3-dimensional figure to a 2-dimensional plane. We are viewing the "shadow" when looking at the cubes from the top, the front, and the side.
Return the total area of all three projections.

Example 1:
Input: grid = [[1,2],[3,4]]
Output: 17
Explanation: Here are the three projections ("shadows") of the shape made with each axis-aligned plane.
Example 2:
Input: grid = [[2]]
Output: 5
Example 3:
Input: grid = [[1,0],[0,2]]
Output: 8

Constraints:
n == grid.length == grid[i].length
1 <= n <= 50
0 <= grid[i][j] <= 50
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function (grid) {
  let XY = 0;
  let YX = 0;
  let YZ = 0;
  const YZ_ARR = new Array(grid.length).fill(0);

  for (let i = 0; i < grid.length; i++) {
    let curMax = 0; // XY
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j]) XY++; // XY
      curMax = Math.max(grid[i][j], curMax); // YX
      YZ_ARR[j] = Math.max(grid[i][j], YZ_ARR[j]); // YZ
    }
    YX += curMax;
  }
  for (let i = 0; i < YZ_ARR.length; i++) YZ += YZ_ARR[i]; // YZ

  return YZ + YX + XY;
};