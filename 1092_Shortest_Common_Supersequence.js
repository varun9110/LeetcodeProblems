/**
 * 1092. Shortest Common Supersequence 
 * Difficulty: Hard
 * 
 * Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, 
 * return any of them.

A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

 

Example 1:

Input: str1 = "abac", str2 = "cab"
Output: "cabac"
Explanation: 
str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
The answer provided is the shortest such string that satisfies these properties.
Example 2:

Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
Output: "aaaaaaaa"
 

Constraints:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of lowercase English letters.
 */

/**
 * Intuition
When I first saw this problem, I realized that we need to find a string that contains both input strings as subsequences. 
The naive approach would be to simply concatenate the two strings, but that's inefficient. A better approach would be to 
find the common parts between the two strings and avoid duplicating them.

Approach
First, I find the Longest Common Subsequence (LCS) of the two strings using dynamic programming. 
The LCS represents characters that appear in both strings in the same order.
Then, I construct the Shortest Common Supersequence by:
Starting from the end of both strings and working backwards
If the characters from both strings match, I include it only once
If they differ, I include characters from both strings
Finally, I add any remaining characters from either string
Reverse the constructed string to get the final answer.
For example, with "abac" and "cab":
Build a DP table to find the LCS
Trace back through the table to build the supersequence
The result is "cabac" which contains both "abac" and "cab" as subsequences
Complexity
Time complexity: O(m*n)
Space complexity: O(m*n)
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function(str1, str2) {
    // Step 1: Find the longest common subsequence using dynamic programming
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    // Fill the dp table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Step 2: Construct the shortest common supersequence
    // Start from the bottom right of the dp table
    let i = m, j = n;
    let result = [];
    
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            // If the characters are the same, add it once
            result.push(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            // If coming from top has higher value, take character from str1
            result.push(str1[i - 1]);
            i--;
        } else {
            // Otherwise, take character from str2
            result.push(str2[j - 1]);
            j--;
        }
    }
    
    // Add remaining characters from str1 (if any)
    while (i > 0) {
        result.push(str1[i - 1]);
        i--;
    }
    
    // Add remaining characters from str2 (if any)
    while (j > 0) {
        result.push(str2[j - 1]);
        j--;
    }
    
    // Reverse the result to get the final supersequence
    return result.reverse().join('');
};