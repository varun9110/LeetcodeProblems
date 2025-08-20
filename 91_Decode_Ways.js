/**
 * 91. Decode Ways
 * Difficulty: Medium
 * 
 * You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

"1" -> 'A'

"2" -> 'B'

...

"25" -> 'Y'

"26" -> 'Z'

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").

For example, "11106" can be decoded into:

"AAJF" with the grouping (1, 1, 10, 6)
"KJF" with the grouping (11, 10, 6)
The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

The test cases are generated so that the answer fits in a 32-bit integer.

 

Example 1:

Input: s = "12"

Output: 2

Explanation:

"12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:

Input: s = "226"

Output: 3

Explanation:

"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:

Input: s = "06"

Output: 0

Explanation:

"06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.

 

Constraints:

1 <= s.length <= 100
s contains only digits and may contain leading zero(s).
 */

/**
 * Intuition
The problem can be solved using dynamic programming. We can define a dynamic programming array dp, where dp[i] represents the number of ways to decode the substring s[:i]. We can iterate through the string and update the dp array based on the current digit and the previous digits.
Approach
1. Check if the input string s is empty or starts with '0'. If so, return 0 because a valid decoding is not possible.
2. Initialize a dynamic programming array dp of size n + 1, where n is the length of the input string. Set dp[0] and dp[1] to 1, as there is one way to decode an empty string and a string of length 1.
3. Iterate through the string starting from index 2 up to n + 1.
Convert the current one-digit and two-digit substrings to integers.
If the one-digit substring is not '0', update dp[i] by adding dp[i - 1] because we can consider the current digit as a single character.
If the two-digit substring is between 10 and 26 (inclusive), update dp[i] by adding dp[i - 2] because we can consider the current two digits as a single character.
4.The final result is stored in dp[n], where n is the length of the input string.
Complexity
Time complexity:
O(n) where n is the length of the input string. We iterate through the string once.
Space complexity:
O(n) for the dynamic programming array dp.
 */

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    if (!s || s[0] === '0') {
        return 0;
    }

    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;

    for (let i = 2; i <= n; ++i) {
        const oneDigit = parseInt(s[i - 1]);
        const twoDigits = parseInt(s.substring(i - 2, i));

        if (oneDigit !== 0) {
            dp[i] += dp[i - 1];
        }

        if (10 <= twoDigits && twoDigits <= 26) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
};