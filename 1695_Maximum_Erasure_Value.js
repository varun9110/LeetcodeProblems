/**
 * 1695. Maximum Erasure Value
 * Difficulty: Medium
 * 
 * You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.
Return the maximum score you can get by erasing exactly one subarray.
An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).

Example 1:

Input: nums = [4,2,4,5,6]
Output: 17
Explanation: The optimal subarray here is [2,4,5,6].
Example 2:

Input: nums = [5,2,1,2,5,2,1,2,5]
Output: 8
Explanation: The optimal subarray here is [5,2,1] or [1,2,5].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 104
 */

/**
 * 🧠 Your goal: Maximize the score you can get by choosing the best unique-element subarray.
🧠 The Real Problem Behind the Scenes:
This is not just about deletion. It’s really about finding the subarray with the maximum sum under the constraint that no number repeats. That screams:

Find the longest possible subarray with all unique elements, and among all such subarrays, return the maximum sum.

🧩 Why Sliding Window is the Optimal Approach
✨ Let’s understand what’s happening in the array:
Imagine scanning from left to right.

You want to include elements as long as they're unique.

The moment a duplicate appears, that’s a problem.

So, we need to shrink the start of the window until the duplicate is gone.

This behavior is exactly what a sliding window pattern handles efficiently.

🛠️ Internal Tracking You Need:
Two Pointers – left and right:
right extends the window (scanning new elements).
left shrinks the window (removing duplicates).

Hash Set or Boolean Array:
To track which elements are already in the current window.
If nums[right] is already seen, we move left forward until it’s gone.

Running Sum and Max Score:
Maintain a currentSum for the sum of values in the window.
Update maxScore when you have a valid window.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function(nums) {
    let seen = new Set();
    let left = 0;
    let currentSum = 0;
    let maxSum = 0;
    
    for (let right = 0; right < nums.length; right++) {
        while (seen.has(nums[right])) {
            currentSum -= nums[left];
            seen.delete(nums[left]);
            left++;
        }
        currentSum += nums[right];
        seen.add(nums[right]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
};