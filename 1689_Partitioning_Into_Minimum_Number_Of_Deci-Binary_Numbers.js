/**
 * 
1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
Difficulty: Medium

A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.

Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.

 

Example 1:

Input: n = "32"
Output: 3
Explanation: 10 + 11 + 11 = 32
Example 2:

Input: n = "82734"
Output: 8
Example 3:

Input: n = "27346209830709182346"
Output: 9
 

Constraints:

1 <= n.length <= 105
n consists of only digits.
n does not contain any leading zeros and represents a positive integer.
 */

/**
 * Intuition: Finding the "Bottleneck"
The core idea is that deci-binary numbers only consist of digits 0 and 1. This means that when we sum these numbers, each individual digit position can increase by at most 1 per added number.

Approach
Think of each digit in n as a requirement for a specific decimal place.

If there is a digit 9 at any position in the string n, you must have at least 9 deci-binary numbers that have a 1 at that same position to sum up to 9.

Any other digit in n that is less than 9 can easily be formed by using 1 
′
 s in some of those 9 numbers and 0 
′
 s in the others.

Therefore, the minimum number of deci-binary numbers required is simply the maximum digit present in the string n.

Complexity
Time complexity: O(L), where L is the length of the string n. We perform a single pass over the digits.
Space complexity: O(1), as we only store the maximum digit found so far.
 */

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
    let max = 0;
    for (let i = 0; i < n.length; i++) {
        let digit = n[i] - '0';
        if (digit > max) {
            max = digit;
        }
        if (max === 9) return 9;
    }
    return max;
};