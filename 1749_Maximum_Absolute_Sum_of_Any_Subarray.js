/**
 * 1749. Maximum Absolute Sum of Any Subarray
 * Difficulty: Medium
 * 
 * You are given an integer array nums. The absolute sum of a subarray [numsl, numsl+1, ..., numsr-1, numsr] is abs(numsl + numsl+1 + ... + numsr-1 + numsr).

Return the maximum absolute sum of any (possibly empty) subarray of nums.

Note that abs(x) is defined as follows:

If x is a negative integer, then abs(x) = -x.
If x is a non-negative integer, then abs(x) = x.
 

Example 1:

Input: nums = [1,-3,2,3,-4]
Output: 5
Explanation: The subarray [2,3] has absolute sum = abs(2+3) = abs(5) = 5.
Example 2:

Input: nums = [2,-5,1,-4,3,-2]
Output: 8
Explanation: The subarray [-5,1,-4] has absolute sum = abs(-5+1-4) = abs(-8) = 8.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 */

/**
 * Intuition
Optimized Approach: Kadane's Algorithm Variation
This problem is an extension of the Maximum Subarray Sum problem, which can be efficiently solved using Kadane’s Algorithm. The key idea here is that we need to find both:
The maximum subarray sum (to maximize positive sum).
The minimum subarray sum (to maximize the absolute negative sum).
The result will be max(abs(maxSum), abs(minSum)).
Approach
Iterate through the array while maintaining:
maxSum: The maximum subarray sum using Kadane’s Algorithm.
minSum: The minimum subarray sum using Kadane’s Algorithm (for negative contributions).
Update maxSum and minSum at each step:
maxSum = max(currentNum, maxSum + currentNum)
minSum = min(currentNum, minSum + currentNum)
Return max(abs(maxSum), abs(minSum)).
Complexity
Time complexity:

O(n) → We iterate the array once.
Space complexity:

O(1) → Uses only a few extra variables.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function(nums) {
    let maxSum = 0, minSum = 0, currMax = 0, currMin = 0;

    for (let num of nums) {
        currMax = Math.max(num, currMax + num);
        currMin = Math.min(num, currMin + num);
        maxSum = Math.max(maxSum, currMax);
        minSum = Math.min(minSum, currMin);
    }

    return Math.max(maxSum, Math.abs(minSum));
};