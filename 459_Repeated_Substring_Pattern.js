/**
 * 459. Repeated Substring Pattern
 * Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

Example 1:
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.
Example 2:
Input: s = "aba"
Output: false
Example 3:
Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

Constraints:
1 <= s.length <= 104
s consists of lowercase English letters.
 */

/**
Approach 1/2: Check All Possible Substrings
To solve the "459. Repeated Substring Pattern" problem, we iterate over all possible substring lengths (from 1 to len(s)//2). For each length, we check if the string can be constructed by repeating that substring.

Key Data Structures:
Substring: To hold the possible substring that could be repeated to form the string s.
Enhanced Breakdown:
Initialization:

Start from the first character.
Processing Each Substring:

For each possible length of substring, check if repeating that substring forms the original string.
Wrap-up:

Return True if any such substring is found, otherwise False.
Example:
Given the string "abcabc":

First check with substring "a" - Does not form the original string.
Next, check with substring "ab" - Does not form the original string.
Finally, check with substring "abc" - Forms the original string. Hence, return True.


Approach 2/2: Clever String Manipulation
The idea behind this approach is that if a string s can be constructed by repeating a substring, then concatenating two copies of s together and removing the first and last character would still contain s as a substring.

Key Data Structures:
Concatenated String: A string formed by concatenating s with itself.
Enhanced Breakdown:
Initialization:

Concatenate string s with itself.
Check for Repeated Pattern:

Remove the first and last character from the concatenated string and check if the original string s is present.
Wrap-up:

Return True if the string is present, otherwise False.
Example:
Given the string "abab":

Concatenate to get "abababab".
Remove first and last characters to get "bababa".
Check if "abab" is present in "bababa" - It is. Hence, return True.

*/

var repeatedSubstringPattern = function(s) {
    let size = s.length;
    let sFold = s.substring(1, size) + s.substring(0, size-1);
    
    return sFold.indexOf( s ) != -1;
};