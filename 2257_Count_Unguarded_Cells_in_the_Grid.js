/**
 * 2257. Count Unguarded Cells in the Grid
 * Difficulty: medium
 * 
 * You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] 
 * and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. 
A cell is guarded if there is at least one guard that can see it.

Return the number of unoccupied cells that are not guarded.


Example 1:

Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
Output: 7
Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
There are a total of 7 unguarded cells, so we return 7.
Example 2:

Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
Output: 4
Explanation: The unguarded cells are shown in green in the above diagram.
There are a total of 4 unguarded cells, so we return 4. 

Constraints:

1 <= m, n <= 105
2 <= m * n <= 105
1 <= guards.length, walls.length <= 5 * 104
2 <= guards.length + walls.length <= m * n
guards[i].length == walls[j].length == 2
0 <= rowi, rowj < m
0 <= coli, colj < n
All the positions in guards and walls are unique.
 */

/**
 * DFS - Depth-First Search
 */

// JavaScript

var countUnguarded = function(m, n, guards, walls) {
    const grid = Array(m).fill().map(() => Array(n).fill(0));
    // 0 = free, 1 = guard, 2 = wall, 3 = guardable
    
    for (const [r, c] of guards) {
        grid[r][c] = 1;
    }
    for (const [r, c] of walls) {
        grid[r][c] = 2;
    }
    
    function markGuarded(r, c) {
        // Check downward
        for (let row = r + 1; row < m; row++) {
            if (grid[row][c] === 1 || grid[row][c] === 2) break;
            grid[row][c] = 3;
        }
        // Check upward
        for (let row = r - 1; row >= 0; row--) {
            if (grid[row][c] === 1 || grid[row][c] === 2) break;
            grid[row][c] = 3;
        }
        // Check right
        for (let col = c + 1; col < n; col++) {
            if (grid[r][col] === 1 || grid[r][col] === 2) break;
            grid[r][col] = 3;
        }
        // Check left
        for (let col = c - 1; col >= 0; col--) {
            if (grid[r][col] === 1 || grid[r][col] === 2) break;
            grid[r][col] = 3;
        }
    }
    
    for (const [r, c] of guards) {
        markGuarded(r, c);
    }
    
    let res = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === 0) res++;
        }
    }
    
    return res;
};