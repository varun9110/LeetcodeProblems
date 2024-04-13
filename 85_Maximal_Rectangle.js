/**
 * 85. Maximal Rectangle
 * Difficulty: Hard
 * 
 * Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

Example 1:
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:
Input: matrix = [["0"]]
Output: 0
Example 3:
Input: matrix = [["1"]]
Output: 1

Constraints:
rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'.
 */

/**
 * Approach
Check if the input matrix is empty, if it is return 0.

Determine the number of columns in the matrix (n) by getting the length of the first row of the matrix.

Create a list called heights, with n+1 elements, and initialize each element to 0.

Create a variable called max_area and initialize it to 0.

For each row in the matrix, do the following:

Iterate through each column in the row, and update the corresponding height in the "heights" list.
If the character in the matrix is "1", increment the corresponding height in the "heights" list by 1, otherwise set it to 0.
Create an empty stack and add -1 to it.

For each element in the "heights" list, do the following:

Compare the current height to the height of the top element in the stack.
If the current height is less than the height of the top element of the stack, do the following:
Pop the top element of the stack and calculate the area of the rectangle formed by the popped height.
Calculate the width of the rectangle by subtracting the index of the current element from the index of the new top element of the stack.
Calculate the area of the rectangle by multiplying the height and width.
Update the maximum area seen so far if the area of the current rectangle is larger than the current maximum.
Append the index of the current element to the stack.
Return the maximum area seen so far.

Complexity
Time complexity: O(m*n)
m is the number of rows in the input matrix and n is the number of columns. This is because 
we have to iterate through each element in the matrix at least once, and the time it takes to process each element is constant.

Space complexity: O(n)
n is the number of columns in the matrix. This is because we are creating a "heights" list with n+1 elements, 
and a stack that could have up to n+1 elements. The rest of the variables used in the 
algorithm are constants and do not contribute significantly to the space complexity.

 */

/**
 * @param {character[][]} matrix
 * @return {number}
 */

var maximalRectangle = function(matrix) {
    if (!matrix.length) {
        return 0;
    }
    
    const n = matrix[0].length;
    const heights = new Array(n + 1).fill(0);
    let maxArea = 0;
    
    for (let row of matrix) {
        for (let i = 0; i < n; i++) {
            heights[i] = row[i] === '1' ? heights[i] + 1 : 0;
        }
        
        const stack = [-1];
        for (let i = 0; i < n + 1; i++) {
            while (heights[i] < heights[stack[stack.length - 1]]) {
                const h = heights[stack.pop()];
                const w = i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
    }
    
    return maxArea;    
};