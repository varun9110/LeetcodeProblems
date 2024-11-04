/**
 * 3163. String Compression III
 * Difficulty: Medium
 * 
 * Given a string word, compress it using the following algorithm:

Begin with an empty string comp. While word is not empty, use the following operation:
Remove a maximum length prefix of word made of a single character c repeating at most 9 times.
Append the length of the prefix followed by c to comp.
Return the string comp.

Example 1:
Input: word = "abcde"
Output: "1a1b1c1d1e"
Explanation:
Initially, comp = "". Apply the operation 5 times, choosing "a", "b", "c", "d", and "e" as the prefix in each operation.
For each prefix, append "1" followed by the character to comp.

Example 2:
Input: word = "aaaaaaaaaaaaaabb"
Output: "9a5a2b"
Explanation:
Initially, comp = "". Apply the operation 3 times, choosing "aaaaaaaaa", "aaaaa", and "bb" as the prefix in each operation.

For prefix "aaaaaaaaa", append "9" followed by "a" to comp.
For prefix "aaaaa", append "5" followed by "a" to comp.
For prefix "bb", append "2" followed by "b" to comp.
 
Constraints:
1 <= word.length <= 2 * 105
word consists only of lowercase English letters.
 */

/**
 * Intuition
The goal is to compress a given string word such that each sequence of consecutive, identical characters is replaced by the count of that character (up to 9) 
followed by the character itself.
So we will just follow the steps given in the question.

Approach
Initialize Variables:
Start with an empty string comp to hold the result.
Set cnt (count) to 1, which will keep track of the current sequence of identical characters.
ch is set to the first character in word to start tracking the first character sequence.
Loop Through the String:
Traverse each character in the string word, starting from the second character.

If the current character matches ch (indicating it is part of the current sequence of identical characters), increment cnt.

If cnt reaches 9, reset it back to 1 for the next sequence, as we are limiting the maximum count per character to 9.
3)Update comp on Character Change:

When the current character is different from ch, append the count cnt and the character ch to comp.

Reset ch to the current character and cnt to 1 to start tracking the new sequence of characters.

Finalize the Result:
After the loop, append the last sequence count and character to comp to capture the final sequence.
Complexity
Time complexity:
O(n) -> for traversing the string

Space complexity:
O(n) -> to store the "comp" string
 */

/**
 * @param {string} word
 * @return {string}
 */
var compressedString = function(word) {
    let comp = "";
        let cnt = 1, n = word.length;
        let ch = word[0];
        for (let i = 1; i < n; i++) {
            if (word[i] === ch && cnt < 9) {
                cnt++;
            } else {
                comp += cnt + ch;
                ch = word[i];
                cnt = 1;
            }
        }
        comp += cnt + ch;
        return comp;
};