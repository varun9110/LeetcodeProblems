/**
 * 1812. Determine Color of a Chessboard Square
 * Difficulty: Easy
 * You are given coordinates, a string that represents the coordinates of a square of the chessboard. Below is a chessboard for your reference.
Return true if the square is white, and false if the square is black.
The coordinate will always represent a valid chessboard square. The coordinate will always have the letter first, and the number second.

Example 1:
Input: coordinates = "a1"
Output: false
Explanation: From the chessboard above, the square with coordinates "a1" is black, so return false.
Example 2:
Input: coordinates = "h3"
Output: true
Explanation: From the chessboard above, the square with coordinates "h3" is white, so return true.
Example 3:
Input: coordinates = "c7"
Output: false

Constraints:
coordinates.length == 2
'a' <= coordinates[0] <= 'h'
'1' <= coordinates[1] <= '8'
 */

/**
 * Approach:
 * On observation it was found that the sum of row and column amounts to a number. if the number is odd then it is white so return true else it is black hence
 * return false.
 */

var squareIsWhite = function (coordinates) {
  let mapper = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
  };
  let sum = mapper[coordinates[0]] + Number(coordinates[1]);
  return sum % 2 === 0 ? false : true;
};
