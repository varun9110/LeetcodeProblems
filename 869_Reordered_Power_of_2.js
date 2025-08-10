/**
 * 869. Reordered Power of 2
 * Difficulty: Medium
 * 
 * You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.

Return true if and only if we can do this so that the resulting number is a power of two.

 

Example 1:

Input: n = 1
Output: true
Example 2:

Input: n = 10
Output: false
 

Constraints:

1 <= n <= 109
 */

/**
 * The main idea here is pretty straightforward:

if we can rearrange digits of n to get a power of 2, then n and that power of 2 must have exactly the same digits (just in different order).
Instead of generating all possible permutations of n (which would be expensive), we use a clever trick:

Normalize by sorting the digits of each number into a string.
If two numbers have the same digits, their sorted digit strings will be identical.
first, we convert n into a sorted digit string. (target pattern)
Go through all powers of 2 and check if any of them have the same sorted digit pattern
Since n≤10 
9
 , we only need to check 2 
0
  through 2 
30
  (because 2 
30
 >10 
9
 )
Let's walk through some examples:

n=46: sorted digits = "46"

2 
6
 =64: sorted digits = "46" → Match! Return True
n=125: sorted digits = "125"

2 
5
 =32: sorted digits = "23" → No match
2 
7
 =128: sorted digits = "128" → No match (close but 128 ≠ 125)
Keep checking... → none match, so return False
n=1: sorted digits = "1"

2 
0
 =1: sorted digits = "1" → Match! Return True
Essentially... we don't need to actually generate permutations, instead we just need to check if the "digit signature" matches any power of 2.

Complexity:

Time complexity:
Space complexity:
  
Sort and Match:
     O(logn)
     O(logn)
​
Precomputed:
O(dlog(d))≈O(1)
O(1)
​
 
Prime Factorization Hashing:

This approach avoid sorting altogether.

We use a prime number mapping for digits 0–9 to generate a unique multiplicative “signature” for any integer’s digit composition.

then, we compare the digit signature of the input number with the signatures of all powers of two up to 2 
30
  to check for digit reordering equivalence.
 */

/**
 * @param {number} n
 * @return {boolean}
 */
var reorderedPowerOf2 = function(n) {
    const countDigits = x => [...String(x)].sort().join('');
    const target = countDigits(n);
    
    for (let i = 0; i < 31; i++)
        if (countDigits(1 << i) === target) return true;

    return false;
};