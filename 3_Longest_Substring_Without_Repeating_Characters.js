/**
 * 3. Longest Substring Without Repeating Characters
 * Difficulty: Easy
 * 
 * Given a string s, find the length of the longest 
substring without repeating characters.
Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 */

/**
 * Approach:
 * Brute force: use nested loop and then use map to find out the duplicate characters
 */

var lengthOfLongestSubstring = function(s) {
    let len = 0;
    for(let i=0; i<s.length; i++){
        let map={};
        for(let j=i; j<s.length; j++){
            if(map[s[j]]){
                break;
            } else {
                map[s[j]] = true;
            }
        }
        len = Math.max(len, Object.keys(map).length);
    }
    return len
};

/**
 * Refined appraoch :
 * find the substring and then slice the string with from the first occurence of the character and keep appending to it
 */

var lengthOfLongestSubstring = function(s) {
    let max = 0;
    let sb = '';
    for(let i=0;i<s.length;i++){
        if(!sb.includes(s[i])){
            sb = sb + s[i];
        } else{
            max = Math.max(max,sb.length);
            let index = sb.indexOf(s[i])
            sb = sb.slice(index+1,sb.length)+s[i];
        }
    }
    max = Math.max(max,sb.length);
    return max;
};