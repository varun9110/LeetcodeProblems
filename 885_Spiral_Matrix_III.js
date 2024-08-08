/**
 * 885. Spiral Matrix III
 * Difficulty: Medium
 * 
 * You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner is at the first row and column in the grid, 
 * and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you move outside the grid's boundary, 
we continue our walk outside the grid (but may return to the grid boundary later.). Eventually, we reach all rows * cols spaces of the grid.

Return an array of coordinates representing the positions of the grid in the order you visited them.

Example 1:
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]
Example 2:
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],
[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]
 
Constraints:
1 <= rows, cols <= 100
0 <= rStart < rows
0 <= cStart < cols
 */

/**
 * Intuition
Building upon our understanding from the previous approach, we can further refine our strategy for solving the Spiral Matrix III problem. 
While the core concept of generating a spiral pattern remains the same, this alternative approach takes a different perspective on managing the spiral's progression.
The key insight here is to view the spiral not as a series of directional movements, but as a set of expanding boundaries.
 Imagine drawing a box around our starting point and then systematically expanding this box outward. As we expand, 
 we traverse the perimeter of this box, but only within the confines of our actual grid.
This boundary-based thinking leads to a more structured approach, where we can clearly define the limits of our spiral at each step. 
It also allows us to pre-calculate the valid ranges for each directional movement, potentially reducing the number of boundary checks we need to perform.

Approach
Our approach to solving this problem involves simulating the spiral movement while efficiently tracking our position and the visited cells. 
Here's a detailed breakdown of the solution:

Initialization:
We start by setting up our data structures and initial state:

Create a 2D array path to store the sequence of visited positions.
Initialize boundary variables (leftBound, rightBound, topBound, bottomBound) to keep track of the extent of our spiral.
Set a currentIndex to keep track of how many valid positions we've recorded.
Main Loop:
We enter a main loop that continues until we've visited all cells in the grid. In each iteration, 
we perform four movements corresponding to the four directions of the spiral:

a. Move East (Right):

We traverse from leftBound + 1 to rightBound, staying within the grid's column bounds.
We add each valid position to our path.
After this movement, we expand our bottomBound.
b. Move South (Down):

We traverse from topBound + 1 to bottomBound, staying within the grid's row bounds.
We add each valid position to our path.
After this movement, we contract our leftBound.
c. Move West (Left):

We traverse from rightBound - 1 to leftBound, staying within the grid's column bounds.
We add each valid position to our path.
After this movement, we contract our topBound.
d. Move North (Up):

We traverse from bottomBound - 1 to topBound, staying within the grid's row bounds.
We add each valid position to our path.
After this movement, we expand our rightBound.
Boundary Checks:
Before each directional movement, we check if the movement would be within or touch the grid:

For eastward movement: topBound >= 0
For southward movement: rightBound < cols
For westward movement: bottomBound < rows
For northward movement: leftBound >= 0
These checks ensure we don't unnecessarily compute positions that are entirely outside the grid.
Position Recording:
As we traverse in each direction, we only record positions that are within the grid boundaries. 
This is done efficiently in the directional traversal methods (traverseEast, traverseSouth, traverseWest, traverseNorth).

Termination:
After each directional movement, we check if we've recorded all the required positions (currentIndex >= totalCells). If so, we break out of the main loop.

Return Result:
Once we've visited all cells or completed our spiral, we return the path array containing all the recorded positions.

Key Aspects of the Approach:

Boundary Management:
The use of leftBound, rightBound, topBound, and bottomBound variables is crucial. 
These variables effectively represent the "bounding box" of our spiral at any given moment. After each directional movement,
 we adjust these boundaries, which naturally expands our spiral.

Efficient Position Recording:
By checking grid boundaries in our traversal methods, we ensure that we only record valid positions. 
This eliminates the need for additional checks when adding positions to our path.

Directional Traversal:
The four traversal methods (traverseEast, traverseSouth, traverseWest, traverseNorth) encapsulate the logic for moving in each direction. 
This modular approach makes the code more readable and maintainable.

Early Termination:
By checking if we've recorded all required positions after each directional movement, 
we can terminate the process as soon as we've visited all grid cells, avoiding unnecessary computations.

Flexibility:
This approach works regardless of the starting position or grid size. It naturally handles cases where the starting position is not at the grid's corner or center.

Implementation Details:

The initializeBounds method sets up the initial state of our boundaries based on the starting position. 
We initialize rightBound to cStart + 1 to prepare for the first eastward movement.

The addToPath method encapsulates the logic of adding a position to our path and incrementing the currentIndex. 
This abstraction simplifies the traversal methods and centralizes the position recording logic.

In each traversal method, we use a for-loop to move along the current edge of our spiral. 
The loop bounds are carefully chosen to respect both the spiral's current extent and the grid's boundaries.

The main spiralMatrixIII method orchestrates the entire process, calling the appropriate traversal methods and adjusting boundaries as needed.

Complexity
Time Complexity: O(max(rows, cols)^2)

The time complexity of this solution is quadratic in terms of the larger dimension of the grid. Here's why:

In the worst case, we need to visit all cells in the grid, which is rows * cols.
However, our spiral pattern extends beyond the grid boundaries.
The number of steps in each direction increases by 1 after every two movements (right-down or left-up).
The maximum number of steps in any direction is bounded by max(rows, cols).
Therefore, the total number of positions we consider (including those outside the grid) is proportional to max(rows, cols)^2.
It's important to note that while we consider positions outside the grid, we only record positions within the grid. 
This means that for a very large grid with a starting position near the center, we might approach O(rows * cols) operations. 
However, for the general case and especially when starting near a corner, the O(max(rows, cols)^2) bound holds.

Space Complexity: O(rows * cols)

The space complexity is linear in terms of the total number of cells in the grid:

We create a 2D array path to store all the visited positions within the grid.
The size of this array is exactly rows * cols, as we need to visit every cell in the grid exactly once.
Besides the path array, we only use a constant amount of additional space for our boundary variables and loop counters.
Note that while our spiral pattern extends beyond the grid, we only store positions that fall within the grid boundaries. 
This keeps our space complexity directly proportional to the size of the input grid, regardless of how far our spiral extends beyond it.
 */

