/**
 * 1189. Maximum Number of Balloons

Difficulty: Easy
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

You can use each character in text at most once. Return the maximum number of instances that can be formed.

 

Example 1:



Input: text = "nlaebolko"
Output: 1
Example 2:



Input: text = "loonbalxballpoon"
Output: 2
Example 3:

Input: text = "leetcode"
Output: 0
 

Constraints:

1 <= text.length <= 104
text consists of lower case English letters only.

 */

/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {
    const map = { b: 0, a: 0, l: 0, o: 0, n: 0, };
    
    for (const l of text) {
        map[l]++; 
    }
    
    return Math.floor(
        Math.min(map.b, map.a, map.l / 2, map.o / 2, map.n)
    );
};