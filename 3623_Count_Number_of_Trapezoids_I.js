/**
 * 3623. Count Number of Trapezoids I
 * Difficulty: Medium
 * 
 * You are given a 2D integer array points, where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.
A horizontal trapezoid is a convex quadrilateral with at least one pair of horizontal sides (i.e. parallel to the x-axis). Two lines are parallel if and only if they have the same slope.
Return the number of unique horizontal trapezoids that can be formed by choosing any four distinct points from points.
Since the answer may be very large, return it modulo 109 + 7.

Example 1:
Input: points = [[1,0],[2,0],[3,0],[2,2],[3,2]]

Output: 3

Explanation:
There are three distinct ways to pick four points that form a horizontal trapezoid:

Using points [1,0], [2,0], [3,2], and [2,2].
Using points [2,0], [3,0], [3,2], and [2,2].
Using points [1,0], [3,0], [3,2], and [2,2].
Example 2:
Input: points = [[0,0],[1,0],[0,1],[2,1]]

Output: 1
Explanation:

There is only one horizontal trapezoid that can be formed.

Constraints:

4 <= points.length <= 105
–108 <= xi, yi <= 108
All points are pairwise distinct.
 */

/**
 * Intuition
Store the number of points on each y-line in the map.
Each line contributes the number of point pairs on that line multiplied by the number of point pairs on the other lines.
Use the combinatorics formula n * (n - 1) / 2 to calculate the number of unique point pairs on each line.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    
    const map = new Map(), mod = BigInt(10 ** 9 + 7);


    for(const [x, y] of points) {
        map.set(y, (map.get(y) || 0n) + 1n);
    }

    let ans = 0n, totalPairs = 0n;

    for(const points of map.values()) {
       const horPairs = points * (points - 1n) / 2n;
       const count = (horPairs * totalPairs) % mod;
       ans = (ans + count) % mod;
       totalPairs = (totalPairs + horPairs) % mod;
    }

    return Number(ans);
}