/**
 * 2062. Count Vowel Substrings of a String
 * Difficulty:  Easy
 * 
 * A substring is a contiguous (non-empty) sequence of characters within a string.

A vowel substring is a substring that only consists of vowels ('a', 'e', 'i', 'o', and 'u') and has all five vowels present in it.

Given a string word, return the number of vowel substrings in word.

 

Example 1:

Input: word = "aeiouu"
Output: 2
Explanation: The vowel substrings of word are as follows (underlined):
- "aeiouu"
- "aeiouu"
Example 2:

Input: word = "unicornarihan"
Output: 0
Explanation: Not all 5 vowels are present, so there are no vowel substrings.
Example 3:

Input: word = "cuaieuouac"
Output: 7
Explanation: The vowel substrings of word are as follows (underlined):
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
- "cuaieuouac"
 

Constraints:

1 <= word.length <= 100
word consists of lowercase English letters only.
 */


/**
 * @param {string} word
 * @return {number}
 */
var countVowelSubstrings = function (word) {
    let count = 0
    for (let i = 0; i <= word.length - 5; i++) {
        let ob = { 'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0 };
        for (let j = i; j < word.length; j++) {

            if (ob[word[j]] != undefined) {
                ob[word[j]] = ob[word[j]] != 0 ? ob[word[j]] + 1 : 1
            }
            else {
                break
            }
            if(ob['a']>0 && ob['e']>0 && ob['i']>0 && ob['o']>0 && ob['u']>0 ){
                count++
            }} }

    return count};