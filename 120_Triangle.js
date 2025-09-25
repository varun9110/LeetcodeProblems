/**
 * 120. Triangle
 * Difficulty: Medium
 * 
 * Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
Example 2:

Input: triangle = [[-10]]
Output: -10
 

Constraints:

1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
 

Follow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?
 */

/**
 * Algorithm
The simplest way of implementing this is to overwrite the input (in-place).

When this algorithm has finished running, each cell (row,col) of the input triangle will be overwritten with the minimal path sum from the bottom of the triangle up to and including (row,col).

We need to be quite careful designing our algorithm: the rows and columns are all different sizes, greatly increasing the risk of off-by-one errors.

The rows are numbered from top to bottom (so the triangle tip is the first row), and the columns are numbered left to right.

Here is a diagram showing the (row,col) coordinate for a triangle with 4 rows.

Untitled-3.png

Instead of working from top to bottom, we use a bottom-up approach that starts from the last row and works upward. This allows us to build up the minimum path sums as we go.

For each cell (i,j) in our triangle (except the bottom row), we can reach two cells in the row below:

The cell directly below: (i+1,j)
The cell diagonally below-right: (i+1,j+1)
Since we're working bottom-up, when we process cell (i,j), the cells below it already contain their optimal path sums.

Putting everything together, we get the following algorithm.

anigif.gif

Iterate from bottom to top: Start from row n−2 (second-to-last row) and go up to row 0 (where n is the number of rows in triangle):

For each element in current row: Process all valid column indices from 0 to row inclusive:

Update with minimum path sum: For each element at position (i,j), replace it with the minimum of two possible paths:

• The sum of current element and the element directly below:

below=triangle[i][j]+triangle[i+1][j]
​
 
• The sum of current element and the element diagonally below-right:

belowRight=triangle[i][j]+triangle[i+1][j+1]
​
 
• Set current element:

triangle[i][j]=min(below,belowRight)
​
 
Finally, After processing all rows, triangle[0][0] contains the minimum path sum from top to bottom.
 */

/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function(triangle) {
    for (let i = triangle.length - 2; i >= 0; i--)
        for (let j = 0; j < triangle[i].length; j++)
            triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1])

    return triangle[0][0]
};