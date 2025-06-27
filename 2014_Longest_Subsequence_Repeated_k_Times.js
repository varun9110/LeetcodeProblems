/**
 * 2014. Longest Subsequence Repeated k Times
 * Difficulty: Hard
 * 
 * You are given a string s of length n, and an integer k. You are tasked to find the longest subsequence repeated k times in string s.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

A subsequence seq is repeated k times in the string s if seq * k is a subsequence of s, where seq * k represents a string constructed by concatenating seq k times.

For example, "bba" is repeated 2 times in the string "bababcba", because the string "bbabba", constructed by concatenating "bba" 2 times, is a subsequence of the string "bababcba".
Return the longest subsequence repeated k times in string s. If multiple such subsequences are found, return the lexicographically largest one. If there is no such subsequence, return an empty string.

Example 1:
example 1
Input: s = "letsleetcode", k = 2
Output: "let"
Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.
Example 2:
Input: s = "bb", k = 2
Output: "b"
Explanation: The longest subsequence repeated 2 times is "b".
Example 3:
Input: s = "ab", k = 2
Output: ""
Explanation: There is no subsequence repeated 2 times. Empty string is returned.

Constraints:
n == s.length
2 <= n, k <= 2000
2 <= n < k * 8
s consists of lowercase English letters.
 */

/**
 * Step by step approach:

the goak to find the longest string seq such that seq * k is a subsequence of s.

The idea is to generate all valid subsequences and check whether their k-times repetition still remains a subsequence of the input string s.

1: Character Frequency Filtering

Count how many times each character appears in s.
A character can only be part of a valid candidate if it appears at least k times.
This is because to form seq * k, every character in seq needs to be matched k times in total.
2: Initialize Candidates of Length 1:

From the filtered characters, build a list of single-character candidates.
Each such character is already a valid subsequence of length 1 if it appears ≥ k times.
3: Incrementally Build Longer Subsequences:

Starting from length 2 up to 7:
For each candidate of length L-1, concatenate it with each character from the valid length-1 candidates.
This generates a set of new candidates of length L.
For each new candidate:
Validate whether repeating it k times still gives a subsequence of s.
4: Validate Each Candidate Using Two-Pointer Scan

Implement a helper function isRepeatedKTimes(source, pattern, k):
For each repetition, perform a two-pointer scan to see if the pattern can be matched inside s.
If this can be done k times, the candidate is valid.
Step 5: Maintain Lexicographically Largest Valid Answer

Among all valid candidates, always keep track of the longest one.
In case of tie in length, prefer the lexicographically larger one, as required.
Length of 7?
The number of valid characters is limited ≤26, and valid subsequences grow combinatorially.
Since k ≥ 2 and the total input length n ≤ 2000, the maximum length of a repeatable subsequence is bounded.
Empirically and mathematically, subsequences longer than 7 cannot pass the k-times check under constraints.
Time complexity: O(26 
7
 ⋅n)
Space complexity: O(26 
7
 )
 */

 /**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
const longestSubsequenceRepeatedK = (s, k) => {
    const isRepeatedKTimes = (source, pattern, k) => {
        let pat = [...pattern], sourceLen = source.length, patLen = pat.length, idx = 0;
        while (k-- > 0) {
            let match = 0;
            while (idx < sourceLen && match < patLen) {
                if (source[idx] === pat[match]) match++;
                idx++;
            }
            if (match !== patLen) return false;
        }
        return true;
    };

    const chars = [...s], len = chars.length;
    const freq = new Array(26).fill(0);
    for (let i = 0; i < len; i++) freq[chars[i].charCodeAt(0) - 97]++;

    const candidates = Array.from({ length: 8 }, () => []);
    let result = "";

    for (let i = 0; i < 26; i++) {
        if (freq[i] >= k) {
            const ch = String.fromCharCode(97 + i);
            result = ch;
            candidates[1].push(ch);
        }
    }

    for (let length = 2; length < 8; length++) {
        for (let prefix of candidates[length - 1]) {
            for (let suffix of candidates[1]) {
                const combo = prefix + suffix;
                if (isRepeatedKTimes(chars, combo, k)) {
                    result = combo;
                    candidates[length].push(combo);
                }
            }
        }
    }

    return result;
};