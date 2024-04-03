/**
 * 79. Word Search
 * Difficulty: Medium
 * 
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or 
vertically neighboring. The same letter cell may not be used more than once.

Example 1:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
Constraints:
m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
Follow up: Could you use search pruning to make your solution faster with a larger board?
 */

/**
 * Intuition
The problem can be solved by traversing the grid and performing a depth-first search (DFS) for each possible starting position. 
At each cell, we check if the current character matches the corresponding character of the word. 
If it does, we explore all four directions (up, down, left, right) recursively until we find the complete word or exhaust all possibilities.

Approach
1. Implement a recursive function backtrack that takes the current position (i, j) in the grid and the current index k of the word.
2.Base cases:
If k equals the length of the word, return True, indicating that the word has been found.
If the current position (i, j) is out of the grid boundaries or the character at (i, j) does not match 
the character at index k of the word, return False.
3.Mark the current cell as visited by changing its value or marking it as empty.
4. Recursively explore all four directions (up, down, left, right) by calling backtrack 
with updated positions (i+1, j), (i-1, j), (i, j+1), and (i, j-1).
5.If any recursive call returns True, indicating that the word has been found, return True.
6. If none of the recursive calls returns True, reset the current cell to its original value and return False.
7. Iterate through all cells in the grid and call the backtrack function for each cell. If any call returns True, return True, 
indicating that the word exists in the grid. Otherwise, return False.
Complexity
Time complexity:
O(m∗n∗4l)O(m * n * 4^l)O(m∗n∗4 l), where m and n are the dimensions of the grid and l is the length of the word. The 4l4^l4 l factor 
represents the maximum number of recursive calls we may have to make for each starting cell.
Space complexity:
O(l)O(l)O(l), where l is the length of the word. The space complexity is primarily due to the recursive stack depth during the DFS traversal.
 */

var exist = function(board, word) {
    const m = board.length;
    const n = board[0].length;
    
    const backtrack = (i, j, k) => {
        if (k === word.length) {
            return true;
        }
        if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word.charAt(k)) {
            return false;
        }
        
        const temp = board[i][j];
        board[i][j] = '\0'; 
        
        const result = backtrack(i + 1, j, k + 1) || 
                       backtrack(i - 1, j, k + 1) || 
                       backtrack(i, j + 1, k + 1) || 
                       backtrack(i, j - 1, k + 1);
        
        board[i][j] = temp; 
        return result;
    };
    
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (backtrack(i, j, 0)) {
                return true;
            }
        }
    }
    return false;
};