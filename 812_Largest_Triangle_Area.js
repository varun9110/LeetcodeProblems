/**
 * 812. Largest Triangle Area
 * Difficulty: Easy
 * 
 * Given an array of points on the X-Y plane points where points[i] = [xi, yi], return the area of the largest triangle that can be formed by any three different points. Answers within 10-5 of the actual answer will be accepted.

Example 1:
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2.00000
Explanation: The five points are shown in the above figure. The red triangle is the largest.
Example 2:

Input: points = [[1,0],[0,0],[0,1]]
Output: 0.50000
 

Constraints:

3 <= points.length <= 50
-50 <= xi, yi <= 50
All the given points are unique.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function(points) {
    let max2 = 0;
  const n = points.length;
  for (let i = 0; i < n; ++i) {
    const [x1, y1] = points[i];
    for (let j = i + 1; j < n; ++j) {
      const [x2, y2] = points[j];
      for (let k = j + 1; k < n; ++k) {
        const [x3, y3] = points[k];
        const area2 = Math.abs(
          x1 * (y2 - y3) +
          x2 * (y3 - y1) +
          x3 * (y1 - y2)
        );
        if (area2 > max2) max2 = area2;
      }
    }
  }
  return max2 / 2;
};