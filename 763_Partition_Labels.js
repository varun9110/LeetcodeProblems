/**
 * 763. Partition Labels
 * Difficulty: Medium
 * 
 * You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. 
 * For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.
Return a list of integers representing the size of these parts.

Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
Example 2:

Input: s = "eccbbbbdec"
Output: [10]
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
 */

/**
 * Intuition
The key insight is that if a character appears at positions i and j, then all characters at positions between i and j must be in the same partition as this character. This is because we can't split a partition between the first and last occurrence of any character.
This means we need to:

Find the last occurrence of each character
For each position in the string, determine the furthest position we need to extend our current partition to include all required characters
Approach
Create a map to store the last occurrence of each character
Iterate through the string
For each position, update the end boundary of the current partition based on the last occurrence of the current character
If we've reached the end boundary of our current partition, it means we've included all necessary characters for this partition, so we add its length to our result
Complexity
Time complexity: O(n), where n is the length of the string

Space complexity: O(k), where k is the number of unique characters in the string
 */

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    let lastOccurrence = {};
    for (let i = 0; i < s.length; i++) {
        lastOccurrence[s[i]] = i;
    }

    let result = [];
    let start = 0, end = 0;

    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastOccurrence[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }

    return result;
};