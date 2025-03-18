/**
 * 2401. Longest Nice Subarray
 * Difficulty: Medium
 * 
 * You are given an array nums consisting of positive integers.

We call a subarray of nums nice if the bitwise AND of every pair of elements that are in different positions in the subarray is equal to 0.
Return the length of the longest nice subarray.
A subarray is a contiguous part of an array.
Note that subarrays of length 1 are always considered nice.

Example 1:

Input: nums = [1,3,8,48,10]
Output: 3
Explanation: The longest nice subarray is [3,8,48]. This subarray satisfies the conditions:
- 3 AND 8 = 0.
- 3 AND 48 = 0.
- 8 AND 48 = 0.
It can be proven that no longer nice subarray can be obtained, so we return 3.
Example 2:

Input: nums = [3,1,5,11,13]
Output: 1
Explanation: The length of the longest nice subarray is 1. Any subarray of length 1 can be chosen.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
 */

/**
 * Intuition
The key insight for this problem is understanding what makes a subarray "nice" - for any two distinct elements in the subarray, their bitwise AND should be 0. This means no two elements in the subarray can have a common set bit. In other words, each bit position can be set in at most one element within the nice subarray.
We can think of this as a "bit usage" problem - once an element uses certain bits (has 1s in certain positions), no other element in our nice subarray can use those same bits.

Approach
I'll use a sliding window technique with these steps:

Maintain a variable used_bits that tracks which bits are currently "used" by elements in our window
For each element:
If it doesn't share bits with used_bits, add it to our window
If it shares bits, shrink the window from the left until there's no conflict
Keep track of the maximum window size seen
The key operations are:

used_bits & nums[right] != 0: Checks if the current number shares any bits with our window
used_bits ^= nums[left]: Removes the leftmost element's bits from our tracking
used_bits |= nums[right]: Adds the current element's bits to our tracking
Complexity
Time complexity: O(n)

Space complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestNiceSubarray = function(nums) {
    let n = nums.length;
    let maxLength = 1;
    let left = 0;
    let usedBits = 0;

    for (let right = 0; right < n; right++) {
        while ((usedBits & nums[right]) !== 0) {
            usedBits ^= nums[left];
            left++;
        }

        usedBits |= nums[right];
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};