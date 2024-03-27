/**
 * 713. Subarray Product Less Than K
 * Difficulty: Medium
 * Given an array of integers nums and an integer k, return the number of contiguous subarrays where the 
 * product of all the elements in the subarray is strictly less than k.

Example 1:
Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:
Input: nums = [1,2,3], k = 0
Output: 0

Constraints:
1 <= nums.length <= 3 * 104
1 <= nums[i] <= 1000
0 <= k <= 106
 */

/**
 * Approach:

Initialization: Set left and right pointers to 0, product to 1 (initial empty subarray), and count to 0 (to store final subarray count).
Sliding Window:
While right hasn't reached the end (right < n):
Expand the window: Multiply product by the current element nums[right].
Shrink the window (if necessary):
While product is greater than or equal to k:
Divide product by the leftmost element nums[left] and increment left. This shrinks the window and reduces the product.
Count subarrays:
Add 1 + (right - left) to count. This accounts for:
1: The single-element subarray ending at right.
(right - left): The number of contiguous subarrays within the current window (excluding elements already removed in the inner loop).
Increment right to move the window one step forward.
Return Result:
Return the final count representing the total number of subarrays with product less than k.

 */

var numSubarrayProductLessThanK = function(nums, k) {
    if(k<=1) return 0
    let left =right =0;
    let product =1;
    let count= 0;

    while(right<nums.length){
        product = product * nums[right];
        while(product>=k) {
            product = product/nums[left];
            left++;
        }
        count = count + 1 + (right-left);
        right++;
    }
    return count
};