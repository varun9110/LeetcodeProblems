/**
 * 1493. Longest Subarray of 1's After Deleting One Element
 * Difficulty: Medium
 * 
 * Given a binary array nums, you should delete one element from it.

Return the size of the longest non-empty subarray containing only 1's in the resulting array. Return 0 if there is no such subarray.

 

Example 1:

Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
Example 2:

Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
Example 3:

Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
 */

/**
 * Intuition
We are asked to find the longest subarray of 1s after deleting exactly one element.
This means we can tolerate at most one zero inside our window.
Approach
Use two pointers (left, right) to maintain a sliding window.
Expand right pointer through the array.
Count zeros in the window.
If zeros exceed 1, move left pointer until the window has at most one zero.
Update the result as right - left (since we must delete one element).
E.g.: nums = [0,1,1,1,0,1,1,0,1]
sliding_window_custom.gif
Complexity
Time complexity: O (N)
Space complexity: O (1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestSubarray = function(nums) {
    let left = 0, zeros = 0, res = 0;
    
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        
        while (zeros > 1) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        
        res = Math.max(res, right - left);
    }
    
    return res;
};