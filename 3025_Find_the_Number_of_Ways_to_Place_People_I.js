/**
 * 3025. Find the Number of Ways to Place People I
 * Difficulty: Medium
 * 
 * You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D plane, where points[i] = [xi, yi].

Count the number of pairs of points (A, B), where
A is on the upper left side of B, and
there are no other points in the rectangle (or line) they make (including the border).
Return the count.

Example 1:
Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation:
There is no way to choose A and B so A is on the upper left side of B.

Example 2:
Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation:
The left one is the pair (points[1], points[0]), where points[1] is on the upper left side of points[0] and the rectangle is empty.
The middle one is the pair (points[2], points[1]), same as the left one it is a valid pair.
The right one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0], but points[1] is inside the rectangle so it's not a valid pair.

Example 3:
Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation:
The left one is the pair (points[2], points[0]), where points[2] is on the upper left side of points[0] and there are no other points on the line they form. Note that it is a valid state when the two points form a line.
The middle one is the pair (points[1], points[2]), it is a valid pair same as the left one.
The right one is the pair (points[1], points[0]), it is not a valid pair as points[2] is on the border of the rectangle.

Constraints:
2 <= n <= 50
points[i].length == 2
0 <= points[i][0], points[i][1] <= 50
All points[i] are distinct.
 */

/**
 * Problem Discussion
For this problem, a direct brute-force approach works but is O(n³) because we check all triplets of points. That is fine for small n, but not efficient. The trick is that by sorting the points by x ascending and y descending, we can cut down the search space and make the solution much faster.

With sorting, we only need to sweep forward and track valid bottoms (bot values), ensuring that we only count valid rectangles once. This reduces the complexity to O(n²), which is extremely efficient for the problem constraints.

image.png

Approach
Sort points by x ascending, and if x is equal, by y descending.

For each point i, take its y-coordinate as top.

Sweep forward to the right (j > i) and track the lowest valid bot.

If bot < y <= top, then (i, j) is a valid pair.
Update bot = y.
If top == bot, break early (no more valid pairs).
Count all such valid pairs.

This clever pruning ensures that we don’t waste time checking rectangles that are already invalidated by previous bottoms.

Complexity
Step	Time Complexity	Space Complexity
Sorting	O(n log n)	O(1)
Pair sweeping	O(n²)	O(1)
Total	O(n²)	O(1)
Note
This problem is still largely an implementation exercise. It’s rare to see this kind of problem in interviews, but if it does appear, there are multiple ways to solve it:

Brute force (O(n³)): simple, but slower.
2D prefix sums (O(n²)): useful if working with very large datasets.
Sorted greedy sweep (O(n²)): the fastest practical approach here.
With micro-optimizations, the brute force might be fine for smaller inputs, but the sorting + sweep approach is generally the most efficient and elegant.
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfPairs = function(points) {
    points.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
    const n = points.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        let top = points[i][1];
        let bot = -Infinity;
        for (let j = i + 1; j < n; j++) {
            let y = points[j][1];
            if (bot < y && y <= top) {
                result++;
                bot = y;
                if (bot === top) break;
            }
        }
    }
    return result;
};