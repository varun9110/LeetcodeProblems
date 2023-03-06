/**
 * 2063. Vowels of All Substrings
 * Difficulty : Medium
 * 
 * Given a string word, return the sum of the number of vowels ('a', 'e', 'i', 'o', and 'u') in every substring of word.
A substring is a contiguous (non-empty) sequence of characters within a string.
Note: Due to the large constraints, the answer may not fit in a signed 32-bit integer. Please be careful during the calculations.

Example 1:
Input: word = "aba"
Output: 6
Explanation: 
All possible substrings are: "a", "ab", "aba", "b", "ba", and "a".
- "b" has 0 vowels in it
- "a", "ab", "ba", and "a" have 1 vowel each
- "aba" has 2 vowels in it
Hence, the total sum of vowels = 0 + 1 + 1 + 1 + 1 + 2 = 6. 

Example 2:
Input: word = "abc"
Output: 3
Explanation: 
All possible substrings are: "a", "ab", "abc", "b", "bc", and "c".
- "a", "ab", and "abc" have 1 vowel each
- "b", "bc", and "c" have 0 vowels each
Hence, the total sum of vowels = 1 + 1 + 1 + 0 + 0 + 0 = 3.

Example 3:
Input: word = "ltcd"
Output: 0
Explanation: There are no vowels in any substring of "ltcd".

Constraints:
1 <= word.length <= 105
word consists of lowercase English letters.
*/

/**
 * Approach : 
 * This question is about to check how many vowels are there in each substring. so total vowels in unique subsring
 * Brute force method is to find all the substrings and check each character in them.
 * 
 * Better approach:
 * keep a variable for the last number of Vowels, one for the results and then create a loop to iterate through all the characters of the string
 * now, check if the current character is a vowel or not, if yes, then total new vowels will be i+1, since each substring before it will have it in the string
 * so result will be = result + lastVowel + newVowel
 * add newVowel to lastVowel at the end of the loop. since that is the lastVowel
 * 
 * return result;
 * Complexity : O(n)
 */


var countVowels = function (word) {
    let lastVowels = 0;
    let result = 0;
    for (let i = 0; i < word.length; i++) {
        let newVowels = 0;
        if (isVowel(word[i])) {
            newVowels= (i + 1);
        }
        result += lastVowels + newVowels;
        lastVowels = newVowels + lastVowels;
    }
    return result;
};
let isVowel = function (char) {
    return "aeiou".indexOf(char) !== -1 ? true : false;
};