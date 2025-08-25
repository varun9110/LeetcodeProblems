/**
 * 498. Diagonal Traverse
 * Difficulty: Medium
 * 
 * Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]
Example 2:

Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

Constraints:
m == mat.length
n == mat[i].length
1 <= m, n <= 104
1 <= m * n <= 104
-105 <= mat[i][j] <= 105
 */


/**
 * Intuition
To print matrix elements diagonally, we observe that all elements on the same diagonal share the same i + j index. So we can group them using this value.

Approach
image.png

Loop through the matrix and store elements in a dictionary with key i + j.
If the diagonal index is even, reverse the list (because direction alternates).
Merge all diagonals into one output array.
Complexity
Time complexity:
O(m * n) — visit each matrix element once
Space complexity:
O(m * n) — store all elements grouped by diagonals
 */


/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findDiagonalOrder = function(mat) {
    const m = mat.length, n = mat[0].length;
    const map = new Map();

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const key = i + j;
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(mat[i][j]);
        }
    }

    const res = [];
    for (let k = 0; k < m + n - 1; k++) {
        const list = map.get(k);
        if (k % 2 === 0) list.reverse();
        res.push(...list);
    }
    return res;
};