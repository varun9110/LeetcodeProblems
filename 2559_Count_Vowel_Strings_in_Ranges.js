/**
 * 2559. Count Vowel Strings in Ranges
 * Difficulty: Medium
 * 
 * You are given a 0-indexed array of strings words and a 2D array of integers queries.

Each query queries[i] = [li, ri] asks us to find the number of strings present in the range 
li to ri (both inclusive) of words that start and end with a vowel.
Return an array ans of size queries.length, where ans[i] is the answer to the ith query.
Note that the vowel letters are 'a', 'e', 'i', 'o', and 'u'.

Example 1:

Input: words = ["aba","bcb","ece","aa","e"], queries = [[0,2],[1,4],[1,1]]
Output: [2,3,0]
Explanation: The strings starting and ending with a vowel are "aba", "ece", "aa" and "e".
The answer to the query [0,2] is 2 (strings "aba" and "ece").
to query [1,4] is 3 (strings "ece", "aa", "e").
to query [1,1] is 0.
We return [2,3,0].
Example 2:

Input: words = ["a","e","i"], queries = [[0,2],[0,1],[2,2]]
Output: [3,2,1]
Explanation: Every string satisfies the conditions, so we return [3,2,1].
 

Constraints:

1 <= words.length <= 105
1 <= words[i].length <= 40
words[i] consists only of lowercase English letters.
sum(words[i].length) <= 3 * 105
1 <= queries.length <= 105
0 <= li <= ri < words.length
 */

/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function(words, queries) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    const word = words[0];
    words[0] = vowels.has(word[0]) && vowels.has(word.at(-1)) ? 1 : 0;
    const vowelsStrings = [];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const first = word[0];
        const last = word.at(-1);

        const vowelString = vowels.has(first) && vowels.has(last) ? 1 : 0;

        words[i] = words[i - 1] + vowelString;
    }

    for (let i = 0; i < queries.length; i++) {
        const [left, right] = queries[i];

        if (left > 0) vowelsStrings.push(words[right] - words[left - 1]);
        else vowelsStrings.push(words[right]);
        
    }

    return vowelsStrings;
};