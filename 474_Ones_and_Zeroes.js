/**
 * 474. Ones and Zeroes
 * Difficulty: Medium
 * 
 * You are given an array of binary strings strs and two integers m and n.

Return the size of the largest subset of strs such that there are at most m 0's and n 1's in the subset.

A set x is a subset of a set y if all elements of x are also elements of y.

 

Example 1:

Input: strs = ["10","0001","111001","1","0"], m = 5, n = 3
Output: 4
Explanation: The largest subset with at most 5 0's and 3 1's is {"10", "0001", "1", "0"}, so the answer is 4.
Other valid but smaller subsets include {"0001", "1"} and {"10", "1", "0"}.
{"111001"} is an invalid subset because it contains 4 1's, greater than the maximum of 3.
Example 2:

Input: strs = ["10","0","1"], m = 1, n = 1
Output: 2
Explanation: The largest subset is {"0", "1"}, so the answer is 2.
 

Constraints:

1 <= strs.length <= 600
1 <= strs[i].length <= 100
strs[i] consists only of digits '0' and '1'.
1 <= m, n <= 100
 */

/**
 * Intuition
This problem is a 0/1 Knapsack variant:

Each string s is like an item.

It has a cost:

zeros = s.count('0')

ones = s.count('1')

It has a value = 1 (since choosing this string increases the count of strings by 1).

You have a two-dimensional capacity constraint:

Total zeros ≤ m

Total ones ≤ n

The goal is to maximize the number of strings you can include.

So, we need to find the largest subset of strs such that the total zeros ≤ m and total ones ≤ n.

Approach
There are two versions:

Python Version (Dictionary-based DP)
It uses a dictionary (dp) where keys are (zeros_used, ones_used) pairs.

dp[(z, o)] = maximum number of strings that can be formed using exactly z zeros and o ones.

Algorithm steps:
Initialize dp = {(0, 0): 0} (0 strings with 0 zeros and 0 ones).

For each string:

Count zeros and ones.

For every state (z, o) already in dp, try adding this string (if within limits).

Update new_dp[(z + zeros, o + ones)] = max(existing, dp[(z, o)] + 1).

After processing all strings, the answer is max(dp.values()).

This approach explores all valid combinations of (zeros, ones) up to (m, n).

JavaScript Version (2D DP array)
This is a more traditional 2D bottom-up DP approach.

dp[j][k] = max number of strings that can be formed with j zeros and k ones.

For each string:

Count its zeros and ones.

Iterate backward through j = M → zeros and k = N → ones (to avoid overwriting results from the same iteration).

Update:

p[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1)
Finally, dp[M][N] contains the answer.

Backward iteration ensures that each string is used at most once (0/1 knapsack rule).

Complexity
Time complexity:
O(L×m×n)

Space complexity:
O(m×n)
 */

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function(strs, m, n) {
    let dp = Array.from({length:m+1},() => new Uint8Array(n+1))
    for (let i = 0; i < strs.length; i++) {
        let str = strs[i], zeros = 0, ones = 0
        for (let j = 0; j < str.length; j++)
            str.charAt(j) === "0" ? zeros++ : ones++
        for (let j = m; j >= zeros; j--)
            for (let k = n; k >= ones; k--)
                dp[j][k] = Math.max(dp[j][k], dp[j-zeros][k-ones] + 1)
    }
    return dp[m][n]
};