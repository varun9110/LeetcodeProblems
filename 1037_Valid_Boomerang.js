/**
 * 1037. Valid Boomerang
 * Difficulty: Easy
 * 
 * Given an array points where points[i] = [xi, yi] represents a point on the X-Y plane, return true if these points are a boomerang.
A boomerang is a set of three points that are all distinct and not in a straight line.

Example 1:

Input: points = [[1,1],[2,3],[3,2]]
Output: true
Example 2:
Input: points = [[1,1],[2,2],[3,3]]
Output: false
 Constraints:
points.length == 3
points[i].length == 2
0 <= xi, yi <= 100
 */

/**
 * Approach
If three points are non collinear then they form triangle. So all we need to check if the area of the triangle formed is non-zero. 
If the area is zero it means all three points are collinear.

Suppose the three points are (x1,y1), (x2,y2), (x3,y3).

So area of triangle is given by : 0.5 * [x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)]

Thus we just need to check the condition if [x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)] !=0

Complexity
Time complexity: O(1)
Space complexity: O(1)
 */

/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function(points) {
    let [x1,y1] = points[0];
    let [x2,y2] = points[1];
    let [x3,y3] = points[2];

    return [x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)] != 0
};