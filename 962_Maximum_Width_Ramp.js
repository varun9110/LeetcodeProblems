/**
 * 962. Maximum Width Ramp
 * Difficulty: Medium
 * 
 * A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.
Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

Example 1:

Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.
Example 2:

Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.
 

Constraints:

2 <= nums.length <= 5 * 104
0 <= nums[i] <= 5 * 104
 */

/**
 * Intuition
The problem asks to find the maximum width of a ramp (i, j) such that i < j and nums[i] <= nums[j]. A brute-force approach would be to check every possible pair, but this would be inefficient for large arrays. The key observation is that we can use a monotonic decreasing stack to store potential candidates for i, and then we iterate from the back of the array to find the largest possible j.

Approach
Monotonic Stack: We traverse the array and maintain a stack of indices where the values of nums are in decreasing order. This ensures that when we later iterate over the array from right to left, we can quickly find an index i such that nums[i] <= nums[j].

Finding the Maximum Width: Starting from the rightmost index j, for each index, we pop from the stack until the top of the stack has an index i where nums[i] <= nums[j]. We then compute the width j - i and update the maximum width.

Complexity
Time Complexity: The time complexity is O(n) where n is the length of the nums array. We traverse the array twice: once to build the stack and once to compute the maximum width.
Space Complexity: The space complexity is O(n) because we are using a stack to store the indices.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxWidthRamp = function(nums) {
    let n = nums.length;
    let stack = [];
    
    // Step 1: Build a decreasing stack of indices
    for (let i = 0; i < n; i++) {
        if (stack.length === 0 || nums[stack[stack.length - 1]] > nums[i]) {
            stack.push(i);
        }
    }
    
    let maxWidth = 0;
    
    // Step 2: Traverse from the end and find maximum width ramp
    for (let j = n - 1; j >= 0; j--) {
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[j]) {
            maxWidth = Math.max(maxWidth, j - stack.pop());
        }
    }
    
    return maxWidth;
};