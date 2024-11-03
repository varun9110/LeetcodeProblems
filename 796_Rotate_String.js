/**
 * 796. Rotate String
 * Difficulty: Easy
 * 
 * Given two strings s and goal, return true if and only if s can become goal after some number of shifts on s.
A shift on s consists of moving the leftmost character of s to the rightmost position.
For example, if s = "abcde", then it will be "bcdea" after one shift.

Example 1:
Input: s = "abcde", goal = "cdeab"
Output: true
Example 2:
Input: s = "abcde", goal = "abced"
Output: false

Constraints:
1 <= s.length, goal.length <= 100
s and goal consist of lowercase English letters.
 */

/**
 * Intuition
The key insight is that when you concatenate a string with itself (s + s), it contains all possible rotations of the original string.

For example, if s = "abcde", then s + s = "abcdeabcde" contains all rotations: "abcde", "bcdea", "cdeab", "deabc", "eabcd".

Approach
First, check if lengths are equal (if not, rotation is impossible)
Create a concatenated string s + s which contains all possible rotations
Check if goal is a substring of s + s
s = "abcde", goal = "cdeab"
s + s = "abcdeabcde"
"cdeab" is present in "abcdeabcde", so return True
 */

var rotateString = function(s, goal) {
    if (s.length !== goal.length) {
        return false;
    }
    return (s + s).includes(goal);
};