/**
 * 1970. Last Day Where You Can Still Cross
 * Difficulty: Hard
 * 
 * There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

 

Example 1:


Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 2.
Example 2:


Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
Output: 1
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 1.
Example 3:


Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
Output: 3
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 3.
 

Constraints:

2 <= row, col <= 2 * 104
4 <= row * col <= 2 * 104
cells.length == row * col
1 <= ri <= row
1 <= ci <= col
All the values of cells are unique.
 */

/**
 * Intuition
We can process the flooding sequence backwards, converting water back to land
Finding the last crossable day forward equals finding the first crossable day backward
As we move through cells in reverse, each water cell becomes land
Every new land cell connects with its land neighbors
Continue until the top and bottom rows link together, or all cells are processed
image.png
image.png

Since the top row might have several separate land cells, how do we efficiently verify whether any top row cell connects to any bottom row cell? Must we test each pair individually?

Solution
Use two virtual nodes in the DSU structure (top and bottom) to represent all land cells in their respective rows collectively. No individual testing needed.

image.png

While iterating, each water cell that becomes land:

Connects to adjacent land cells
Links to the top node if positioned in row 0
Links to the bottom node if positioned in the last row
Checking whether first and last rows connect reduces to checking if top and bottom virtual nodes are connected.

The following visualization demonstrates this process:

image.png

Algorithm
Initialize a DSU structure with size row×col+2 (includes two virtual nodes)
Create a grid initialized to all zeros (representing all land initially)
Iterate through cells in reverse order from i=cells.length−1 down to 0
For each cell cells[i]:
Convert to 0-indexed coordinates: r=cells[i][0]−1, c=cells[i][1]−1
Mark as land: grid[r][c]=1
Calculate cell index: index=r×col+c+1
Check all four adjacent positions. For each valid land neighbor, union them in DSU
If r=0, union with node 0 (top virtual node)
If r=row−1, union with node row×col+1 (bottom virtual node)
Check if find(0)=find(row×col+1). If yes, return i
Return −1 if no connection found
Time Complexity: O(row×col)
Space Complexity: O(row×col)
 */

/**
 * @param {number} row
 * @param {number} col
 * @param {number[][]} cells
 * @return {number}
 */
var latestDayToCross = function(row, col, cells) {
    const dsu = new DSU(row * col + 2);
    const grid = Array.from({ length: row }, () => Array(col).fill(0));
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];

    for (let i = 0; i < row * col; i++) {
        const r = cells[i][0] - 1, c = cells[i][1] - 1;
        grid[r][c] = 1;
        const id1 = r * col + c + 1;

        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < row && nc >= 0 && nc < col && grid[nr][nc] === 1) {
                const id2 = nr * col + nc + 1;
                dsu.union(id1, id2);
            }
        }

        if (c === 0) dsu.union(0, id1);
        if (c === col - 1) dsu.union(row * col + 1, id1);

        if (dsu.find(0) === dsu.find(row * col + 1))
            return i;
    }
    return -1;
};

class DSU {
    constructor(n) {
        this.root = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(x) {
        if (this.root[x] !== x)
            this.root[x] = this.find(this.root[x]);
        return this.root[x];
    }

    union(x, y) {
        let rx = this.find(x), ry = this.find(y);
        if (rx === ry) return;
        if (this.size[rx] > this.size[ry])
            [rx, ry] = [ry, rx];
        this.root[rx] = ry;
        this.size[ry] += this.size[rx];
    }
};