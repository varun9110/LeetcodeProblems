/**
 * 500. Keyboard Row
 * Difficulty: Easy
 * 
 * Given an array of strings words, return the words that can be typed using letters of the 
 * alphabet on only one row of American keyboard like the image below.

In the American keyboard:
the first row consists of the characters "qwertyuiop",
the second row consists of the characters "asdfghjkl", and
the third row consists of the characters "zxcvbnm".

Example 1:
Input: words = ["Hello","Alaska","Dad","Peace"]
Output: ["Alaska","Dad"]
Example 2:
Input: words = ["omk"]
Output: []
Example 3:
Input: words = ["adsdf","sfd"]
Output: ["adsdf","sfd"]

Constraints:
1 <= words.length <= 20
1 <= words[i].length <= 100
words[i] consists of English letters (both lowercase and uppercase). 
 */

var findWords = function(words) {
    const row1 = new Set("qwertyuiop");
    const row2 = new Set("asdfghjkl");
    const row3 = new Set("zxcvbnm");

    const res = [];
    
    for (const word of words) {
        if (canBeTyped(word, row1) || canBeTyped(word, row2) || canBeTyped(word, row3)) res.push(word);
    }
    
    return res;
    
    function canBeTyped(word, row) {
       for (const char of word) {
           if (!row.has(char.toLowerCase())) return false;
       }
       return true;
    }
};