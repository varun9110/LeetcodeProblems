/**
 * 1662. Check If Two String Arrays are Equivalent
 * Difficulty: Easy
 * 
 * Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.

A string is represented by an array if the array elements concatenated in order forms the string.

Example 1:
Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
Explanation:
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.
Example 2:
Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
Output: false
Example 3:
Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
Output: true

Constraints:
1 <= word1.length, word2.length <= 103
1 <= word1[i].length, word2[i].length <= 103
1 <= sum(word1[i].length), sum(word2[i].length) <= 103
word1[i] and word2[i] consist of lowercase letters.
 */

/**
 * Approach
Initialize two StringBuilder objects, str1 and str2, to build the concatenated strings for word1 and word2 respectively.
Iterate through each word in word1, appending it to str1.
Iterate through each word in word2, appending it to str2.
Convert both StringBuilder objects to strings, s1 and s2.
Compare s1 and s2. If they are equal, return true; otherwise, return false.
 */

var arrayStringsAreEqual = function(word1, word2) {
    const str1 = word1.join('');
    const str2 = word2.join('');
    return str1 === str2;
};