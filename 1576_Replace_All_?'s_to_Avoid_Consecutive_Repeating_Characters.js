/**
 * 1576. Replace All ?'s to Avoid Consecutive Repeating Characters
 * Difficulty: Easy
 * 
 * Given a string s containing only lowercase English letters and the '?' character, convert all the '?' characters into lowercase letters such that the final 
 * string does not contain any consecutive repeating characters. You cannot modify the non '?' characters.
It is guaranteed that there are no consecutive repeating characters in the given string except for '?'.

Return the final string after all the conversions (possibly zero) have been made. If there is more than one solution, return any of them. 
It can be shown that an answer is always possible with the given constraints.
Example 1:
Input: s = "?zs"
Output: "azs"
Explanation: There are 25 solutions for this problem. From "azs" to "yzs", all are valid. Only "z" is an invalid modification as the string will consist of consecutive repeating characters in "zzs".
Example 2:
Input: s = "ubv?w"
Output: "ubvaw"
Explanation: There are 24 solutions for this problem. Only "v" and "w" are invalid modifications as the strings will consist of consecutive repeating characters in "ubvvw" and "ubvww".
Constraints:
1 <= s.length <= 100
s consist of lowercase English letters and '?'.
*/

/**
 * Approach:
 * Iterate through all the indexs of the string, and check if previous and the next is a else made it b else c.
 */

var modifyString = function (s) {
  for (let i = 0; i < s.length; i++) {
    //Iterating through the string
    if (s[i] === "?") {
      //If a '?' is encountered
      let rep = "";
      if (s[i - 1] !== "a" && s[i + 1] !== "a")
        rep = "a"; //determine the replacement
      else if (s[i - 1] !== "b" && s[i + 1] !== "b") rep = "b";
      else rep = "c";
      s = s.slice(0, i) + rep + s.slice(i + 1); //and replace in string
    }
  }
  return s; //return modified string
};
