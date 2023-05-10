/**
 * 118. Pascal's Triangle
 * Difficulty: Easy
 * 
 * Given an integer numRows, return the first numRows of Pascal's triangle.
In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
Example 1:
Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:
Input: numRows = 1
Output: [[1]]

Constraints:
1 <= numRows <= 30
*/

/**
 * Approach:
 * taking the solution as the problem:
 * create the result array to the store the result in case the numRows is 1. then loop from 1 till the numRows.
 * In each iteration create a new array which will start calculating the sum of indexes from -1,0 till i-1,i.
 * now if the index is out of bounds then push 1 in the array, else the sum of the indexes. increase the count and len
 */

var generate = function (numRows) {
  let result = [[1]];
  for (let i = 1; i < numRows; i++) {
    let prev = result[i - 1];
    let count = -1;
    let len = 0;
    let pushA = [];
    while (len < prev.length + 1) {
      if (count < 0 || count >= prev.length - 1) {
        pushA.push(1);
      } else {
        pushA.push(prev[count] + prev[count + 1]);
      }
      count++;
      len++;
    }
    result.push(pushA);
  }
  return result;
};

/**
 * Similary approach but different way of coding
 */

var generate = function (numRows) {
  var i = 0;
  var j = 0;
  // Create an array list to store the output result...
  var res = [];
  // For generating each row of the triangle...
  for (i = 0; i < numRows; i++) {
    res.push(Array(i + 1)); // Initialize the first row of the pascal triangle as {1}...
    for (j = 0; j <= i; j++) {
      // Primary...
      if (j === 0 || j === i) {
        res[i][j] = 1;
      } else {
        // Calculate the elements of a row, add each pair of adjacent elements of the previous row in each step of the inner loop.
        res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
      }
    }
  }
  return res; // Return the output list of pascal values...
};
