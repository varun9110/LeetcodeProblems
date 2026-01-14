/**
 * 3454. Separate Squares II
 * Difficulty: Hard
 * 
 * You are given a 2D integer array squares. Each squares[i] = [xi, yi, li] represents the coordinates of the bottom-left point and the side length of a square parallel to the x-axis.

Find the minimum y-coordinate value of a horizontal line such that the total area covered by squares above the line equals the total area covered by squares below the line.

Answers within 10-5 of the actual answer will be accepted.

Note: Squares may overlap. Overlapping areas should be counted only once in this version.

 

Example 1:

Input: squares = [[0,0,1],[2,2,1]]

Output: 1.00000

Explanation:



Any horizontal line between y = 1 and y = 2 results in an equal split, with 1 square unit above and 1 square unit below. The minimum y-value is 1.

Example 2:

Input: squares = [[0,0,2],[1,1,1]]

Output: 1.00000

Explanation:



Since the blue square overlaps with the red square, it will not be counted again. Thus, the line y = 1 splits the squares into two equal parts.

 

Constraints:

1 <= squares.length <= 5 * 104
squares[i] = [xi, yi, li]
squares[i].length == 3
0 <= xi, yi <= 109
1 <= li <= 109
The total area of all the squares will not exceed 1015.
 */

/**
 * Intuition
We need to find a horizontal line y = k such that the area of the union of squares above and below the line is equal.

Since squares may overlap, we cannot sum individual areas. Instead, we compute the union area using a sweep line algorithm along the y-axis.

Dry Run (High Level)
Consider squares [x, y, l].

Each square contributes:

A start event at y
An end event at y + l
We sweep from bottom to top:

Track which x-intervals are currently active
Active width × vertical distance gives area for that slice
First sweep:

Compute the total union area
Second sweep:

Accumulate area again
When accumulated area reaches totalArea / 2,
interpolate inside that vertical segment:
splitY = prevY + (remainingArea / activeWidth)
This splitY is the required answer.

Approach
Handle a fast edge case where all squares have the same y and side length.
Convert each square into two sweep-line events (start and end).
Compress x-coordinates to efficiently track overlapping x-intervals.
Perform a first sweep to compute the total union area.
Perform a second sweep to locate the y-coordinate where half the area is reached.
Complexity
Time Complexity: O(N²)
Space Complexity: O(N)
 */

/**
 * @param {number[][]} squares
 * @return {number}
 */
var separateSquares = function(squares) {
    if (!squares || squares.length === 0) return 0;

  // Fast path: all squares aligned
  const baseY = squares[0][1];
  const baseL = squares[0][2];
  let same = true;

  for (let i = 1; i < squares.length; i++) {
    if (squares[i][1] !== baseY || squares[i][2] !== baseL) {
      same = false;
      break;
    }
  }
  if (same) return baseY + baseL / 2;

  // Build sweep events
  const events = [];
  const xSet = new Set();

  for (const [x, y, l] of squares) {
    events.push([y, 0, x, x + l]);     // start
    events.push([y + l, 1, x, x + l]); // end
    xSet.add(x);
    xSet.add(x + l);
  }

  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  // X coordinate compression
  const xs = [...xSet].sort((a, b) => a - b);
  const xIndex = new Map();
  xs.forEach((x, i) => xIndex.set(x, i));

  const widths = [];
  for (let i = 0; i < xs.length - 1; i++) {
    widths.push(xs[i + 1] - xs[i]);
  }

  // First sweep: total area
  let intervals = new Array(widths.length).fill(0);
  let activeWidth = 0;
  let totalArea = 0;
  let prevY = events[0][0];

  for (const [y, type, x1, x2] of events) {
    if (y > prevY) {
      totalArea += activeWidth * (y - prevY);
    }

    const l = xIndex.get(x1);
    const r = xIndex.get(x2);
    const delta = type === 0 ? 1 : -1;

    for (let i = l; i < r; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += delta;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) activeWidth += widths[i];
      if (wasActive && !isActive) activeWidth -= widths[i];
    }
    prevY = y;
  }

  // Second sweep: find split line
  intervals.fill(0);
  activeWidth = 0;
  prevY = events[0][0];
  let currArea = 0;
  const halfArea = totalArea / 2;

  for (const [y, type, x1, x2] of events) {
    if (y > prevY) {
      const area = activeWidth * (y - prevY);
      if (currArea + area >= halfArea) {
        return prevY + (halfArea - currArea) / activeWidth;
      }
      currArea += area;
    }

    const l = xIndex.get(x1);
    const r = xIndex.get(x2);
    const delta = type === 0 ? 1 : -1;

    for (let i = l; i < r; i++) {
      const wasActive = intervals[i] > 0;
      intervals[i] += delta;
      const isActive = intervals[i] > 0;

      if (!wasActive && isActive) activeWidth += widths[i];
      if (wasActive && !isActive) activeWidth -= widths[i];
    }
    prevY = y;
  }

  return events[events.length - 1][0];
};