/**
 * 567. Permutation in String
 * Difficulty: Medium
 * 
 * Given two strings s1 and s2, return true if s2 contains a 
permutation
 of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
 */

/**
 * Intuition
The problem is about checking if one string s2 contains any permutation of another string s1. Since permutations of a string have the same character 
frequency, the idea is to compare the character frequencies of a sliding window of size s1.length() in s2 with the character frequencies of s1.

Approach
Create frequency arrays for both s1 and the first window of size s1.length() in s2.
Slide the window across s2 by one character at a time, updating the window's frequency counts.
Compare the frequency arrays after each slide. If they match, it means a permutation of s1 is found in s2.
Complexity
Time complexity:
O(n), where (n) is the length of s2. We traverse s2 once, updating the frequency array in constant time.

Space complexity:
O(1). The space used is constant because we only store two frequency arrays of fixed size (26 for lowercase letters).
 */

var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;

    let s1Count = Array(26).fill(0);
    let s2Count = Array(26).fill(0);

    // Initialize counts for s1 and the first window in s2
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 97]++;
        s2Count[s2.charCodeAt(i) - 97]++;
    }

    // Slide the window over s2
    for (let i = 0; i < s2.length - s1.length; i++) {
        if (matches(s1Count, s2Count)) return true;
        s2Count[s2.charCodeAt(i) - 97]--;
        s2Count[s2.charCodeAt(i + s1.length) - 97]++;
    }

    // Check the last window
    return matches(s1Count, s2Count);
};

function matches(s1Count, s2Count) {
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] !== s2Count[i]) return false;
    }
    return true;
}