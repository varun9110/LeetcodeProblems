/**
 * 2943. Maximize Area of Square Hole in Grid
 * Difficulty: Medium
 * 
 * You are given the two integers, n and m and two integer arrays, hBars and vBars. The grid has n + 2 horizontal and m + 2 vertical bars, creating 1 x 1 unit cells. The bars are indexed starting from 1.
You can remove some of the bars in hBars from horizontal bars and some of the bars in vBars from vertical bars. Note that other bars are fixed and cannot be removed.
Return an integer denoting the maximum area of a square-shaped hole in the grid, after removing some bars (possibly none).

Example 1:
Input: n = 2, m = 1, hBars = [2,3], vBars = [2]
Output: 4
Explanation:
The left image shows the initial grid formed by the bars. The horizontal bars are [1,2,3,4], and the vertical bars are [1,2,3].
One way to get the maximum square-shaped hole is by removing horizontal bar 2 and vertical bar 2.

Example 2:
Input: n = 1, m = 1, hBars = [2], vBars = [2]
Output: 4
Explanation:
To get the maximum square-shaped hole, we remove horizontal bar 2 and vertical bar 2.

Example 3:
Input: n = 2, m = 3, hBars = [2,3], vBars = [2,4]
Output: 4
Explanation:
One way to get the maximum square-shaped hole is by removing horizontal bar 3, and vertical bar 4.

Constraints:

1 <= n <= 109
1 <= m <= 109
1 <= hBars.length <= 100
2 <= hBars[i] <= n + 1
1 <= vBars.length <= 100
2 <= vBars[i] <= m + 1
All values in hBars are distinct.
All values in vBars are distinct.
 */

/**
 * Approach: Sorting
Intuition
The problem requires removing some horizontal and vertical line segments to maximize the area of square holes in the remaining grid. It can be observed that the side length of a square hole depends on the maximum number of consecutive horizontal and vertical line segments removed. Therefore, the approach is as follows:

First, sort hBars and vBars in ascending order to facilitate the calculation of consecutive line segments.
Traverse the sorted arrays hBars and vBars separately to compute the maximum number of consecutive horizontal segments, hmax, and vertical segments, vmax.
The maximum square side length, side, is calculated as min(hmax,vmax)+1, and the returned area is the square of the side length, side 
2.

Complexity Analysis
Let h and v be the lengths of the arrays hBars and vBars, respectively.
Time complexity: O(hlogh+vlogv).
Sorting hBars and vBars requires O(hlogh) and O(vlogv) respectively.
Space complexity: O(logh+logv).
Sorting hBars and vBars requires O(logh) and O(logv) stack space, respectively.
 */

/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} hBars
 * @param {number[]} vBars
 * @return {number}
 */
function maximizeSquareHoleArea(n, m, hBars, vBars) {
    hBars.sort((a, b) => a - b);
    vBars.sort((a, b) => a - b);
    let hmax = 1,
        vmax = 1;
    let hcur = 1,
        vcur = 1;
    for (let i = 1; i < hBars.length; i++) {
        if (hBars[i] === hBars[i - 1] + 1) {
            hcur++;
        } else {
            hcur = 1;
        }
        hmax = Math.max(hmax, hcur);
    }
    for (let i = 1; i < vBars.length; i++) {
        if (vBars[i] === vBars[i - 1] + 1) {
            vcur++;
        } else {
            vcur = 1;
        }
        vmax = Math.max(vmax, vcur);
    }
    const side = Math.min(hmax, vmax) + 1;
    return side * side;
}