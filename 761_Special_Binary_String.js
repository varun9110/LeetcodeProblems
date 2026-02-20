/**
 * 761. Special Binary String
 * Difficulty: Hard
 * 
 * Special binary strings are binary strings with the following two properties:

The number of 0's is equal to the number of 1's.
Every prefix of the binary string has at least as many 1's as 0's.
You are given a special binary string s.

A move consists of choosing two consecutive, non-empty, special substrings of s, and swapping them. Two strings are consecutive if the last character of the first string is exactly one index before the first character of the second string.

Return the lexicographically largest resulting string possible after applying the mentioned operations on the string.

 

Example 1:

Input: s = "11011000"
Output: "11100100"
Explanation: The strings "10" [occuring at s[1]] and "1100" [at s[3]] are swapped.
This is the lexicographically largest string possible after some number of swaps.
Example 2:

Input: s = "10"
Output: "10"
 

Constraints:

1 <= s.length <= 50
s[i] is either '0' or '1'.
s is a special binary string.
 */

/**
 * Intuition
A special binary string behaves like a valid parentheses string where:

'1' → opening bracket
'0' → closing bracket
So any special string can be decomposed into smaller special substrings of the form:

1 + middle_special + 0

To get the lexicographically largest result:

Split the string into maximum number of consecutive special substrings.
Recursively make each middle part largest.
Sort all obtained special substrings in descending lexicographic order.
Concatenate them.
Approach
Traverse string while maintaining balance count.
Whenever balance becomes 0, we found a special substring.
Recursively process its middle part.
Store substring in list.
Sort list in descending order.
Concatenate and return.
Complexity
Time complexity: O(n^2 log n)
Space complexity: O(n)
 */

/**
 * @param {string} s
 * @return {string}
 */
var makeLargestSpecial = function(s) {
    let count = 0, i = 0;
    let res = [];

    for (let j = 0; j < s.length; j++) {
        if (s[j] === '1') count++;
        else count--;

        if (count === 0) {
            res.push('1' + makeLargestSpecial(s.slice(i+1, j)) + '0');
            i = j + 1;
        }
    }

    res.sort().reverse();
    return res.join('');
};