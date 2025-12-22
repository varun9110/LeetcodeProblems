/**
 * 960. Delete Columns to Make Sorted III
 * Difficulty: Hard
 * 
 * You are given an array of n strings strs, all of the same length.

We may choose any deletion indices, and we delete all the characters in those indices for each string.

For example, if we have strs = ["abcdef","uvwxyz"] and deletion indices {0, 2, 3}, then the final array after deletions is ["bef", "vyz"].

Suppose we chose a set of deletion indices answer such that after deletions, the final array has every string (row) in lexicographic order. (i.e., (strs[0][0] <= strs[0][1] <= ... <= strs[0][strs[0].length - 1]), and (strs[1][0] <= strs[1][1] <= ... <= strs[1][strs[1].length - 1]), and so on). Return the minimum possible value of answer.length.

 

Example 1:

Input: strs = ["babca","bbazb"]
Output: 3
Explanation: After deleting columns 0, 1, and 4, the final array is strs = ["bc", "az"].
Both these rows are individually in lexicographic order (ie. strs[0][0] <= strs[0][1] and strs[1][0] <= strs[1][1]).
Note that strs[0] > strs[1] - the array strs is not necessarily in lexicographic order.
Example 2:

Input: strs = ["edcba"]
Output: 4
Explanation: If we delete less than 4 columns, the only row will not be lexicographically sorted.
Example 3:

Input: strs = ["ghi","def","abc"]
Output: 0
Explanation: All rows are already lexicographically sorted.
 

Constraints:

n == strs.length
1 <= n <= 100
1 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.

 */

/**
 * Intuition
We want to delete the minimum number of columns so that the remaining columns form a lexicographically non-decreasing sequence for every row.
Instead of deciding which columns to delete directly, it is easier to find the maximum number of columns we can keep that satisfy this condition, then subtract from the total.

This becomes a Longest Increasing Subsequence (LIS) problem on columns, where a column j can come before column i if all rows satisfy strs[row][j] ≤ strs[row][i].

Approach
Let dp[i] be the length of the longest valid column sequence ending at column i.
Initialize dp[i] = 1 for all columns (each column alone is valid).
For every column i, try all previous columns j < i:
Check if column j can precede column i by comparing characters row by row.
If valid, update dp[i] = max(dp[i], dp[j] + 1).
The maximum value in dp represents the largest number of columns we can keep.
The answer is total_columns - max(dp).
Complexity
Time complexity:
O(m² × n)
where m is the number of columns and n is the number of rows.

Space complexity:
O(m) for the DP array.
 */

/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    const cols = strs[0].length;
    const rows = strs.length;
    const dp = Array(cols).fill(1);

    for (let c = 1; c < cols; c++) {
        for (let j = 0; j < c; j++) {
            let valid = true;
            for (let r = 0; r < rows; r++) {
                if (strs[r][j] > strs[r][c]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                dp[c] = Math.max(dp[c], dp[j] + 1);
            }
        }
    }

    return cols - Math.max(...dp);
};