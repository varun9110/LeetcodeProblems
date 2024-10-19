/**
 * 1545. Find Kth Bit in Nth Binary String
 * Difficulty: Medium
 * 
 * Given two positive integers n and k, the binary string Sn is formed as follows:

S1 = "0"
Si = Si - 1 + "1" + reverse(invert(Si - 1)) for i > 1
Where + denotes the concatenation operation, reverse(x) returns the reversed string x, and invert(x) inverts all the bits in x (0 changes to 1 and 1 changes to 0).

For example, the first four strings in the above sequence are:

S1 = "0"
S2 = "011"
S3 = "0111001"
S4 = "011100110110001"
Return the kth bit in Sn. It is guaranteed that k is valid for the given n.

Example 1:
Input: n = 3, k = 1
Output: "0"
Explanation: S3 is "0111001".
The 1st bit is "0".
Example 2:
Input: n = 4, k = 11
Output: "1"
Explanation: S4 is "011100110110001".
The 11th bit is "1".

Constraints:
1 <= n <= 20
1 <= k <= 2n - 1
 */

/**
 * Intuition
When solving this problem, I first observed the pattern in the generation of binary strings. Each binary string is constructed recursively by 
adding a "1" in the middle and concatenating an inverted and reversed version of the previous string. This structure is symmetric, which leads 
us to a more efficient approach than generating the whole string. Instead of generating the string explicitly, we can use recursion to directly compute 
the value of the k-th bit by understanding its position relative to the midpoint of the string.

Approach
Recursive Structure: We know that each string is formed from the previous one. For any string Sn, it has a clear midpoint (at index 2^(n-1)). 
The second half of the string is the inverted and reversed version of the first half.

Base Case: When n = 1, the string is "0", so the first bit is always "0".

Recursion:

If k is the middle bit, return '1' since that’s how the binary string is defined.
If k is in the first half of the string, it directly corresponds to a position in the previous string Sn-1.
If k is in the second half, find its corresponding position in the first half of Sn-1, then invert the result.
This approach avoids generating the string explicitly, instead using recursive calls to efficiently determine the k-th bit.

Complexity
Time complexity: The time complexity is O(n) because we recursively reduce the problem size with each step by one level.

Space complexity: The space complexity is O(n) due to the recursion stack.
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {character}
 */
var findKthBit = function(n, k) {
    // Base case: When n = 1, the binary string is "0"
    if (n === 1) return '0';
    
    // Find the length of the current string Sn, which is 2^n - 1
    let length = (1 << n) - 1;
    
    // Find the middle position
    let mid = Math.floor(length / 2) + 1;
    
    // If k is the middle position, return '1'
    if (k === mid) return '1';
    
    // If k is in the first half, find the bit in Sn-1
    if (k < mid) return findKthBit(n - 1, k);
    
    // If k is in the second half, find the bit in Sn-1 and invert it
    return findKthBit(n - 1, length - k + 1) === '0' ? '1' : '0';
};