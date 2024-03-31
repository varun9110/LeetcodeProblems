/**
 * 2444. Count Subarrays With Fixed Bounds
 * Difficulty: Hard
 * You are given an integer array nums and two integers minK and maxK.

A fixed-bound subarray of nums is a subarray that satisfies the following conditions:

The minimum value in the subarray is equal to minK.
The maximum value in the subarray is equal to maxK.
Return the number of fixed-bound subarrays.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
Output: 2
Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].
Example 2:

Input: nums = [1,1,1,1], minK = 1, maxK = 1
Output: 10
Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.
 

Constraints:

2 <= nums.length <= 105
1 <= nums[i], minK, maxK <= 106
 */

/**
 * Approach 🚀
1. Initialize variables res to store the result, bad_idx to store the index of the last occurrence of a 
value outside the range [minK, maxK], and left_idx and right_idx to store the indices of the last occurrence of minK and maxK respectively.
2. Iterate through the array nums and update the values of bad_idx, left_idx, and right_idx accordingly.
3. For each index i, calculate the number of fixed-bound subarrays ending at i by taking the 
minimum of left_idx and right_idx, and subtracting bad_idx. Add this count to res.
4. Return the final result res.
Complexity
Time complexity: ⏲️
O(n)O(n)O(n), where n is the length of the nums array. We iterate through the array once.
Space complexity: 🚀
O(1)O(1)O(1), as we are using a constant amount of extra space for variables regardless of the input size.

 */

var countSubarrays = function(nums, minK, maxK) {
    let res = 0;
    let badIdx = -1, leftIdx = -1, rightIdx = -1;

    for (let i = 0; i < nums.length; ++i) {
        if (!(minK <= nums[i] && nums[i] <= maxK)) {
            badIdx = i;
        }

        if (nums[i] === minK) {
            leftIdx = i;
        }

        if (nums[i] === maxK) {
            rightIdx = i;
        }

        res += Math.max(0, Math.min(leftIdx, rightIdx) - badIdx);
    }

    return res;
};