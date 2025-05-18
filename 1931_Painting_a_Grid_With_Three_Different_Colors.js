/**
 * 1931. Painting a Grid With Three Different Colors
 * Difficulty: Hard
 * 
 * You are given two integers m and n. Consider an m x n grid where each cell is initially white. You can paint each cell red, green, or blue. All cells must be painted.

Return the number of ways to color the grid with no two adjacent cells having the same color. Since the answer can be very large, return it modulo 109 + 7.

Example 1:
Input: m = 1, n = 1
Output: 3
Explanation: The three possible colorings are shown in the image above.
Example 2:
Input: m = 1, n = 2
Output: 6
Explanation: The six possible colorings are shown in the image above.
Example 3:

Input: m = 5, n = 5
Output: 580986
 
Constraints:
1 <= m <= 5
1 <= n <= 1000
 */

/**
 * Intuition
Notice that one of the dimensions is far smaller than the other, which allows bitmasks. However we have 3 possible colors for a cell, therefore binary representations won't be much of an assistance.

Plan
We will build this row by row (or column by column, it is symmetrical).
As a representation, we will choose the base 3 of a number. Since m<=5 there are a total of 3^5 states.
After that we will need to figure out, given a row, which are the acceptable previous rows (states) that don't violate my conditions ( aka 2 same consecutive items, or an identical element in the same position between these 2 rows).
 */

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const mod = 1e9 + 7;
const colorTheGrid = (m, n) => {
    let valid = [];
    let a = Array(m).fill(0);
    outer:
    do { // get initial valid cases ways
        for (let i = 0; i < m - 1; i++) {
            if (a[i] == a[i + 1]) continue outer;
        }
        valid.push([...a]);
    } while (ok(a, 3));
    let vn = valid.length;
    let dp = Array(vn).fill(1); // initial state is 1 way, accumalate further ways for each state
    for (let i = 0; i < n - 1; i++) {
        let ndp = Array(vn).fill(0); // next dp array, update based on previous dp
        for (let j = 0; j < vn; j++) {
            mark:
            for (let k = 0; k < vn; k++) {
                let [aj, ak] = [valid[j], valid[k]];
                for (let l = 0; l < m; l++) {
                    if (aj[l] == ak[l]) continue mark;
                }
                ndp[k] += dp[j];
                ndp[k] %= mod;
            }
        }
        for (let j = 0; j < vn; j++) ndp[j] % mod;
        dp = ndp;
    }
    let res = 0;
    for (const e of dp) { // result is sum of ways of all based ways
        res += e;
        if (res >= mod) res -= mod;
    }
    return res;
};

const ok = (a, base) => {
    let n = a.length;
    let i;
    for (i = n - 1; ~i && a[i] == base - 1; i--);
    if (i == -1) return false;
    a[i]++;
    for (let k = i + 1; k < n; k++) a[k] = 0;
    return true;
};