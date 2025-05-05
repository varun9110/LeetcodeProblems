/**
 * 790. Domino and Tromino Tiling
 * Difficulty: Medium
 * 
 * You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.

Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on 
the board such that exactly one of the tilings has both squares occupied by a tile.

Example 1:

Input: n = 3
Output: 5
Explanation: The five different ways are show above.
Example 2:

Input: n = 1
Output: 1
 
Constraints:
1 <= n <= 1000
 */

/**
 * Intuition
We want to figure out how many ways we can tile a 2 × n board using dominos and trominos.
A domino can cover 2 vertical cells or 2 horizontal cells.
A tromino (shaped like an "L") can fill 3 cells.
Approach
If we place a vertical domino at the end → Remaining: 2 x (n-1) board (dp[n-1])
If we place two horizontal dominos → Remaining: 2 x (n-2) board (dp[n-2])
If we place a tromino → Tromino covers 3 cells, so Remaining: 2 x (n-3) board (dp[n-3])
Thus: dp[n]=2×dp[n−1]+dp[n−3]
The 2 * dp[n-1] covers adding a vertical domino or flipping an L-shaped tromino.
The dp[n-3] covers cases with a tromino.
Complexity
Time complexity:

O(n)
Space complexity:

O(n)
 */

/**
 * @param {number} n
 * @return {number}
 */
var numTilings = function (n) {
    const MOD = 1e9 + 7;
    if (n === 1) return 1;
    if (n === 2) return 2;

    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // 1 way to fill empty board
    dp[1] = 1;  // 1 way for n = 1 (vertical domino)
    dp[2] = 2;  // 2 ways for n = 2 (two vertical dominos OR two horizontal dominos)

    for (let i = 3; i <= n; i++) {
        dp[i] = (2 * dp[i - 1] + dp[i - 3]) % MOD;
    }

    return dp[n];
};