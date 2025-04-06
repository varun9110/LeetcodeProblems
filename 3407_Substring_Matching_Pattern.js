/**
 * 3407. Substring Matching Pattern
 * Difficulty: Easy
 * 
 * You are given a string s and a pattern string p, where p contains exactly one '*' character.
The '*' in p can be replaced with any sequence of zero or more characters.
Return true if p can be made a substring of s, and false otherwise.

Example 1:
Input: s = "leetcode", p = "ee*e"
Output: true
Explanation:
By replacing the '*' with "tcod", the substring "eetcode" matches the pattern.
Example 2:
Input: s = "car", p = "c*v"
Output: false
Explanation:
There is no substring matching the pattern.
Example 3:
Input: s = "luck", p = "u*"
Output: true
Explanation:
The substrings "u", "uc", and "uck" match the pattern.

Constraints:
1 <= s.length <= 50
1 <= p.length <= 50 
s contains only lowercase English letters.
p contains only lowercase English letters and exactly one '*'
 */


/**
 * Intuition
Since this question has low acceptance rate, here's a clear and straightforward solution.
Variables “a” and “b” represent the first and second part of the pattern.
The last index of b must be greater than or equal to the first index of a + a.length.

Approach
Split pattern into two parts divided by "*".
Find first index of first part and last index of second part.
Check if they follow the requirements.

Complexity
Time complexity: O(n+m)
Space complexity: O(m)
 */

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var hasMatch = function(s, p) {
    const [a, b] = p.split("*")
    const [i, j] = [s.indexOf(a), s.lastIndexOf(b)]
    return i >= 0 && j >= i + a.length
};