/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rStart
 * @param {number} cStart
 * @return {number[][]}
 */
var spiralMatrixIII = function (rows, cols, rStart, cStart) {
    const totalCells = rows * cols;
    const path = [];
    let [leftBound, rightBound, topBound, bottomBound] = [cStart, cStart + 1, rStart, rStart];

    const addToPath = (row, col) => {
        if (row >= 0 && row < rows && col >= 0 && col < cols) {
            path.push([row, col]);
        }
    };

    const traverseEast = (start, end) => {
        for (let i = start; i <= end; i++) addToPath(topBound, i);
    };

    const traverseWest = (start, end) => {
        for (let i = start; i >= end; i--) addToPath(bottomBound, i);
    };

    const traverseSouth = (start, end) => {
        for (let i = start; i <= end; i++) addToPath(i, rightBound);
    };

    const traverseNorth = (start, end) => {
        for (let i = start; i >= end; i--) addToPath(i, leftBound);
    };

    addToPath(rStart, cStart);

    while (path.length < totalCells) {
        if (topBound >= 0) traverseEast(Math.max(0, leftBound + 1), Math.min(cols - 1, rightBound));
        bottomBound++;
        if (path.length >= totalCells) break;

        if (rightBound < cols) traverseSouth(Math.max(0, topBound + 1), Math.min(rows - 1, bottomBound));
        leftBound--;
        if (path.length >= totalCells) break;

        if (bottomBound < rows) traverseWest(Math.min(cols - 1, rightBound - 1), Math.max(0, leftBound));
        topBound--;
        if (path.length >= totalCells) break;

        if (leftBound >= 0) traverseNorth(Math.min(rows - 1, bottomBound - 1), Math.max(0, topBound));
        rightBound++;
        if (path.length >= totalCells) break;
    }

    return path;
};