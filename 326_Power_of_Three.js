/**
 * 326. Power of Three
 * Difficulty: Easy
 * 
 * Given an integer n, return true if it is a power of three. Otherwise, return false.
An integer n is a power of three, if there exists an integer x such that n == 3x.
Example 1:
Input: n = 27
Output: true
Explanation: 27 = 33
Example 2:
Input: n = 0
Output: false
Explanation: There is no x where 3x = 0.
Example 3:
Input: n = -1
Output: false
Explanation: There is no x where 3x = (-1).
Constraints:
-231 <= n <= 231 - 1
Follow up: Could you solve it without loops/recursion?
 */

/**
 * Approach:
 * Since 3 is a prime number, any power of 3 will only be divisible by any power of 3 that is equal or smaller. 
 * We can use this to our advantage by taking the largest possible power of 3 within our constraints (3^19) and 
 * performing a modulo n operation on it. If the result is a 0, then n is a power of 3.
 */

var isPowerOfThree = function(n) {
    return n > 0 && 1162261467 % n === 0
};


/**
 * Alternate:
 */

var isPowerOfThree = function(n) {
    if(n === 0 || Math.floor(n) == 0) return false
    if(n === 1) return true
    return isPowerOfThree(n/3);
};