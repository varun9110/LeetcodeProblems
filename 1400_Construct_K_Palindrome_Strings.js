/**
 * 1400. Construct K Palindrome Strings
 * Difficutly: Medium
 * 
 * Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

 

Example 1:

Input: s = "annabelle", k = 2
Output: true
Explanation: You can construct two palindromes using all characters in s.
Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"
Example 2:

Input: s = "leetcode", k = 3
Output: false
Explanation: It is impossible to construct 3 palindromes using all the characters of s.
Example 3:

Input: s = "true", k = 4
Output: true
Explanation: The only possible solution is to put each character in a separate string.
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
1 <= k <= 105
 */

/**
 * Intuition
In a palindrome, all characters must appear an even number of times, except for at most one character that can appear an odd number of times (to occupy the middle position). Therefore, the number of characters with odd frequencies determines the minimum number of palindromic strings that can be formed. Each character with an odd frequency must be placed in the center of a separate palindrome.

Approach
Edge Case Check: If the length of the string s is less than k, it's impossible to split it into k non-empty palindromic strings.
Frequency Count: Iterate through the string and maintain a frequency array to count occurrences of each character.
Odd Frequency Count: Iterate through the frequency array and count how many characters have an odd frequency.
Validation:
If the number of odd-frequency characters is greater than k, forming k palindromic strings is impossible.
If it's less than or equal to k, it's possible, so return true.
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var canConstruct = function(s, k) {
    // If the string length is less than k, it's impossible to form k palindromic strings
    if (s.length < k) {
        return false;
    }

    // Frequency map for character counts
    const freq = new Array(26).fill(0);

    // Count the frequency of each character
    for (let char of s) {
        freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    // Count characters with odd frequencies
    let oddCount = 0;
    for (let count of freq) {
        if (count % 2 !== 0) {
            oddCount++;
        }
    }

    // If odd frequencies are <= k, it's possible to form k palindromic strings
    return oddCount <= k;
};