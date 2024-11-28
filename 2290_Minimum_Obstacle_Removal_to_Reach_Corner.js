/**
 * 2290. Minimum Obstacle Removal to Reach Corner
 * dIFFICULTY: Hard
 * 
 * You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

0 represents an empty cell,
1 represents an obstacle that may be removed.
You can move up, down, left, or right from and to an empty cell.

Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

Example 1:


Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
Output: 2
Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
It can be shown that we need to remove at least 2 obstacles, so we return 2.
Note that there may be other ways to remove 2 obstacles to create a path.
Example 2:


Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
Output: 0
Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 105
2 <= m * n <= 105
grid[i][j] is either 0 or 1.
grid[0][0] == grid[m - 1][n - 1] == 0
 */


/**
 * Explanation:
Initialization:

Start from the top-left corner (0, 0) with an initial distance of 0.
Use a deque (double-ended queue) to implement a 0-1 BFS approach.
Create a distance matrix of size m x n initialized with a large value (e.g., INT_MAX or float('inf')).
Set the distance of the starting cell to 0.
Priority-based BFS:

Use a deque to explore the grid.
If moving to a neighboring cell doesn’t require removing an obstacle (grid[nx][ny] == 0), push it to the front of the deque (higher priority).
If moving to a neighboring cell requires removing an obstacle (grid[nx][ny] == 1), push it to the back of the deque (lower priority).
Update Distance:

For each neighbor (nx, ny), calculate the new potential distance as distance[x][y] + grid[nx][ny].
If the new distance is smaller than the current distance[nx][ny], update distance[nx][ny] and add the cell to the deque based on its priority.
Termination:

The BFS stops when all possible paths have been explored.
The final distance[m-1][n-1] gives the minimum number of obstacles to be removed to reach the bottom-right corner (m-1, n-1).
Approach (Step-by-Step):
Grid and Matrix Setup:

Define the size of the grid m x n.
Initialize the distance matrix to track the minimum number of obstacles removed for each cell.
Deque for BFS:

Use a deque to implement a 0-1 BFS algorithm.
Insert the starting cell (0, 0) into the deque with a distance of 0.
Direction Movement:

Use a list of directional movements: [(0, 1), (1, 0), (0, -1), (-1, 0)] to explore all possible neighbors (up, down, left, right).
BFS Exploration:

While the deque is not empty:
Pop the current cell (x, y) from the deque.
For each neighbor (nx, ny):
Check if it’s within the bounds of the grid.
Calculate the new distance as distance[x][y] + grid[nx][ny].
If this distance is smaller than the current distance[nx][ny]:
Update distance[nx][ny].
Push the neighbor to the front (if grid[nx][ny] == 0) or the back (if grid[nx][ny] == 1) of the deque.
Final Distance:

After BFS completes, return distance[m-1][n-1] as the result.
Complexity
Time Complexity: O(m × n)
Space Complexity: O(m × n)

 */


/**
 * 0/1 BFS | No heap & Dijkstra
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
function minimumObstacles(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const directions = [
    [0, 1],   // right
    [1, 0],   // down
    [0, -1],  // left
    [-1, 0],  // up
  ];

  // Deque for 0-1 BFS: [x, y, obstaclesRemoved]
  const deque = new Deque([[0, 0, 0]]); // Start at (0, 0) with 0 obstacles removed
  const visited = new Set(["0,0"]);

  while (!deque.isEmpty()) {
    const [x, y, obstaclesRemoved] = deque.popFront();

    // If we reach the bottom-right corner
    if (x === m - 1 && y === n - 1) {
      return obstaclesRemoved;
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited.has(`${nx},${ny}`)) {
        visited.add(`${nx},${ny}`);
        if (grid[nx][ny] === 0) {
          deque.pushFront([nx, ny, obstaclesRemoved]); // No obstacle to remove
        } else {
          deque.pushBack([nx, ny, obstaclesRemoved + 1]); // Remove the obstacle
        }
      }
    }
  }

  return -1;
}