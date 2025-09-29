/**
 * 1039. Minimum Score Triangulation of Polygon
 * Difficulty: Medium
 * 
 * You have a convex n-sided polygon where each vertex has an integer value. You are given an integer array values where values[i] is the value of the ith vertex in clockwise order.

Polygon triangulation is a process where you divide a polygon into a set of triangles and the vertices of each triangle must also be vertices of the original polygon. Note that no other shapes other than triangles are allowed in the division. This process will result in n - 2 triangles.

You will triangulate the polygon. For each triangle, the weight of that triangle is the product of the values at its vertices. The total score of the triangulation is the sum of these weights over all n - 2 triangles.

Return the minimum possible score that you can achieve with some triangulation of the polygon.


Example 1:
Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.

Example 2:
Input: values = [3,7,4,5]
Output: 144

Explanation: There are two triangulations, with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
The minimum score is 144.

Example 3:
Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation is 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.
Constraints:

n == values.length
3 <= n <= 50
1 <= values[i] <= 100
 */

/**
 * Intuition
When I first read the problem, I noticed it’s about dividing a convex polygon into triangles such that the product of vertex values is minimized.
This is very similar to Matrix Chain Multiplication / DP on intervals problems.
Key thought: if we know how to optimally triangulate smaller sub-polygons, we can combine them to solve the bigger polygon.

Approach
Define dp[i][j] = minimum score required to triangulate the polygon formed by vertices from index i to j in array A.

If the sub-polygon has fewer than 3 vertices, no triangle can be formed → cost = 0.

For each interval (i, j), try every possible k with i < k < j.

Form a triangle (i, k, j) with cost A[i] * A[k] * A[j].
Add the cost of triangulating (i, k) and (k, j).
Choose the minimum among all k.
Build up the DP table by increasing interval length (bottom-up).

Final answer = dp[0][n-1] (whole polygon).

Complexity
Time complexity:
For every pair (i, j) we try all possible k. That’s 3 nested loops →
O(n³), where n = number of vertices.

Space complexity:
We store an n × n DP table → O(n²) space.
 */

/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function(values) {
    const n = values.length;
    const dp = Array.from({length: n}, () => Array(n).fill(0));

    for (let len = 3; len <= n; ++len) {
        for (let i = 0; i + len - 1 < n; ++i) {
            let j = i + len - 1;
            let best = Infinity;

            for (let k = i + 1; k < j; ++k) {
                let cost = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j];
                best = Math.min(best, cost);
            }

            dp[i][j] = (best === Infinity ? 0 : best);
        }
    }

    return dp[0][n-1];
};