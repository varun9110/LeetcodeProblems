/**
 * 1415. The k-th Lexicographical String of All Happy Strings of Length n
 * Difficulty: Medium
 * 
 * A happy string is a string that:

consists only of letters of the set ['a', 'b', 'c'].
s[i] != s[i + 1] for all values of i from 1 to s.length - 1 (string is 1-indexed).
For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings and strings "aa", "baa" and "ababbc" are not 
happy strings.

Given two integers n and k, consider a list of all happy strings of length n sorted in lexicographical order.
Return the kth string of this list or return an empty string if there are less than k happy strings of length n.

Example 1:
Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".
Example 2:

Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.
Example 3:

Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9th string = "cab"
 

Constraints:

1 <= n <= 10
1 <= k <= 100
 */


/**
 * Intuition
The solution uses backtracking to generate all possible "happy strings" of length n in lexicographical order. Backtracking ensures that we only explore valid strings where no two adjacent
Approach
Backtracking Approach: We generate all possible happy strings of length n using recursion.
Lexicographical Order: Since we iterate through ['a', 'b', 'c'] in order, the results are naturally sorted.
Base Case: When the string reaches length n, we add it to the result array.
Pruning: We ensure adjacent characters are different.
Return: the k-th String: If k is within bounds, we return result[k - 1], otherwise return an empty string.
Complexity
Time complexity:

The total number of happy strings is O(2 × 3ⁿ⁻¹):
For n=1, we have {a, b, c} → 3 strings.
For n=2, each can be followed by 2 choices → 3 * 2 = 6 strings.
For n=3, each can be followed by 2 choices → 3 * 2 * 2 = 12 strings.
In general, O(2 × 3ⁿ⁻¹) ≈ O(3ⁿ).
Thus, the time complexity is O(3ⁿ).
Space complexity:

The result array stores O(3ⁿ) happy strings in the worst case.
The recursion stack depth is at most O(n).
The overall space complexity is O(3ⁿ) in the worst case.
 */


/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    const result = [];

    function backtrack(current) {
        if (current.length === n) {
            result.push(current);
            return;
        }

        for (let char of ['a', 'b', 'c']) {
            if (current.length === 0 || current[current.length - 1] !== char) {
                backtrack(current + char);
            }
        }
    }

    backtrack('');

    return result.length >= k ? result[k - 1] : "";
};