/**
 * 417. Pacific Atlantic Water Flow
 * Difficulty: Medium
 * 
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

 

Example 1:


Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
Example 2:

Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
 

Constraints:

m == heights.length
n == heights[r].length
1 <= m, n <= 200
0 <= heights[r][c] <= 105
 */

/**
 * Intuition
Instead of simulating flow from each cell, we reverse the logic: simulate how water reaches a cell from the Pacific or Atlantic. If a cell is reachable from both oceans, it’s a solution.

Approach
image.png

Perform BFS from all Pacific-border cells and all Atlantic-border cells.
From each ocean edge, expand into neighbors with equal or higher height.
Mark reachable cells in a set.
Intersect both sets to find common coordinates.
Complexity
Time Complexity:
( O(mn) ) — Each cell is visited at most twice.
Space Complexity:
( O(mn) ) — For visited sets and queues.
 */

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    const m = heights.length, n = heights[0].length;
    const pacific = new Set(), atlantic = new Set();

    const bfs = (queue, visited) => {
        while (queue.length) {
            const [r, c] = queue.shift();
            visited.add(`${r},${c}`);
            for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const nr = r + dr, nc = c + dc;
                const key = `${nr},${nc}`;
                if (
                    nr >= 0 && nc >= 0 && nr < m && nc < n &&
                    !visited.has(key) &&
                    heights[nr][nc] >= heights[r][c]
                ) {
                    queue.push([nr, nc]);
                    visited.add(key);
                }
            }
        }
    };

    const pacQ = [], atlQ = [];
    for (let i = 0; i < m; i++) {
        pacQ.push([i, 0]);
        atlQ.push([i, n - 1]);
    }
    for (let j = 0; j < n; j++) {
        pacQ.push([0, j]);
        atlQ.push([m - 1, j]);
    }

    bfs(pacQ, pacific);
    bfs(atlQ, atlantic);

    const result = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const key = `${r},${c}`;
            if (pacific.has(key) && atlantic.has(key)) {
                result.push([r, c]);
            }
        }
    }

    return result;
};