/**
 * 1922. Count Good Numbers
 * Difficulty: Medium
 * 
 * A digit string is good if the digits (0-indexed) at even indices are even and the digits at odd indices are prime (2, 3, 5, or 7).

For example, "2582" is good because the digits (2 and 8) at even positions are even and the digits (5 and 2) at odd positions are prime. However, "3245" is not good because 3 is at an even index but is not even.
Given an integer n, return the total number of good digit strings of length n. Since the answer may be large, return it modulo 109 + 7.

A digit string is a string consisting of digits 0 through 9 that may contain leading zeros.

 

Example 1:

Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".
Example 2:

Input: n = 4
Output: 400
Example 3:

Input: n = 50
Output: 564908303
 

Constraints:

1 <= n <= 1015
 */

/**
 * Intuition & Problem Understanding
We're asked to count the number of "good digit strings" of length n, where:

Even indices (0-based): Can be filled with even digits → 0, 2, 4, 6, 8 → 5 choices
Odd indices: Can be filled with prime digits → 2, 3, 5, 7 → 4 choices
These choices are independent per position, and the total number of such strings is just the product of choices at each valid index.

To compute this efficiently, we use modular exponentiation.

How to come up with the solution
Recognize the independence of positions:

Each digit in the string does not affect others.
Hence, total possibilities = multiplication of valid choices at each position.
Count how many positions are even and odd:

Even positions: indices 0, 2, 4, ... ⇒ count = (n + 1) // 2
Odd positions: indices 1, 3, 5, ... ⇒ count = n // 2
Calculate total choices:

For even positions: 5 ^ even_count
For odd positions: 4 ^ odd_count
Multiply both results.
Why modular exponentiation?

Exponentiation results can be huge.
We need to calculate powers under modulo 1e9 + 7 efficiently.
Use binary (fast) exponentiation → O(log n) time.
Final Formula
countGoodNumbers(n) = (5 ^ ((n + 1) // 2) * 4 ^ (n // 2)) % MOD
image.png
Complexity:
TIME COMPLEXITY
Each modExp call takes O(log n) time due to binary exponentiation.
Two such calls are made (with exponents ≈ n/2), so:
Overall TIME complexity: O(log n)
SPACE COMPLEXITY
No additional data structures are used.
Overall SPACE complexity: O(1)
 */


/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers = function(n) {
    const MOD = 10n ** 9n + 7n;

    // Fast exponentiation for BigInt
    const modPow = (base, exp, mod) => {
        let result = 1n;
        base %= mod;

        while (exp > 0n) {
            if (exp % 2n === 1n) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp /= 2n;
        }

        return result;
    };

    // Convert n to BigInt for arithmetic
    let bigN = BigInt(n);
    let evens = (bigN + 1n) / 2n;
    let odds = bigN / 2n;

    let evenPart = modPow(5n, evens, MOD);
    let oddPart = modPow(4n, odds, MOD);

    return Number((evenPart * oddPart) % MOD);
};