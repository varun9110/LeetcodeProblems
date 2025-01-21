/**
 * 2017. Grid Game
 * Difficulty: Medium
 * 
 * You are given a 0-indexed 2D array grid of size 2 x n, where grid[r][c] represents the number of points at position (r, c) on the matrix. 
 * Two robots are playing a game on this matrix.

Both robots initially start at (0, 0) and want to reach (1, n-1). Each robot may only move to the right ((r, c) to (r, c + 1)) or down ((r, c) to (r + 1, c)).

At the start of the game, the first robot moves from (0, 0) to (1, n-1), collecting all the points from the cells on its path. For all cells (r, c) 
traversed on the path, grid[r][c] is set to 0. Then, the second robot moves from (0, 0) to (1, n-1), collecting the points on its path. Note that their 
paths may intersect with one another.

The first robot wants to minimize the number of points collected by the second robot. In contrast, the second robot wants to maximize the number of points it collects. 
If both robots play optimally, return the number of points collected by the second robot.

 

Example 1:


Input: grid = [[2,5,4],[1,5,1]]
Output: 4
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 0 + 4 + 0 = 4 points.
Example 2:


Input: grid = [[3,3,1],[8,5,2]]
Output: 4
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 3 + 1 + 0 = 4 points.
Example 3:


Input: grid = [[1,3,1,15],[1,3,3,1]]
Output: 7
Explanation: The optimal path taken by the first robot is shown in red, and the optimal path taken by the second robot is shown in blue.
The cells visited by the first robot are set to 0.
The second robot will collect 0 + 1 + 3 + 3 + 0 = 7 points.
 

Constraints:

grid.length == 2
n == grid[r].length
1 <= n <= 5 * 104
1 <= grid[r][c] <= 105
 */

/**
 * Key Takeways from the problem statement:

Robots can move down only once as they can move down and right and there are only 2 rows
First Robot doesn't necessarily has to get the maximum sum, it has to minimise the second robot's sum
Process

As the robots have to reach the second row at the end so there has to be a down step from any of the first row cells, so we need to find the most optimum point to move down for the first robot
For achieving the above we need to get the future sum from each point going from right to left for 2nd row (as this is what we will travel to reach the right bottom corner) and left to right for 1st row ( as we have travelled this much)
Then for finding the most optimum solution we need to find the index where we get the local maxima but global minima of the second robot's value
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var gridGame = function(grid) {
    
    let cols = grid[0].length, ans = Infinity;
    let res = Array(2).fill().map(_=>Array(cols).fill(0));
    
    //PREFIX SUM FROM FROM LEFT TO RIGHT FOR 2ND ROW
    for(let j = 0;j<cols;j++)
        res[1][j] = j - 1 >=0 ? res[1][j - 1] + grid[1][j] : grid[1][j];
      
    //PREFIX SUM FROM FROM RIGHT TO LEFT FOR 1ST ROW
    for(let j = cols - 1;j >=0 ;j--)
        res[0][j] = j + 1 < cols ? res[0][j + 1] + grid[0][j] : grid[0][j];
    
    for(let j = 0;j<cols;j++){
        let rightTop = j+1 < cols ? res[0][j + 1] : 0
        let leftBottom = j-1 >= 0 ? res[1][j-1] : 0
        ans = Math.min(Math.max(rightTop, leftBottom), ans);
    }

    return ans
};