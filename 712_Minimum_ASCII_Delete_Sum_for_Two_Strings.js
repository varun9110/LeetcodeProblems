/**
 * 712. Minimum ASCII Delete Sum for Two Strings
 * Difficulty: Medium
 * 
 * Given two strings s1 and s2, return the lowest ASCII sum of deleted characters to make two strings equal.

Example 1:

Input: s1 = "sea", s2 = "eat"
Output: 231
Explanation: Deleting "s" from "sea" adds the ASCII value of "s" (115) to the sum.
Deleting "t" from "eat" adds 116 to the sum.
At the end, both strings are equal, and 115 + 116 = 231 is the minimum sum possible to achieve this.
Example 2:

Input: s1 = "delete", s2 = "leet"
Output: 403
Explanation: Deleting "dee" from "delete" to turn the string into "let",
adds 100[d] + 101[e] + 101[e] to the sum.
Deleting "e" from "leet" adds 101[e] to the sum.
At the end, both strings are equal to "let", and the answer is 100+101+101+101 = 403.
If instead we turned both strings into "lee" or "eet", we would get answers of 433 or 417, which are higher.
 

Constraints:

1 <= s1.length, s2.length <= 1000
s1 and s2 consist of lowercase English letters.
 */

/**
 * Approach
I solved this using Dynamic Programming.

Step 1: Define DP state
I define:

dp[i][j] = minimum ASCII delete sum to make
s1[i:] and s2[j:] equal.

So dp[0][0] will be my final answer.

Step 2: Base cases
If s1 is finished, I must delete all remaining characters of s2.
If s2 is finished, I must delete all remaining characters of s1.
Step 3: Transition
Now I check characters at s1[i] and s2[j].

Case 1: Characters are equal
If s1[i] == s2[j], I don’t delete anything.

I simply move both pointers:

dp[i][j] = dp[i+1][j+1]
Case 2: Characters are different
I have two choices:

Delete s1[i]
Delete s2[j]
I take the minimum cost option:

dp[i][j] = min(
    ASCII(s1[i]) + dp[i+1][j],
    ASCII(s2[j]) + dp[i][j+1]
)
Step 4: Space Optimization
Instead of using a full 2D array, I optimized it to 1D DP because each row only depends on the next row.

This reduces space from O(n*m) to O(m).
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function(s1, s2) {
    const n = s1.length, m = s2.length;
    let dp = new Array(m + 1).fill(0);

    for (let j = m - 1; j >= 0; j--) {
        dp[j] = dp[j + 1] + s2.charCodeAt(j);
    }

    for (let i = n - 1; i >= 0; i--) {
        let prev = dp[m];
        dp[m] += s1.charCodeAt(i);

        for (let j = m - 1; j >= 0; j--) {
            let temp = dp[j];
            if (s1[i] === s2[j]) {
                dp[j] = prev;
            } else {
                dp[j] = Math.min(
                    s1.charCodeAt(i) + dp[j],
                    s2.charCodeAt(j) + dp[j + 1]
                );
            }
            prev = temp;
        }
    }
    return dp[0];
};