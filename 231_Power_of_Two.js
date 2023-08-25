/**
 * 231. Power of Two
 * Difficulty : Easy
 * 
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
An integer n is a power of two, if there exists an integer x such that n == 2x.

Example 1:
Input: n = 1
Output: true
Explanation: 20 = 1
Example 2:
Input: n = 16
Output: true
Explanation: 24 = 16
Example 3:
Input: n = 3
Output: false

Constraints:
-231 <= n <= 231 - 1
 */


//normal approach
var isPowerOfTwo = function(n) {
    if(n<=0){
        return false;
    }
    
    while(n>0){
        if(n===1){
            return true;
        }
        if(n%2 === 1) {
            return false
        }
        n = n/2;
    }
    return true;
};


//using loop and recurrsion
var isPowerOfTwo = function(n) {
    if (n == 0)
        return 0;
    while (n != 1) {
        if (n%2 != 0)
            return 0;
        n = n/2;
    }
    return 1;
};

/**
 * Just a binary trick:

2^n = 1{000...0 - n times}, binary.
2^2 = 4 (decimial) = 100 binary - two zeros.
2^5 = 32 (decimial) = 100000 binary - five zeros.

2^n - 1 = {111...1 - n times}
2^3 - 1 = 8 - 1 = 7 (decimial) = 111 = three ones.
2^5 - 1 = 32 - 1 = 31 (decimial) = 11111 = five ones.

Based on this two rules, if n is power of two (2^n) if we apply bitwise AND all corresponding bits will be different and we'll receive zero, for example:

1) n = 2^5
32 & (32 - 1) = 32 & 31:

-- 100000
--- 11111
--- 00000 == 0
2) n = 2^3
8 & (8 - 1) = 8 & 7:

-- 1000
--- 111
--- 000 == 0
3) 25?
25 & (25 - 1) = 25 & 24:

-- 11001
-- 11000
-- 11000 != 0
 */

let isPowerOfTwo = n => n > 0 ? !(n & n-1) : false;