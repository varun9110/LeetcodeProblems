/**
 * 3133. Minimum Array End
 * Difficulty: Medium
 * 
 * You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is 
 * greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

Return the minimum possible value of nums[n - 1].


Example 1:
Input: n = 3, x = 4
Output: 6
Explanation:
nums can be [4,5,6] and its last element is 6.
Example 2:
Input: n = 2, x = 7
Output: 15
Explanation:
nums can be [7,15] and its last element is 15
 
Constraints:

1 <= n, x <= 108
 */

/**
 * Explanation
We start with a number x and store it in result

remaining keeps track of how many bits we still need to process (n-1)

position helps us check individual bits, starting from rightmost (1)

Main Loop:

Checks each bit position in x
If there's a 0 bit in x at current position:
Takes the last bit of remaining (using & 1)
Places that bit in result at current position
Shifts remaining right by 1 to get next bit
Moves to next bit position by shifting left
 */

// JavaScript

var minEnd = function(n, x) {
    let result = BigInt(x);
    let remaining = BigInt(n - 1);
    let position = 1n;
    
    while (remaining > 0n) {
        if ((BigInt(x) & position) === 0n) {
            result |= (remaining & 1n) * position;
            remaining >>= 1n;
        }
        position <<= 1n;
    }
    
    return Number(result);
};