/**
 * 2425. Bitwise XOR of All Pairings
 * Difficulty: Medium
 * 
 * You are given two 0-indexed arrays, nums1 and nums2, consisting of non-negative integers. There exists another array, nums3, 
 * which contains the bitwise XOR of all pairings of integers between nums1 and nums2 (every integer in nums1 is paired with every integer in nums2 exactly once).

Return the bitwise XOR of all integers in nums3.

Example 1:

Input: nums1 = [2,1,3], nums2 = [10,2,5,0]
Output: 13
Explanation:
A possible nums3 array is [8,0,7,2,11,3,4,1,9,1,6,3].
The bitwise XOR of all these numbers is 13, so we return 13.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 0
Explanation:
All possible pairs of bitwise XORs are nums1[0] ^ nums2[0], nums1[0] ^ nums2[1], nums1[1] ^ nums2[0],
and nums1[1] ^ nums2[1].
Thus, one possible nums3 array is [2,5,1,6].
2 ^ 5 ^ 1 ^ 6 = 0, so we return 0.
 
Constraints:

1 <= nums1.length, nums2.length <= 105
0 <= nums1[i], nums2[j] <= 109
 */

/**
 * Intuition
We aim to find the XOR of all pairs between two arrays efficiently. To do this, we precompute the XOR of one array if the 
length of the other array is odd. Finally, we combine the results using XOR for the final output.

Approach
If the length of nums2 is odd, every number in nums1 will be XOR'd with all elements in nums2. This means each element of 
nums1 will appear an odd number of times in the final XOR calculation, contributing to the result.

XOR'ing a number with itself an even number of times cancels it out (a⊕a=0), so only numbers that appear an odd number of times matter.

Return XOR of both precomuted operands.

Complexity
Time complexity:
O(nums1+nums2)

Space complexity:
O(1)
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var xorAllNums = function(nums1, nums2) {
    let xor1 = 0, xor2 = 0;

    if (nums2.length % 2 === 1) for (const num of nums1) xor1 ^= num;
    if (nums1.length % 2 === 1) for (const num of nums2) xor2 ^= num;

    return xor1 ^ xor2;
};