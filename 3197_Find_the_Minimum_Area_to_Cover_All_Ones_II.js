/**
 * 3197. Find the Minimum Area to Cover All Ones II
 * Difficulty: Hard
 * 
 * You are given a 2D binary array grid. You need to find 3 non-overlapping rectangles having non-zero areas with horizontal and vertical sides such that all the 1's in grid lie inside these rectangles.

Return the minimum possible sum of the area of these rectangles.
Note that the rectangles are allowed to touch.

Example 1:
Input: grid = [[1,0,1],[1,1,1]]
Output: 5
Explanation:

The 1's at (0, 0) and (1, 0) are covered by a rectangle of area 2.
The 1's at (0, 2) and (1, 2) are covered by a rectangle of area 2.
The 1 at (1, 1) is covered by a rectangle of area 1.

Example 2:
Input: grid = [[1,0,1,0],[0,1,0,1]]
Output: 5
Explanation:
The 1's at (0, 0) and (0, 2) are covered by a rectangle of area 3.
The 1 at (1, 1) is covered by a rectangle of area 1.
The 1 at (1, 3) is covered by a rectangle of area 1.
 
Constraints:
1 <= grid.length, grid[i].length <= 30
grid[i][j] is either 0 or 1.
The input is generated such that there are at least three 1's in grid.
 */

/**
 * Intuition
The problem is asking us to cover all the 1s in a binary grid using exactly 3 non-overlapping rectangles with the smallest total area.

At first glance, this looks like a partitioning problem. Each rectangle must cover some subset of 1s, and together, they should cover them all. Since rectangles must align with rows and columns, the shape of each rectangle is determined only by the minimum and maximum row/column indices of the 1s it contains.

Thus, the key insight is:

The area of a rectangle covering a group of 1s depends only on the bounding box of those 1s.
To minimize the sum of areas, we need to split the grid into three parts (by horizontal or vertical cuts, possibly after rotations) and compute the minimum area rectangles for each part.
Trying all possible splits ensures we don’t miss the optimal arrangement.
So the solution boils down to:

Enumerate ways of cutting the grid into 3 subgrids.
For each subgrid, compute the smallest rectangle covering its 1s.
Track the minimum total area across all partitions.
This brute-force approach works because the grid size is reasonably small, and with optimization (like rotating the grid to reuse logic), we can systematically explore all configurations.

Approach
Helper Function – Minimum Bounding Rectangle
-Define a function that, given a subgrid, finds the smallest rectangle that covers all the 1s in that subgrid.
This is done by tracking the minimum and maximum row/column indices of 1s.
The rectangle’s area is (right - left + 1) × (bottom - top + 1).
-If a subgrid contains no 1s, its rectangle area is 0.
Partition the Grid into Three Rectangles
Since the rectangles must be axis-aligned and non-overlapping, the grid can be split in two ways:
Horizontal cuts: Choose two row indices i and j (i < j) to cut the grid into three parts:
Top: rows [0 .. i-1]
Middle: rows [i .. j-1]
Bottom: rows [j .. n-1]
Vertical cuts: Similarly, choose two column indices to divide the grid into three vertical parts.
Try All Configurations
For every valid split (both horizontal and vertical), compute the bounding rectangle areas of the three subgrids.
Sum them up to get the total area.
Keep track of the minimum sum found.
Rotation Trick
Instead of handling all possible L-shaped partitions separately, we can rotate the grid four times (90° each) and only handle the straightforward partitions (horizontal and vertical).
This ensures all possible rectangle arrangements are covered.
Return the Minimum Area
After checking all possible splits across all rotations, return the smallest total area found.
Complexity
Time complexity:O (M^3*N^3)
Space complexity: O (M*N)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumSum = function(A) {
    const minimumArea = (B) => {
        if (!B.length || !B[0].length) return 0;
        let n = B.length, m = B[0].length;
        let left = Infinity, top = Infinity, right = -1, bottom = -1;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (B[i][j] === 1) {
                    left = Math.min(left, j);
                    top = Math.min(top, i);
                    right = Math.max(right, j);
                    bottom = Math.max(bottom, i);
                }
            }
        }
        if (right === -1) return 0;
        return (right - left + 1) * (bottom - top + 1);
    };
    const rotate = (B) => {
        let n = B.length, m = B[0].length;
        let rotated = Array.from({length: m}, () => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                rotated[j][n - 1 - i] = B[i][j];
            }
        }
        return rotated;
    };
    let res = Infinity;
    for (let rot = 0; rot < 4; rot++) {
        let n = A.length, m = A[0].length;
        for (let i = 1; i < n; i++) {
            let a1 = minimumArea(A.slice(0, i));
            for (let j = 1; j < m; j++) {
                let part2 = A.slice(i).map(r => r.slice(0, j));
                let part3 = A.slice(i).map(r => r.slice(j));
                let a2 = minimumArea(part2);
                let a3 = minimumArea(part3);
                res = Math.min(res, a1 + a2 + a3);
            }
            for (let i2 = i + 1; i2 < n; i2++) {
                let part2 = A.slice(i, i2);
                let part3 = A.slice(i2);
                let a2 = minimumArea(part2);
                let a3 = minimumArea(part3);
                res = Math.min(res, a1 + a2 + a3);
            }
        }
        A = rotate(A);
    }
    return res;
};