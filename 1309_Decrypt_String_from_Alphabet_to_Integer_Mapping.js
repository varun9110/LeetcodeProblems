/**
 * 1309. Decrypt String from Alphabet to Integer Mapping
 * Difficulty: Easy
 * 
 * You are given a string s formed by digits and '#'. We want to map s to English lowercase characters as follows:
Characters ('a' to 'i') are represented by ('1' to '9') respectively.
Characters ('j' to 'z') are represented by ('10#' to '26#') respectively.
Return the string formed after mapping.
The test cases are generated so that a unique mapping will always exist.

Example 1:
Input: s = "10#11#12"
Output: "jkab"
Explanation: "j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".
Example 2:
Input: s = "1326#"
Output: "acz"
 
Constraints:

1 <= s.length <= 1000
s consists of digits and the '#' letter.
s will be a valid string such that mapping is always possible.
 */

/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function (s) {
  const n = s.length;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

  const result = [];
  let i = 0;
  while (i < n) {
    if (
      i + 2 < n
      && s[i + 2] === '#'
    ) {
      const num = s.slice(i, i + 2);

      result.push(alphabet[num - 1]);
      i += 3;
    } else {
      result.push(alphabet[s[i] - 1]);
      i++;
    }
  }

  return result.join('');
};