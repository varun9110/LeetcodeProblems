/**
 * 2419. Longest Subarray With Maximum Bitwise AND
 * Difficulty: Medium
 * 
 * You are given an integer array nums of size n.

Consider a non-empty subarray from nums that has the maximum possible bitwise AND.

In other words, let k be the maximum value of the bitwise AND of any subarray of nums. Then, only subarrays with a bitwise AND equal to k should be considered.
Return the length of the longest such subarray.

The bitwise AND of an array is the bitwise AND of all the numbers in it.

A subarray is a contiguous sequence of elements within an array.

Example 1:

Input: nums = [1,2,3,3,2,2]
Output: 2
Explanation:
The maximum possible bitwise AND of a subarray is 3.
The longest subarray with that value is [3,3], so we return 2.
Example 2:

Input: nums = [1,2,3,4]
Output: 1
Explanation:
The maximum possible bitwise AND of a subarray is 4.
The longest subarray with that value is [4], so we return 1.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
 */

/**
 * Intuition ✨
To solve this problem, the key idea is to identify the subarrays where the bitwise AND is maximized. The maximum bitwise AND can only happen when all elements in the subarray are the same and equal to the maximum value in the array. Therefore, our task is to:

Find the maximum value in the array.
Identify the longest contiguous subarray where each element is equal to this maximum value.
Approach 🚀
Find the Maximum Element: First, we find the maximum value in the array, which will help us identify which subarrays can potentially have the maximum bitwise AND.

Traverse the Array:

Start from the first element and find contiguous subarrays where each element is equal to the maximum value.
Keep track of the longest subarray that contains this maximum value.
Return the Length of the Longest Subarray: Finally, return the length of the longest subarray where all elements equal the maximum value.

Code Walkthrough 📝
Find Maximum Element: maxBitwiseAnd = *max_element(nums.begin(),nums.end());

This step finds the maximum element, which is essential because only subarrays containing this element can have the maximum bitwise AND.
Traverse the Array:

We iterate through the array, counting the length of contiguous sequences of the maximum value.
For each such sequence, we update the result if the current sequence is longer than the previous ones.
Edge Case Handling: If no maximum value exists as a subarray, the loop won't enter the counting phase, but in all valid cases, it will return the longest subarray's length.

Time Complexity ⏳
Finding the maximum element takes (O(n)), where (n) is the length of the array.
Traversing the array to find the longest subarray of the maximum element also takes (O(n)).
Thus, the overall time complexity is O(n).
Space Complexity 💾
We are using a few extra variables (maxi, count, i), so the space complexity is O(1), which means the algorithm uses a constant amount of extra memory.
Summary 🎯
Time Complexity: O(n)
Space Complexity: O(1)
 */

var longestSubarray = function(nums) {
    let maxBitwiseAnd = Math.max(...nums);
    let maxi = 1;
    let count = 0;
    let i = 0;
    
    while (i < nums.length) {
        if (nums[i] === maxBitwiseAnd) {
            while (i < nums.length && nums[i] === maxBitwiseAnd) {
                count++;
                i++;
            }
            maxi = Math.max(maxi, count);
            count = 0;
        } else {
            i++;
        }
    }
    
    return maxi;
};