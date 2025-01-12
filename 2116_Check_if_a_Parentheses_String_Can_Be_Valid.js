/**
 * 2116. Check if a Parentheses String Can Be Valid
 * Difficulty: Medium
 * 
 * A parentheses string is a non-empty string consisting only of '(' and ')'. It is valid if any of the following conditions is true:

It is ().
It can be written as AB (A concatenated with B), where A and B are valid parentheses strings.
It can be written as (A), where A is a valid parentheses string.
You are given a parentheses string s and a string locked, both of length n. locked is a binary string consisting only of '0's and '1's. For each index i of locked,

If locked[i] is '1', you cannot change s[i].
But if locked[i] is '0', you can change s[i] to either '(' or ')'.
Return true if you can make s a valid parentheses string. Otherwise, return false.

 

Example 1:


Input: s = "))()))", locked = "010100"
Output: true
Explanation: locked[1] == '1' and locked[3] == '1', so we cannot change s[1] or s[3].
We change s[0] and s[4] to '(' while leaving s[2] and s[5] unchanged to make s valid.
Example 2:

Input: s = "()()", locked = "0000"
Output: true
Explanation: We do not need to make any changes because s is already valid.
Example 3:

Input: s = ")", locked = "0"
Output: false
Explanation: locked permits us to change s[0]. 
Changing s[0] to either '(' or ')' will not make s valid.
 

Constraints:

n == s.length == locked.length
1 <= n <= 105
s[i] is either '(' or ')'.
locked[i] is either '0' or '1'.
 */

/**
 * Intuition
Approach
First we check that the length isn't odd, then we count the opening and closing locked parentheses inside a while loop, "i" counts ")" 
and j counts "(". we increment i and j and check if the counters are above i / 2 - if any of them are - 
it means that there isn't enough opposing parentheses to complete the valid string so we return false.

Complexity
Time complexity:
o(n)

Space complexity:
0(1)
 */

/**
 * @param {string} s
 * @param {string} locked
 * @return {boolean}
 */
var canBeValid = function (s, locked) {
  if (s.length % 2 !== 0) return false;

  let i = 0;
  let j = s.length - 1;
  let counterOpening = 0;
  let counterClosing = 0;

  while (i < s.length) {
    if (s[i] === ")" && locked[i] === "1") counterClosing++;
    if (s[j] === "(" && locked[j] === "1") counterOpening++;
    i++;
    j--;
    if (counterClosing > i / 2 || counterOpening > i / 2) return false;
  }

  return true;
};