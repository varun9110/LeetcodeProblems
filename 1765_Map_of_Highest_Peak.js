/**
 * 1765. Map of Highest Peak
 * Difficulty: Medium
 * 
 * You are given an integer matrix isWater of size m x n that represents a map of land and water cells.

If isWater[i][j] == 0, cell (i, j) is a land cell.
If isWater[i][j] == 1, cell (i, j) is a water cell.
You must assign each cell a height in a way that follows these rules:

The height of each cell must be non-negative.
If the cell is a water cell, its height must be 0.
Any two adjacent cells must have an absolute height difference of at most 1. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).
Find an assignment of heights such that the maximum height in the matrix is maximized.

Return an integer matrix height of size m x n where height[i][j] is cell (i, j)'s height. If there are multiple solutions, return any of them.

 

Example 1:



Input: isWater = [[0,1],[0,0]]
Output: [[1,0],[2,1]]
Explanation: The image shows the assigned heights of each cell.
The blue cell is the water cell, and the green cells are the land cells.
Example 2:



Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
Output: [[1,1,0],[0,1,1],[1,2,2]]
Explanation: A height of 2 is the maximum possible height of any assignment.
Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
 

Constraints:

m == isWater.length
n == isWater[i].length
1 <= m, n <= 1000
isWater[i][j] is 0 or 1.
There is at least one water cell.
 */

/**
 * 🌟 Intuition
The goal is to assign heights to all cells in the grid such that:

Cells with water (isWater[i][j] == 1) have a height of 0.
Adjacent cells differ in height by at most 1.
The overall height values are maximized while satisfying the constraints.
This can be achieved by propagating heights across the grid in two passes, ensuring that every cell considers its neighbors both from the previous and subsequent directions.

Important Note:
The order of these passes is flexible. You could choose:

Top-to-bottom and left-to-right followed by bottom-to-top and right-to-left (used in the explanation below).
Or reverse the order: Bottom-to-top and right-to-left followed by top-to-bottom and left-to-right.
Both approaches yield the same result because we update the heights based on all neighbors in both directions.

📚 Approach
Step 1: Initialization
Create a height matrix of size R x C (same as the grid isWater).
Initialize each cell in height to a very large value, such as R + C (ensures propagation works correctly).
Set water cells (isWater[i][j] == 1) to 0, as their height is fixed.
Step 2: Propagation in Two Passes
First Pass: Top-to-Bottom and Left-to-Right
Process the grid row by row from top to bottom and column by column from left to right.
For each cell (i, j):
If the cell has a top neighbor (i > 0), update its height:
height[i][j] = min(height[i][j], height[i - 1][j] + 1)
If the cell has a left neighbor (j > 0), update its height:
height[i][j] = min(height[i][j], height[i][j - 1] + 1)
Second Pass: Bottom-to-Top and Right-to-Left
Process the grid row by row from bottom to top and column by column from right to left.
For each cell (i, j):
If the cell has a bottom neighbor (i < R - 1), update its height:
height[i][j] = min(height[i][j], height[i + 1][j] + 1)
If the cell has a right neighbor (j < C - 1), update its height:
height[i][j] = min(height[i][j], height[i][j + 1] + 1)
📝 Why the Order of Passes Doesn’t Matter
The goal of the two passes is to ensure that all neighbors (top, bottom, left, and right) influence the height of each cell.
By updating the matrix twice, every cell eventually considers all possible directions.
Whether you start with top-to-bottom/left-to-right or bottom-to-top/right-to-left doesn’t affect the final result.
⏳ Complexity
Time Complexity:

(O(R \times C)): Each cell is visited twice—once in each pass.
Space Complexity:

(O(R \times C)): For storing the height matrix.
 */

/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
var highestPeak = function(isWater) {
    const R = isWater.length;
    const C = isWater[0].length;
    const height = Array.from({ length: R }, () => Array(C).fill(Number.MAX_VALUE));

    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            if (isWater[i][j] === 1) {
                height[i][j] = 0;
            } else {
                if (i > 0) height[i][j] = Math.min(height[i][j], height[i - 1][j] + 1);
                if (j > 0) height[i][j] = Math.min(height[i][j], height[i][j - 1] + 1);
            }
        }
    }

    for (let i = R - 1; i >= 0; i--) {
        for (let j = C - 1; j >= 0; j--) {
            if (i < R - 1) height[i][j] = Math.min(height[i][j], height[i + 1][j] + 1);
            if (j < C - 1) height[i][j] = Math.min(height[i][j], height[i][j + 1] + 1);
        }
    }

    return height;
};