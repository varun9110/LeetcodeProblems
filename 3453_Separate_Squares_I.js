/**
 * 3453. Separate Squares I
 * Difficulty: Medium
 * 
 * You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the minimum y-coordinate value of a horizontal line such that the total area of the squares above the line equals the total area of the squares below the line.

Answers within 10-5 of the actual answer will be accepted.

Note: Squares may overlap. Overlapping areas should be counted multiple times.

 

Example 1:

Input: squares = [[0,0,1],[2,2,1]]

Output: 1.00000

Explanation:



Any horizontal line between y = 1 and y = 2 will have 1 square unit above it and 1 square unit below it. The lowest option is 1.

Example 2:

Input: squares = [[0,0,2],[1,1,1]]

Output: 1.16667

Explanation:

The areas are:

Below the line: 7/6 * 2 (Red) + 1/6 (Blue) = 15/6 = 2.5.
Above the line: 5/6 * 2 (Red) + 5/6 (Blue) = 15/6 = 2.5.
Since the areas above and below the line are equal, the output is 7/6 = 1.16667.


Constraints:

1 <= squares.length <= 5 * 104
squares[i] = [xi, yi, li]
squares[i].length == 3
0 <= xi, yi <= 109
1 <= li <= 109
The total area of all the squares will not exceed 1012.
 */


/**
 * Intuition
Each square is axis-aligned and defined by its bottom-left corner (x, y) and side length l.
Its area is l × l.

image.png

We want to draw a horizontal line at height h such that:

Total area of all square parts below the line
equals
Total area of all square parts above the line
Key observations:

As the height h increases:
Area below the line monotonically increases
Area above the line monotonically decreases
Therefore, the difference
(area below − area above)
is a monotonic increasing function of h
At very small h, almost all area is above the line
At very large h, almost all area is below the line
This guarantees the existence of a unique height where both areas are equal.
Such a monotonic condition is perfectly suited for binary search on the answer.

Approach
Binary Search on Height
We binary search the height h where the areas above and below are equal.

Search Space
L = 0
The minimum possible height
R = 1e9
Safely covers all square positions and sizes
Area Computation for a Fixed Height mid
For each square (x, y, l):

Let:

Bottom of square = y
Top of square = y + l
Total area = l × l
We consider three cases:

1. Square completely below the line
y + l ≤ mid

pgsql
Copy code
Entire square lies below the line
→ add full area to LA

2. Square completely above the line
y ≥ mid

pgsql
Copy code
Entire square lies above the line
→ add full area to UA

3. Square is intersected by the line
image.png

y < mid < y + l

yaml
Copy code

The square is split into two rectangles:

Height below the line = mid − y
Area below = (mid − y) × l
Area above = l × l − area below
Add accordingly to LA and UA.

Binary Search Decision
After processing all squares:

If LA ≥ UA
The line is too high (too much area below)
→ move R = mid
Else
The line is too low
→ move L = mid
Repeat until sufficient precision is reached.

Complexity
Time complexity:
For each binary search iteration we scan all squares
O(n × log(precision))
scss
Copy code
With fixed iterations (≈80), this is effectively O(n)

Space complexity:
O(1)
cpp
Copy code
Only constant extra variables are used
 */

/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function (squares) {
    let L = 0.0, R = 1e9;
    let Ans = 0.0;

    for (let it = 0; it < 80; it++) { // sufficient precision
        let mid = L + (R - L) / 2.0;
        let LA = 0.0, UA = 0.0;

        for (let i = 0; i < squares.length; i++) {
            let y = squares[i][1];
            let l = squares[i][2];
            let TA = l * l;

            if (y + l <= mid) {
                LA += TA;                     // completely below
            } else if (y >= mid) {
                UA += TA;                     // completely above
            } else {
                let below = (mid - y) * l;   // partially split
                LA += below;
                UA += TA - below;
            }
        }

        if (LA >= UA) {
            Ans = mid;
            R = mid;
        } else {
            L = mid;
        }
    }

    return Ans;
};