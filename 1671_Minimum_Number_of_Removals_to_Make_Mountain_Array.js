/**
 * 1671. Minimum Number of Removals to Make Mountain Array
 * Difficulty: Hard
 * 
 * You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.

 

Example 1:

Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.
Example 2:

Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
 

Constraints:

3 <= nums.length <= 1000
1 <= nums[i] <= 109
It is guaranteed that you can make a mountain array out of nums.
 */

/**
 * Intuition
To solve this problem, let’s think about what makes a mountain array:

The array has to increase to a peak and then decrease.
A mountain array has a single peak, meaning the sequence first strictly increases, reaches a peak, and then strictly decreases.
With this in mind, the problem becomes finding the longest subarray that can form a mountain shape and then determining the minimum number of removals required to create it. We’ll use two sequences:

Longest Increasing Subsequence (LIS) up to each point to form the "up" side.
Longest Decreasing Subsequence (LDS) from each point to form the "down" side.
Approach
Calculate LIS and LDS:

LIS: For each element, find the length of the longest increasing subsequence up to that element.
LDS: For each element, find the length of the longest decreasing subsequence from that element.
Find Maximum Mountain Length:

For each potential peak (where both LIS[i] > 1 and LDS[i] > 1), calculate the mountain length as LIS[i] + LDS[i] - 1.
Track the maximum mountain length we can form.
Calculate Minimum Removals:

Subtract the maximum mountain length from the total number of elements to get the minimum removals needed.
Complexity
Time Complexity: (O(n^2)), due to the LIS and LDS calculations for each element.
Space Complexity: (O(n)), for storing the LIS and LDS arrays.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumMountainRemovals = function(nums) {
    const n = nums.length;
    const LIS = Array(n).fill(1), LDS = Array(n).fill(1);

    // Compute LIS for each index
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (nums[i] > nums[j]) {
                LIS[i] = Math.max(LIS[i], LIS[j] + 1);
            }
        }
    }

    // Compute LDS from each index
    for (let i = n - 1; i >= 0; --i) {
        for (let j = n - 1; j > i; --j) {
            if (nums[i] > nums[j]) {
                LDS[i] = Math.max(LDS[i], LDS[j] + 1);
            }
        }
    }

    let maxMountainLength = 0;

    // Find the maximum mountain length
    for (let i = 1; i < n - 1; ++i) {
        if (LIS[i] > 1 && LDS[i] > 1) {  // Valid peak
            maxMountainLength = Math.max(maxMountainLength, LIS[i] + LDS[i] - 1);
        }
    }

    return n - maxMountainLength;
};