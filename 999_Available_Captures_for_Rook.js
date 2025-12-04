/**
 * 999. Available Captures for Rook
 * Difficulty: Easy
 * 
 * You are given an 8 x 8 matrix representing a chessboard. There is exactly one white rook represented by 'R', some number of white bishops 'B', and some number of black pawns 'p'. Empty squares are represented by '.'.

A rook can move any number of squares horizontally or vertically (up, down, left, right) until it reaches another piece or the edge of the board. A rook is attacking a pawn if it can move to the pawn's square in one move.

Note: A rook cannot move through other pieces, such as bishops or pawns. This means a rook cannot attack a pawn if there is another piece blocking the path.

Return the number of pawns the white rook is attacking.

 

Example 1:


Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 3

Explanation:

In this example, the rook is attacking all the pawns.

Example 2:


Input: board = [[".",".",".",".",".",".","."],[".","p","p","p","p","p",".","."],[".","p","p","B","p","p",".","."],[".","p","B","R","B","p",".","."],[".","p","p","B","p","p",".","."],[".","p","p","p","p","p",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 0

Explanation:

The bishops are blocking the rook from attacking any of the pawns.

Example 3:


Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","p",".",".",".","."],["p","p",".","R",".","p","B","."],[".",".",".",".",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 3

Explanation:

The rook is attacking the pawns at positions b5, d6, and f5.

 

Constraints:

board.length == 8
board[i].length == 8
board[i][j] is either 'R', '.', 'B', or 'p'
There is exactly one cell with board[i][j] == 'R'
 * 
 */

/**
 * Intuition
The problem involves finding the number of pawns that a rook can capture on a chessboard. To solve this, we need to check the row and column of the rook's position in all four directions: up, down, left, and right.

Approach
Iterate through the chessboard to find the position of the rook ('R').
For each direction (up, down, left, right), check if there is a pawn ('p') that the rook can capture. If there is, increment the count.
If there is a bishop ('B') blocking the path in any direction, stop checking in that direction.
Complexity
Time complexity: O(n), where n is the number of cells in the chessboard (assuming a constant board size of 8x8).
Space complexity: O(1), as we are using a constant amount of extra space regardless of the input size.
 */

/**
 * @param {character[][]} board
 * @return {number}
 */
var numRookCaptures = function(board) {
    let count = 0;
    for(let i=0;i<board.length;i++){
        for(let j=0;j<board[0].length;j++){
            if(board[i][j] == 'R'){
                    count += upCheck(i,j,board) ? 1 : 0;
                    count += downCheck(i,j,board) ? 1 : 0;
                    count += rightCheck(i,j,board) ? 1 : 0;
                    count += leftCheck(i,j,board) ? 1: 0;
                }
            }
        }
        return count;
    };
    var upCheck = function(m,n,board){
        for(let i=m;i>=0;i--){
            if(board[i][n] == 'p') {
                return true;
            }
            else if(board[i][n] == 'B'){
                return false;
            }
        }
        return false;
    };
    var downCheck = function(m,n,board){
        for(let i=m;i<8;i++){
            if(board[i][n] == 'p') {
                return true;
            }
            else if(board[i][n] == 'B'){
                return false;
            }
        }
        return false;
    };var leftCheck = function(m,n,board){
        for(let i=n;i>=0;i--){
            if(board[m][i] == 'p') {
                return true;
            }
            else if(board[m][i] == 'B'){
                return false;
            }
        }
        return false;
    };var rightCheck = function(m,n,board){
        for(let i=n;i<8;i++){
            if(board[m][i] == 'p') {
                return true;
            }
            else if(board[m][i] == 'B'){
                return false;
            }
        }
        return false;
    };