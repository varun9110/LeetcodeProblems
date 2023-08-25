/**
 * 175. Prime Arrangements
 * Difficulty : Easy
 * 
 * Return the number of permutations of 1 to n so that prime numbers are at prime indices (1-indexed.)
(Recall that an integer is prime if and only if it is greater than 1, and cannot be written as a product of two positive integers both smaller than it.)
Since the answer may be large, return the answer modulo 10^9 + 7.

Example 1:
Input: n = 5
Output: 12
Explanation: For example [1,2,5,4,3] is a valid permutation, but [5,2,3,4,1] is not because the prime number 5 is at index 1.
Example 2:
Input: n = 100
Output: 682289015
 
Constraints:
1 <= n <= 100
 */

var numPrimeArrangements = function(n) {
    const mod = 10**9 + 7;
    let primes = 0, nonPrimes = 0;
    let res = 1;
    for (let i = 1; i <= n; i++) {
        if (isPrime(i)) res *= ++primes;
        else res *= ++nonPrimes;
        res = res % mod;
    }
    return res;
    // Time Complexity: O(n^(3/2))
    // Space Complexity: O(1)
};

var isPrime = function(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    let i = 2;
    while (i <= Math.sqrt(n)) {
        if (n % i == 0) return false;
        i++;
    }
    return true;
}