/**
 * 3446. Sort Matrix by Diagonals
 * Difficulty: Medium
 * 
 * You are given an n x n square matrix of integers grid. Return the matrix such that:

The diagonals in the bottom-left triangle (including the middle diagonal) are sorted in non-increasing order.
The diagonals in the top-right triangle are sorted in non-decreasing order.
 

Example 1:
Input: grid = [[1,7,3],[9,8,2],[4,5,6]]
Output: [[8,2,3],[9,6,7],[4,5,1]]

Explanation:
The diagonals with a black arrow (bottom-left triangle) should be sorted in non-increasing order:
[1, 8, 6] becomes [8, 6, 1].
[9, 5] and [4] remain unchanged.
The diagonals with a blue arrow (top-right triangle) should be sorted in non-decreasing order:

[7, 2] becomes [2, 7].
[3] remains unchanged.
Example 2:
Input: grid = [[0,1],[1,2]]

Output: [[2,1],[1,0]]
Explanation:

The diagonals with a black arrow must be non-increasing, so [0, 2] is changed to [2, 0]. The other diagonals are already in the correct order.
Example 3:
Input: grid = [[1]]

Output: [[1]]
Explanation:
Diagonals with exactly one element are already in order, so no changes are needed.

Constraints:

grid.length == grid[i].length == n
1 <= n <= 10
-105 <= grid[i][j] <= 105
 */

/**
 * Intuition
The matrix needs to be sorted along its diagonals, but with different rules depending on whether the diagonal belongs to the bottom-left triangle (including the main diagonal) or the top-right triangle.
Bottom-left diagonals → sort in non-increasing order.
Top-right diagonals → sort in non-decreasing order.
This suggests grouping numbers by diagonals (where each diagonal can be uniquely identified by i - j) and then sorting them appropriately.
Approach
Each diagonal can be mapped using the key i - j:
If i - j >= 0 → bottom-left → sort in descending order.
If i - j < 0 → top-right → sort in ascending order.
To efficiently sort while building the matrix back:
Use a min-heap (PriorityQueue) for ascending order (top-right).
Use a max-heap (PriorityQueue with reverse order) for descending order (bottom-left).
Traverse the matrix once to collect elements into their corresponding priority queues.
Traverse the matrix again, and for each cell (i, j) fetch the next element from its diagonal’s heap.
Return the modified matrix.
Complexity
Time complexity: O (M∗Nlog(M∗N))
Space complexity: O (M*N)
 */

/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var sortMatrix = function(grid) {
    const n = grid.length, m = grid[0].length;
    const diags = {};

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const key = i - j;
            if (!(key in diags)) diags[key] = [];
            diags[key].push(grid[i][j]);
        }
    }

    for (const key in diags) {
        if (key < 0) diags[key].sort((a,b)=>a-b);
        else diags[key].sort((a,b)=>b-a);
    }

    const idx = {};
    for (const key in diags) idx[key] = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const key = i - j;
            grid[i][j] = diags[key][idx[key]++];
        }
    }
    return grid;
};