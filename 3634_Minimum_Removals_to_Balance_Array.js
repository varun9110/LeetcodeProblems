/**
 * 3634. Minimum Removals to Balance Array
 * Difficulty: Medium
 * 
 * You are given an integer array nums and an integer k.
An array is considered balanced if the value of its maximum element is at most k times the minimum element.
You may remove any number of elements from nums​​​​​​​ without making it empty.
Return the minimum number of elements to remove so that the remaining array is balanced.
Note: An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.


Example 1:
Input: nums = [2,1,5], k = 2
Output: 1
Explanation:
Remove nums[2] = 5 to get nums = [2, 1].
Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.
Example 2:
Input: nums = [1,6,2,9], k = 3
Output: 2
Explanation:
Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.
Example 3:
Input: nums = [4,6], k = 2
Output: 0
Explanation:

Since nums is already balanced as 6 <= 4 * 2, no elements need to be removed.
 */

/**
 * Intuition
The problem asks for the minimum number of removals to satisfy the condition max≤min×k. This is equivalent to finding the maximum number of elements we can keep.
If we sort the array, any subset of elements that satisfies the condition will form a contiguous subarray. For any subarray starting at index i and ending at index j (where i≤j), the minimum is nums[i] and the maximum is nums[j].
Thus, the problem simplifies to finding the longest subarray where nums[j]≤nums[i]×k in a sorted array.

Approach
Sort the Array: First, sort nums in ascending order. This puts the elements in a relative order where we can use a sliding window.
Sliding Window: Use two pointers, i (left) and j (right), both starting at 0.
Expand and Shrink:
Iterate j through the array. nums[j] represents the current maximum of the window.
Check if the window is valid: is nums[j] > nums[i] * k?
If it is invalid (the gap is too big), increment i to shrink the window from the left until the condition is met.
Track Max Length: At each step, update the maximum window size (j - i + 1).
Result: The answer is the total array length minus the maximum window size (n - maxLen).
Complexity
Time complexity: O(NlogN)
Sorting the array takes O(NlogN). The sliding window pass takes O(N).

Space complexity: O(logN)
Space is used by the internal stack during the sorting process.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minRemoval = function(nums, k) {
    // Standard sort in JS sorts by string, so we need a comparator
    nums.sort((a, b) => a - b);
    let i = 0;
    let maxLen = 0;
    
    for (let j = 0; j < nums.length; j++) {
        while (nums[j] > nums[i] * k) {
            i++;
        }
        maxLen = Math.max(maxLen, j - i + 1);
    }
    
    return nums.length - maxLen;
};