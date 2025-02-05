/**
 * 1790. Check if One String Swap Can Make Strings Equal
 * Difficulty: Easy
 * 
 * You are given two strings s1 and s2 of equal length. A string swap is an operation where you choose two indices in a string (not necessarily different) 
 * and swap the characters at these indices.

Return true if it is possible to make both strings equal by performing at most one string swap on exactly one of the strings. Otherwise, return false.

Example 1:
Input: s1 = "bank", s2 = "kanb"
Output: true
Explanation: For example, swap the first character with the last character of s2 to make "bank".
Example 2:
Input: s1 = "attack", s2 = "defend"
Output: false
Explanation: It is impossible to make them equal with one string swap.
Example 3:
Input: s1 = "kelb", s2 = "kelb"
Output: true
Explanation: The two strings are already equal, so no string swap operation is required.

Constraints:
1 <= s1.length, s2.length <= 100
s1.length == s2.length
s1 and s2 consist of only lowercase English letters.
 */

/**
 * 🧠 Intuition
We need to determine if we can make two strings equal by swapping exactly one pair of characters in one of them.

Key Observations:
If s1 == s2, return true (they are already equal).
Identify positions where s1 and s2 differ:
If there are more than 2 mismatches, return false.
If exactly 2 mismatches, check if swapping these characters in s1 makes it equal to s2.
If none of the above conditions hold, return false.
💡 Approach
Edge Case: If s1 == s2, return true.
Find Mismatches:
Iterate through s1 and s2 and store the indices where characters differ.
Check Conditions:
If more than 2 mismatches, return false.
If exactly 2 mismatches, check if swapping them makes the strings equal.
Return true if conditions hold; otherwise, return false.
📌 Optimization: Single pass (O(n)) with constant space (O(1)).
 */

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function(s1, s2) {
    if (s1 === s2) return true;
    
    let diff = [];
    for (let i = 0; i < s1.length; i++) {
        if (s1[i] !== s2[i]) diff.push(i);
        if (diff.length > 2) return false;
    }

    return diff.length === 2 && s1[diff[0]] === s2[diff[1]] && s1[diff[1]] === s2[diff[0]];
};