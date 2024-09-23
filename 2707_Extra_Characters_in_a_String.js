/**
 * 2707. Extra Characters in a String
 * Difficulty: Medium
 * 
 * You are given a 0-indexed string s and a dictionary of words dictionary. 
 * You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. 
 * There may be some extra characters in s which are not present in any of the substrings.

Return the minimum number of extra characters left over if you break up s optimally.

Example 1:
Input: s = "leetscode", dictionary = ["leet","code","leetcode"]
Output: 1
Explanation: We can break s in two substrings: "leet" from index 0 to 3 and "code" from index 5 to 8. 
There is only 1 unused character (at index 4), so we return 1.

Example 2:
Input: s = "sayhelloworld", dictionary = ["hello","world"]
Output: 3
Explanation: We can break s in two substrings: "hello" from index 3 to 7 and "world" from index 8 to 12. 
The characters at indices 0, 1, 2 are not used in any substring and thus are considered as extra characters. Hence, we return 3.
 

Constraints:

1 <= s.length <= 50
1 <= dictionary.length <= 50
1 <= dictionary[i].length <= 50
dictionary[i] and s consists of only lowercase English letters
dictionary contains distinct words
 */

/**
 * Intuition
We are given a string s and a dictionary of words. The problem requires us to break s into valid words from the dictionary while 
minimizing the number of extra characters that cannot form valid words. This problem can be thought of as a dynamic programming (DP) 
problem where we aim to minimize "extra" characters by finding the optimal partition of the string using the words from the dictionary.

Approach
Dynamic Programming Setup:

We define a DP array dp[i], where dp[i] represents the minimum number of extra characters in the substring s[0:i].
Transition:

For each index i, we check all possible substrings s[j:i] where 0 <= j < i and determine if the substring is a valid word in the dictionary.
If the substring s[j:i] is found in the dictionary, we update dp[i] = min(dp[i], dp[j]).
Additionally, we update dp[i] = min(dp[i], dp[i-1] + 1) to account for the case where the current character s[i-1] is considered extra.
Final Answer:

The answer will be stored in dp[n], where n is the length of the string s.
Complexity
Time complexity:
O(n 
2
 ), where (n) is the length of the string s. For each index i, we check all possible substrings, which leads to a quadratic time complexity.
Space complexity:
O(n+d), where (n) is the length of the string s and (d) is the size of the dictionary. The space is used for the DP array and storing the dictionary in a set.
 */

/**
 * @param {string} s
 * @param {string[]} dictionary
 * @return {number}
 */
var minExtraChar = function(s, dictionary) {
    let dict = new Set(dictionary); // Store dictionary in a set for O(1) lookup
    let n = s.length;
    let dp = new Array(n + 1).fill(n); // DP array initialized with maximum extra characters
    dp[0] = 0; // No extra characters for an empty string

    // Iterate through the string
    for (let i = 1; i <= n; i++) {
        // Try all substrings ending at i
        for (let j = 0; j < i; j++) {
            let sub = s.substring(j, i); // Get substring s[j:i]
            if (dict.has(sub)) {
                dp[i] = Math.min(dp[i], dp[j]); // If substring found in dictionary
            }
        }
        dp[i] = Math.min(dp[i], dp[i - 1] + 1); // Consider current character as extra
    }

    return dp[n]; // Return the result from dp[n]
};