/**
 * 1160. Find Words That Can Be Formed by Characters
 * Difficulty: Easy
 * 
 * You are given an array of strings words and a string chars.

A string is good if it can be formed by characters from chars (each character can only be used once).

Return the sum of lengths of all good strings in words.

 

Example 1:

Input: words = ["cat","bt","hat","tree"], chars = "atach"
Output: 6
Explanation: The strings that can be formed are "cat" and "hat" so the answer is 3 + 3 = 6.
Example 2:

Input: words = ["hello","world","leetcode"], chars = "welldonehoneyr"
Output: 10
Explanation: The strings that can be formed are "hello" and "world" so the answer is 5 + 5 = 10.
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length, chars.length <= 100
words[i] and chars consist of lowercase English letters.
 */

/**
 * Approach
Initialize an array counts to store the count of each character in chars.
Iterate through each character in chars and update the counts.
For each string in words, check if it can be formed using the counts of characters in chars.
If a string can be formed, add its length to the result.
Return the final result.
 */

var countCharacters = function(words, chars) {
    const counts = new Array(26).fill(0);

    // Step 1: Initialize Character Counts Array
    for (const ch of chars) {
        counts[ch.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }

    let result = 0;

    // Step 3: Check Words
    for (const word of words) {
        if (canForm(word, counts)) {
            // Step 4: Calculate Lengths
            result += word.length;
        }
    }

    return result;

    function canForm(word, counts) {
        const c = new Array(26).fill(0);

        // Step 2: Update Counts Array
        for (const ch of word) {
            const x = ch.charCodeAt(0) - 'a'.charCodeAt(0);
            c[x]++;
            if (c[x] > counts[x]) {
                return false;
            }
        }

        return true;
    }
};
