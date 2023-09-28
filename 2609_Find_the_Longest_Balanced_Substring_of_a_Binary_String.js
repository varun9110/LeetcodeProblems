/**
 * 2609. Find the Longest Balanced Substring of a Binary String
 * Difficulty: Easy
 * You are given a binary string s consisting only of zeroes and ones.
A substring of s is considered balanced if all zeroes are before ones and the number of zeroes is equal to the number of ones inside the substring. 
Notice that the empty substring is considered a balanced substring.
Return the length of the longest balanced substring of s.
A substring is a contiguous sequence of characters within a string.

Example 1:
Input: s = "01000111"
Output: 6
Explanation: The longest balanced substring is "000111", which has length 6.
Example 2:
Input: s = "00111"
Output: 4
Explanation: The longest balanced substring is "0011", which has length 4. 
Example 3:
Input: s = "111"
Output: 0
Explanation: There is no balanced substring except the empty substring, so the answer is 0.

Constraints:
1 <= s.length <= 50
'0' <= s[i] <= '1'
 */


/**
 * Approach
If current is zero, we put 0 into the stack.
If current is one, we pop a 0 and increment current lengtb by 2, then update max length.
If next value differs from current one, we reset our stack and current running sum.
 */

var findTheLongestBalancedSubstring = function(s) {
    let max = 0;
    let current = 0; // current running sum
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        const cv = s[i];

        // add 0s to stack
        if (cv === '0') {
            stack.push(cv);
            continue;
        }

        // if stack is not empty and current is one
        // pop a value and increment running sume by 2
        // we increment by 2 to account for 0 that is popped and the current 1
        // update max
        if (stack.length && cv === '1') {
            stack.pop();
            current += 2
            max = Math.max(max, current);
        }

        // if next value is different, reset
        if (s[i + 1] === '0') {
            current = 0;
            stack = []
        }

    }

    return max;
};