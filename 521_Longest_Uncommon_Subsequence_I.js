/**
 * 521. Longest Uncommon Subsequence I
 * Difficulty: Easy
 * 
 * Given two strings a and b, return the length of the longest uncommon subsequence between a and b. If no such uncommon subsequence exists, return -1.
An uncommon subsequence between two strings is a string that is a subsequence of exactly one of them.

Example 1:
Input: a = "aba", b = "cdc"
Output: 3
Explanation: One longest uncommon subsequence is "aba" because "aba" is a subsequence of "aba" but not "cdc".
Note that "cdc" is also a longest uncommon subsequence.
Example 2:
Input: a = "aaa", b = "bbb"
Output: 3
Explanation: The longest uncommon subsequences are "aaa" and "bbb".
Example 3:

Input: a = "aaa", b = "aaa"
Output: -1
Explanation: Every subsequence of string a is also a subsequence of string b. Similarly, every subsequence of string b is also a subsequence of string a. So the answer would be -1.
 

Constraints:

1 <= a.length, b.length <= 100
a and b consist of lower-case English letters.
 */

/**
 * Intuition
We want the length of the longest string that is a subsequence of one string but not the other. If two strings are the same — no such subsequence exists. If they’re different — the longer one is always valid.

Approach
image.png

If a == b, return -1. No uncommon subsequence exists.
Otherwise, return the length of the longer string.
image.png
That’s it. No need to check subsequences — the strings are short and logic is simple.

Complexity
Time Complexity: ( O(1) ) — constant time.
Space Complexity: ( O(1) ) — no extra space.
 */

var findLUSlength = function(a, b) {
    if (a === b) return -1;
    return Math.max(a.length, b.length);
};