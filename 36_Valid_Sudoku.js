/**
 * 36. Valid Sudoku
 * Difficulty: Medium
 * 
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
 */

/**
 * Intuition
The problem asks us to check whether a given partially filled Sudoku board is valid.
The key observation is that a Sudoku is valid only if:
No digit is repeated in the same row.
No digit is repeated in the same column.
No digit is repeated in the same 3×3 sub-box.
So instead of solving the whole Sudoku, we just need to verify these constraints for the already filled cells.
The idea is to keep track of which numbers have appeared in each row, column, and box while scanning the board.
If a number appears again in the same row, column, or box, the board is invalid.
Approach
Create three 2D boolean arrays:
rows[9][9] → to track digits seen in each row.
cols[9][9] → to track digits seen in each column.
boxes[9][9] → to track digits seen in each 3×3 sub-box.
Iterate over each cell (i, j) in the board:
If the cell is empty ('.'), skip it.
Otherwise, convert the character digit into an integer index
num = board[i][j] - '1' (so '1' → 0, '9' → 8).
Compute the box index: boxIndex = (i / 3) * 3 + (j / 3) (this uniquely identifies each of the 9 sub-boxes).
Check if the digit num is already present in:
rows[i][num], or
cols[j][num], or
boxes[boxIndex][num].
If yes, return false because it violates Sudoku rules.
Otherwise, mark the digit as seen:
rows[i][num] = cols[j][num] = boxes[boxIndex][num] = true;
After scanning the entire board, if no conflicts are found, return true.
Complexity
Time complexity: O (1)
Space complexity: O (1)
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const rows = Array.from({ length: 9 }, () => Array(9).fill(false));
    const cols = Array.from({ length: 9 }, () => Array(9).fill(false));
    const boxes = Array.from({ length: 9 }, () => Array(9).fill(false));

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] !== '.') {
                let num = board[i][j].charCodeAt(0) - '1'.charCodeAt(0);
                let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

                if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
                    return false;
                }

                rows[i][num] = cols[j][num] = boxes[boxIndex][num] = true;
            }
        }
    }
    return true;
};