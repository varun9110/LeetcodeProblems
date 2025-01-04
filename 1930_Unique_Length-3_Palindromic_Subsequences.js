/**
 * 1930. Unique Length-3 Palindromic Subsequences
 * Difficulty: Medium
 * 
 * Given a string s, return the number of unique palindromes of length three that are a subsequence of s.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string with some characters (can be none) 
deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
Example 2:

Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
Example 3:

Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
 

Constraints:

3 <= s.length <= 105
s consists of only lowercase English letters.
 */

/**
 * 🌟 Intuition
The problem asks us to count the number of distinct palindromic subsequences of length 3 in a given string.

Key Insights:
A palindromic subsequence of length 3 has the property that the first and last characters are the same.
The middle character can be any character,same Like first and Last charcters also because aba is valid but every unique char will be used only once to form palindrom.
Our goal is to count how many such subsequences exist in the given string.

🛠️ Approach
To solve this efficiently, we can break the problem into a few simple steps:

1️⃣ Precompute the Right Side Count
We start by calculating the total occurrences of each character in the string. This will give us the rightCount, 
which represents how many of each character remain to the right of any given position.

rightCount[26]: An array that tracks how many characters are yet to appear as we move from left to right through the string.
2️⃣ Simulate Palindromic Subsequences
As we process the string from left to right:

We maintain a leftCount to track how many times each character has been encountered so far.
We use the rightCount to know how many characters are still present to the right.
For each character at index i:

We check if it can form a valid palindromic subsequence with any of the previously encountered characters.
We then update the leftCount and rightCount arrays.
Complexity
Time Complexity: O(n)
We only make two passes: one to compute the total count of characters and another to simulate the subsequences.

Space Complexity: O(1)
We only use a few arrays to store counts (left and right) of fixed size (26 for the English alphabet), so the space complexity is constant.

🌈 Conclusion
This solution efficiently counts distinct palindromic subsequences in O(n) time using the sliding window approach and dynamic updates of character counts. 
By maintaining two arrays (leftCount and rightCount), we ensure that we can simulate the valid subsequences without redundant checks. 🏆
 */

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function(s) {
    let rightCount = Array(26).fill(0);
    let leftCount = Array(26).fill(0);
    let subsequences = new Set();
    
    for (let char of s) {
        rightCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    for (let char of s) {
        let t = char.charCodeAt(0) - 'a'.charCodeAt(0);
        rightCount[t]--;
        
        for (let j = 0; j < 26; j++) {
            if (leftCount[j] > 0 && rightCount[j] > 0) {
                subsequences.add(26 * t + j);
            }
        }
        
        leftCount[t]++;
    }
    
    return subsequences.size;
};