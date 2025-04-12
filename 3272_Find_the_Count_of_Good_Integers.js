/**
 * 3272. Find the Count of Good Integers
 * Difficulty: Hard
 * 
 * You are given two positive integers n and k.

An integer x is called k-palindromic if:

x is a palindrome.
x is divisible by k.
An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, 
whereas 1010 cannot be rearranged to form a k-palindromic integer.

Return the count of good integers containing n digits.

Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.

Example 1:

Input: n = 3, k = 5

Output: 27

Explanation:

Some of the good integers are:

551 because it can be rearranged to form 515.
525 because it is already k-palindromic.
Example 2:

Input: n = 1, k = 4

Output: 2

Explanation:

The two good integers are 4 and 8.

Example 3:

Input: n = 5, k = 6

Output: 2468

 

Constraints:

1 <= n <= 10
1 <= k <= 9
 */

/**
 * Intuition
To solve the problem efficiently: We don’t generate all possible n-digit numbers (which is massive).
Instead, we generate only n-digit palindromic numbers.
Among those, we keep the ones divisible by k (i.e., k-palindromic).
We then count how many n-digit numbers can be formed by rearranging the digits of each valid palindrome, making sure the number doesn't start with zero.
This reduces the problem from brute-force checking all 10^n numbers to around 10^{n/2} palindromes — much faster.
Approach
Generate palindromes:
Generate only the first half of the palindrome.
Mirror the half (exclude middle digit if n is odd) to get full palindromes.
Filter by k-divisibility:
Check if the palindrome is divisible by k.
Store valid digit sets:
For each k-palindromic number, sort its digits and store in a set to ensure unique combinations.
Precompute factorials (with BigInt):
For handling large permutations and avoiding overflow, store factorials up to n.
Count good integers for each unique digit set:
For each unique sorted digit string: Count digit frequencies.
Use the formula for permutations:
total=(𝑛−1)! × (non-zero leading digits count) / product of each digit count factorial
Multiply by the number of digits that can be placed in the leading position (i.e., not zero).
Return the sum of all valid permutations.
Complexity
Time complexity:

Generating palindromes: O(10^{⌈n/2⌉})
For each palindrome:
Sort digits: O(n log n)
Frequency count and permutation calculation: O(n)
Total complexity:O(10^⌈n/2⌉⋅nlogn)
Space complexity:

Set to store unique digit strings: O(10^{n/2}) in worst case
Factorial array: O(n)
Frequency count array: O(1) (fixed size 10)
Overall: O(10^n/2+n)
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countGoodIntegers = function (n, k) {
    const uniqueSortedDigits = new Set();
    const isOddLength = n % 2 === 1;
    const halfLength = Math.floor((n + 1) / 2);
    const start = Math.pow(10, halfLength - 1);
    const end = Math.pow(10, halfLength);

    // Generate all palindromes of length `n`
    for (let i = start; i < end; i++) {
        let firstHalf = i.toString();
        let secondHalf = firstHalf.split("").reverse().slice(isOddLength ? 1 : 0).join("");
        let palindromeStr = firstHalf + secondHalf;
        let palindromeNum = parseInt(palindromeStr);

        if (palindromeNum % k === 0) {
            let sortedDigits = palindromeStr.split("").sort().join("");
            uniqueSortedDigits.add(sortedDigits);
        }
    }
    // Precompute factorials using BigInt
    const factorial = [1n];
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * BigInt(i);
    }

    let total = 0n;
    for (const sorted of uniqueSortedDigits) {
        const count = Array(10).fill(0);
        for (const digit of sorted) {
            count[parseInt(digit)]++;
        }
        // Count valid permutations (no leading zero)
        const leadingOptions = n - count[0];
        let perms = BigInt(leadingOptions) * factorial[n - 1];
        for (const c of count) {
            perms /= factorial[c];
        }
        total += perms;
    }
    return Number(total);
};
