/**
 * 3306. Count of Substrings Containing Every Vowel and K Consonants II
 * Difficulty: Medium
 * 
 * You are given a string word and a non-negative integer k.

Return the total number of substrings of word that contain every vowel ('a', 'e', 'i', 'o', and 'u') at least once and exactly k consonants.

Example 1:
Input: word = "aeioqq", k = 1
Output: 0
Explanation:
There is no substring with every vowel.
Example 2:
Input: word = "aeiou", k = 0
Output: 1
Explanation:
The only substring with every vowel and zero consonants is word[0..4], which is "aeiou".
Example 3:
Input: word = "ieaouqqieaouqq", k = 1
Output: 3
Explanation:
The substrings with every vowel and one consonant are:
word[0..5], which is "ieaouq".
word[6..11], which is "qieaou".
word[7..12], which is "ieaouq".

Constraints:
5 <= word.length <= 2 * 105
word consists only of lowercase English letters.
0 <= k <= word.length - 5
 */


/**
 * Intuition
The function countOfSubstrings(word, k) uses the Sliding Window technique to efficiently count substrings that contain all vowels ('a', 'e', 'i', 'o', 'u') at least once and exactly k consonants.
Approach
Initialize Variables:

startIndex, endIndex: Pointers for the sliding window.
ob: Array of vowels for quick lookup.
consonentCount: Tracks the number of consonants in the current window.
result: Stores the final count of valid substrings.
count: Helps track valid substrings in a given window.
map: Stores the count of each vowel in the window.
Expand Window (endIndex moves right)

If word[endIndex] is a vowel, update its count in map.
If word[endIndex] is a consonant, increase consonentCount.
Shrink Window (startIndex moves right when needed)

If consonentCount > k, remove characters from the left (startIndex++) until consonentCount === k.
Remove vowels from the map as needed.
Count Valid Substrings

If all vowels (map.size === 5) and consonentCount === k, increase count while adjusting startIndex.
Add count to result.
Reset count if a new consonant is encountered (word[endIndex] is a consonant).
Move endIndex Right

The process repeats until endIndex reaches the end of word.
Complexity
Time complexity:

Each character is processed at most twice (once when expanding endIndex, once when contracting startIndex).
The sliding window ensures that startIndex and endIndex only move forward.
Overall, O(n) time complexity.
Space complexity:

map has at most 5 entries (one per vowel).
Other variables (startIndex, endIndex, consonentCount, etc.) use constant space.
Overall, O(1) space complexity.
 */


/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var countOfSubstrings = function (word, k) {
    let startIndex = 0, endIndex = 0;
    let ob = ['a', 'i', 'o', 'u', 'e'];
    let consonentCount = 0;
    let result = 0;
    let count = 0;
    const map = new Map();
    while (endIndex < word.length) {
        if (ob.includes(word[endIndex])) {
            map.set(word[endIndex], (map.get(word[endIndex]) || 0) + 1);
        } else if (word[endIndex]) {
            consonentCount++;
        }
        while (consonentCount > k) {
            if (ob.includes(word[startIndex])) {
                map.set(word[startIndex], map.get(word[startIndex]) - 1);
                if (!map.get(word[startIndex])) {
                    map.delete(word[startIndex])
                }
            } else {
                consonentCount--;
            }
            startIndex++;
        }
        while (map.size === 5 && consonentCount === k) {
            if (ob.includes(word[startIndex])) {
                map.set(word[startIndex], map.get(word[startIndex]) - 1);
                if (!map.get(word[startIndex])) {
                    map.delete(word[startIndex])
                }
            } else {
                consonentCount--;
            }
            count++;
            startIndex++;
        }
        result += count;
        endIndex++;
        if (word[endIndex] && !ob.includes(word[endIndex])) {
            count = 0;
        }
    }
    return result;
};