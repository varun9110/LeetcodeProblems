/**
 * 2658. Maximum Number of Fish in a Grid
 * Difficulty: Medium
 * 
 * You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:

A land cell if grid[r][c] = 0, or
A water cell containing grid[r][c] fish, if grid[r][c] > 0.
A fisher can start at any water cell (r, c) and can do the following operations any number of times:

Catch all the fish at cell (r, c), or
Move to any adjacent water cell.
Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

 

Example 1:


Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
Example 2:


Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish. 
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 10
0 <= grid[i][j] <= 10
 */

/**
 * Intuition
To solve the Maximum Number of Fish in a Grid problem, we can use Depth-First Search (DFS) to explore the grid.
Approach
Start from every water cell (grid[i][j] > 0).
Use DFS to traverse all reachable water cells and collect the fish.
Keep track of the maximum number of fish collected starting from any cell.
DFS Traversal:

Starting from any water cell (grid[r][c] > 0), recursively visit all adjacent water cells, 
collecting the fish and marking the cells as visited (grid[r][c] = 0).
Iterate Through Grid:

For every water cell in the grid, start a DFS and calculate the total fish collected. Update the maxFish if this value is greater than the current maximum.
Complexity
Time complexity:

O(m×n), where m and n are the dimensions of the grid. Each cell is visited at most once.
Space complexity:

O(m×n), due to the recursive stack in DFS.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function (grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxFish = 0;

    // Directions for adjacent cells: right, left, down, up
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    // Helper function for DFS
    function dfs(r, c) {
        // Base case: if the cell is out of bounds or is land
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) {
            return 0;
        }

        // Collect the fish at the current cell
        let fish = grid[r][c];
        grid[r][c] = 0; // Mark the cell as visited

        // Explore all adjacent cells
        for (const [dr, dc] of directions) {
            fish += dfs(r + dr, c + dc);
        }

        return fish;
    }

    // Iterate over every cell in the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] > 0) { // Start DFS from every water cell
                maxFish = Math.max(maxFish, dfs(r, c));
            }
        }
    }

    return maxFish;
};