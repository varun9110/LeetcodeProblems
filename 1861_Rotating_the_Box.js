/**
 * 1861. Rotating the Box
 * Difficulty: Medium
 * 
 * You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following:

A stone '#'
A stationary obstacle '*'
Empty '.'
The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, 
another stone, or the bottom of the box. Gravity does not affect the obstacles' positions, and the inertia from the box's rotation does not 
affect the stones' horizontal positions.

It is guaranteed that each stone in box rests on an obstacle, another stone, or the bottom of the box.

Return an n x m matrix representing the box after the rotation described above. 
Example 1:
Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
Example 2:
Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
Example 3:
Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]

Constraints:

m == box.length
n == box[i].length
1 <= m, n <= 500
box[i][j] is either '#', '*', or '.'.
 */

/**
 * approach step by step
Gravity: Start on the right, For each row,
for row in box:
    dropPos = len(row) - 1  
Stone movement, scan from right to left
for currPos in range(len(row)-1, -1, -1):
Stone Movement, when hit some opstacle > reset position
if row[currPos] == "*":
    dropPos = currPos - 1
faind stone "#" > swap to drop position > Update drop pos for next stone
elif row[currPos] == "#":
    row[dropPos], row[currPos] = row[currPos], row[dropPos]
    dropPos -= 1
90' clock rotation, reverse rows
rotatedBox = zip(*box[::-1])
Done.
 */


var rotateTheBox = function(box) {
    for (let row of box) {
        let start = row.length - 1;
        for (let i = row.length - 1; i >= 0; i--) {
            if (row[i] === '*') {
                start = i - 1;
            } else if (row[i] === '#') {
                [row[start], row[i]] = [row[i], row[start]];
                start--;
            }
        }
    }
    
    const result = Array(box[0].length).fill()
        .map(() => Array(box.length).fill('.'));
    
    for (let i = 0; i < box.length; i++) {
        for (let j = 0; j < box[0].length; j++) {
            result[j][box.length - 1 - i] = box[i][j];
        }
    }
    
    return result;
};