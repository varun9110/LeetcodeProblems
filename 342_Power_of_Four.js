/**
 * 342. Power of Four
 * Difficulty : Easy
 * 
 * Given an integer n, return true if it is a power of four. Otherwise, return false.
An integer n is a power of four, if there exists an integer x such that n == 4x.

Example 1:
Input: n = 16
Output: true
Example 2:
Input: n = 5
Output: false
Example 3:
Input: n = 1
Output: true

Constraints:
-231 <= n <= 231 - 1
 */

/**
 * Approach:
 * Create a loop to keep checking till the number is divisble by 4.
 * return the result accordingly
 */

var isPowerOfFour = function(n) {
    while(n>4){
        n=n/4;
    }
    if(n===1 || n===4){
        return true;
    }
    return false;
};

/**
 * same approach but refined code:
 */

function isPowerOfFour(n) {
	if(n === 1 || n === 4) return true;
	if(n < 4) return false;
	return isPowerOfFour(n/4);
}

function isPowerOfFour(n) {
  if (n <= 0) return false;
  while (n % 4 === 0) {
    n /= 4;
  }
  return n === 1;
}


/**
 * Log approach:
 *  x = 4^a
 * x = 2 ^ (2*a)
 * log(2)(x) = 2a
 * hence the log 2 of x should be even
 */

function isPowerOfFour(n) {
  return n>0 && Math.log2(n)%2 === 0;
}