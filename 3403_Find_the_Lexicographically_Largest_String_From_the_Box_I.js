/**
 * 3403. Find the Lexicographically Largest String From the Box I
 * Difficulty: Medium
 * 
 * You are given a string word, and an integer numFriends.

Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:

word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
All the split words are put into a box.
Find the lexicographically largest string from the box after all the rounds are finished.

 

Example 1:

Input: word = "dbca", numFriends = 2

Output: "dbc"

Explanation: 

All possible splits are:

"d" and "bca".
"db" and "ca".
"dbc" and "a".
Example 2:

Input: word = "gggg", numFriends = 4

Output: "g"

Explanation: 

The only possible split is: "g", "g", "g", and "g".

 

Constraints:

1 <= word.length <= 5 * 103
word consists only of lowercase English letters.
1 <= numFriends <= word.length
 */

/**
 * When distributing a string among multiple friends, we want to make sure each friend gets a fair portion.

If there's only 1 friend, we can simply return the entire string. But if there are more than 1, we need to split the string and choose the lexicographically largest piece that can potentially be assigned to one of them.

let’s say the length of the word is L and we have numFriends friends. To ensure fair splitting, the maximum possible length of any single part must be at most L - numFriends + 1.

this is because with numFriends parts, the smallest possible size of each part would be 1.
 */

/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function(word, numFriends) {
    let res = ''
    if (numFriends === 1) return word;

    const L = word.length;

    for (let i = 0; i < L; i++) {
        let str = word.substring(i, Math.min(i + L - numFriends + 1, L));
        if (str > res) res = str;
    }

    return res;
};