/**
*37. Sudoku Solver
Difficulty: Hard

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

 

Example 1:


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:


 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.
*/

/**
*
Intuition
Sudoku is a constraint satisfaction problem where we need to fill a 9×9 grid so that each row, column, and 3×3 subgrid contains digits 1–9 without repetition.
Since multiple cells may be empty, the problem requires exploring possible values systematically.
The natural way is backtracking, which tries numbers one by one, validates them, and backtracks when a conflict arises.

Approach
Traverse the board to locate an empty cell (.).

For that cell, attempt placing numbers 1–9.

Before placing a number, ensure it is valid:

Not already present in the same row.
Not already present in the same column.
Not already present in the same 3×3 subgrid.
If valid, place the number and recursively solve the next cell.

If no valid number exists, backtrack by resetting the cell and trying another digit.

Continue until all cells are filled, at which point the puzzle is solved.

Complexity
Time Complexity:
Worst case is exponential O(9^n), where n is the number of empty cells.
But pruning (validity checks) reduces unnecessary exploration, making it much faster in practice.

Space Complexity:
O(n²) due to recursion stack and storage for the board. Since Sudoku size is fixed (9×9), this is effectively constant space.
*/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    solve(board);
};

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === ".") {
                for (let num = 1; num <= 9; num++) {
                    let ch = num.toString();
                    if (isValid(board, row, col, ch)) {
                        board[row][col] = ch;
                        if (solve(board)) return true;
                        board[row][col] = "."; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }
    let startRow = Math.floor(row / 3) * 3;
    let startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) return false;
        }
    }
    return true;
}
