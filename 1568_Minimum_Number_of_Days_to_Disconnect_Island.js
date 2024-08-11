/**
 * 1568. Minimum Number of Days to Disconnect Island
 * Difficulty: Hard
 * 
 * You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally 
 * (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.
In one day, we are allowed to change any single land cell (1) into a water cell (0).
Return the minimum number of days to disconnect the grid.

Example 1:
Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]
Output: 2
Explanation: We need at least 2 days to get a disconnected grid.
Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.
Example 2:
Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 30
grid[i][j] is either 0 or 1.
 */

/**
 * Intuition
First of all, looking at the problem statement, we can observe that we need to make the grid disconnected by turning some land cells into water. 
If the grid has more than one island initially, it is already disconnected, and no further steps are required. However, 
if it is connected, we need to figure out the minimum number of days required to disconnect it. 
So, I decided to use Depth-First Search (DFS) to count the number of islands. If we remove land cells and recheck the number of islands, 
we can figure out the minimum days needed to achieve a disconnected grid.

Approach
Step 1: Initial Check for Connectivity:
Before diving into removing any land cells, first, I checked if the grid is already disconnected by counting the number of islands. 
This was done using a DFS traversal. If the grid is already disconnected (i.e., it has more than one island), then no days are needed, 
and we can return 0 immediately.
Step 2: Try Removing Each Land Cell:
Since the grid might still be connected, I decided to try removing each land cell one by one. For every land cell (i, j), 
I temporarily changed it to water (grid[i][j] = 0) and then rechecked the number of islands using DFS. If the grid becomes 
disconnected after removing a single cell, it means we only needed one day to achieve this, and I can return 1. If removing a single cell doesn't work, 
I restored the cell back to land (grid[i][j] = 1) and moved on to the next cell.
Step 3: Handling Cases Where One Day Is Not Enough:
If removing a single land cell is not enough to disconnect the grid, I realized that it would require at least 2 days. 
This is because a fully connected grid of land cells always needs two changes to disconnect.
Example
Let's walk through an example with grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]:

Step 1:

First, I checked if the grid is already disconnected. It was not; the grid had one large island.
Step 2:

Then, I began testing each land cell. For instance, by removing the cell at grid[1][1], the grid still remained connected. 
But when I removed grid[0][2], the grid split into two islands, making it disconnected. So, in this case, 
I found that it took at least 2 days to disconnect the grid.
Complexity
Time Complexity: O(m * n * (m + n)) where m and n are the dimensions of the grid. The DFS operation, which checks the number of islands, 
is run for each cell.

Space Complexity: O(m * n) which accounts for the space used by the DFS stack and the grid itself.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minDays = function(grid) {
    const countIslands = () => {
        const seen = new Set();
        let islands = 0;

        const dfs = (r, c) => {
            const stack = [[r, c]];
            while (stack.length > 0) {
                const [x, y] = stack.pop();
                for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                    const nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < grid.length && ny >= 0 && ny < grid[0].length && grid[nx][ny] === 1 && !seen.has(`${nx},${ny}`)) {
                        seen.add(`${nx},${ny}`);
                        stack.push([nx, ny]);
                    }
                }
            }
        };

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if (grid[i][j] === 1 && !seen.has(`${i},${j}`)) {
                    islands++;
                    seen.add(`${i},${j}`);
                    dfs(i, j);
                }
            }
        }
        return islands;
    };

    if (countIslands() !== 1) return 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                grid[i][j] = 0;
                if (countIslands() !== 1) return 1;
                grid[i][j] = 1;
            }
        }
    }

    return 2;
};
