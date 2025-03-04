/**
 * 1780. Check if Number is a Sum of Powers of Three
 * Difficulty: Medium
 * 
 * Given an integer n, return true if it is possible to represent n as the sum of distinct powers of three. Otherwise, return false.

An integer y is a power of three if there exists an integer x such that y == 3x.


Example 1:
Input: n = 12
Output: true
Explanation: 12 = 31 + 32
Example 2:
Input: n = 91
Output: true
Explanation: 91 = 30 + 32 + 34
Example 3:
Input: n = 21
Output: false

Constraints:
1 <= n <= 107
 */

/**
 * Intuition
This problem asks if we can represent a number as the sum of distinct powers of three. The key insight is to think about how numbers are represented in different number systems. When we represent a number in base-3 (ternary), 

each position corresponds to a power of 3:
The rightmost digit represents 3 
0
 
The second digit from right represents 3 
1
 
The third digit represents 3 
2
 , and so on
For example, 91 in base-3 is 10101:

1×3 
0
  + 0×3 
1
  + 1×3 
2
  + 0×3 
3
  + 1×3 
4
  = 1 + 0 + 9 + 0 + 81 = 91
91_and_46.PNG

If we can only use distinct powers of three (use each power at most once), then we can only use digits 0 and 1 in our base-3 representation. We can never use digit 2, because that would mean using the same power of three twice.

Approach
Convert the given integer n to base-3 representation
Check if there are any "2" digits in this representation
If there are no "2" digits, then we can represent the number as a sum of distinct powers of three
Complexity
Time complexity: O(log n)

Space complexity: O(1)
 */

var checkPowersOfThree = function(n) {
    while (n > 0) {
        if (n % 3 == 2) {
            return false;
        }
        n = Math.round(n / 3);
    }
    return true;
};