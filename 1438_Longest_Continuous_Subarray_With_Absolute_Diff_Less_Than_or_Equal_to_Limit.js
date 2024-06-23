/**
 * 1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit
 * Difficulty: Medium
 * 
 * Given an array of integers nums and an integer limit, return the size of the longest non-empty subarray such that the absolute 
 * difference between any two elements of this subarray is less than or equal to limit.

Example 1:
Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.
Example 2:
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.
Example 3:

Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3

Constraints:
1 <= nums.length <= 105
1 <= nums[i] <= 109
0 <= limit <= 109
 */

/**
 * Intuition
The problem requires finding the longest subarray where the absolute difference between the maximum and minimum elements is less than or 
equal to a given limit. To achieve this, we can use a sliding window technique combined with two deques to keep track of the minimum and maximum 
elements within the current window.

Approach
Deques for Tracking Min and Max:

Use two deques: increase to keep track of the increasing order of elements (for the minimum value) and decrease for the decreasing order of 
elements (for the maximum value).
Sliding Window Technique:

Iterate through the array while maintaining a sliding window.
For each element, add it to both deques:
Remove elements from the back of increase deque until the last element is greater than the current element.
Remove elements from the back of decrease deque until the last element is less than the current element.
Add the current element to the back of both deques.
Adjust Window:

Check the difference between the maximum and minimum elements in the current window (front elements of the decrease and increase deques respectively).
If the difference exceeds the limit, adjust the window by moving the left pointer until the difference is within the limit again.
Remove elements from the deques if they are equal to the element at the left pointer before incrementing the left pointer.
Track Maximum Size:

Calculate the size of the current valid window and update the maximum size if the current size is larger.
Complexity
Time Complexity: O(n), where n is the length of the array. Each element is added and removed from the deques at most once, leading to linear time complexity.
Space Complexity: O(n) in the worst case, for the space used by the deques.

 */

var longestSubarray = function(nums, limit) {
    let increase = [];
    let decrease = [];
    let max = 0;
    let left = 0;
    
    for (let i = 0; i < nums.length; i++) {
        while (increase.length && nums[i] < increase[increase.length - 1]) {
            increase.pop();
        }
        increase.push(nums[i]);
        
        while (decrease.length && nums[i] > decrease[decrease.length - 1]) {
            decrease.pop();
        }
        decrease.push(nums[i]);
        
        while (decrease[0] - increase[0] > limit) {
            if (nums[left] === decrease[0]) {
                decrease.shift();
            }
            if (nums[left] === increase[0]) {
                increase.shift();
            }
            left++;
        }
        
        max = Math.max(max, i - left + 1);
    }
    
    return max;
};