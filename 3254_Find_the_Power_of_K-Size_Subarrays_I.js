/**
 * 3254. Find the Power of K-Size Subarrays I
 * Difficulty : Medium
 * 
 * You are given an array of integers nums of length n and a positive integer k.

The power of an array is defined as:

Its maximum element if all of its elements are consecutive and sorted in ascending order.
-1 otherwise.
You need to find the power of all 
subarrays
 of nums of size k.

Return an integer array results of size n - k + 1, where results[i] is the power of nums[i..(i + k - 1)].


Example 1:
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation:
There are 5 subarrays of nums of size 3:
[1, 2, 3] with the maximum element 3.
[2, 3, 4] with the maximum element 4.
[3, 4, 3] whose elements are not consecutive.
[4, 3, 2] whose elements are not sorted.
[3, 2, 5] whose elements are not consecutive.
Example 2:
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]
Example 3:
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]

Constraints:

1 <= n == nums.length <= 500
1 <= nums[i] <= 105
1 <= k <= n
 */

/**
 * #2 Aproach: Two Pointers + Sliding Window
Initialize result array, left=0, right=1 pointers for sliding window

Skip if k=1, return original array since all elements are valid

For the sliding window:

Check if current sequence breaks consecutiveness (nums[right] - nums[right-1] != 1)
If broken:
Fill -1 for all invalid sequences in current window
Move left pointer to right to start fresh
If consecutive and window size reaches k-1:
Add nums[right] to result (last element of valid sequence)
Slide window by moving left pointer
Continue until right reaches end of array

Done.

 */

/**
 * 
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */


var resultsArray = function(nums, k) {
    // Skip if k is 1
    if (k === 1) return nums;
    
    const n = nums.length;
    const result = [];
    let left = 0;
    let right = 1;
    
    while (right < n) {
        // Check if current sequence is not consecutive
        const isNotConsecutive = nums[right] - nums[right-1] !== 1;
        
        if (isNotConsecutive) {
            // Mark invalid sequences
            while (left < right && left + k - 1 < n) {
                result.push(-1);
                left++;
            }
            left = right;
        }
        // Found valid k-length sequence
        else if (right - left === k - 1) {
            result.push(nums[right]);
            left++;
        }
        
        right++;
    }
    
    return result;
};