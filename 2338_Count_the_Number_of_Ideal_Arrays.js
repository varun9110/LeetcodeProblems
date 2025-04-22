/**
 * 2338. Count the Number of Ideal Arrays
 * Difficulty: Hard
 * 
 * You are given two integers n and maxValue, which are used to describe an ideal array.

A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:

Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 109 + 7.

 

Example 1:

Input: n = 2, maxValue = 5
Output: 10
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
- Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
- Arrays starting with the value 3 (1 array): [3,3]
- Arrays starting with the value 4 (1 array): [4,4]
- Arrays starting with the value 5 (1 array): [5,5]
There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.
Example 2:

Input: n = 5, maxValue = 3
Output: 11
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (9 arrays): 
   - With no other distinct values (1 array): [1,1,1,1,1] 
   - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
   - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
- Arrays starting with the value 2 (1 array): [2,2,2,2,2]
- Arrays starting with the value 3 (1 array): [3,3,3,3,3]
There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.
 

Constraints:

2 <= n <= 104
1 <= maxValue <= 104
 */


/**
 * Intuition
The problem requires counting all arrays of length n where every element is divisible by the previous one.
This is similar to finding multiplicative sequences (e.g., [1, 2, 4] or [2, 4, 8]).
However, brute force enumeration would be too slow due to the large size of n (up to 10⁴) and maxValue.
We observe that:
The number of valid arrays of length n ending in a number x depends on the number of multiplicative chains that can end at x.
These chains can be represented using the prime factorization of x, and the number of ways to extend those factorizations over length n.
Approach
Prime Sieve & Factorization:

Use the Sieve of Eratosthenes to find the smallest prime divisor for every number up to maxValue.
Use this to compute the prime exponent counts for every number x (i.e., how many times each prime divides it).
Precompute Binomial Coefficients (Combinations):

Precompute C[n][k] for all n and k up to n + max prime exponent, using Pascal’s Triangle: C[i][j]=C[i−1][j]+C[i−1][j−1]
Counting Ideal Arrays:

For each x from 1 to maxValue, use its prime exponents (like x = 12 = 2² * 3¹) to determine how many ways to place those prime factors over n positions.
For each prime exponent e, you can place it in the array in: C[n+e−1][e]
ways (stars and bars combinatorics).
Multiply all such placements for the exponents of a number x.
Sum this result for all values of x from 1 to maxValue.
Complexity
Time complexity:

Overall: O(maxValue⋅logmaxValue+n⋅MAX_P)
Space complexity:

For sieve, combinations, and factor arrays: O(MAX_N⋅MAX_P)
 */


/**
 * @param {number} n
 * @param {number} maxValue
 * @return {number}
 */
const MOD = 1e9 + 7;
const MAX_N = 10010;
const MAX_P = 15;

const c = Array.from({ length: MAX_N + MAX_P }, () =>
    Array(MAX_P + 1).fill(0)
);
const sieve = Array(MAX_N).fill(0);
const ps = Array.from({ length: MAX_N }, () => []);

(function init() {
    for (let i = 2; i < MAX_N; i++) {
        if (sieve[i] === 0) {
            for (let j = i; j < MAX_N; j += i) {
                if (sieve[j] === 0) {
                    sieve[j] = i;
                }
            }
        }
    }

    for (let i = 2; i < MAX_N; i++) {
        let x = i;
        while (x > 1) {
            const p = sieve[x];
            let cnt = 0;
            while (x % p === 0) {
                x = Math.floor(x / p);
                cnt++;
            }
            ps[i].push(cnt);
        }
    }

    c[0][0] = 1;
    for (let i = 1; i < MAX_N + MAX_P; i++) {
        c[i][0] = 1;
        for (let j = 1; j <= Math.min(i, MAX_P); j++) {
            c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % MOD;
        }
    }
})();

function idealArrays(n, maxValue) {
    let ans = 0n;
    for (let x = 1; x <= maxValue; x++) {
        let mul = 1n;
        for (const p of ps[x]) {
            mul = (mul * BigInt(c[n + p - 1][p])) % BigInt(MOD);
        }
        ans = (ans + mul) % BigInt(MOD);
    }
    return Number(ans);
}