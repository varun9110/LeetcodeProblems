/**
 * 1368. Minimum Cost to Make at Least One Valid Path in a Grid
 * Difficulty: Hard
 * 
 * Given an m x n grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of grid[i][j] can be:

1 which means go to the cell to the right. (i.e go from grid[i][j] to grid[i][j + 1])
2 which means go to the cell to the left. (i.e go from grid[i][j] to grid[i][j - 1])
3 which means go to the lower cell. (i.e go from grid[i][j] to grid[i + 1][j])
4 which means go to the upper cell. (i.e go from grid[i][j] to grid[i - 1][j])
Notice that there could be some signs on the cells of the grid that point outside the grid.

You will initially start at the upper left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1) following the signs on the grid. 
The valid path does not have to be the shortest.

You can modify the sign on a cell with cost = 1. You can modify the sign on a cell one time only.

Return the minimum cost to make the grid have at least one valid path.

 

Example 1:


Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
Output: 3
Explanation: You will start at point (0, 0).
The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) 
change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
The total cost = 3.
Example 2:


Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
Output: 0
Explanation: You can follow the path from (0, 0) to (2, 2).
Example 3:


Input: grid = [[1,2],[4,3]]
Output: 1
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 100
1 <= grid[i][j] <= 4
 */

/**
 * ✨ Intuition
This problem can be modeled as a shortest path problem on a grid, where each cell represents a node and moving between nodes incurs a cost. The cost depends on whether the movement aligns with the pre-defined direction of the current cell. If the direction matches, the cost is 0; otherwise, the cost is 1.

Key observation: We aim to minimize the cost of reaching the bottom-right cell (m-1, n-1) starting from the top-left cell (0, 0).

🛠️ Approach
We employ 0-1 Breadth-First Search (0-1 BFS) using a deque (double-ended queue). This approach efficiently handles scenarios where edge weights are either 0 or 1. Here’s how we solve the problem step by step:

Initialize:

Use a dist matrix to store the minimum cost of reaching each cell. Initialize all values to infinity (INT_MAX), except dist[0][0] = 0 because the cost of starting is zero.
Define direction arrays dx and dy to represent movements (right, left, down, up).
Use a deque dq to maintain the cells to process. Start with the initial cell (0, 0).
Process Cells:

Pop a cell (x, y) from the deque.
Retrieve the cell's predefined direction from grid[x][y] (convert it to 0-based indexing).
Explore all four possible directions (right, left, down, up):
If the new cell (nx, ny) is within bounds, calculate the cost:
No extra cost: If moving in the predefined direction, add the cell to the front of the deque.
Extra cost of 1: If moving in a different direction, add the cell to the back of the deque.
Update dist[nx][ny] if the new cost is smaller than its current value.
Stop Condition:

The algorithm terminates when all reachable cells are processed. The value at dist[m-1][n-1] gives the minimum cost to reach the bottom-right cell.
⏳ Complexity
Time Complexity:
O(m×n)
Each cell is processed at most once, and each edge (movement direction) is relaxed at most once.
Space Complexity:
O(m×n)
Space is used for the distance matrix and the deque.
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
const minCost = (grid) => {
    const queue = [[0, 0]];
    const directions = [[0, 1, 1], [0, -1, 2], [1, 0, 3], [-1, 0, 4]];
    const bfs = grid.map(r => r.map(_ => Infinity));
    bfs[0][0] = 0;
    while (queue.length > 0) {
        const [x, y] = queue.shift();
        for (const [dx, dy, v] of directions) {
            const [cX, cY] = [x + dx, y + dy];
            if (grid[cX]?.[cY]) {
                const newCost = bfs[x][y] + (grid[x][y] !== v);
                if (newCost < bfs[cX][cY]) {
                    bfs[cX][cY] = newCost;
                    queue.push([cX, cY]);
                }
            }
        }
    }

    return bfs.at(-1).at(-1);
}