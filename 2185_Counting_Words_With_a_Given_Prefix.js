/**
 * 2185. Counting Words With a Given Prefix
 * Difficulty : Easy
 * 
 * You are given an array of strings words and a string pref.
Return the number of strings in words that contain pref as a prefix.
A prefix of a string s is any leading contiguous substring of s.


Example 1:
Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
Example 2:
Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.
 Constraints:

1 <= words.length <= 100
1 <= words[i].length, pref.length <= 100
words[i] and pref consist of lowercase English letters.
 */


/**
 * Approach:
 * iterate through the word list array and check if the length of the word is same and larger than the pref. If yes then substring the starting characters with 
 * pref length and check if the pref and substring are same
*/
var prefixCount = function(words, pref) {
    let count = 0;
    let length = pref.length;
    for(let i=0; i<words.length; i++){
        if(words[i].length >= length){
            let sub = words[i].substring(0,length);
            console.log(sub);
            if(sub === pref){
                count++;
            }
        }
    }
    return count;
};

/**
 * Approach: use startsWith function JS to check if each word starts with pref text
 */

const prefixCount = (words, pref) => {
  let count = 0;
  for (const word of words) {
    word.startsWith(pref) && ++count;
  }
  return count;
}