/**
 * 3127. Make a Square with the Same Color
 * Difficulty: Easy 
 * 
 * You are given a 2D matrix grid of size 3 x 3 consisting only of characters 'B' and 'W'. Character 'W' represents the white color, 
 * and character 'B' represents the black color.

Your task is to change the color of at most one cell so that the matrix has a 2 x 2 square where all cells are of the same color.

Return true if it is possible to create a 2 x 2 square of the same color, otherwise, return false.

Example 1:
Input: grid = [["B","W","B"],["B","W","W"],["B","W","B"]]
Output: true
Explanation:
It can be done by changing the color of the grid[0][2].
Example 2:
Input: grid = [["B","W","B"],["W","B","W"],["B","W","B"]]
Output: false
Explanation:
It cannot be done by changing at most one cell.
Example 3:
Input: grid = [["B","W","B"],["B","W","W"],["B","W","W"]]
Output: true
Explanation:
The grid already contains a 2 x 2 square of the same color.
 */


/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var canMakeSquare = function(grid) {
    for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                let m = new Map();
                m.set(grid[i][j], (m.get(grid[i][j]) || 0) + 1);
                m.set(grid[i][j+1], (m.get(grid[i][j+1]) || 0) + 1);
                m.set(grid[i+1][j], (m.get(grid[i+1][j]) || 0) + 1);
                m.set(grid[i+1][j+1], (m.get(grid[i+1][j+1]) || 0) + 1);

                if (m.get('B') !== 2 && m.get('W') !== 2) return true;
            }
        }
        return false;
};


/**
 * @param {character[][]} grid
 * @return {boolean}
 */
var canMakeSquare = function(grid) {
    for (let i = 0; i < grid.length-1; i++){
        for (let j = 0; j < grid[0].length-1; j++){
            let whiteColorCount = 0
            let blackColorCount = 0
            
            /*
             This is my diagram of square
             
             a b
             c d
             
            */

            let a = grid[i][j]
            let b = grid[i][j+1]
            let c = grid[i+1][j]
            let d = grid[i+1][j+1]
            
            if (a === 'W') whiteColorCount++
            if (a === 'B') blackColorCount++
            
            if (b === 'W') whiteColorCount++
            if (b === 'B') blackColorCount++
            
            if (c === 'W') whiteColorCount++
            if (c === 'B') blackColorCount++
            
            if (d === 'W') whiteColorCount++
            if (d === 'B') blackColorCount++
            
            if (whiteColorCount > 2) return true
            if (blackColorCount > 2) return true
        }
    }
    
    return false
}