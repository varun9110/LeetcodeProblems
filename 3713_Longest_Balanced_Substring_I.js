/**
 * 3713. Longest Balanced Substring I
 * Diiculty: Medium
 * 
 * You are given a string s consisting of lowercase English letters.

A substring of s is called balanced if all distinct characters in the substring appear the same number of times.

Return the length of the longest balanced substring of s.

 

Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "zzabccy"

Output: 4

Explanation:

The longest balanced substring is "zabc" because the distinct characters 'z', 'a', 'b', and 'c' each appear exactly 1 time.​​​​​​​

Example 3:

Input: s = "aba"

Output: 2

Explanation:

​​​​​​​One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".

 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
 */


/**
 * Intuition
The problem asks for the longest balanced substring, where all distinct characters appear the same number of times.
To determine this, we can analyze all possible substrings and check the frequency of each character — if all non-zero frequencies are equal, the substring is balanced.
The key insight is that balance depends solely on frequency equality, not on the number of unique characters.

Approach
Iterate through all possible starting indices i of the string.
For each i, expand the substring by moving the end index j from i to the end of the string.
Maintain a frequency array of size 26 to count characters between indices i and j.
After each extension:
Find the minimum and maximum non-zero frequency among the characters.
If both are equal, the substring is balanced.
Keep track of the maximum balanced substring length found so far.
Return the maximum length after checking all substrings.
Complexity
Time complexity:
(O(n^2 \times 26)) → Simplifies to O(n²) since 26 is a constant (for lowercase letters).
We check all substrings and compute frequency comparisons for each.

Space complexity:
(O(26)) → Simplifies to O(1), as the frequency array has a fixed size.
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    const n = s.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const freq = new Array(26).fill(0);
        for (let j = i; j < n; j++) {
            freq[s.charCodeAt(j) - 97]++;
            let min = Infinity, max = 0;

            for (const f of freq) {
                if (f > 0) {
                    min = Math.min(min, f);
                    max = Math.max(max, f);
                }
            }

            if (min === max) {
                ans = Math.max(ans, j - i + 1);
            }
        }
    }
    return ans;
};