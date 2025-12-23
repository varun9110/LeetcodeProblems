/**
 * 1047. Remove All Adjacent Duplicates In String
 * Difficulty: Easy
 * 
 * You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

 

Example 1:

Input: s = "abbaca"
Output: "ca"
Explanation: 
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
Example 2:

Input: s = "azxxzy"
Output: "ay"
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
 */

/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(chars) {
    // If chars length is 1, all are identical so return the chars
    if (chars.length === 1) return chars;

    // Create a stack object
    let s = [];

    // Iterate through each character using for / for of loop
    for (let ch of chars) {
        // If top element is not equal to current iterating character
        // Push the element
        if (s.length === 0 || s[s.length - 1] !== ch) {
            s.push(ch);
        } else {
            // Else pop the character from the stack, it means identical characters found
            s.pop();
        }
    }

    // Initialize a result string to build the final answer
    // We build it in reverse since the stack pops elements in LIFO order
    let res = "";
    while (s.length > 0) {
        res = s.pop() + res;
    }

    return res;
};