/**
 * 1513. Number of Substrings With Only 1s
 * Difficulty: Medium
 * 
 * Given a binary string s, return the number of substrings with all characters 1's. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: s = "0110111"
Output: 9
Explanation: There are 9 substring in total with only 1's characters.
"1" -> 5 times.
"11" -> 3 times.
"111" -> 1 time.
Example 2:

Input: s = "101"
Output: 2
Explanation: Substring "1" is shown 2 times in s.
Example 3:

Input: s = "111111"
Output: 21
Explanation: Each substring contains only 1's characters.
 

Constraints:

1 <= s.length <= 105
s[i] is either '0' or '1'.
 */

/**
 * Intuition
A substring made of only '1' must come from a consecutive block of 1s.
f a block of consecutive 1s has length k, then the number of substrings inside it is:

1+2+⋯+k=k(k+1)​/2

So the problem reduces to:

Find lengths of all consecutive sequences of '1'.

For each length k, add k * (k + 1) / 2 to the answer.

Take modulo 10 ^ 9 + 7.

Approach
Traverse the string once.
Maintain a counter cnt for the current number of consecutive '1'.
When encountering '1', increase cnt.
When encountering '0':
Add cnt * (cnt + 1) / 2 to the answer.
Reset cnt = 0.
After the loop, check if cnt > 0 to account for the last block.
Return the answer modulo 10 ^ 9 + 7.
Complexity
Time complexity: O(n)
Space complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var numSub = function(s) {
    let total = 0;
    s.split("0").filter(block => {
        const length = block.length;
        if(length) {
            total += (length * (length + 1))/2
        }
    });
    return total % (10**9 + 7);
};