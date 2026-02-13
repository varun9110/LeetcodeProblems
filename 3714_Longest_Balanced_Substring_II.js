/**
 * 3714. Longest Balanced Substring II
 * Difficulty: Medium
 * 
 * You are given a string s consisting only of the characters 'a', 'b', and 'c'.

A substring of s is called balanced if all distinct characters in the substring appear the same number of times.

Return the length of the longest balanced substring of s.

 

Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "aabcc"

Output: 3

Explanation:

The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.

Example 3:

Input: s = "aba"

Output: 2

Explanation:

One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".

 

Constraints:

1 <= s.length <= 105
s contains only the characters 'a', 'b', and 'c'.
 */

/**
 * Intuition
Based on the problem constraints (assuming characters are limited to 'a', 'b', and 'c'), there are three scenarios to consider:

Case 1: The substring consists of one distinct character (e.g., "aaaa").
Case 2: The substring consists of two distinct characters with equal frequency (e.g., "aabb", "abab").
Case 3: The substring consists of three distinct characters with equal frequency (e.g., "abcabc").
Approach
1. Single Character Case
We use a sliding window technique to find the longest contiguous window of identical characters.

2. Two Characters Case
For each pair of characters (e.g., a & b), we maintain a diff variable to represent the frequency difference between the two characters.
If the same diff has appeared before at index j, the substring between j+1 and the current index i has an equal count of both characters (based on the concept of prefix sum).
When the third character (the one not in the current pair) appears, it breaks the balance. We must reset the diff and the Hash Map to ensure the third character is not included in our "two-character" substring.
3. Three Characters Case
To balance three characters, we need two independent differences to stay constant:

diffB = count(a) - count(b)
diffC = count(a) - count(c)
If both diffB and diffC at index i match their values at a previous index j, then the counts of 'a', 'b', and 'c' must have increased by the same amount in the interval (j, i], which means we found a balanced substring.
Complexity
Time complexity: O(n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function(s) {
    let res = 0

    // Case 1
    for (let i = 0; i < s.length; i++) {
        let j = i
        while (j+1 < s.length && s[j+1] === s[i]) {
            j++
        }
        res = Math.max(res, j-i+1)
        i = j
    }

    // Case 2
    function checkTwo(a, b) {
        let diff = 0
        let map = { 0: -1 }
        for (let i = 0; i < s.length; i++) {
            if (s[i] === a) {
                diff++
            } else if (s[i] === b) {
                diff--
            } else {
                map = { 0: i }
                diff = 0
            }
            if (map[diff] !== undefined) {
                res = Math.max(res, i - map[diff])
            } else { 
                map[diff] = i
            }
        }
        
    }
    checkTwo('a', 'b')
    checkTwo('b', 'c')
    checkTwo('a', 'c')

    // Case 3
    let aCount = 0
    let bCount = 0
    let cCount = 0
    const map = {}
    map[0] = {}
    map[0][0] = -1
    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            aCount++
        } else if (s[i] === 'b') {
            bCount++
        } else {
            cCount++
        }
        const diffB = aCount - bCount
        const diffC = aCount - cCount
        if (map[diffB] && map[diffB][diffC] !== undefined) {
            res = Math.max(res, i - map[diffB][diffC])
        }
        map[diffB] ??= {}
        map[diffB][diffC] ??= i
    }
    return res
};