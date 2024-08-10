/**
 * 959. Regions Cut By Slashes
 * Difficulty : Medium
 * 
 * An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. 
 * These characters divide the square into contiguous regions.
Given the grid grid represented as a string array, return the number of regions.
Note that backslash characters are escaped, so a '\' is represented as '\\'.


Example 1:
Input: grid = [" /","/ "]
Output: 2
Example 2:
Input: grid = [" /","  "]
Output: 1
Example 3:

Input: grid = ["/\\","\\/"]
Output: 5
Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.
 
Constraints:
n == grid.length == grid[i].length
1 <= n <= 30
grid[i][j] is either '/', '\', or ' '.
 */

/**
 * Intuition
The problem asks us to count the number of distinct regions formed by slashes (/, \) in an n x n grid. Each cell can be divided into 4 parts,
and depending on the slashes, these parts connect differently. The goal is to simulate these connections and count the distinct regions.

The key observation is that each grid cell can be thought of as being split into four triangles, and the slashes determine which triangles are connected. 
By treating the grid this way, we can apply a union-find (or DFS/BFS) algorithm to count the distinct regions.

Approach
Grid Representation: Treat each cell in the grid as four parts (triangles). Number them as 0, 1, 2, and 3 (top-left, top-right, bottom-right, bottom-left).
Union-Find: Use a union-find data structure to merge the triangles within a cell based on the slashes and connect triangles across adjacent cells.
Merge Cells: For each /, connect the top-left with the bottom-right, and the top-right with the bottom-left. 
For each \, connect the top-right with the bottom-left. For spaces ( ), connect all four triangles.
Count Regions: After processing the grid, count the number of disjoint sets in the union-find structure to determine the number of regions.
Complexity
Time complexity:

O(n 2 logn) where (n) is the size of the grid. The log factor comes from the union-find operations.
Space complexity:

O(n 2) for the union-find structure, which stores the parent and rank of each triangle.
 */


/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function(grid) {
    const n = grid.length;
    const parent = Array.from({ length: 4 * n * n }, (_, i) => i);
    const rank = Array(4 * n * n).fill(0);

    // Find with path compression
    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    // Union with union by rank
    function unite(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const base = 4 * (i * n + j);
            const c = grid[i][j];

            // Connect the parts inside the current cell
            if (c === '/') {
                unite(base, base + 3);
                unite(base + 1, base + 2);
            } else if (c === '\\') {
                unite(base, base + 1);
                unite(base + 2, base + 3);
            } else {
                unite(base, base + 1);
                unite(base + 1, base + 2);
                unite(base + 2, base + 3);
            }

            // Connect with the right cell
            if (j + 1 < n) {
                unite(base + 1, base + 7);
            }

            // Connect with the cell below
            if (i + 1 < n) {
                unite(base + 2, base + 4 * n);
            }
        }
    }

    // Count distinct regions
    let regions = 0;
    for (let i = 0; i < 4 * n * n; i++) {
        if (find(i) === i) regions++;
    }
    return regions;
};