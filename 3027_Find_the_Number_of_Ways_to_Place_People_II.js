/**
 * 3027. Find the Number of Ways to Place People II
 * Difficulty: Hard
 * 
 * You are given a 2D array points of size n x 2 representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

We define the right direction as positive x-axis (increasing x-coordinate) and the left direction as negative x-axis (decreasing x-coordinate). Similarly, we define the up direction as positive y-axis (increasing y-coordinate) and the down direction as negative y-axis (decreasing y-coordinate)

You have to place n people, including Alice and Bob, at these points such that there is exactly one person at every point. Alice wants to be alone with Bob, so Alice will build a rectangular fence with Alice's position as the upper left corner and Bob's position as the lower right corner of the fence (Note that the fence might not enclose any area, i.e. it can be a line). If any person other than Alice and Bob is either inside the fence or on the fence, Alice will be sad.

Return the number of pairs of points where you can place Alice and Bob, such that Alice does not become sad on building the fence.

Note that Alice can only build a fence with Alice's position as the upper left corner, and Bob's position as the lower right corner. For example, Alice cannot build either of the fences in the picture below with four corners (1, 1), (1, 3), (3, 1), and (3, 3), because:

With Alice at (3, 3) and Bob at (1, 1), Alice's position is not the upper left corner and Bob's position is not the lower right corner of the fence.
With Alice at (1, 3) and Bob at (1, 1), Bob's position is not the lower right corner of the fence.

 

Example 1:


Input: points = [[1,1],[2,2],[3,3]]
Output: 0
Explanation: There is no way to place Alice and Bob such that Alice can build a fence with Alice's position as the upper left corner and Bob's position as the lower right corner. Hence we return 0. 
Example 2:


Input: points = [[6,2],[4,4],[2,6]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (4, 4) and Bob at (6, 2).
- Place Alice at (2, 6) and Bob at (4, 4).
You cannot place Alice at (2, 6) and Bob at (6, 2) because the person at (4, 4) will be inside the fence.
Example 3:


Input: points = [[3,1],[1,3],[1,1]]
Output: 2
Explanation: There are two ways to place Alice and Bob such that Alice will not be sad:
- Place Alice at (1, 1) and Bob at (3, 1).
- Place Alice at (1, 3) and Bob at (1, 1).
You cannot place Alice at (1, 3) and Bob at (3, 1) because the person at (1, 1) will be on the fence.
Note that it does not matter if the fence encloses any area, the first and second fences in the image are valid.
 

Constraints:

2 <= n <= 1000
points[i].length == 2
-109 <= points[i][0], points[i][1] <= 109
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