/**
 * 2099. Find Subsequence of Length K With the Largest Sum
 * Difficulty: Easy
 * 
 * You are given an integer array nums and an integer k. You want to find a subsequence of nums of length k that has the largest sum.

Return any such subsequence as an integer array of length k.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

Example 1:
Input: nums = [2,1,3,3], k = 2
Output: [3,3]
Explanation:
The subsequence has the largest sum of 3 + 3 = 6.
Example 2:
Input: nums = [-1,-2,3,4], k = 3
Output: [-1,3,4]
Explanation: 
The subsequence has the largest sum of -1 + 3 + 4 = 6.
Example 3:
Input: nums = [3,4,3,3], k = 2
Output: [3,4]
Explanation:
The subsequence has the largest sum of 3 + 4 = 7. 
Another possible subsequence is [4, 3].

Constraints:
1 <= nums.length <= 1000
-105 <= nums[i] <= 105
1 <= k <= nums.length
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSubsequence(nums, k) {
    // Step 1: Pair each number with its index
    let numsWithIndices = nums.map((num, index) => [num, index]);

    // Step 2: Sort by value descending
    numsWithIndices.sort((a, b) => b[0] - a[0]);

    // Step 3: Take top k and sort by original index
    let topK = numsWithIndices.slice(0, k).sort((a, b) => a[1] - b[1]);

    // Step 4: Extract the values
    return topK.map(pair => pair[0]);
}